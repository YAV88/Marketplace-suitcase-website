// modules/chat.js
import { supabase } from '../config.js';

export const ChatModule = {
    openChat: async (chatId, title, itemId, itemImage, recipientId) => {
        // ...код из window.openChat
    },
    loadMessages: async (chatId) => {
        // ...код из window.loadMessages
    },
    sendMessage: async (event) => {
        // ...код из window.sendMessage
    },
    subscribeToMessages: async () => {
        // ...наш новый асинхронный код подписки (удаление старой перед новой)
    },
    initGlobalChatListener: async () => {
        // ...код из window.initGlobalChatListener
    }
};
