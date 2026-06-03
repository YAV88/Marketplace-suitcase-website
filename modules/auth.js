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
        } catch (err) { console.error("Ошибка при проверке сессии:", err); }
    },

    handleAuthChange: async (session) => {
        const btnLogin = document.getElementById('btn-login');
        const userMenu = document.getElementById('user-menu');
        const mobileBtnLogin = document.getElementById('mobile-btn-login');
        const mobileUserMenu = document.getElementById('mobile-user-menu');

        if (session) {
            window.currentUser = session.user;
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
            if (profile) window.currentUser = { ...window.currentUser, ...profile };

            const avatarUrl = window.currentUser.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + session.user.id;
            document.querySelectorAll('.user-avatar').forEach(img => img.src = avatarUrl);

            if (btnLogin) btnLogin.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            if (mobileBtnLogin) mobileBtnLogin.classList.add('hidden');
            if (mobileUserMenu) mobileUserMenu.classList.remove('hidden');

            const { data: favs } = await supabase.from('favorites').select('item_id').eq('user_id', session.user.id);
            window.userFavorites = new Set(favs?.map(f => f.item_id) || []);

            if (typeof window.initGlobalChatListener === 'function') window.initGlobalChatListener();
            if (typeof window.fetchItems === 'function' && !window.isInitialLoad) window.fetchItems(false);

        } else {
            window.currentUser = null;
            window.userFavorites = new Set();
            if (btnLogin) btnLogin.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
            if (mobileBtnLogin) mobileBtnLogin.classList.remove('hidden');
            if (mobileUserMenu) mobileUserMenu.classList.add('hidden');
            
            if (window.globalChatSubscription) {
                supabase.removeChannel(window.globalChatSubscription);
                window.globalChatSubscription = null;
            }
        }
    },

    submitAuth: async (event) => {
        if (event) event.preventDefault();
        
        // 1. Надежное определение режима через глобальную переменную
        const isRegister = window.authMode === 'register';

        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        
        // 2. ИСПРАВЛЕНО: Правильный ID кнопки из HTML
        const btn = document.getElementById('auth-submit-btn');
        const originalText = btn ? btn.innerHTML : 'Отправить';
        
        try {
            if (btn) {
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Загрузка...';
                btn.disabled = true;
            }

            if (isRegister) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                if (typeof window.showToast === 'function') window.showToast('Успешная регистрация! Проверьте почту.', 'success');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                if (typeof window.showToast === 'function') window.showToast('С возвращением!', 'success');
            }
            if (typeof window.closeModal === 'function') window.closeModal('auth-modal');
        } catch (err) {
            let errorMsg = err.message;
            if (errorMsg.includes('Invalid login credentials')) errorMsg = 'Неверный email или пароль';
            if (typeof window.showToast === 'function') window.showToast(errorMsg, 'error');
        } finally {
            if (btn) {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }
    },

    logout: async () => {
        try {
            await supabase.auth.signOut();
            window.location.reload();
        } catch (err) { console.error("Ошибка при выходе:", err); }
    }
};
