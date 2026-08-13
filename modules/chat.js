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

        // Вызываем централизованный менеджер модалок (он сам всё заблокирует)
        if (typeof window.openModal === 'function') {
            window.openModal('chat-modal');
        } else {
            const modal = document.getElementById('chat-modal');
            if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
        }

        await ChatModule.loadMessages(chatId);
        await ChatModule.subscribeToMessages();
    },

    loadMessages: async (chatId) => {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        container.innerHTML = '<div class="flex justify-center mt-10"><i class="fa-solid fa-circle-notch fa-spin text-3xl text-brand-500"></i></div>';

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
                
                // Форматируем время в ЧЧ:ММ
                const dateObj = new Date(msg.created_at);
                const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                // СЕНЬОР-ФИКС: Премиальный дизайн баблов
                const msgWrapper = document.createElement('div');
                msgWrapper.className = `flex flex-col w-full mt-2 ${isMine ? 'items-end' : 'items-start'}`;
                
                const bubbleDiv = document.createElement('div');
                bubbleDiv.className = isMine 
                    ? 'bg-brand-500 text-white px-4 py-2.5 rounded-2xl rounded-br-[4px] shadow-sm text-[15px] font-medium max-w-[85%] break-words leading-relaxed' 
                    : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white px-4 py-2.5 rounded-2xl rounded-bl-[4px] shadow-sm border border-stone-200 dark:border-stone-700 text-[15px] font-medium max-w-[85%] break-words leading-relaxed';
                bubbleDiv.style.whiteSpace = 'pre-line'; 
                bubbleDiv.textContent = msg.text; 

                const timeDiv = document.createElement('div');
                timeDiv.className = `text-[10px] text-stone-400 font-bold mt-1 flex items-center gap-1 ${isMine ? 'mr-1' : 'ml-1'}`;
                
                // Добавляем иконки статуса прочтения только для своих сообщений
                if (isMine) {
                    const statusIcon = msg.is_read 
                        ? '<i class="fa-solid fa-check-double text-brand-500"></i>' 
                        : '<i class="fa-solid fa-check text-stone-400"></i>';
                    timeDiv.innerHTML = `${timeString} ${statusIcon}`;
                } else {
                    timeDiv.innerHTML = timeString;
                }

                msgWrapper.appendChild(bubbleDiv);
                msgWrapper.appendChild(timeDiv);
                container.appendChild(msgWrapper);
            });

            // Плавный скролл вниз
            setTimeout(() => {
                container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
            }, 100);

            const unreadIds = messages.filter(m => !m.is_read && m.sender_id !== window.currentUser.id).map(m => m.id);
            if (unreadIds.length > 0) {
                await supabase.from('messages').update({ is_read: true }).in('id', unreadIds);
                if (typeof window.updateChatBadges === 'function') window.updateChatBadges();
            }
        } catch (err) {
            container.innerHTML = '<div class="text-center text-red-500 mt-4">Не удалось загрузить историю сообщений</div>';
        }
    },

    sendMessage: async (event) => {
        if (event) event.preventDefault();
        const input = document.getElementById('chat-input-field'); // Обновил ID инпута
        if (!input) return;
        const text = input.value.trim();
        if (!text || !window.currentChatId || !window.currentUser) return;

        input.value = ''; 
        input.style.height = ''; // Сбрасываем высоту textarea

        const container = document.getElementById('chat-messages');
        if (container && container.innerHTML.includes('Напишите первое')) container.innerHTML = '';

        // 🛡️ БРОНЕБОЙНАЯ ВСТАВКА ВРЕМЕННОГО СООБЩЕНИЯ (НОВЫЙ ДИЗАЙН)
        const tempMsgId = `temp-msg-${Date.now()}`;
        const msgWrapper = document.createElement('div');
        msgWrapper.className = 'flex flex-col items-end w-full mt-2 opacity-60 transition-all duration-300 transform translate-y-2';
        msgWrapper.id = tempMsgId;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'bg-brand-500 text-white px-4 py-2.5 rounded-2xl rounded-br-[4px] shadow-sm text-[15px] font-medium max-w-[85%] break-words leading-relaxed';
        bubbleDiv.style.whiteSpace = 'pre-line';
        bubbleDiv.textContent = text; 
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'text-[10px] text-stone-400 font-bold mt-1 mr-1 flex items-center gap-1';
        timeDiv.innerHTML = 'Отправка... <i class="fa-regular fa-clock"></i>';

        msgWrapper.appendChild(bubbleDiv);
        msgWrapper.appendChild(timeDiv);
        container.appendChild(msgWrapper);
        
        requestAnimationFrame(() => {
            msgWrapper.classList.remove('translate-y-2');
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        });

        try {
            // Убрал item_id и recipient_id, так как в новом чате мы передаем только chat_id
            const { error } = await supabase.from('messages').insert([{
                chat_id: window.currentChatId, sender_id: window.currentUser.id, text: text
            }]);
            if (error) throw error;
            const tempMsg = document.getElementById(tempMsgId);
            if (tempMsg) { 
                tempMsg.classList.remove('opacity-60');
                tempMsg.removeAttribute('id');
                // Подставляем текущее время после успешной отправки
                const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeDiv.innerHTML = `${timeString} <i class="fa-solid fa-check text-stone-400"></i>`;
            }
        } catch (err) {
            window.showToast("Ошибка отправки", true);
        }
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
                        
                        const timeString = new Date(newMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        
                        // 🛡️ БРОНЕБОЙНАЯ ВСТАВКА ВХОДЯЩЕГО СООБЩЕНИЯ (НОВЫЙ ДИЗАЙН)
                        const msgWrapper = document.createElement('div');
                        msgWrapper.className = 'flex flex-col items-start w-full mt-2 transition-all duration-300 transform translate-y-2';
                        
                        const bubbleDiv = document.createElement('div');
                        bubbleDiv.className = 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white px-4 py-2.5 rounded-2xl rounded-bl-[4px] shadow-sm border border-stone-200 dark:border-stone-700 text-[15px] font-medium max-w-[85%] break-words leading-relaxed';
                        bubbleDiv.style.whiteSpace = 'pre-line';
                        bubbleDiv.textContent = newMsg.text;

                        const timeDiv = document.createElement('div');
                        timeDiv.className = 'text-[10px] text-stone-400 font-bold mt-1 ml-1';
                        timeDiv.innerHTML = timeString;

                        msgWrapper.appendChild(bubbleDiv);
                        msgWrapper.appendChild(timeDiv);
                        container.appendChild(msgWrapper);

                        requestAnimationFrame(() => {
                            msgWrapper.classList.remove('translate-y-2');
                            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
                        });
                    }
                    supabase.from('messages').update({ is_read: true }).eq('id', newMsg.id).then(() => {
                        if (typeof window.updateChatBadges === 'function') window.updateChatBadges();
                    });
                }
            }).subscribe();
    },

    initGlobalChatListener: async () => {
        if (window.globalChatSubscription) {
            await supabase.removeChannel(window.globalChatSubscription);
            window.globalChatSubscription = null;
        }

        if (!window.currentUser) return;

        if ("Notification" in window) {
            if (Notification.permission !== "granted" && Notification.permission !== "denied") {
                Notification.requestPermission();
            }
        }

        const channelName = 'global_chats_' + window.currentUser.id;
        
        window.globalChatSubscription = supabase.channel(channelName)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                const newMsg = payload.new;
                
                // === ИСПРАВЛЕНИЕ: МАКСИМАЛЬНО ПРОСТАЯ ПРОВЕРКА ===
                // Если сообщение отправили НЕ мы, значит оно нам. Обновляем счетчики.
                if (newMsg.sender_id !== window.currentUser.id) {
                    
                    if (typeof window.updateChatBadges === 'function') {
                        window.updateChatBadges(); 
                    }
                    
                    if (window.currentChatId !== newMsg.chat_id) {
                        if (Notification.permission === "granted") {
                            new Notification("Новое сообщение на SVALKA", { body: newMsg.text || "Вам прислали сообщение", icon: "/favicon.ico" });
                        }
                    }
                }
            }).subscribe();
    }
};