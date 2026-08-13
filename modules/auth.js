import { supabase } from '../config.js';
import { safeImageUrl, renderSafeAvatar } from './security.js';

// 1. Создаем черный список самых популярных одноразовых почт (Blacklist)
const DISPOSABLE_DOMAINS = [
    'mailinator.com', '10minutemail.com', 'tempmail.com', 'guerrillamail.com', 
    'yopmail.com', 'throwawaymail.com', 'dropmail.me', 'getnada.com', 
    'fakemail.net', 'trashmail.com', 'temp-mail.org', 'tempmail.net'
];

export const AuthModule = {
    checkUserSession: async () => {
        // 1. СИНХРОННАЯ ПОДПИСКА (Выполняется мгновенно, ДО любых await)
        supabase.auth.onAuthStateChange(async (event, session) => {
            
            // Перехват перехода по ссылке сброса пароля
            if (event === 'PASSWORD_RECOVERY') {
                setTimeout(() => {
                    if (typeof window.closeModal === 'function') window.closeModal('auth-modal');
                    if (typeof window.openModal === 'function') window.openModal('reset-password-modal');
                }, 300); // Даем модальному менеджеру время на инициализацию
                return;
            }

            // Защита: Auto-Logout, если аккаунт удален в админке
            if (session && session.user) {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error || !user) {
                    await supabase.auth.signOut();
                    window.currentUser = null;
                    if (window.userFavorites) window.userFavorites.clear();
                    if (typeof window.closeModal === 'function') {
                        window.closeModal('profile-modal');
                        window.closeModal('edit-profile-modal');
                    }
                    if (typeof window.showToast === 'function') window.showToast("Ваш аккаунт был удален или сессия истекла", true);
                    return;
                }
            }
            AuthModule.handleAuthChange(session);
        });

        // 2. БРОНЕБОЙНЫЙ ФОЛЛБЕК: Проверяем URL напрямую
        // На случай, если редиректы браузера сбили событие Supabase
        if (window.location.hash.includes('type=recovery') || window.location.search.includes('type=recovery')) {
            setTimeout(() => {
                if (typeof window.closeModal === 'function') window.closeModal('auth-modal');
                if (typeof window.openModal === 'function') window.openModal('reset-password-modal');
            }, 300);
        }

        // 3. Обычная загрузка сессии
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            await AuthModule.handleAuthChange(session);
        } catch (err) { console.error("Ошибка сессии:", err); }
    },

    handleAuthChange: async (session) => {
        try {
            const loginIds = ['btn-login', 'nav-login-btn', 'mobile-btn-login', 'mob-nav-login', 'header-login-btn'];
            const menuIds = ['user-menu', 'nav-user-controls', 'mobile-user-menu', 'mob-user-controls', 'header-user-menu'];

            const profileLoginWrapper = document.getElementById('profile-login-wrapper');
            const profileEconomySection = document.getElementById('profile-economy-section');
            const btnEditProfile = document.getElementById('btn-edit-profile');
            const btnLogoutProfile = document.getElementById('profile-logout-btn');

            if (session) {
                window.currentUser = session.user;
                // === ИСПРАВЛЕНИЕ: Вытягиваем скрытые метаданные ===
                const meta = session.user.user_metadata || {}; 
                
                try {
                    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                    if (profile) window.currentUser = { ...window.currentUser, ...profile };
                } catch(e) {}

                // Ищем аватарку: сначала в профиле, затем в метаданных (сохраненную при регистрации), затем генерируем дефолтную (версия 9.x)
                const rawAvatarUrl = window.currentUser?.avatar_url || meta.avatar_url || `https://api.dicebear.com/9.x/bottts/svg?seed=${session.user.id}`;
                // avatar_url приходит из пользовательских метаданных — валидируем схему URL перед использованием
                const avatarUrl = safeImageUrl(rawAvatarUrl, `https://api.dicebear.com/9.x/bottts/svg?seed=${session.user.id}`);
                document.querySelectorAll('.user-avatar').forEach(img => img.src = avatarUrl);
                
                const profileAvatarCont = document.getElementById('profile-avatar-container');
                if (profileAvatarCont) {
                    renderSafeAvatar(profileAvatarCont, avatarUrl);
                }

                const safeSet = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
                
                // Ищем имя: в профиле ИЛИ в метаданных ИЛИ ставим стандартное
                const userName = window.currentUser?.name || window.currentUser?.full_name || meta.name || meta.full_name || 'Свалкер';
                
                safeSet('profile-name', userName);
                safeSet('header-user-name', userName);
                safeSet('profile-email', window.currentUser?.email || '');

                loginIds.forEach(id => { const el = document.getElementById(id); if (el) el.style.setProperty('display', 'none', 'important'); });
                menuIds.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.remove('hidden'); el.style.setProperty('display', 'flex', 'important'); } });

                if (profileLoginWrapper) { profileLoginWrapper.classList.add('hidden'); profileLoginWrapper.classList.remove('block'); }
                if (profileEconomySection) { profileEconomySection.classList.remove('hidden'); profileEconomySection.classList.add('flex'); }
                if (btnEditProfile) { btnEditProfile.classList.remove('hidden'); btnEditProfile.classList.add('flex'); }
                if (btnLogoutProfile) { btnLogoutProfile.classList.remove('hidden'); btnLogoutProfile.classList.add('flex'); }

                try {
                    const { data: favs } = await supabase.from('favorites').select('item_id').eq('user_id', session.user.id);
                    window.userFavorites = new Set(favs?.map(f => f.item_id) || []);
                } catch(e) {}

                if (typeof window.renderProfileTabs === 'function') window.renderProfileTabs();
                if (typeof window.updateChatBadges === 'function') window.updateChatBadges();
                if (typeof window.initGlobalChatListener === 'function') window.initGlobalChatListener();
                if (typeof window.fetchItems === 'function' && !window.isInitialLoad) window.fetchItems(false);

            } else {
                window.currentUser = null;
                window.userFavorites = new Set();
                
                loginIds.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.remove('hidden'); el.style.setProperty('display', '', 'important'); } });
                menuIds.forEach(id => { const el = document.getElementById(id); if (el) el.style.setProperty('display', 'none', 'important'); });
                
                if (profileLoginWrapper) { profileLoginWrapper.classList.remove('hidden'); profileLoginWrapper.classList.add('block'); }
                if (profileEconomySection) { profileEconomySection.classList.add('hidden'); profileEconomySection.classList.remove('flex'); }
                if (btnEditProfile) { btnEditProfile.classList.add('hidden'); btnEditProfile.classList.remove('flex'); }
                if (btnLogoutProfile) { btnLogoutProfile.classList.add('hidden'); btnLogoutProfile.classList.remove('flex'); }
                
                const safeSet = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
                safeSet('profile-name', 'Гость');
                safeSet('profile-email', 'Не авторизован');
                
                const profileAvatarCont = document.getElementById('profile-avatar-container');
                if (profileAvatarCont) profileAvatarCont.innerHTML = '<i class="fa-solid fa-user"></i>';

                if (window.globalChatSubscription) {
                    supabase.removeChannel(window.globalChatSubscription);
                    window.globalChatSubscription = null;
                }
            }
        } catch (err) { console.error("Сбой обновления UI:", err); }
    },

    submitAuth: async (event) => {
        if (event) event.preventDefault();
        
        const mode = window.authMode || 'login';
        const isRegister = mode === 'register';

        const emailEl = document.getElementById('auth-email');
        const passwordEl = document.getElementById('auth-password');
        const confirmPasswordEl = document.getElementById('auth-password-confirm');
        const nameEl = document.getElementById('auth-name'); 
        const btn = document.getElementById('auth-submit-btn');

        if (!emailEl || !passwordEl || !btn) return;

        // Приводим email к нижнему регистру для надежности
        const email = emailEl.value.trim().toLowerCase();
        const password = passwordEl.value;
        const originalText = btn.innerHTML;

        // СЕНЬОР-ЛОГИКА: 1. Проверка на одноразовую почту
        if (email) {
            const emailDomain = email.split('@')[1];
            if (emailDomain && DISPOSABLE_DOMAINS.includes(emailDomain)) {
                if (typeof window.showToast === 'function') {
                    window.showToast("Использование временных почт запрещено правилами SVALKA", true);
                }
                return; // Останавливаем регистрацию
            }
        }

        let name = '';
        let avatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${email}`;

        if (isRegister) {
            name = nameEl ? nameEl.value.trim() : '';
            if (!name) {
                if (typeof window.showToast === 'function') window.showToast('Пожалуйста, укажите ваше имя', 'error');
                if (nameEl) nameEl.focus();
                return; 
            }

            const confirmPassword = confirmPasswordEl ? confirmPasswordEl.value : '';
            if (password !== confirmPassword) {
                if (typeof window.showToast === 'function') window.showToast('Пароли не совпадают!', 'error');
                if (confirmPasswordEl) confirmPasswordEl.focus();
                return; 
            }

            const selectedAvatarEl = document.querySelector('input[name="avatar"]:checked');
            if (selectedAvatarEl) {
                avatarUrl = selectedAvatarEl.value;
            }
        }
        
        try {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Обработка...';
            btn.disabled = true;

            if (isRegister) {
                // СЕНЬОР-ЛОГИКА: 2. Регистрация и перехват дубликатов
                const { error } = await supabase.auth.signUp({ 
                    email, 
                    password,
                    options: { data: { name: name, full_name: name, avatar_url: avatarUrl } }
                });
                
                if (error) {
                    // Если почта уже есть в базе, Supabase вернет ошибку "User already registered" (или статус 400)
                    if (error.message.includes('already registered') || error.status === 400) {
                        throw new Error("Эта электронная почта уже используется. Пожалуйста, войдите в аккаунт.");
                    }
                    throw error;
                }

                // При регистрации не делаем reload страницы, чтобы пользователь точно увидел это уведомление
                if (typeof window.showToast === 'function') window.showToast("Письмо с подтверждением отправлено на вашу почту!", "success");
                if (typeof window.closeModal === 'function') window.closeModal('auth-modal');

            } else {
                // Логика входа (Login)
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                    if (error.message.includes('Invalid login credentials')) {
                         throw new Error("Неверный email или пароль");
                    }
                    throw error;
                }
                
                if (typeof window.showToast === 'function') window.showToast('С возвращением на SVALKA!', 'success');
                if (typeof window.closeModal === 'function') window.closeModal('auth-modal');
                setTimeout(() => window.location.reload(), 1000); 
            }
            
        } catch (err) {
            console.error("Auth Error:", err);
            let errorMsg = err.message;
            
            if (errorMsg.includes('Password should be at least')) {
                errorMsg = 'Пароль должен быть не менее 6 символов';
            }
            
            // Выводим понятную ошибку пользователю
            if (typeof window.showToast === 'function') {
                window.showToast(errorMsg, 'error');
            } else {
                alert("Ошибка: " + errorMsg);
            }
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    },

    logout: async () => {
        try {
            await supabase.auth.signOut();
            window.location.reload();
        } catch (err) { console.error("Ошибка при выходе:", err); }
    }
};

// ==========================================
// ГЛОБАЛЬНЫЕ ФУНКЦИИ (Привязка к window для HTML)
// ==========================================

window.saveNewPassword = async (event) => {
    event.preventDefault();
    const btn = document.getElementById('save-new-password-btn');
    const input = document.getElementById('new-password-input');
    if (!input || !btn) return;
    
    const password = input.value;

    if (!password || password.length < 6) {
        if (typeof window.showToast === 'function') window.showToast("Пароль должен быть не менее 6 символов", true);
        return;
    }

    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Сохранение...';

    try {
        // Supabase знает, кого обновлять, так как в URL есть токен восстановления
        const { error } = await supabase.auth.updateUser({ password: password });
        if (error) throw error;

        if (typeof window.showToast === 'function') window.showToast("Пароль успешно изменен!", "success");
        if (typeof window.closeModal === 'function') window.closeModal('reset-password-modal');
        
        // Очищаем адресную строку от технических токенов Supabase (чтобы было красиво)
        history.replaceState(null, document.title, window.location.pathname);
        
    } catch (err) {
        console.error(err);
        if (typeof window.showToast === 'function') window.showToast("Ошибка: " + err.message, true);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
};
