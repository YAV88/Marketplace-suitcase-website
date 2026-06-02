// modules/chat.js
import { supabase } from '../config.js';

export const ChatModule = {
    // 1. ОТКРЫТИЕ ОКНА ЧАТА
    openChat: async (chatId, title, itemId, itemImage, recipientId) => {
        if (!window.currentUser) {
            if (typeof window.showToast === 'function') window.showToast('Войдите, чтобы писать сообщения', 'error');
            return;
        }

        window.currentChatId = chatId;
        
        // Заполняем шапку чата
        document.getElementById('chat-title').innerText = title || 'Чат';
        const imgEl = document.getElementById('chat-item-image');
        if (imgEl) {
            imgEl.src = itemImage || 'https://via.placeholder.com/150';
            imgEl.classList.remove('hidden');
        }
        
        // Сохраняем ID собеседника для отправки новых сообщений
        window.currentChatRecipientId = recipientId;
        window.currentChatItemId = itemId;

        // Показываем окно
        const modal = document.getElementById('chat-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Блокируем скролл фона
        }

        // Загружаем историю и подписываемся на новые
        await ChatModule.loadMessages(chatId);
        await ChatModule.subscribeToMessages();
    },

    // 2. ЗАГРУЗКА ИСТОРИИ СООБЩЕНИЙ
    loadMessages: async (chatId) => {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        
        container.innerHTML = '<div class="text-center text-stone-400 mt-4"><i class="fa-solid fa-spinner fa-spin text-2xl"></i></div>';

        try {
            const { data: messages, error } = await supabase
                .from('messages')
                .select('*')
                .eq('chat_id', chatId)
                .order('created_at', { ascending: true });

            if (error) throw error;

            container.innerHTML = '';
            
            if (!messages || messages.length === 0) {
                container.innerHTML = `<div class="text-center text-stone-400 dark:text-stone-500 mt-10 text-sm font-medium"><i class="fa-regular fa-comments text-3xl mb-2 opacity-50 block"></i>Напишите первое сообщение...</div>`;
                return;
            }

            // Рендерим сообщения
            messages.forEach(msg => {
                const isMine = msg.sender_id === window.currentUser.id;
                const alignClass = isMine ? 'justify-end' : 'justify-start';
                const bubbleClass = isMine 
                    ? 'bg-brand-500 text-white rounded-br-none' 
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none';

                container.insertAdjacentHTML('beforeend', `
                    <div class="flex ${alignClass} w-full mt-2">
                        <div class="max-w-[85%] p-3 rounded-2xl shadow-sm text-base font-medium break-words ${bubbleClass}">
                            ${msg.text}
                        </div>
                    </div>
                `);
            });

            // Прокручиваем вниз к последнему сообщению
            container.scrollTop = container.scrollHeight;

            // Отмечаем чужие сообщения как прочитанные
            const unreadIds = messages.filter(m => !m.is_read && m.sender_id !== window.currentUser.id).map(m => m.id);
            if (unreadIds.length > 0) {
                await supabase.from('messages').update({ is_read: true }).in('id', unreadIds);
                ChatModule.updateChatBadges();
            }

        } catch (err) {
            console.error("Ошибка загрузки сообщений:", err);
            container.innerHTML = '<div class="text-center text-red-500 mt-4">Не удалось загрузить чат</div>';
        }
    },

    // 3. ОТПРАВКА НОВОГО СООБЩЕНИЯ
    sendMessage: async (event) => {
        if (event) event.preventDefault();
        
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text || !window.currentChatId || !window.currentUser) return;

        input.value = ''; // Очищаем поле мгновенно для UX
        
        const container = document.getElementById('chat-messages');
        if (container && container.innerHTML.includes('Напишите первое')) container.innerHTML = '';

        // Оптимистичный UI (Сразу показываем сообщение пользователю)
        container.insertAdjacentHTML('beforeend', `
            <div class="flex justify-end w-full mt-2 opacity-70 transition-opacity" id="temp-msg-${Date.now()}">
                <div class="max-w-[85%] p-3 rounded-2xl rounded-br-none shadow-sm text-base font-medium break-words bg-brand-500 text-white">
                    ${text}
                </div>
            </div>
        `);
        container.scrollTop = container.scrollHeight;

        try {
            const { error } = await supabase.from('messages').insert([{
                chat_id: window.currentChatId,
                sender_id: window.currentUser.id,
                recipient_id: window.currentChatRecipientId,
                item_id: window.currentChatItemId,
                text: text,
                is_read: false
            }]);

            if (error) throw error;
            
            // Убираем полупрозрачность (успешно отправлено)
            const tempMsg = container.lastElementChild;
            if (tempMsg) tempMsg.classList.remove('opacity-70');

        } catch (err) {
            console.error("Ошибка отправки:", err);
            if (typeof window.showToast === 'function') window.showToast('Ошибка при отправке сообщения', 'error');
        }
    },

    // 4. БЕЗОПАСНАЯ ПОДПИСКА НА ОТКРЫТЫЙ ЧАТ (Без утечек)
    subscribeToMessages: async () => {
        // Жестко убиваем старый сокет перед созданием нового
        if (window.chatSubscription) {
            await supabase.removeChannel(window.chatSubscription);
            window.chatSubscription = null;
        }

        const roomName = 'chat_room_' + window.currentChatId + '_' + Date.now();
        window.chatSubscription = supabase.channel(roomName)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${window.currentChatId}` }, payload => {
                const newMsg = payload.new;
                
                // Рисуем только чужие сообщения (свои рисуются оптимистично)
                if (newMsg.sender_id !== window.currentUser?.id) {
                    const container = document.getElementById('chat-messages');
                    if (container) {
                        if (container.innerHTML.includes('Напишите первое')) container.innerHTML = '';
                        container.insertAdjacentHTML('beforeend', `
                            <div class="flex justify-start w-full mt-2">
                                <div class="max-w-[85%] p-3 rounded-2xl rounded-bl-none shadow-sm text-base font-medium break-words bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                                    ${newMsg.text}
                                </div>
                            </div>
                        `);
                        container.scrollTop = container.scrollHeight;
                    }

                    // Сразу помечаем прочитанным
                    supabase.from('messages').update({ is_read: true }).eq('id', newMsg.id).then(() => ChatModule.updateChatBadges());
                }
            }).subscribe();
    },

    // 5. ГЛОБАЛЬНЫЙ СЛУШАТЕЛЬ УВЕДОМЛЕНИЙ (Звоночек)
    initGlobalChatListener: async () => {
        // Очищаем старый глобальный слушатель
        if (window.globalChatSubscription) {
            await supabase.removeChannel(window.globalChatSubscription);
            window.globalChatSubscription = null;
        }

        if (!window.currentUser) return;

        const channelName = 'global_chats_' + window.currentUser.id;
        
        // Запрашиваем права на уведомления (на ПК)
        if ("Notification" in window) {
            if (Notification.permission !== "granted" && Notification.permission !== "denied") {
                Notification.requestPermission();
            }
        }
        
        window.globalChatSubscription = supabase.channel(channelName)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                const newMsg = payload.new;
                
                // Если сообщение адресовано нам, и мы не в этом чате прямо сейчас
                if (newMsg.sender_id !== window.currentUser.id && newMsg.recipient_id === window.currentUser.id) {
                    if (window.currentChatId !== newMsg.chat_id) {
                        ChatModule
