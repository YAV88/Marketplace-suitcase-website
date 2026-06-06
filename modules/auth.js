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
            // ОМНИ-СЕЛЕКТОРЫ: Захватываем все известные ID из разных версий верстки
            const loginIds = ['btn-login', 'nav-login-btn', 'mobile-btn-login', 'mob-nav-login', 'header-login-btn'];
            const menuIds = ['user-menu', 'nav-user-controls', 'mobile-user-menu', 'mob-user-controls', 'header-user-menu'];

            if (session) {
                window.currentUser = session.user;
                
                // Безопасное извлечение профиля (не крашит скрипт при отсутствии записи)
                try {
                    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                    if (profile) window.currentUser = { ...window.currentUser, ...profile };
                } catch(e) { console.warn("Профиль не заполнен, используем базовые данные"); }

                const avatarUrl = window.currentUser?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + session.user.id;
                document.querySelectorAll('.user-avatar').forEach(img => img.src = avatarUrl);

                // Безопасный инжект текста
                const safeSet = (id, val, isInput = false) => {
                    const el = document.getElementById(id);
                    if (el) { isInput ? el.value = val : el.innerText = val; }
                };
                
                safeSet('profile-name', window.currentUser.name || window.currentUser.full_name || 'Свалкер');
                safeSet('header-user-name', window.currentUser.name || window.currentUser.full_name || 'Профиль');
                safeSet('profile-email', window.currentUser.email || '');
                safeSet('profile-phone', window.currentUser.phone || '', true);
                safeSet('profile-city', window.currentUser.city || '', true);

                // ЖЕСТКИЙ ПЕРЕХВАТ ИНТЕРФЕЙСА (Игнорирует конфликты Tailwind)
                loginIds.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
                menuIds.forEach(id => { const el = document.getElementById(id); if (el) { el.style.display = 'flex'; el.classList.remove('hidden'); } });

                try {
                    const { data: favs } = await supabase.from('favorites').select('item_id').eq('user_id', session.user.id);
                    window.userFavorites = new Set(favs?.map(f => f.item_id) || []);
                } catch(e) {}

                if (typeof window.initGlobalChatListener === 'function') window.initGlobalChatListener();
                if (typeof window.fetchItems === 'function' && !window.isInitialLoad) window.fetchItems(false);

            } else {
                window.currentUser = null;
                window.userFavorites = new Set();
                
                // Возврат интерфейса в стартовое состояние
                loginIds.forEach(id => { const el = document.getElementById(id); if (el) { el.style.display = ''; el.classList.remove('hidden'); } });
                menuIds.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
                
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
                else alert('Успешная регистрация! Проверьте почту.');
                
                // === ВОТ ЭТА НОВАЯ СТРОКА ===
                // Перезагружаем страницу через 1.5 секунды
                setTimeout(() => window.location.reload(), 1500); 

            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                
                if (typeof window.showToast === 'function') window.showToast('С возвращением!', 'success');
                else alert('С возвращением!');
                
                // === ВОТ ЭТА НОВАЯ СТРОКА ===
                // Перезагружаем страницу через 1 секунду
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
