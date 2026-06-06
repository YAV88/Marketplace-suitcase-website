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

            if (session) {
                window.currentUser = session.user;
                
                try {
                    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                    if (profile) window.currentUser = { ...window.currentUser, ...profile };
                } catch(e) { console.warn("Профиль не заполнен, используем базовые данные"); }

                const avatarUrl = window.currentUser?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + session.user.id;
                document.querySelectorAll('.user-avatar').forEach(img => img.src = avatarUrl);

                const safeSet = (id, val, isInput = false) => {
                    const el = document.getElementById(id);
                    if (el) { isInput ? el.value = val : el.innerText = val; }
                };
                
                safeSet('profile-name', window.currentUser.name || window.currentUser.full_name || 'Свалкер');
                safeSet('header-user-name', window.currentUser.name || window.currentUser.full_name || 'Профиль');
                safeSet('profile-email', window.currentUser.email || '');
                safeSet('profile-phone', window.currentUser.phone || '', true);
                safeSet('profile-city', window.currentUser.city || '', true);

                // === АБСОЛЮТНОЕ УДАЛЕНИЕ КНОПКИ "ВОЙТИ" (Обход Tailwind) ===
                loginIds.forEach(id => { 
                    const el = document.getElementById(id); 
                    if (el) { 
                        el.classList.add('hidden'); 
                        el.classList.remove('flex', 'lg:flex', 'md:flex', 'block'); 
                        el.style.display = 'none'; 
                    } 
                });
                menuIds.forEach(id => { 
                    const el = document.getElementById(id); 
                    if (el) { 
                        el.classList.remove('hidden'); 
                        el.classList.add('flex', 'lg:flex'); 
                        el.style.display = 'flex'; 
                    } 
                });

                try {
                    const { data: favs } = await supabase.from('favorites').select('item_id').eq('user_id', session.user.id);
                    window.userFavorites = new Set(favs?.map(f => f.item_id) || []);
                } catch(e) {}

                // === ИСПРАВЛЕНИЕ: ЗАПУСК РЕНДЕРА ТОВАРОВ И БЕЙДЖЕЙ ===
                if (typeof window.renderProfileTabs === 'function') window.renderProfileTabs();
                if (typeof window.updateChatBadges === 'function') window.updateChatBadges();
                if (typeof window.initGlobalChatListener === 'function') window.initGlobalChatListener();
                if (typeof window.fetchItems === 'function' && !window.isInitialLoad) window.fetchItems(false);

            } else {
                window.currentUser = null;
                window.userFavorites = new Set();
                
                loginIds.forEach(id => { 
                    const el = document.getElementById(id); 
                    if (el) { 
                        el.classList.remove('hidden'); 
                        el.classList.add('lg:flex'); 
                        el.style.display = ''; 
                    } 
                });
                menuIds.forEach(id => { 
                    const el = document.getElementById(id); 
                    if (el) { 
                        el.classList.add('hidden'); 
                        el.classList.remove('flex', 'lg:flex'); 
                        el.style.display = 'none'; 
                    } 
                });
                
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
        const btn = document.getElementById('auth-submit-btn');

        if (!emailEl || !passwordEl || !btn) return;

        const email = emailEl.value;
        const password = passwordEl.value;
        const originalText = btn.innerHTML;
        
        try {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Загрузка...';
            btn.disabled = true;

            if (isRegister) {
                const { error } = await supabase.auth.signUp({ email, password });
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
