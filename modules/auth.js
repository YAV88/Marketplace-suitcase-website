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

            // ==========================================
            // ИСПРАВЛЕНИЕ: ОБНОВЛЯЕМ ДАННЫЕ В HTML ПРОФИЛЯ
            // ==========================================
            const profileName = document.getElementById('profile-name');
            const profileEmail = document.getElementById('profile-email');
            const profilePhone = document.getElementById('profile-phone');
            const profileCity = document.getElementById('profile-city');
            const headerUserName = document.getElementById('header-user-name'); // Если есть имя в шапке
            
            if (profileName) profileName.innerText = window.currentUser.name || window.currentUser.full_name || 'Пользователь';
            if (profileEmail) profileEmail.innerText = window.currentUser.email || '';
            if (profilePhone) profilePhone.value = window.currentUser.phone || ''; // Если это инпут
            if (profilePhone && profilePhone.tagName !== 'INPUT') profilePhone.innerText = window.currentUser.phone || 'Не указан';
            if (profileCity) profileCity.value = window.currentUser.city || '';
            if (headerUserName) headerUserName.innerText = window.currentUser.name || window.currentUser.full_name || 'Профиль';
            
            // Если у тебя в main.js осталась старая функция рендера профиля, вызываем её:
            if (typeof window.renderUserProfile === 'function') {
                window.renderUserProfile();
            }
            // ==========================================

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
        
        // Задаем дефолтный режим 'login', если пользователь не переключал вкладки
        const mode = window.authMode || 'login';
        const isRegister = mode === 'register';

        const emailEl = document.getElementById('auth-email');
        const passwordEl = document.getElementById('auth-password');
        const btn = document.getElementById('auth-submit-btn');

        if (!emailEl || !passwordEl || !btn) {
            console.error("Ошибка DOM: Элементы формы не найдены.");
            return;
        }

        const email = emailEl.value;
        const password = passwordEl.value;
        const originalText = btn.innerHTML;
        
        try {
            // Визуальный отклик кнопки
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Загрузка...';
            btn.disabled = true;

            if (isRegister) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                
                if (typeof window.showToast === 'function') window.showToast('Успешная регистрация! Проверьте почту.', 'success');
                else alert('Успешная регистрация! Проверьте почту.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                
                if (typeof window.showToast === 'function') window.showToast('С возвращением!', 'success');
                else alert('С возвращением!');
            }
            
            if (typeof window.closeModal === 'function') window.closeModal('auth-modal');
        } catch (err) {
            console.error("Supabase Auth Error:", err);
            
            // Обработка частых ошибок
            let errorMsg = err.message;
            if (errorMsg.includes('Invalid login credentials')) errorMsg = 'Неверный email или пароль';
            if (errorMsg.includes('already registered')) errorMsg = 'Пользователь с таким email уже существует';
            if (errorMsg.includes('Password should be at least')) errorMsg = 'Пароль должен быть не менее 6 символов';
            
            // Надежный вывод ошибки
            if (typeof window.showToast === 'function') window.showToast(errorMsg, 'error');
            else alert("Ошибка: " + errorMsg);
        } finally {
            // Возврат кнопки в исходное состояние
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
