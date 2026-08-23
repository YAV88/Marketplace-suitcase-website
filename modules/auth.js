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
        // СЕНЬОР-ФИКС 1: Убираем смертельный await supabase.auth.getUser() из слушателя,
        // который вызывал Deadlock (вечную загрузку без ошибок в консоли).
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                setTimeout(() => {
                    if (typeof window.closeModal === 'function') window.closeModal('auth-modal');
                    if (typeof window.openModal === 'function') window.openModal('reset-password-modal');
                }, 300);
                return;
            }
            AuthModule.handleAuthChange(session);
        });

        // 2. БРОНЕБОЙНЫЙ ФОЛЛБЕК: Проверяем URL напрямую
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
                const meta = session.user.user_metadata || {}; 
                
                try {
                    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                    if (profile) window.currentUser = { ...window.currentUser, ...profile };
                } catch(e) {}

                const rawAvatarUrl = window.currentUser?.avatar_url || meta.avatar_url || `https://api.dicebear.com/9.x/bottts/svg?seed=${session.user.id}`;
                const avatarUrl = safeImageUrl(rawAvatarUrl, `https://api.dicebear.com/9.x/bottts/svg?seed=${session.user.id}`);
                
                document.querySelectorAll('.user-avatar').forEach(img => img.src = avatarUrl);
                
                const profileAvatarCont = document.getElementById('profile-avatar-container');
                if (profileAvatarCont) {
                    renderSafeAvatar(profileAvatarCont, avatarUrl);
                }

                const safeSet = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
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

                // СЕНЬОР-ФИКС 2: Принудительно закрываем окно входа после успешной авторизации
                if (typeof window.closeModal === 'function') {
                    window.closeModal('auth-modal');
                }

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
                if (profileAvatarCont) profileAvatarCont.innerHTML = '<i class="fa-solid fa-user text-stone-400"></i>';

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

        const email = emailEl.value.trim().toLowerCase();
        const password = passwordEl.value;
        const originalText = btn.innerHTML;

        if (email) {
            const emailDomain = email.split('@')[1];
            if (emailDomain && DISPOSABLE_DOMAINS.includes(emailDomain)) {
                if (typeof window.showToast === 'function') {
                    window.showToast("Использование временных почт запрещено правилами SVALKA", true);
                }
                return;
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
                const { error } = await supabase.auth.signUp({ 
                    email, 
                    password,
                    options: { data: { name: name, full_name: name, avatar_url: avatarUrl } }
                });
                
                if (error) {
                    if (error.message.includes('already registered') || error.status === 400) {
                        throw new Error("Эта электронная почта уже используется. Пожалуйста, войдите в аккаунт.");
                    }
                    throw error;
                }

                if (typeof window.showToast === 'function') window.showToast("Письмо с подтверждением отправлено на вашу почту!", "success");
                if (typeof window.closeModal === 'function') window.closeModal('auth-modal');

            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                    if (error.message.includes('Invalid login credentials')) {
                         throw new Error("Неверный email или пароль");
                    }
                    throw error;
                }
                
                if (typeof window.showToast === 'function') window.showToast('С возвращением на SVALKA!', 'success');
                // СЕНЬОР-ФИКС 3: Убрана принудительная перезагрузка. 
                // Теперь Supabase сам вызовет onAuthStateChange и перерисует интерфейс мгновенно.
            }
            
        } catch (err) {
            console.error("Auth Error:", err);
            let errorMsg = err.message;
            
            if (errorMsg.includes('Password should be at least')) {
                errorMsg = 'Пароль должен быть не менее 6 символов';
            }
            
            if (typeof window.showToast === 'function') {
                window.showToast(errorMsg, 'error');
            } else {
                alert("Ошибка: " + errorMsg);
            }
        } finally {
            // СЕНЬОР-ФИКС 4: Железобетонный возврат кнопки в исходное состояние при любом исходе
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    },

    // СЕНЬОР-ФИКС 5: Мгновенный выход без перезагрузки всей страницы
    logout: async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            window.currentUser = null;
            window.currentUserData = null;
            if (window.userFavorites) window.userFavorites.clear();
            
            if (typeof window.closeModal === 'function') {
                window.closeModal('profile-modal');
            }
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
                if (typeof window.toggleMobileMenu === 'function') window.toggleMobileMenu();
            }
            
            AuthModule.handleAuthChange(null);
            
            if (typeof window.showToast === 'function') window.showToast("Вы успешно вышли из аккаунта", "success");
            
            if (typeof window.goHome === 'function') window.goHome();

        } catch (error) {
            console.error("Ошибка при выходе:", error);
            if (typeof window.showToast === 'function') window.showToast("Ошибка при выходе", true);
        }
    }
};

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
        const { error } = await supabase.auth.updateUser({ password: password });
        if (error) throw error;

        if (typeof window.showToast === 'function') window.showToast("Пароль успешно изменен!", "success");
        if (typeof window.closeModal === 'function') window.closeModal('reset-password-modal');
        
        history.replaceState(null, document.title, window.location.pathname);
        
    } catch (err) {
        console.error(err);
        if (typeof window.showToast === 'function') window.showToast("Ошибка: " + err.message, true);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
};