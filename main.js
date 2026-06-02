// main.js
import { supabase } from './config.js';
import { AuthModule } from './modules/auth.js';
import { ItemsModule } from './modules/items.js';
import { ChatModule } from './modules/chat.js';

// Делаем supabase доступным глобально, если где-то есть прямые вызовы
window.supabase = supabase;

// 1. Привязываем модули целиком (как ты и задумывал)
window.Auth = AuthModule;
window.Chat = ChatModule;
window.Items = ItemsModule;

// 2. Делаем проброс (Alias) для совместимости со старым HTML!
// Это спасет от необходимости менять onclick="submitAuth(event)" в верстке
window.submitAuth = AuthModule.submitAuth;
window.logout = AuthModule.logout;
window.fetchItems = ItemsModule.fetchItems;
window.openItemDetails = ItemsModule.openItemDetails;
window.filterByCategory = ItemsModule.filterByCategory;
window.sendMessage = ChatModule.sendMessage;
window.openChat = ChatModule.openChat;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.isInitialLoad = true;
    
    // Запускаем проверку сессии из модуля Auth
    AuthModule.checkUserSession();
    
    // Подтягиваем товары
    ItemsModule.fetchItems();
    
    setTimeout(() => { window.isInitialLoad = false; }, 1000);
});
