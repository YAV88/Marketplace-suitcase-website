import { supabase } from '../config.js';

export const AuthModule = {
    checkUserSession: async () => {
        try {
            // Запрашиваем текущую сессию
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            
            // Обрабатываем статус
            await AuthModule.handleAuthChange(session);

            // Вешаем слушателя на будущие изменения (вход/выход)
            supabase.auth.onAuthStateChange((event, session) => {
                AuthModule.handleAuthChange(session);
            });
        } catch (err) {
            console.error("Ошибка при проверке сессии:", err);
        }
    },

    handleAuthChange: async (session) => {
        const btnLogin = document.getElementById('btn-login');
        const userMenu = document.getElementById('user-menu');
        const mobileBtnLogin = document.getElementById('mobile-btn-login');
        const mobileUserMenu = document.getElementById('mobile-user-menu');

        if (session) {
            window.currentUser = session.user;
            
            // 1. Получаем расширенные данные профиля из БД
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
            if (profile) {
                window.currentUser = { ...window.currentUser, ...profile };
            }

            // 2. Обновляем аватарки по всему сайту
            const avatarUrl = window.currentUser.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + session.user.id;
            document.querySelectorAll('.user-avatar').forEach(img => img.src = avatarUrl);

            // 3. Меняем кнопки "Войти" на меню профиля
            if (btnLogin) btnLogin.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            if (mobileBtnLogin) mobileBtnLogin.classList.add('hidden');
            if (mobileUserMenu) mobileUserMenu.classList.remove('hidden');

            // 4. Подгружаем избранные товары (лайки)
            const { data: favs } = await supabase
                .from('favorites')
                .select('item_id')
                .eq('user_id', session.user.id);
                
            window.userFavorites = new Set(favs?.map(f => f.item_id) || []);

            // 5. Запускаем слушатель уведомлений (из модуля Chat)
            if (typeof window.initGlobalChatListener === 'function') {
                window.initGlobalChatListener();
            }

            // 6. Перерисовываем карточки, если они уже загружены, чтобы появились сердечки
            if (typeof window.fetchItems === 'function' && !window.isInitialLoad) {
                window.fetchItems(false);
            }

        } else {
            // Если сессии нет (пользователь не авторизован или вышел)
            window.currentUser = null;
            window.userFavorites = new Set();
            
            // Возвращаем кнопки "Войти"
            if (btnLogin) btnLogin.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
            if (mobileBtnLogin) mobileBtnLogin.classList.remove('hidden');
            if (mobileUserMenu) mobileUserMenu.classList.add('hidden');
            
            // Убиваем подписку на уведомления, чтобы не "слушать" чужие сообщения
            if (window.globalChatSubscription) {
                supabase.removeChannel(window.globalChatSubscription);
                window.globalChatSubscription = null;
            }
        }
    },

    submitAuth: async (event) => {
        if (event) event.preventDefault();
        
        // Определяем режим (Вход или Регистрация) по тексту заголовка окна
        const isRegister = !document.getElementById('auth-title').innerText.includes('Вход');
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        const btn = document.getElementById('btn-submit-auth');
        const originalText = btn.innerHTML;
        
        try {
            // Анимация загрузки на кнопке
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Загрузка...';
            btn.disabled = true;

            if (isRegister) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                if (typeof window.showToast === 'function') window.showToast('Успешная регистрация! Проверьте почту.', 'success');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                if (typeof window.showToast === 'function') window.showToast('С возвращением!', 'success');
            }
            
            // Закрываем модальное окно авторизации
            if (typeof window.closeModal === 'function') window.closeModal('auth-modal');
            
        } catch (err) {
            let errorMsg = err.message;
            if (errorMsg.includes('Invalid login credentials')) errorMsg = 'Неверный email или пароль';
            if (typeof window.showToast === 'function') window.showToast(errorMsg, 'error');
        } finally {
            // Возвращаем кнопку в исходное состояние
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    },

    logout: async () => {
        try {
            await supabase.auth.signOut();
            window.location.reload(); // Перезагружаем страницу для полной и надежной очистки состояния
        } catch (err) {
            console.error("Ошибка при выходе:", err);
        }
    }
};
