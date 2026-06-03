import { supabase } from '../config.js';

export const ChatModule = {
    openChat: async (chatId, title, itemId, itemImage, recipientId) => {
        if (!window.currentUser) {
            if (typeof window.showToast === 'function') window.showToast('Войдите, чтобы писать сообщения', 'error');
            return;
        }

        window.currentChatId = chatId;
        document.getElementById('chat-title').innerText = title || 'Чат';
        const imgEl = document.getElementById('chat-item-image');
        if (imgEl) {
            imgEl.src = itemImage || 'https://via.placeholder.com/150';
            imgEl.classList.remove('hidden');
        }
        
        window.currentChatRecipientId = recipientId;
        window.currentChatItemId = itemId;

        const modal = document.getElementById('chat-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; 
        }

        await ChatModule.loadMessages(chatId);
        await ChatModule.subscribeToMessages();
    },

    loadMessages: async (chatId) => {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        container.innerHTML = '<div class="text-center text-stone-400 mt-4"><i class="fa-solid fa-spinner fa-spin text-2xl"></i></div>';

        try {
            const { data: messages, error } = await supabase.from('messages').select('*').eq('chat_id', chatId).order('created_at', { ascending: true });
            if (error) throw error;

            container.innerHTML = '';
            
            if (!messages || messages.length === 0) {
                container.innerHTML = `<div class="text-center text-stone-400 dark:text-stone-500 mt-10 text-sm font-medium"><i class="fa-regular fa-comments text-3xl mb-2 opacity-50 block"></i>Напишите первое сообщение...</div>`;
                return;
            }

            messages.forEach(msg => {
                const isMine = msg.sender_id === window.currentUser.id;
                const alignClass = isMine ? 'justify-end' : 'justify-start';
                const bubbleClass = isMine ? 'bg-brand-500 text-white rounded-br-none' : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none';

                container.insertAdjacentHTML('beforeend', `<div class="flex ${alignClass} w-full mt-2"><div class="max-w-[85%] p-3 rounded-2xl shadow-sm text-base font-medium break-words ${bubbleClass}">${msg.text}</div></div>`);
            });

            container.scrollTop = container.scrollHeight;

            const unreadIds = messages.filter(m => !m.is_read && m.sender_id !== window.currentUser.id).map(m => m.id);
            if (unreadIds.length > 0) {
                await supabase.from('messages').update({ is_read: true }).in('id', unreadIds);
                ChatModule.updateChatBadges();
            }
        } catch (err) {
            container.innerHTML = '<div class="text-center text-red-500 mt-4">Не удалось загрузить чат</div>';
        }
    },

    sendMessage: async (event) => {
        if (event) event.preventDefault();
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text || !window.currentChatId || !window.currentUser) return;

        input.value = ''; 
        const container = document.getElementById('chat-messages');
        if (container && container.innerHTML.includes('Напишите первое')) container.innerHTML = '';

        container.insertAdjacentHTML('beforeend', `<div class="flex justify-end w-full mt-2 opacity-70 transition-opacity" id="temp-msg-${Date.now()}"><div class="max-w-[85%] p-3 rounded-2xl rounded-br-none shadow-sm text-base font-medium break-words bg-brand-500 text-white">${text}</div></div>`);
        container.scrollTop = container.scrollHeight;

        try {
            const { error } = await supabase.from('messages').insert([{
                chat_id: window.currentChatId, sender_id: window.currentUser.id, recipient_id: window.currentChatRecipientId, item_id: window.currentChatItemId, text: text, is_read: false
            }]);
            if (error) throw error;
            const tempMsg = container.lastElementChild;
            if (tempMsg) tempMsg.classList.remove('opacity-70');
        } catch (err) {}
    },

    subscribeToMessages: async () => {
        if (window.chatSubscription) {
            await supabase.removeChannel(window.chatSubscription);
            window.chatSubscription = null;
        }

        const roomName = 'chat_room_' + window.currentChatId + '_' + Date.now();
        window.chatSubscription = supabase.channel(roomName)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${window.currentChatId}` }, payload => {
                const newMsg = payload.new;
                if (newMsg.sender_id !== window.currentUser?.id) {
                    const container = document.getElementById('chat-messages');
                    if (container) {
                        if (container.innerHTML.includes('Напишите первое')) container.innerHTML = '';
                        container.insertAdjacentHTML('beforeend', `<div class="flex justify-start w-full mt-2"><div class="max-w-[85%] p-3 rounded-2xl rounded-bl-none shadow-sm text-base font-medium break-words bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">${newMsg.text}</div></div>`);
                        container.scrollTop = container.scrollHeight;
                    }
                    supabase.from('messages').update({ is_read: true }).eq('id', newMsg.id).then(() => ChatModule.updateChatBadges());
                }
            }).subscribe();
    },

    initGlobalChatListener: async () => {
        if (window.globalChatSubscription) {
            await supabase.removeChannel(window.globalChatSubscription);
            window.globalChatSubscription = null;
        }

        if (!window.currentUser) return;

        const channelName = 'global_chats_' + window.currentUser.id;
        if ("Notification" in window) {
            if (Notification.permission !== "granted" && Notification.permission !== "denied") {
                Notification.requestPermission();
            }
        }
        
        window.globalChatSubscription = supabase.channel(channelName)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                const newMsg = payload.new;
                if (newMsg.sender_id !== window.currentUser.id && newMsg.recipient_id === window.currentUser.id) {
                    if (window.currentChatId !== newMsg.chat_id) {
                        ChatModule.updateChatBadges(); 
                        if (Notification.permission === "granted") {
                            new Notification("Новое сообщение на SVALKA", { body: newMsg.text, icon: "/favicon.ico" });
                        }
                    }
                }
            }).subscribe();
    },

    updateChatBadges: async () => {
        if (!window.currentUser) return;
        try {
            const { data, error } = await supabase.from('messages').select('id').eq('recipient_id', window.currentUser.id).eq('is_read', false);
            if (error) throw error;
            const hasUnread = data && data.length > 0;
            document.querySelectorAll('.chat-badge').forEach(badge => {
                if (hasUnread) badge.classList.remove('hidden'); else badge.classList.add('hidden');
            });
        } catch (err) {}
    }
};
