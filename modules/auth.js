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
                const avatarUrl = window.currentUser?.avatar_url || meta.avatar_url || `https://api.dicebear.com/9.x/bottts/svg?seed=${session.user.id}`;
                document.querySelectorAll('.user-avatar').forEach(img => img.src = avatarUrl);
                
                const profileAvatarCont = document.getElementById('profile-avatar-container');
                if (profileAvatarCont) {
                    profileAvatarCont.innerHTML = `<img src="${avatarUrl}" class="w-full h-full object-cover">`;
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

        const email = emailEl.value.trim();
        const password = passwordEl.value;
        const originalText = btn.innerHTML;

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
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Загрузка...';
            btn.disabled = true;

            if (isRegister) {
                const { error } = await supabase.auth.signUp({ 
                    email, 
                    password,
                    // Сохраняем имя и аватар жестко в мету аккаунта
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
