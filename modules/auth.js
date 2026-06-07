import { supabase } from '../config.js';

export const AuthModule = {
    checkUserSession: async () => {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            await AuthModule.handleAuthChange(session);
            supabase.auth.onAuthStateChange((event, session) => {
                AuthModule.handleAuthChange(session);
            });
        } catch (err) { console.error("Ошибка сессии:", err); }
    },

    handleAuthChange: async (session) => {
        try {
            // ID кнопок в верхней шапке сайта
            const loginIds = ['btn-login', 'nav-login-btn', 'mobile-btn-login', 'mob-nav-login', 'header-login-btn'];
            const menuIds = ['user-menu', 'nav-user-controls', 'mobile-user-menu', 'mob-user-controls', 'header-user-menu'];

            // === РЕАЛЬНЫЕ ID ИЗ ТВОЕГО ОКНА ПРОФИЛЯ ===
            const profileLoginWrapper = document.getElementById('profile-login-wrapper');
            const profileEconomySection = document.getElementById('profile-economy-section');
            const btnEditProfile = document.getElementById('btn-edit-profile');
            const btnLogoutProfile = document.getElementById('profile-logout-btn');

            if (session) {
                window.currentUser = session.user;
                
                try {
                    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                    if (profile) window.currentUser = { ...window.currentUser, ...profile };
                } catch(e) {}

                const avatarUrl = window.currentUser?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + session.user.id;
                document.querySelectorAll('.user-avatar').forEach(img => img.src = avatarUrl);
                
                // Аватарка внутри самого окна профиля
                const profileAvatarCont = document.getElementById('profile-avatar-container');
                if (profileAvatarCont) {
                    profileAvatarCont.innerHTML = `<img src="${avatarUrl}" class="w-full h-full object-cover">`;
                }

                const safeSet = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
                
                safeSet('profile-name', window.currentUser.name || window.currentUser.full_name || 'Свалкер');
                safeSet('header-user-name', window.currentUser.name || window.currentUser.full_name || 'Профиль');
                safeSet('profile-email', window.currentUser.email || '');

                // Прячем кнопку "Войти" везде и показываем меню в шапке
                loginIds.forEach(id => { const el = document.getElementById(id); if (el) el.style.setProperty('display', 'none', 'important'); });
                menuIds.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.remove('hidden'); el.style.setProperty('display', 'flex', 'important'); } });

                // === МЕНЯЕМ БЛОКИ ВНУТРИ ОКНА ПРОФИЛЯ ===
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
                
                // Возвращаем шапку сайта в статус "Гость"
                loginIds.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.remove('hidden'); el.style.setProperty('display', '', 'important'); } });
                menuIds.forEach(id => { const el = document.getElementById(id); if (el) el.style.setProperty('display', 'none', 'important'); });
                
                // === ВОЗВРАЩАЕМ ПРОФИЛЬ В СТАТУС "ГОСТЬ" ===
                if (profileLoginWrapper) { profileLoginWrapper.classList.remove('hidden'); profileLoginWrapper.classList.add('block'); }
                if (profileEconomySection) { profileEconomySection.classList.add('hidden'); profileEconomySection.classList.remove('flex'); }
                if (btnEditProfile) { btnEditProfile.classList.add('hidden'); btnEditProfile.classList.remove('flex'); }
                if (btnLogoutProfile) { btnLogoutProfile.classList.add('hidden'); btnLogoutProfile.classList.remove('flex'); }
                
                safeSet('profile-name', 'Гость');
                safeSet('profile-email', 'Не авторизован');
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

        const email = emailEl.value.trim();
        const password = passwordEl.value;
        const originalText = btn.innerHTML;

        // === СТРОГАЯ ПРОВЕРКА ИМЕНИ И ПАРОЛЯ ПРИ РЕГИСТРАЦИИ ===
        let name = '';
        let avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;

        if (isRegister) {
            name = nameEl ? nameEl.value.trim() : '';
            if (!name) {
                if (typeof window.showToast === 'function') window.showToast('Пожалуйста, укажите ваше имя', 'error');
                if (nameEl) nameEl.focus();
                return; // Блокируем отправку
            }

            const confirmPassword = confirmPasswordEl ? confirmPasswordEl.value : '';
            if (password !== confirmPassword) {
                if (typeof window.showToast === 'function') window.showToast('Пароли не совпадают!', 'error');
                if (confirmPasswordEl) confirmPasswordEl.focus();
                return; // Блокируем отправку
            }

            // Проверяем, выбрал ли пользователь аватарку робота из твоей сетки
            const selectedAvatarEl = document.querySelector('input[name="avatar"]:checked');
            if (selectedAvatarEl) {
                avatarUrl = selectedAvatarEl.value;
            }
        }
        
        try {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Загрузка...';
            btn.disabled = true;

            if (isRegister) {
                const { error } = await supabase.auth.signUp({ 
                    email, 
                    password,
                    options: { data: { name: name, full_name: name, avatar_url: avatarUrl } }
                });
                if (error) throw error;
                if (typeof window.showToast === 'function') window.showToast('Успешная регистрация! Проверьте почту.', 'success');
                setTimeout(() => window.location.reload(), 1500); 
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                if (typeof window.showToast === 'function') window.showToast('С возвращением!', 'success');
                setTimeout(() => window.location.reload(), 1000); 
            }
            
            if (typeof window.closeModal === 'function') window.closeModal('auth-modal');
        } catch (err) {
            let errorMsg = err.message;
            if (errorMsg.includes('Invalid login credentials')) errorMsg = 'Неверный email или пароль';
            if (errorMsg.includes('already registered')) errorMsg = 'Пользователь с таким email уже существует';
            if (errorMsg.includes('Password should be at least')) errorMsg = 'Пароль должен быть не менее 6 символов';
            
            if (typeof window.showToast === 'function') window.showToast(errorMsg, 'error');
            else alert("Ошибка: " + errorMsg);
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
