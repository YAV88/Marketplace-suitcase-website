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
            // Список ID элементов для управления
            const loginIds = ['btn-login', 'nav-login-btn', 'header-login-btn'];
            const menuIds = ['user-menu', 'nav-user-controls', 'header-user-menu'];

            if (session) {
                window.currentUser = session.user;
                // Загружаем профиль
                const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                if (profile) window.currentUser = { ...window.currentUser, ...profile };

                // Обновление интерфейса (Принудительное)
                const userName = window.currentUser.full_name || window.currentUser.name || 'Пользователь';
                const nameEl = document.getElementById('header-user-name');
                if (nameEl) nameEl.innerText = userName;

                // Убираем класс hidden и сбрасываем стиль
                loginIds.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.add('hidden'); el.style.display = 'none'; } });
                menuIds.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.remove('hidden'); el.style.display = 'flex'; } });

                // РЕНДЕР ПРОФИЛЯ
                if (typeof window.renderProfileTabs === 'function') window.renderProfileTabs();
                if (typeof window.fetchItems === 'function') window.fetchItems(false);
            } else {
                // Возврат к состоянию "Войти"
                loginIds.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.remove('hidden'); el.style.display = 'flex'; } });
                menuIds.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.add('hidden'); el.style.display = 'none'; } });
            }
        } catch (err) { console.error("Ошибка рендера:", err); }
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
