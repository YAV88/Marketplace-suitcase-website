import { supabaseUrl, supabaseKey, supabase } from './config.js';
import { AuthModule } from './modules/auth.js';
import { ChatModule } from './modules/chat.js';
import { ItemsModule } from './modules/items.js';
import { I18nModule } from './modules/i18n.js';        
import { MapModule } from './modules/map.js';          
import { PaymentsModule } from './modules/payments.js';

// ==========================================
// 1. STATE MANAGER (Единый источник истины)
// ==========================================
window.AppStore = {
    state: {
        currentCategory: 'Все',
        filterCities: [],
        searchQuery: '',
        showUrgentOnly: false,
        filterCondition: 'Все',
        filterPriceMin: '',
        filterPriceMax: '',
        filterCurrency: 'Все',
        currentSortMode: 'new',
        displayedCount: 12,
        loadedItems: [],
        currentUser: null,
        userFavorites: new Set()
    },
    
    // Безопасный доступ к данным
    get(key) { 
        return this.state[key]; 
    },
    
    // Безопасное изменение данных
    set(key, value) { 
        this.state[key] = value; 
    }
};

// ВРЕМЕННЫЙ МОСТ: связываем старый код с новым хранилищем без потери данных
['currentCategory', 'filterCities', 'searchQuery', 'showUrgentOnly', 'filterCondition', 
 'filterPriceMin', 'filterPriceMax', 'filterCurrency', 'currentSortMode', 'displayedCount', 
 'loadedItems', 'currentUser', 'userFavorites'].forEach(key => {
    Object.defineProperty(window, key, {
        get: () => window.AppStore.get(key),
        set: (val) => window.AppStore.set(key, val)
    });
});

// ==========================================
// ГЛОБАЛЬНЫЙ МОСТ: СВЯЗЬ МОДУЛЕЙ И ИНТЕРФЕЙСА
// ==========================================
window.supabase = supabase;

// Модуль Авторизации
window.submitAuth = AuthModule.submitAuth;
window.logout = AuthModule.logout;
window.checkUserSession = AuthModule.checkUserSession;
window.handleAuthChange = AuthModule.handleAuthChange;

window.loadMoreItems = ItemsModule.loadMoreItems;
window.bumpViaShare = ItemsModule.bumpViaShare;
window.editItem = ItemsModule.editItem;
window.deleteItemConfirm = ItemsModule.deleteItemConfirm; // или просто deleteItem, смотря как у вас в ItemsModule
window.toggleFavorite = ItemsModule.toggleFavorite;
window.fetchItems = ItemsModule.fetchItems;
window.openItemDetails = ItemsModule.openItemDetails;
window.filterByCategory = ItemsModule.filterByCategory;
window.createCardHtml = ItemsModule.createCardHtml; 

// Модуль Чатов (Без updateChatBadges крашатся уведомления!)
window.openChat = ChatModule.openChat;
window.sendMessage = ChatModule.sendMessage;
window.loadMessages = ChatModule.loadMessages;
window.subscribeToMessages = ChatModule.subscribeToMessages;
window.initGlobalChatListener = ChatModule.initGlobalChatListener;
window.updateChatBadges = ChatModule.updateChatBadges;

// Локализация
window.t = I18nModule.t.bind(I18nModule);
window.changeLanguage = I18nModule.changeLanguage.bind(I18nModule);
window.currentLang = I18nModule.currentLang;

// Карты
window.initAddMap = MapModule.initAddMap;
window.handleAddressInput = MapModule.handleAddressInput;
window.selectAddress = MapModule.selectAddress;
window.reverseGeocode = MapModule.reverseGeocode;

// Платежи
window.buyProSubscription = PaymentsModule.buyProSubscription;
window.payWithPlisio = PaymentsModule.payWithPlisio;
// ==========================================

// ---> ДОБАВЛЯЕМ НОВУЮ ФУНКЦИЮ:
window.initiateTokenPurchase = PaymentsModule.initiateTokenPurchase;

window.openTokenPurchaseModal = () => {
    window.openModal('token-purchase-modal');
    
    const radioButtons = document.querySelectorAll('input[name="token_package"]');
    const totalSpan = document.getElementById('token-purchase-total');
    
    radioButtons.forEach(radio => {
        radio.replaceWith(radio.cloneNode(true));
    });
    
    document.querySelectorAll('input[name="token_package"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) totalSpan.innerText = e.target.dataset.price;
        });
    });
};

// Закрываем меню при клике в пустую область
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown && !e.target.closest('#lang-dropdown') && !e.target.closest('[onclick*="lang-dropdown"]')) {
        dropdown.classList.add('hidden');
    }
});

// --- ГЕНЕРАТОР КАСТОМНЫХ ОКОН ПОДТВЕРЖДЕНИЯ ---
window.customConfirm = (title, message, btnText, colorTheme, iconClass) => {
    return new Promise((resolve) => {
        document.getElementById('confirm-title').innerText = title;
        document.getElementById('confirm-message').innerText = message;

        const actionBtn = document.getElementById('confirm-action-btn');
        actionBtn.innerText = btnText;

        const iconCont = document.getElementById('confirm-icon-container');
        const iconEl = document.getElementById('confirm-icon');

        // Настраиваем цвета в зависимости от "опасности" действия
        if (colorTheme === 'red') {
            actionBtn.className = 'flex-1 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md cursor-pointer bg-red-500 hover:bg-red-600';
            iconCont.className = 'w-16 h-16 rounded-full flex items-center justify-center mb-4 shrink-0 shadow-inner bg-red-100 dark:bg-red-900/30 text-red-500';
        } else if (colorTheme === 'emerald') {
            actionBtn.className = 'flex-1 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md cursor-pointer bg-emerald-500 hover:bg-emerald-600';
            iconCont.className = 'w-16 h-16 rounded-full flex items-center justify-center mb-4 shrink-0 shadow-inner bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500';
        }

        iconEl.className = `text-3xl ${iconClass}`;

        window.openModal('confirm-modal');

        // Обработчики закрытия (разрешают Promise)
        window.closeConfirmModal = (result) => {
            window.closeModal('confirm-modal');
            resolve(result);
        };

        actionBtn.onclick = () => window.closeConfirmModal(true);
    });
};

// ==========================================
// ГЛОБАЛЬНЫЙ КОНТРОЛЛЕР ПРОКРУТКИ (Бронебойный для iOS/Android)
// ==========================================
window.toggleBodyScroll = (isLocked) => {
    if (isLocked) {
        // Запоминаем текущую позицию прокрутки
        const scrollY = window.scrollY;
        // Фиксируем body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        // Оставляем вертикальную полосу, чтобы интерфейс не дергался по ширине
        document.body.style.overflowY = 'scroll'; 
    } else {
        // Достаем позицию из style.top
        const scrollY = document.body.style.top;
        // Снимаем фиксацию
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        // Возвращаем пользователя на то же место
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
};

window.promoteToVip = async () => {
    if (!window.currentUser || !window.activeModalItemId) return;

    if (!window.currentUserData || !window.currentUserData.is_pro) {
        window.showToast("Нужен PRO-статус для VIP-ленты", true);
        setTimeout(() => window.openModal('crypto-modal'), 1000);
        return;
    }

    try {
        const newVipDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        const { error } = await supabase
            .from('items')
            .update({ highlighted_until: newVipDate })
            .eq('id', window.activeModalItemId);

        if (error) throw error;
        window.showToast("Товар залетает в VIP на 7 дней!");
        window.closeModal('item-modal');
        window.fetchItems(false);
    } catch (e) {
        window.showToast("Ошибка продвижения", true);
    }
};

// 1. Переключение статуса "В резерве"
window.toggleReserve = async () => {
    if (!window.activeModalItemId) return;
    const item = window.loadedItems.find(i => i.id === window.activeModalItemId);
    if (!item) return;

    const isCurrentlyReserved = item.status === 'reserved' || item.is_reserved;
    const newStatus = isCurrentlyReserved ? 'active' : 'reserved';

    // Запрашиваем подтверждение только при ПОСТАНОВКЕ в резерв
    if (newStatus === 'reserved') {
        const isConfirmed = await window.customConfirm(
            "Резерв товара",
            "Скрыть товар из ленты? Покупатели больше не смогут его найти, пока вы не снимете резерв.",
            "В резерв",
            "emerald",
            "fa-solid fa-clock"
        );
        if (!isConfirmed) return; // Пользователь нажал "Отмена"
    }

    try {
        const { error } = await supabase.from('items').update({ status: newStatus }).eq('id', item.id);
        if (error) throw error;

        item.status = newStatus;
        item.is_reserved = !isCurrentlyReserved;

        window.showToast(newStatus === 'reserved' ? "Товар успешно скрыт в резерв" : "Резерв снят, товар снова в ленте!");
        window.openItemDetails(item.id);
        if (window.fetchItems) window.fetchItems(false);
    } catch (e) { window.showToast("Ошибка обновления", true); }
};

// 2. Пометка "Продано"
window.markAsSold = async () => {
    if (!window.activeModalItemId) return;
    const item = window.loadedItems.find(i => i.id === window.activeModalItemId);
    if (!item) return;

    const isConfirmed = await window.customConfirm(
        "Подтверждение продажи",
        "Пометить товар как проданный? Он исчезнет из общей ленты, но останется в вашем профиле.",
        "Да, продано",
        "emerald",
        "fa-solid fa-check-circle"
    );
    if (!isConfirmed) return;

    try {
        const { error } = await supabase.from('items').update({ status: 'sold' }).eq('id', item.id);
        if (error) throw error;

        item.status = 'sold';
        window.showToast("Поздравляем с продажей!");
        window.closeModal('item-modal');
        if (window.fetchItems) window.fetchItems(false);
        if (window.renderProfileTabs) window.renderProfileTabs();
    } catch (e) { window.showToast("Ошибка базы данных", true); }
};

// 3. Удаление товара и очистка мусора в хранилище
window.deleteItemConfirm = async () => {
    if (!window.activeModalItemId) return;
    const isConfirmed = await window.customConfirm(
        "Удаление объявления",
        "Вы уверены, что хотите НАВСЕГДА удалить это объявление? Восстановить его будет невозможно.",
        "Удалить",
        "red",
        "fa-solid fa-trash-can"
    );
    if (!isConfirmed) return;

    try {
        // 1. Ищем удаляемый товар
        const item = window.loadedItems.find(i => i.id === window.activeModalItemId);
        let filesToDelete = [];

        if (item) {
            let urls = [];
            if (Array.isArray(item.images)) urls.push(...item.images);
            if (item.image_url) urls.push(item.image_url);
            if (item.imageUrl) urls.push(item.imageUrl);

            // СЕНЬОР-ОПТИМИЗАЦИЯ: Убираем дубликаты, чтобы API хранилища не выдал ошибку!
            urls = [...new Set(urls)];

            urls.forEach(url => {
                if (typeof url === 'string' && url.includes('item-images/')) {
                    const match = url.match(/item-images\/(.+?)(?:\?|$)/);
                    if (match && match[1]) filesToDelete.push(decodeURIComponent(match[1]));
                }
            });
        }

        // 2. СНАЧАЛА ОЧИЩАЕМ STORAGE ОТ ФОТОГРАФИЙ
        if (filesToDelete.length > 0) {
            const { data: storageData, error: storageError } = await supabase.storage.from('item-images').remove(filesToDelete);
            if (storageError) console.error("Ошибка очистки корзины Storage:", storageError);
            else console.log("Успешно удалены фото:", storageData);
        }

        // 3. ЗАТЕМ УДАЛЯЕМ ТОВАР ИЗ БАЗЫ ДАННЫХ
        const { error } = await supabase.from('items').delete().eq('id', window.activeModalItemId);
        if (error) throw error;

        window.showToast("Объявление успешно удалено");
        window.closeModal('item-modal');
        if (window.fetchItems) window.fetchItems(false);
        if (window.renderProfileTabs) window.renderProfileTabs();
    } catch (e) {
        window.showToast("Ошибка при удалении", true);
        console.error("Delete Error:", e);
    }
};

window.tempPhotos = []; window.editExistingImages = [];
window.currentProfileTab = 'items'; window.activeModalItemId = null;
window.editingItemId = null; window.authMode = 'login';

// === ЧАТЫ И УВЕДОМЛЕНИЯ ===
window.currentChatId = null;
window.chatSubscription = null;
window.globalChatSubscription = null;

window.updateChatBadges = async () => {
    if (!window.currentUser) return;
    try {
        // 1. Получаем список всех чатов, где мы продавец или покупатель
        const { data: myChats } = await supabase.from('chats').select('id').or(`buyer_id.eq.${window.currentUser.id},seller_id.eq.${window.currentUser.id}`);
        const badges = document.querySelectorAll('#nav-chat-badge');

        if (!myChats || myChats.length === 0) {
            badges.forEach(b => {
                b.classList.remove('flex', 'items-center', 'justify-center', 'min-w-[18px]', 'h-[18px]', 'text-[10px]', 'text-white', 'px-1');
                b.classList.add('hidden', 'w-3', 'h-3', 'animate-pulse');
                b.innerText = '';
            });
            return;
        }

        const chatIds = myChats.map(c => c.id);

        // 2. Считаем ТОЧНОЕ количество непрочитанных сообщений (без загрузки их содержимого)
        const { count, error } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .in('chat_id', chatIds)
            .eq('is_read', false)
            .neq('sender_id', window.currentUser.id);

        if (error) throw error;

        // 3. Обновляем счетчик на иконке
        if (count && count > 0) {
            const displayCount = count > 99 ? '99+' : count;
            badges.forEach(b => {
                b.classList.remove('hidden', 'w-3', 'h-3', 'animate-pulse');
                b.classList.add('flex', 'items-center', 'justify-center', 'min-w-[18px]', 'h-[18px]', 'text-[10px]', 'text-white', 'px-1');
                b.innerText = displayCount;
            });
        } else {
            // Если непрочитанных нет — прячем бейдж
            badges.forEach(b => {
                b.classList.remove('flex', 'items-center', 'justify-center', 'min-w-[18px]', 'h-[18px]', 'text-[10px]', 'text-white', 'px-1');
                b.classList.add('hidden', 'w-3', 'h-3', 'animate-pulse');
                b.innerText = '';
            });
        }
    } catch (e) {
        console.error("Ошибка бейджей", e);
    }
};

// --- ЛОГИКА ОТЗЫВОВ ---
window.currentSellerId = null;
window.sellerReviews = [];
window.currentReviewRating = 5;

window.openSellerProfile = async (userId, sellerName, sellerAvatar) => {
    if (!userId) return;
    window.currentSellerId = userId;
    window.openModal('seller-modal');

    // Вставляем Имя и Аватар
    const nameEl = document.getElementById('seller-name');
    const avatarCont = document.getElementById('seller-avatar-container');

    if (nameEl) nameEl.innerText = sellerName || 'Продавец';
    if (avatarCont) {
        if (sellerAvatar) {
            avatarCont.innerHTML = `<img src="${sellerAvatar}" class="w-full h-full object-cover rounded-full">`;
        } else {
            avatarCont.innerHTML = `<i class="fa-solid fa-user text-stone-400"></i>`;
        }
    }

    const grid = document.getElementById('seller-items-grid');
    const listRev = document.getElementById('seller-reviews-list');
    const empty = document.getElementById('seller-empty');
    const loader = document.getElementById('seller-loading');

    if (grid) grid.style.display = 'none';
    if (listRev) { listRev.style.display = 'none'; listRev.classList.add('hidden'); }
    if (empty) empty.style.display = 'none';
    if (loader) loader.style.display = 'flex';

    try {
        // Параллельно грузим товары и отзывы из БД
        const [itemsRes, reviewsRes] = await Promise.all([
            supabase.from('items').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
            supabase.from('reviews').select('*').eq('seller_id', userId).order('created_at', { ascending: false })
        ]);

        if (itemsRes.error) throw itemsRes.error;
        if (reviewsRes.error) throw reviewsRes.error;

        const items = itemsRes.data || [];
        const reviews = reviewsRes.data || [];
        if (loader) loader.style.display = 'none';

        // ОТРИСОВКА ТОВАРОВ
        document.getElementById('seller-stats').innerHTML = `<span data-i18n="seller_ads">${window.t ? window.t('seller_ads') : 'Объявлений:'}</span> ${items.length}`;
        if (items.length > 0) {
            if (grid) {
                grid.innerHTML = items.map(i => window.createCardHtml(i)).join('');
                grid.style.display = 'grid';
            }
        } else {
            if (empty) empty.style.display = 'flex';
        }

        // --- НОВАЯ ЛОГИКА: ПОДТЯГИВАЕМ ИМЕНА И АВАТАРЫ ПОКУПАТЕЛЕЙ ---
        const reviewerIds = [...new Set(reviews.map(r => r.reviewer_id).filter(Boolean))];
        const usersMap = {};

        if (reviewerIds.length > 0) {
            // Ищем данные пользователей через их объявления (таблица items)
            const { data: usersData } = await supabase
                .from('items')
                .select('user_id, author_name, author_avatar')
                .in('user_id', reviewerIds);

            if (usersData) {
                usersData.forEach(u => {
                    usersMap[u.user_id] = { name: u.author_name, avatar: u.author_avatar };
                });
            }
        }
        // -----------------------------------------------------------

        // ОТРИСОВКА ОТЗЫВОВ И РЕЙТИНГА
        const ratingEl = document.getElementById('seller-rating-container');
        const tabRevCount = document.getElementById('seller-reviews-count');
        if (tabRevCount) tabRevCount.innerText = reviews.length > 0 ? `(${reviews.length})` : '';

        if (reviews.length > 0) {
            const avg = (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1);
            if (ratingEl) {
                ratingEl.innerHTML = `<i class="fa-solid fa-star text-amber-500"></i> <span class="font-black text-stone-800 dark:text-white">${avg}</span> <span class="text-stone-400 font-medium ml-1">(${reviews.length})</span>`;
                ratingEl.classList.remove('hidden');
                ratingEl.style.display = 'flex';
            }
            if (listRev) {
                listRev.innerHTML = reviews.map(r => {
                    // Достаем имя и аватар из нашего словаря
                    const revInfo = usersMap[r.reviewer_id] || {};
                    const revName = revInfo.name || 'Покупатель';
                    const revAvatar = revInfo.avatar
                        ? `<img src="${revInfo.avatar}" class="w-6 h-6 rounded-full object-cover shrink-0 shadow-sm border border-stone-200 dark:border-stone-700">`
                        : `<div class="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-[10px] text-stone-500 shrink-0"><i class="fa-solid fa-user"></i></div>`;

                    return `
                    <div class="bg-stone-50 dark:bg-stone-800/50 p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-700 w-full mb-3">
                        <div class="flex justify-between items-start mb-2 gap-2">
                            <div class="flex items-center gap-2 min-w-0">
                                ${revAvatar}
                                <div class="font-black text-sm text-stone-900 dark:text-white truncate">${revName}</div>
                            </div>
                            <div class="text-amber-500 text-xs shrink-0 pt-0.5">
                                ${Array(r.rating || 5).fill('<i class="fa-solid fa-star"></i>').join('')}${Array(5 - (r.rating || 5)).fill('<i class="fa-regular fa-star text-stone-300 dark:text-stone-600"></i>').join('')}
                            </div>
                        </div>
                        <div class="text-sm text-stone-700 dark:text-stone-300 mt-2">${r.comment || ''}</div>
                        <div class="text-[10px] text-stone-400 mt-2">${new Date(r.created_at).toLocaleDateString()}</div>
                    </div>
                `}).join('');
            }
        } else {
            if (ratingEl) { ratingEl.classList.add('hidden'); ratingEl.style.display = 'none'; }
            if (listRev) {
                listRev.innerHTML = `<div class="text-center text-stone-400 py-10 font-bold w-full"><i class="fa-regular fa-comment-dots text-4xl mb-3 opacity-50 block"></i>Отзывов пока нет.</div>`;
            }
        }

        // Управление вкладками
        window.switchSellerTab('items'); // По умолчанию открываем товары

        // Кнопка Оставить отзыв
        const btnLeaveRev = document.getElementById('btn-leave-review');
        if (btnLeaveRev) {
            if (window.currentUser && window.currentUser.id !== userId) {
                btnLeaveRev.classList.remove('hidden');
                btnLeaveRev.style.display = 'block';
                btnLeaveRev.onclick = () => window.openModal('review-modal');
            } else {
                btnLeaveRev.classList.add('hidden');
                btnLeaveRev.style.display = 'none';
            }
        }

    } catch (e) {
        console.error("Ошибка профиля:", e);
        if (loader) loader.style.display = 'none';
        if (empty) empty.style.display = 'flex';
    }
};

// Функция переключения вкладок продавца
window.switchSellerTab = (tabName) => {
    const grid = document.getElementById('seller-items-grid');
    const listRev = document.getElementById('seller-reviews-list');
    const empty = document.getElementById('seller-empty');
    const search = document.getElementById('seller-search-container');

    const tabItems = document.getElementById('tab-seller-items');
    const tabReviews = document.getElementById('tab-seller-reviews');

    if (tabName === 'items') {
        if (tabItems) tabItems.classList.add('text-brand-600', 'border-brand-600');
        if (tabReviews) tabReviews.classList.remove('text-brand-600', 'border-brand-600');

        if (listRev) { listRev.style.display = 'none'; listRev.classList.add('hidden'); }
        if (search) { search.style.display = 'block'; search.classList.remove('hidden'); }

        if (grid && grid.innerHTML.trim() !== '') {
            grid.style.display = 'grid'; grid.classList.remove('hidden');
            if (empty) { empty.style.display = 'none'; empty.classList.add('hidden'); }
        } else {
            if (grid) { grid.style.display = 'none'; grid.classList.add('hidden'); }
            if (empty) { empty.style.display = 'flex'; empty.classList.remove('hidden'); }
        }
    } else {
        if (tabReviews) tabReviews.classList.add('text-brand-600', 'border-brand-600');
        if (tabItems) tabItems.classList.remove('text-brand-600', 'border-brand-600');

        if (grid) { grid.style.display = 'none'; grid.classList.add('hidden'); }
        if (empty) { empty.style.display = 'none'; empty.classList.add('hidden'); }
        if (search) { search.style.display = 'none'; search.classList.add('hidden'); }

        // ЖЕСТКОЕ ВКЛЮЧЕНИЕ ОТЗЫВОВ
        if (listRev) { listRev.classList.remove('hidden'); listRev.style.display = 'flex'; }
    }
};

window.openReviewModal = (existingReview = null) => {
    if (!window.currentUser) return;
    window.currentReviewRating = existingReview ? existingReview.rating : 5;
    document.getElementById('review-comment').value = existingReview ? existingReview.comment : '';
    window.updateStarSelection(window.currentReviewRating);
    window.openModal('review-modal');
};

window.updateStarSelection = (rating) => {
    window.currentReviewRating = rating;
    const stars = document.querySelectorAll('.star-btn i');
    stars.forEach((star, idx) => {
        star.className = idx < rating ? 'fa-solid fa-star text-amber-500' : 'fa-regular fa-star text-stone-300';
    });
};

window.submitReview = async (event) => {
    event.preventDefault();
    if (!window.currentUser) return window.showToast("Сначала войдите в аккаунт", true);

    const commentEl = document.getElementById('review-comment');
    const comment = commentEl ? commentEl.value.trim() : '';
    const rating = window.currentReviewRating || 5;
    const sellerId = window.currentSellerId;

    if (!sellerId) return window.showToast("Ошибка: продавец не найден", true);

    try {
        const btn = document.getElementById('btn-submit-review');
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>...'; }

        // ИСПРАВЛЕННЫЕ КОЛОНКИ: Строго по твоей структуре БД (id и created_at сгенерирует сам Supabase)
        const reviewData = {
            seller_id: sellerId,
            reviewer_id: window.currentUser.id,
            rating: rating,
            comment: comment
        };

        const { error } = await supabase.from('reviews').insert([reviewData]);

        if (error) {
            console.error("Supabase Error:", error);
            throw new Error("Не удалось записать отзыв в базу данных");
        }

        window.showToast("Отзыв успешно опубликован!");
        window.closeModal('review-modal');
        if (commentEl) commentEl.value = '';
        if (typeof window.updateStarSelection === 'function') window.updateStarSelection(5);

        // МГНОВЕННОЕ ОБНОВЛЕНИЕ ПРОФИЛЯ ПРОДАВЦА
        const sellerNameEl = document.getElementById('seller-name');
        const sellerAvatarImg = document.querySelector('#seller-avatar-container img');

        const sName = sellerNameEl ? sellerNameEl.innerText : 'Продавец';
        const sAvatar = sellerAvatarImg ? sellerAvatarImg.src : null;

        await window.openSellerProfile(sellerId, sName, sAvatar);
        window.switchSellerTab('reviews'); // Сразу переключаем на вкладку с отзывами

    } catch (error) {
        console.error("Ошибка при отправке отзыва:", error);
        window.showToast(error.message, true);
    } finally {
        const btn = document.getElementById('btn-submit-review');
        if (btn) {
            btn.disabled = false;
            btn.innerText = (typeof window.t === 'function') ? window.t('btn_send_review') : 'Отправить отзыв';
        }
    }
};

window.sendChatMessage = async () => {
    if (!window.currentChatId || !window.currentUser) return;
    const input = document.getElementById('chat-input-field');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    const container = document.getElementById('chat-messages');
    if (container.innerHTML.includes('Напишите первое')) container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', `<div class="flex items-end justify-end gap-2 w-full mt-2 opacity-50 transition-opacity" id="temp-msg"><div class="bg-brand-600 text-white p-3 rounded-2xl rounded-br-none shadow-sm text-base font-medium max-w-[85%] break-words">${text}</div></div>`);
    container.scrollTop = container.scrollHeight;

    try {
        await supabase.from('messages').insert([{ chat_id: window.currentChatId, sender_id: window.currentUser.id, text: text }]);
        const tempMsg = document.getElementById('temp-msg');
        if (tempMsg) { tempMsg.classList.remove('opacity-50'); tempMsg.removeAttribute('id'); }
    } catch (e) { window.showToast("Ошибка отправки", true); }
};

window.currentChatItemId = null;

window.currentReportedUserId = null;

window.openReportModal = () => {
    if (!window.currentUser) {
        window.showToast("Сначала войдите в аккаунт", true);
        window.openModal('auth-modal');
        return;
    }

    // Получаем ID пользователя, профиль которого сейчас открыт
    const sellerItems = document.getElementById('seller-items-grid');
    // Если сетка пустая, мы не знаем ID, поэтому страхуемся через открытый товар
    const item = window.loadedItems.find(i => i.id === window.activeModalItemId);
    if (item) {
        window.currentReportedUserId = item.userId;
    }

    if (window.currentReportedUserId === window.currentUser.id) {
        window.showToast("Вы не можете пожаловаться на самого себя :)", true);
        return;
    }

    document.getElementById('report-reason').value = '';
    document.getElementById('report-comment').value = '';
    window.openModal('report-modal');
};

window.submitReport = async (event) => {
    event.preventDefault();
    if (!window.currentUser || !window.currentReportedUserId) return;

    const btn = document.getElementById('btn-submit-report');
    const reason = document.getElementById('report-reason').value;
    const comment = document.getElementById('report-comment').value.trim();

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>...';

    try {
        const { error } = await supabase.from('reports').insert([{
            reporter_id: window.currentUser.id,
            reported_user_id: window.currentReportedUserId,
            reason: reason,
            comment: comment
        }]);

        if (error) throw error;

        window.closeModal('report-modal');
        window.showToast("Жалоба отправлена модераторам!");
    } catch (e) {
        window.showToast("Ошибка отправки", true);
    } finally {
        btn.disabled = false;
        btn.innerText = "Отправить жалобу";
    }
};

window.openChatModal = async () => {
    if (!window.currentUser) {
        // Стек автоматически вернет в карточку после входа/закрытия auth-modal
        window.openModal('auth-modal');
        window.showToast("Войдите в аккаунт", true);
        return;
    }

    const item = window.loadedItems.find(i => i.id === window.activeModalItemId);
    if (!item) return;

    window.currentChatItemId = item.id;

    const badge = document.getElementById('chat-role-badge');
    if (badge) { badge.innerText = "ПОКУПКА"; badge.className = "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white bg-emerald-500"; }

    document.getElementById('chat-author-name').innerText = item.authorName || "Продавец";
    document.getElementById('chat-item-title').innerText = item.title;
    document.getElementById('chat-item-price').innerText = `${item.price || 0} ${item.currency || 'RSD'}`;

    const imgEl = document.getElementById('chat-item-img');
    if (imgEl) imgEl.src = (Array.isArray(item.images) && item.images.length > 0) ? item.images[0] : (item.imageUrl || 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=100');

    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = `<div class="flex justify-center mt-10"><i class="fa-solid fa-circle-notch fa-spin text-3xl text-brand-500"></i></div>`;
    window.openModal('chat-modal');

    try {
        let { data: chat } = await supabase.from('chats').select('*').eq('item_id', item.id).eq('buyer_id', window.currentUser.id).maybeSingle();
        if (!chat) {
            const { data: newChat, error } = await supabase.from('chats').insert([{ item_id: item.id, buyer_id: window.currentUser.id, seller_id: item.userId }]).select().single();
            if (error) throw error;
            chat = newChat;
        }
        window.currentChatId = chat.id;
        await ChatModule.loadMessages(chat.id);
        await ChatModule.subscribeToMessages();
    } catch (e) { messagesContainer.innerHTML = `<div class="text-center text-stone-400 mt-4">Ошибка загрузки чата</div>`; }
};

window.openChatListModal = async (silentLoad = false) => {
    if (!window.currentUser) {
        window.openModal('auth-modal');
        window.showToast("Войдите в аккаунт", true);
        return;
    }

    if (!silentLoad) window.openModal('chat-list-modal');
    const container = document.getElementById('chat-list-container');

    if (container && !silentLoad) {
        container.innerHTML = `<div class="flex justify-center mt-10"><i class="fa-solid fa-circle-notch fa-spin text-3xl text-brand-500"></i></div>`;
    }

    try {
        // Вот он, тот самый быстрый запрос к нашей новой SQL View!
        const { data: chats, error } = await supabase
            .from('user_chats_view')
            .select('*')
            .or(`buyer_id.eq.${window.currentUser.id},seller_id.eq.${window.currentUser.id}`)
            .order('last_message_time', { ascending: false });

        if (error) throw error;

        if (!chats || chats.length === 0) {
            container.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-stone-400 mt-20"><i class="fa-regular fa-envelope-open text-6xl mb-4 opacity-50"></i><div class="text-base font-bold text-center">Нет активных диалогов</div></div>`;
            return;
        }

        const chatIds = chats.map(c => c.chat_id);

        // Быстро получаем количество непрочитанных сообщений
        const { data: unreadData } = await supabase
            .from('messages')
            .select('chat_id')
            .in('chat_id', chatIds)
            .eq('is_read', false)
            .neq('sender_id', window.currentUser.id);

        const unreadMap = {};
        if (unreadData) {
            unreadData.forEach(m => unreadMap[m.chat_id] = (unreadMap[m.chat_id] || 0) + 1);
        }

        // Формируем HTML список чатов
        let html = '';
        chats.forEach(chat => {
            const isSeller = chat.seller_id === window.currentUser.id;

            // Если мы продаем, собеседник - покупатель. И наоборот.
            const interlocutorName = isSeller ? (chat.buyer_name || "Покупатель") : (chat.seller_name || chat.item_title || "Продавец");

            const lastMsg = chat.last_message || 'Нет сообщений...';
            const unreadCount = unreadMap[chat.chat_id] || 0;
            const itemImg = chat.item_image || 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=100';

            const roleBadge = isSeller
                ? `<span class="bg-amber-100 text-amber-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase border border-amber-200">${window.t('Вы продаете')}</span>`
                : `<span class="bg-brand-50 text-brand-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase border border-brand-100">${window.t('Вы покупаете')}</span>`;

            html += `
            <div onclick="window.openExistingChat('${chat.chat_id}', '${chat.item_id}', '${isSeller}', '${interlocutorName.replace(/'/g, "\\'")}')" class="flex items-center gap-4 p-4 border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 transition cursor-pointer">
                <img src="${itemImg}" class="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-700">
                <div class="flex-1 overflow-hidden text-left">
                    <div class="flex items-center gap-2 mb-1">
                        ${roleBadge}
                        <h4 class="font-bold text-sm text-stone-900 dark:text-white truncate">${chat.item_title || window.t('Товар удален')}</h4>
                    </div>
                    <p class="text-[11px] text-stone-500 font-bold mb-0.5 truncate"><i class="fa-solid fa-user-circle mr-1 text-stone-400"></i> ${window.t('Собеседник:')} <span class="text-stone-800 dark:text-stone-200">${interlocutorName}</span></p>
                    <p class="text-sm ${unreadCount > 0 ? 'text-stone-900 dark:text-white font-bold' : 'text-stone-500 font-medium'} truncate">${lastMsg}</p>
                </div>
                ${unreadCount > 0 ? `<div class="bg-red-500 text-white text-[10px] font-black rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center shrink-0 shadow-sm">${unreadCount}</div>` : ''}
            </div>`;
        });

        container.innerHTML = html;

    } catch (e) {
        container.innerHTML = `<div class="text-center text-red-500 p-10">Ошибка: ${e.message}</div>`;
    }
};

window.openExistingChat = async (chatId, itemId, isSellerStr, interlocutorName) => {
    window.closeModal('chat-list-modal');
    window.currentChatId = chatId;
    window.currentChatItemId = itemId;
    window.currentChatIsSeller = isSellerStr;
    window.currentChatInterlocutor = interlocutorName;

    const isSeller = isSellerStr === 'true';

    const badge = document.getElementById('chat-role-badge');
    if (badge) {
        if (isSeller) {
            badge.innerText = "ПРОДАЖА"; badge.className = "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white bg-indigo-500";
        } else {
            badge.innerText = "ПОКУПКА"; badge.className = "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white bg-emerald-500";
        }
    }

    document.getElementById('chat-author-name').innerText = interlocutorName || "Собеседник";
    document.getElementById('chat-item-title').innerText = "Загрузка...";
    document.getElementById('chat-item-price').innerText = "";
    document.getElementById('chat-item-img').src = "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=100";

    supabase.from('items').select('title, price, currency, images, image_url').eq('id', itemId).maybeSingle().then(({ data }) => {
        if (data) {
            document.getElementById('chat-item-title').innerText = data.title;
            document.getElementById('chat-item-price').innerText = `${data.price || 0} ${data.currency || 'RSD'}`;
            const img = (Array.isArray(data.images) && data.images.length > 0) ? data.images[0] : (data.image_url || 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=100');
            document.getElementById('chat-item-img').src = img;
        } else { document.getElementById('chat-item-title').innerText = "Товар удален"; }
    });

    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = `<div class="flex justify-center mt-10"><i class="fa-solid fa-circle-notch fa-spin text-3xl text-brand-500"></i></div>`;
    window.openModal('chat-modal');

    await ChatModule.loadMessages(chatId);
    await ChatModule.subscribeToMessages();
};
// ========================

window.updateSEO = (title, desc, img) => {
    document.title = title ? `${title} | SVALKA` : 'SVALKA — Маркетплейс вещей в Сербии';
    const setMeta = (id, content) => { const el = document.getElementById(id); if (el && content) el.content = content; };
    setMeta('og-title', title || 'SVALKA — Маркетплейс вещей в Сербии');
    setMeta('og-desc', desc || 'Отличные находки и быстрые продажи в Белграде, Нови-Саде и по всей Сербии.');
    setMeta('og-image', img || 'https://images.unsplash.com/photo-1555529771-835f59bfc50c?auto=format&fit=crop&w=1200&q=80');
};

const initPWA = () => {
    const manifest = {
        name: "SVALKA", short_name: "SVALKA", description: "Маркетплейс в Сербии",
        start_url: "/", display: "standalone", background_color: "#f5f5f4", theme_color: "#14b8a6",
        icons: [{ src: "https://api.dicebear.com/9.x/shapes/svg?seed=svalka&backgroundColor=14b8a6", sizes: "512x512", type: "image/svg+xml", purpose: "any maskable" }]
    };
    const manifestUrl = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(manifest))}`;
    document.head.insertAdjacentHTML('beforeend', `<link rel="manifest" href="${manifestUrl}">`);
    document.head.insertAdjacentHTML('beforeend', `<meta name="theme-color" content="#14b8a6">`);
};
initPWA();

window.updateThemeIcons = (isDark) => {
    document.querySelectorAll('button[onclick*="toggleDarkMode"] i').forEach(icon => {
        icon.style.transform = 'rotate(-180deg) scale(0.5)';
        icon.style.opacity = '0';
        setTimeout(() => {
            icon.className = isDark 
                ? 'fa-solid fa-sun text-amber-500 text-lg inline-block transition-all duration-300' 
                : 'fa-solid fa-moon text-indigo-400 text-lg inline-block transition-all duration-300';
            icon.style.transform = 'rotate(0deg) scale(1)';
            icon.style.opacity = '1';
        }, 150); 
    });
};

const setAutoTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    let isDark = false;
    if (savedTheme === 'dark') { document.documentElement.classList.add('dark'); isDark = true; }
    else if (savedTheme === 'light') { document.documentElement.classList.remove('dark'); }
    else {
        try {
            const opts = { timeZone: 'Europe/Belgrade', hour: 'numeric', hour12: false };
            const hour = parseInt(new Intl.DateTimeFormat('en-GB', opts).format(new Date()));
            if (hour >= 19 || hour < 7) { document.documentElement.classList.add('dark'); isDark = true; }
            else document.documentElement.classList.remove('dark');
        } catch (e) { }
    }
    setTimeout(() => {
        if (typeof window.updateThemeIcons === 'function') window.updateThemeIcons(isDark);
    }, 50);
};
setAutoTheme();

window.toggleDarkMode = () => {
    const html = document.documentElement;
    const newIsDark = !html.classList.contains('dark');
    
    html.classList.add('disable-transitions');
    html.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    
    if (typeof window.updateThemeIcons === 'function') {
        window.updateThemeIcons(newIsDark);
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            html.classList.remove('disable-transitions');
        });
    });
};

window.goHome = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => window.resetFilters(), 300); };

window.modalStack = []; // Инициализируем стек открытых окон

window.openModal = async id => {
    const el = document.getElementById(id);
    if (el) {
        // --- ИСТИННАЯ БРОНЕБОЙНАЯ БЛОКИРОВКА СКРОЛЛА ---
        if (window.modalStack.length === 0) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            window.toggleBodyScroll(true); // Запускаем хард-лок для iOS/Android
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        document.body.classList.add('modal-open');

        // 1. УМНЫЙ СТЕК: Прячем предыдущее окно, чтобы не было наложения теней
        if (window.modalStack.length > 0) {
            const prevId = window.modalStack[window.modalStack.length - 1];
            const prevEl = document.getElementById(prevId);
            if (prevEl && prevId !== id) prevEl.style.display = 'none';
        }

        // Добавляем текущее окно в стек
        if (!window.modalStack.includes(id)) {
            window.modalStack.push(id);
        }

        el.style.display = '';
        el.classList.add('active');
        document.body.classList.add('modal-open');

        if (id === 'crypto-modal' && window.currentUser) {
            const boostyInput = document.getElementById('boosty-user-id');
            if (boostyInput) boostyInput.value = window.currentUser.id;
        }

        // === ОБЪЕДИНЕННАЯ ЛОГИКА: Динамическое обновление статуса PRO в профиле ===
        if (id === 'profile-modal' && window.currentUser) {
            const statusText = document.getElementById('profile-account-status');
            const proBtn = document.getElementById('profile-buy-pro-btn');
            const tokensEl = document.getElementById('profile-vip-tokens'); // Контейнер токенов
            
            if (statusText) statusText.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-stone-400"></i>';
            
            try {
                // Запрашиваем актуальные данные напрямую из Supabase
                const { data } = await window.supabase.from('profiles').select('pro_until, vip_tokens').eq('id', window.currentUser.id).single();
                
                if (data && statusText && proBtn) {
                    if (!window.currentUserData) window.currentUserData = {}; 
                    window.currentUserData.pro_until = data.pro_until;
                    window.currentUserData.vip_tokens = data.vip_tokens || 0;
                    
                    // СРАЗУ ОБНОВЛЯЕМ ФЛАГ is_pro ЧТОБЫ КНОПКА ТОПА РАБОТАЛА
                    window.currentUserData.is_pro = window.checkRealVipStatus ? window.checkRealVipStatus(data) : false;
                    
                    if (tokensEl) tokensEl.innerText = `${data.vip_tokens || 0} шт.`;
                    
                    if (window.currentUserData.is_pro) {
                        // Высчитываем оставшиеся дни
                        const proUntilDate = new Date(data.pro_until);
                        const today = new Date();
                        const diffDays = Math.ceil((proUntilDate - today) / (1000 * 60 * 60 * 24)); 
                        
                        const t = window.t || (txt => txt);
                        statusText.innerText = `PRO (${t('Активен еще')} ${diffDays} ${t('дн.')})`;
                        statusText.className = 'text-sm font-black text-amber-500';
                        proBtn.classList.add('hidden');
                    } else {
                        const t = window.t || (txt => txt);
                        statusText.innerText = t('Базовый'); // <--- ПЕРЕВОД ЗДЕСЬ
                        statusText.className = 'text-sm font-black text-stone-700 dark:text-stone-300';
                        proBtn.classList.remove('hidden');
                    }
                }
            } catch(e) {
                console.error("Ошибка загрузки профиля:", e);
                if (statusText) statusText.innerText = 'Ошибка';
            }
        }

        // === ГАРАНТИРОВАННЫЙ ВЫЗОВ ПОХОЖИХ ТОВАРОВ И ПРОСМОТРОВ ===
        if (id === 'item-modal') {
            setTimeout(() => {
                if (window.activeModalItemId && typeof window.triggerItemViewsAndSimilar === 'function') {
                    window.triggerItemViewsAndSimilar(window.activeModalItemId);
                }
            }, 100);
        }
    }
};

window.closeModal = id => {
    const el = document.getElementById(id);
    if (el) {
        el.classList.remove('active');
        el.style.display = '';

        // УМНЫЙ СТЕК: Удаляем текущее окно из памяти
        window.modalStack = window.modalStack.filter(m => m !== id);

        // Если в стеке еще есть окна, ВОЗВРАЩАЕМ ПРЕДЫДУЩЕЕ
        if (window.modalStack.length > 0) {
            const prevId = window.modalStack[window.modalStack.length - 1];
            const prevEl = document.getElementById(prevId);
            if (prevEl) prevEl.style.display = '';
        } else {
            if (!document.querySelector('.modal-overlay.active')) {
                document.body.classList.remove('modal-open');
                // --- СНИМАЕМ БРОНЕБОЙНУЮ БЛОКИРОВКУ ---
                window.toggleBodyScroll(false); 
                document.body.style.paddingRight = '';
            }
        }
    }

    if (id === 'item-modal') {
        history.pushState(null, '', window.location.pathname);
        window.updateSEO();
        if (window.chatReturnContext) {
            const ctx = window.chatReturnContext;
            window.chatReturnContext = null;
            setTimeout(() => window.openExistingChat(ctx.id, ctx.itemId, ctx.isSellerStr, ctx.name), 300);
        }
    }

    if (id === 'add-modal') {
        window.editingItemId = null;
        const addTitle = document.getElementById('add-modal-title');
        const addBtn = document.getElementById('add-submit-btn');
        if (addTitle) addTitle.innerText = window.t ? window.t('add_title') : "Пристроить добро";
        if (addBtn) addBtn.innerText = window.t ? window.t('btn_publish_item') : "Опубликовать";
        const formEl = document.getElementById('add-form'); if (formEl) formEl.reset();
        window.tempPhotos = []; window.editExistingImages = [];
        const photoList = document.getElementById('photo-preview-list'); if (photoList) photoList.innerHTML = '';
    }

    // === ИСПРАВЛЕНИЕ: БЕЗОПАСНАЯ ОЧИСТКА ЧАТА ===
    if (id === 'chat-modal') {
        window.currentChatId = null;
        if (window.chatSubscription) {
            // Перехватываем подписку в локальную переменную перед удалением
            const subToKill = window.chatSubscription;
            window.chatSubscription = null;
            supabase.removeChannel(subToKill); // Fire-and-forget (не блокируем закрытие UI)
        }
    }
};

window.checkAuthAndOpenAddModal = async () => {
    if (!window.currentUser) {
        window.openModal('auth-modal');
        window.showToast(window.t ? window.t('auth_hint') : "Войдите в аккаунт", true);
        return;
    }

    const addBtn = document.getElementById('btn-header-add');
    if (addBtn) addBtn.style.opacity = '0.5';

    try {
        // Безопасное чтение PRO-статуса
        const isPro = (window.currentUserData && window.currentUserData.is_pro) ? true : false;
        const maxItems = isPro ? 50 : 10;

        const { count, error } = await supabase
            .from('items')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', window.currentUser.id);

        if (error) throw error;

        if (count >= maxItems) {
            window.showToast(isPro ? `Достигнут VIP-лимит: ${maxItems} объявлений.` : `Лимит: ${maxItems} объявлений. Подключите PRO!`, true);
            if (!isPro) setTimeout(() => window.openModal('crypto-modal'), 1500);
            return;
        }

        // Автоподстановка телефона
        const phoneInput = document.getElementById('item-phone');
        if (phoneInput && window.currentUser.user_metadata && window.currentUser.user_metadata.phone) {
            phoneInput.value = window.currentUser.user_metadata.phone;
        }

        window.openModal('add-modal');
    } catch (err) {
        console.error("Ошибка при открытии формы:", err);
        // Fallback: если БД тупит, всё равно разрешаем открыть форму
        window.openModal('add-modal');
    } finally {
        if (addBtn) addBtn.style.opacity = '1';
    }
};

window.toggleFavoriteModal = async (event) => {
    if (event) event.stopPropagation();

    if (!window.currentUser) {
        window.openModal('auth-modal');
        window.showToast((typeof window.t === 'function') ? window.t('auth_hint') : "Войдите в аккаунт", true);
        return;
    }

    // Если карточка открыта, ID всегда лежит тут
    const itemId = window.currentOpenedItemId || window.activeModalItemId;

    if (itemId) {
        // Вызываем исправленную базовую функцию без кнопки из карточки
        await window.toggleFavorite(null, null, itemId);

        // Визуально переключаем саму кнопку в модалке
        const isSaved = window.userFavorites.has(itemId);
        const favBtn = document.getElementById('modal-fav-btn');
        const favIcon = document.querySelector('#modal-fav-btn i');

        if (favBtn && favIcon) {
            if (isSaved) {
                favBtn.classList.remove('text-stone-400');
                favBtn.classList.add('text-brand-600');
                favIcon.className = 'fa-solid fa-box text-lg scale-110 transition-transform';
            } else {
                favBtn.classList.add('text-stone-400');
                favBtn.classList.remove('text-brand-600');
                favIcon.className = 'fa-solid fa-box-open text-lg transition-transform';
            }

            favBtn.classList.add('scale-110');
            setTimeout(() => favBtn.classList.remove('scale-110'), 200);
        }
    } else {
        window.showToast("Ошибка: ID товара не найден", true);
        console.error("currentOpenedItemId is null!");
    }
};

window.toggleMobileMenu = () => { 
    const el = document.getElementById('mobile-menu');
    if (el) {
        // Проверяем, открываем мы меню или закрываем
        const isOpening = el.classList.contains('translate-x-full');
        el.classList.toggle('translate-x-full');

        // Используем наш централизованный локер скролла
        if (isOpening) {
            window.toggleBodyScroll(true);
            document.body.classList.add('modal-open');
        } else {
            window.toggleBodyScroll(false);
            document.body.classList.remove('modal-open');
        }
    }
};

// Единая защищенная функция для мобильных фильтров
window.toggleMobileFilters = () => {
    const panel = document.getElementById('filter-panel-wrapper');
    const backdrop = document.getElementById('mobile-filter-backdrop');
    
    if (!panel) return;

    panel.style.overflowY = 'auto';
    panel.style.height = '100dvh'; 
    panel.style.overscrollBehaviorY = 'contain';

    const isOpen = !panel.classList.contains('-translate-x-full');
    
    if (isOpen) {
        // ЗАКРЫВАЕМ ПАНЕЛЬ
        panel.classList.add('-translate-x-full');
        if (backdrop) {
            backdrop.classList.add('opacity-0');
            setTimeout(() => backdrop.classList.add('hidden'), 300);
        }
        // --- СНИМАЕМ БРОНЕБОЙНУЮ БЛОКИРОВКУ ---
        window.toggleBodyScroll(false);
        document.body.classList.remove('modal-open');
    } else {
        // ОТКРЫВАЕМ ПАНЕЛЬ
        panel.classList.remove('-translate-x-full');
        if (backdrop) {
            backdrop.classList.remove('hidden');
            setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
        }
        // --- ВКЛЮЧАЕМ БРОНЕБОЙНУЮ БЛОКИРОВКУ ---
        window.toggleBodyScroll(true);
        document.body.classList.add('modal-open');
    }
};

// Перенаправляем верхнюю неработающую кнопку на новую логику
window.toggleFilters = window.toggleMobileFilters;

window.showToast = (msg, type = 'info') => {
    // Совместимость со старым кодом, если передавался boolean (true/false)
    if (type === true) type = 'error';
    if (type === false) type = 'info';
    
    // Авто-перехват позитивных сообщений (Успешный вход, сохранение и т.д.)
    const positiveWords = ['возвращением', 'успешно', 'поздравляем', 'опубликован', 'сохранен', 'готово'];
    if (positiveWords.some(word => msg.toLowerCase().includes(word))) {
        type = 'success';
    }

    const t = document.getElementById('toast');
    const tMsg = document.getElementById('toast-msg');
    const tIco = document.getElementById('toast-icon');
    
    if (tMsg) tMsg.innerText = msg;
    
    let bgClass = '', iconClass = '';
    
    if (type === 'error') {
        bgClass = 'bg-red-600 text-white';
        iconClass = 'fa-circle-exclamation text-white';
    } else if (type === 'success') {
        bgClass = 'bg-emerald-500 text-white';
        iconClass = 'fa-circle-check text-white';
    } else {
        // Стандартный (инфо)
        bgClass = 'bg-stone-900 dark:bg-white text-white dark:text-stone-900';
        iconClass = 'fa-circle-check text-brand-400';
    }
    
    if (tIco) tIco.className = `fa-solid ${iconClass} text-lg`;
    
    if (t) {
        t.className = `fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-full font-bold text-sm shadow-2xl flex items-center gap-3 z-[9999] transition-opacity duration-300 pointer-events-none ${bgClass} opacity-100`;
        setTimeout(() => t.classList.replace('opacity-100', 'opacity-0'), 3000);
    }
};

window.currentLightboxImages = [];
window.currentLightboxIndex = 0;

window.openLightbox = (src) => {
    // 1. Собираем все картинки текущего товара в массив
    if (window.activeModalItemId) {
        const item = window.loadedItems.find(i => i.id === window.activeModalItemId);
        if (item && Array.isArray(item.images) && item.images.length > 0) {
            window.currentLightboxImages = item.images;
        } else {
            window.currentLightboxImages = [src];
        }
    } else {
        window.currentLightboxImages = [src];
    }

    // 2. Ищем индекс именно той картинки, по которой кликнули (src)
    // Раньше тут скрипт искал удаленный document.getElementById('modal-img').src и падал
    window.currentLightboxIndex = window.currentLightboxImages.findIndex(img => src.includes(img) || img.includes(src));

    if (window.currentLightboxIndex === -1) window.currentLightboxIndex = 0;

    // 3. Обновляем картинку в окне и открываем его
    window.updateLightboxImage();
    window.openModal('lightbox');
};

// Эту функцию можно оставить без изменений, но на всякий случай вот её чистый код:
window.updateLightboxImage = () => {
    const img = document.getElementById('lightbox-img');
    if (img) img.src = window.currentLightboxImages[window.currentLightboxIndex];

    const prev = document.getElementById('lightbox-prev');
    const next = document.getElementById('lightbox-next');
    if (prev) prev.style.display = window.currentLightboxImages.length > 1 ? 'block' : 'none';
    if (next) next.style.display = window.currentLightboxImages.length > 1 ? 'block' : 'none';
};

window.lightboxNext = (e) => {
    if (e) e.stopPropagation();
    window.currentLightboxIndex = (window.currentLightboxIndex + 1) % window.currentLightboxImages.length;
    window.updateLightboxImage();
};

window.lightboxPrev = (e) => {
    if (e) e.stopPropagation();
    window.currentLightboxIndex = (window.currentLightboxIndex - 1 + window.currentLightboxImages.length) % window.currentLightboxImages.length;
    window.updateLightboxImage();
};

window.shareCurrentItem = () => {
    window.bumpViaShare();
};

window.appendEmailDomain = (domain) => {
    const input = document.getElementById('auth-email');
    if (!input) return;
    const val = input.value.split('@')[0]; // Берет логин до @
    input.value = val + domain;
    input.focus();
};

window.setAuthMode = mode => {
    window.authMode = mode;
    const fields = document.getElementById('auth-name-field');
    const confirmCont = document.getElementById('auth-password-confirm-container');
    const confirmInput = document.getElementById('auth-password-confirm');
    const tabL = document.getElementById('tab-login');
    const tabR = document.getElementById('tab-register');
    
    // Добавлено: Находим кнопку формы по правильному ID
    const submitBtn = document.getElementById('auth-submit-btn');

    if (mode === 'register') {
        if (fields) { fields.classList.remove('hidden'); fields.classList.add('flex'); }
        if (confirmCont) { confirmCont.classList.remove('hidden'); confirmCont.classList.add('block'); }
        if (confirmInput) confirmInput.required = true;
        if (tabR) tabR.className = "text-brand-600 border-b-2 border-brand-600 pb-1 transition cursor-pointer";
        if (tabL) tabL.className = "text-stone-400 pb-1 transition cursor-pointer";
        
        // Тематическое название для регистрации
        if (submitBtn) {
            submitBtn.innerText = "Присоединиться";
            submitBtn.removeAttribute('data-i18n'); // Отключаем словарь для этой кнопки
        }

        if (typeof window.renderRegistrationAvatars === 'function') {
            window.renderRegistrationAvatars();
        }
    } else {
        if (fields) { fields.classList.add('hidden'); fields.classList.remove('flex'); }
        if (confirmCont) { confirmCont.classList.add('hidden'); confirmCont.classList.remove('block'); }
        if (confirmInput) confirmInput.required = false;
        if (tabL) tabL.className = "text-brand-600 border-b-2 border-brand-600 pb-1 transition cursor-pointer";
        if (tabR) tabR.className = "text-stone-400 pb-1 transition cursor-pointer";
        
        // Тематическое название для входа
        if (submitBtn) {
            submitBtn.innerText = "Зайти на Свалку";
            submitBtn.removeAttribute('data-i18n');
        }
    }
};

window.forgotPassword = async () => {
    const emailEl = document.getElementById('auth-email'); const email = emailEl ? emailEl.value.trim() : '';
    if (!email) { window.showToast("Введите Email!", true); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
    if (error) window.showToast(error.message, true); else window.showToast("Ссылка отправлена на почту!");
};

// 1. Глобальный массив с 20 роботами (СНАРУЖИ функций, чтобы его видели все)
window.avatarsList = [
    "R2D2", "WallE", "Bender", "Optimus", "GLaDOS", "Terminator", "C3PO", "Dalek", "T800", "Megatron",
    "Ultron", "Vision", "Data", "Baymax", "Eve", "Johnny5", "Chappie", "BB8", "K2SO", "HAL9000"
];

// 2. Функция, которая гарантированно отрисует аватарки при регистрации
window.renderRegistrationAvatars = () => {
    const grid = document.getElementById('avatar-grid');
    if (grid) {
        // ИСПРАВЛЕНИЕ: Собираем весь HTML в одну строку (Лечит баг мобильного Safari)
        let html = '';
        window.avatarsList.forEach((a, i) => {
            html += `
                <label class="cursor-pointer shrink-0">
                    <input type="radio" name="avatar" value="https://api.dicebear.com/9.x/bottts/svg?seed=${a}" class="peer hidden" ${i === 0 ? 'checked' : ''}>
                    <img src="https://api.dicebear.com/9.x/bottts/svg?seed=${a}" loading="lazy" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-100 border-2 border-transparent peer-checked:border-brand-600 peer-checked:bg-brand-50 transition-all hover:scale-110 shadow-sm object-cover">
                </label>`;
        });
        grid.innerHTML = html; // Вставляем разом
    }
};

// ВАЖНО: Сразу вызываем функцию при загрузке страницы!
window.renderRegistrationAvatars();

// 3. Функция редактирования профиля
window.openEditProfile = () => {
    if (!window.currentUser) return;
    const meta = window.currentUser.user_metadata || {};

    // Заполнение полей имени и телефона
    document.getElementById('edit-name').value = meta.full_name || '';
    document.getElementById('edit-phone').value = meta.phone || '';

    const grid = document.getElementById('edit-avatar-grid');
    if (grid) {
        // ИСПРАВЛЕНИЕ ДЛЯ МОБИЛЬНЫХ
        let html = '';
        window.avatarsList.forEach((a, i) => {
            const avatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${a}`;
            const isChecked = meta.avatar_url === avatarUrl || (!meta.avatar_url && i === 0);
            html += `
                <label class="cursor-pointer shrink-0">
                    <input type="radio" name="edit_avatar" value="${avatarUrl}" class="peer hidden" ${isChecked ? 'checked' : ''}>
                    <img src="${avatarUrl}" loading="lazy" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-100 border-2 border-transparent peer-checked:border-brand-600 peer-checked:bg-brand-50 transition-all hover:scale-110 shadow-sm object-cover">
                </label>`;
        });
        grid.innerHTML = html;
    }
    window.openModal('edit-profile-modal');
};

window.saveProfile = async (event) => {
    if (event) event.preventDefault();
    const btn = document.getElementById('edit-submit-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>...'; }

    const name = document.getElementById('edit-name').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const avatarEl = document.querySelector('input[name="edit_avatar"]:checked');
    const avatar = avatarEl ? avatarEl.value : 'https://api.dicebear.com/9.x/bottts/svg?seed=R2D2';

    try {
        const { data, error } = await supabase.auth.updateUser({
            data: { full_name: name, avatar_url: avatar, phone: phone }
        });
        if (error) throw error;

        window.currentUser = data.user;
        window.handleAuthChange({ user: data.user });

        window.closeModal('edit-profile-modal');
        window.showToast("Профиль обновлен!");
    } catch (e) {
        window.showToast(e.message, true);
    } finally {
        if (btn) { btn.disabled = false; btn.innerText = "Сохранить изменения"; }
    }
};

// Принятие фильтров на мобилках
window.applyFilters = () => {
    const elCity = document.getElementById('filter-city');
    const elMin = document.getElementById('filter-price-min');
    const elMax = document.getElementById('filter-price-max');

    if (elCity) window.filterCity = elCity.value;
    if (elMin) window.filterPriceMin = elMin.value;
    if (elMax) window.filterPriceMax = elMax.value;

    window.showUrgentOnly = false;
    window.displayedCount = 12;

    window.fetchItems();
};

// Автоматическое применение фильтра "Оплата"
document.addEventListener('change', (e) => {
    if (e.target && e.target.classList.contains('filter-payment')) {
        window.displayedCount = 12; // Сбрасываем счетчик подгрузки
        if (typeof window.fetchItems === 'function') {
            window.fetchItems(false); // Запрашиваем новые данные
        }
    }
});

window.resetFilters = () => {
    const elMin = document.getElementById('filter-price-min');
    const elMax = document.getElementById('filter-price-max');
    const elSearch = document.getElementById('main-search-input');
    if (elMin) elMin.value = '';
    if (elMax) elMax.value = '';
    if (elSearch) elSearch.value = '';

    window.filterCities = [];
    window.filterPriceMin = '';
    window.filterPriceMax = '';
    window.filterCurrency = 'Все';
    window.currentCategory = 'Все';
    window.searchQuery = '';

    // Жестко восстанавливаем кнопки категорий в шапке и блок состояний
    document.querySelectorAll('#main-cats-container .cat-btn').forEach(b => b.style.display = '');
    const condRadios = document.getElementById('condition-radios-wrap');
    if (condRadios) {
        const condBlock = condRadios.parentElement;
        const prevDivider = condBlock.previousElementSibling;
        condBlock.style.display = 'block';
        if (prevDivider && prevDivider.classList.contains('sidebar-divider')) prevDivider.style.display = '';
    }

    // Используем applyCondition, чтобы перерисовать UI чекбоксов и запустить fetchItems
    window.applyCondition('Все');
};

window.subcategoriesMap = {
    'Одежда': [{ val: 'Женская' }, { val: 'Мужская' }, { val: 'Обувь' }, { val: 'Сумки' }, { val: 'Аксессуары' }, { val: 'Спецодежда' }],
    'Детям': [{ val: 'Игрушки' }, { val: 'Коляски' }, { val: 'Одежда' }, { val: 'Обувь' }, { val: 'Автокресла' }, { val: 'Мебель', label: 'Детская мебель' }],
    'Электроника': [{ val: 'Телефоны', label: 'Смартфоны' }, { val: 'ПК', label: 'Компьютеры / ПК' }, { val: 'Ноутбуки' }, { val: 'Планшеты' }, { val: 'ТВ', label: 'ТВ и Видео' }, { val: 'Аудио' }, { val: 'Консоли', label: 'Игры / Консоли' }, { val: 'Бытовая', label: 'Бытовая техника' }, { val: 'Фото', label: 'Фототехника' }],
    'Интерьер': [{ val: 'Мебель' }, { val: 'Декор' }, { val: 'Посуда' }, { val: 'Текстиль' }, { val: 'Ремонт', label: 'Стройматериалы' }, { val: 'Инструменты' }, { val: 'Сад', label: 'Сад и Огород' }],
    'Транспорт': [{ val: 'Авто', label: 'Автомобили' }, { val: 'Мото' }, { val: 'Вело', label: 'Велосипеды' }, { val: 'Самокаты' }, { val: 'Запчасти' }, { val: 'Шины', label: 'Шины и диски' }],
    'Красота': [{ val: 'Косметика' }, { val: 'Парфюмерия' }, { val: 'Уход', label: 'Уход за собой' }, { val: 'Приборы', label: 'Фены и стайлеры' }],
    'Услуги': [{ val: 'Ремонт', label: 'Ремонт техники' }, { val: 'Автосервис' }, { val: 'Стройка', label: 'Ремонт и стройка' }, { val: 'Красота', label: 'Бьюти услуги' }, { val: 'Репетиторы' }, { val: 'Праздники' }],
    'Работа': [{ val: 'Вакансии' }, { val: 'Резюме', label: 'Ищу работу' }],
    'Бизнес': [{ val: 'Оборудование' }, { val: 'Бизнес', label: 'Готовый бизнес' }, { val: 'Сырье', label: 'Сырье и материалы' }],
    'Хобби': [{ val: 'Спорт' }, { val: 'Туризм', label: 'Туризм и палатки' }, { val: 'Книги' }, { val: 'Музыка', label: 'Музыкальные инструменты' }, { val: 'Игры', label: 'Настольные игры' }, { val: 'Коллекции', label: 'Коллекционирование' }],
    'Животные': [{ val: 'Собаки' }, { val: 'Кошки' }, { val: 'Птицы' }, { val: 'Аквариум', label: 'Аквариумистика' }, { val: 'Товары', label: 'Зоотовары' }, { val: 'Другие' }],
    'Жилье': [{ val: 'Аренда' }, { val: 'Посуточно', label: 'Аренда (посуточно)' }, { val: 'Покупка', label: 'Продажа' }, { val: 'Коммерция', label: 'Коммерческая' }, { val: 'Дачи', label: 'Дома и дачи' }],
    'Другое': [{ val: 'Билеты' }, { val: 'Продукты', label: 'Продукты питания' }, { val: 'Разное' }, { val: 'Бесплатно', label: 'Отдам даром' }, { val: 'Бюро', label: 'Бюро находок' }]
};

window.toggleUrgentFilter = () => {
    window.showUrgentOnly = !window.showUrgentOnly; window.displayedCount = 12;
    const btn = document.getElementById('btn-cat-urgent'); const subContainer = document.getElementById('sub-cats-container');
    if (window.showUrgentOnly) {
        if (btn) btn.className = "cat-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition hover:scale-105 bg-red-500 text-white border border-red-500 shadow-md cursor-pointer whitespace-nowrap shrink-0 snap-start";
        window.currentCategory = 'Все';
        document.querySelectorAll('#main-cats-container .cat-btn:not(#btn-cat-urgent)').forEach(b => {
            b.className = "cat-btn px-5 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-brand-500 hover:text-brand-600 dark:hover:border-brand-500 dark:hover:text-brand-500 rounded-xl font-semibold text-sm transition cursor-pointer whitespace-nowrap shrink-0 snap-start";
        });
        if (subContainer) subContainer.classList.add('hidden');
    } else {
        if (btn) btn.className = "cat-btn px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50 rounded-xl font-semibold text-sm transition hover:scale-105 cursor-pointer whitespace-nowrap shrink-0 snap-start";
    }
    window.fetchItems();
};

window.searchTimeout = null;

window.handleSearch = (e) => {
    // ВОТ ЭТОЙ СТРОКИ НЕ ХВАТАЛО: Запоминаем то, что ввел пользователь!
    window.searchQuery = e.target.value;

    const btn = document.getElementById('search-clear-btn');
    if (e.target.value) {
        if (btn) btn.classList.remove('hidden');
    } else {
        if (btn) btn.classList.add('hidden');
    }

    // Очищаем предыдущий таймер
    if (window.searchTimeout) clearTimeout(window.searchTimeout);

    // Ждем 400 мс после последнего нажатия клавиши, прежде чем отправлять запрос
    window.searchTimeout = setTimeout(() => {
        window.fetchItems();
    }, 400);
};

// ФУНКЦИЯ ДЛЯ КРЕСТИКА ОЧИСТКИ
window.clearSearch = () => {
    const input = document.getElementById('main-search-input');
    if (input) {
        input.value = '';
        window.handleSearch({ target: input }); // Запускаем поиск для пустой строки
    }
};

window.handleSort = () => { const el = document.getElementById('sort-select'); if (el) window.currentSortMode = el.value; window.displayedCount = 12; window.fetchItems(); };
window.loadMoreItems = () => { window.displayedCount += 12; window.fetchItems(true); };

window.itemCoords = [44.8125, 20.4612];

window.handleCategoryChange = (e) => {
    const val = e.target ? e.target.value : e;
    const condBlock = document.getElementById('add-condition-block');

    // --- БЛОКИРОВКА ЦЕНЫ ДЛЯ "ОТДАМ ДАРОМ" ---
    const priceInput = document.getElementById('item-price');
    if (priceInput) {
        if (val === 'Другое - Бесплатно') {
            priceInput.value = '0';
            priceInput.disabled = true;
        } else {
            priceInput.disabled = false;
            if (priceInput.value === '0') priceInput.value = ''; // Сбрасываем 0, если передумали
        }
    }

    // --- УПРАВЛЕНИЕ БЛОКОМ "СОСТОЯНИЕ" ---
    if (condBlock) {
        const isAnimalNoCond = val && val.startsWith('Животные') && !val.includes('Товары');
        if (val && (val.includes('Жилье') || val.includes('Недвижимость') || val.includes('Услуги') || val.includes('Работа') || isAnimalNoCond)) {
            condBlock.classList.add('hidden'); condBlock.classList.remove('flex');
        } else {
            condBlock.classList.remove('hidden'); condBlock.classList.add('flex');
        }
    }
    
    // Старый код с картами удален, так как этим теперь управляет функция selectAddType!
};

// =====================================
// АВТОКОМПЛИТ И ГЕОКОДИНГ АДРЕСОВ
// =====================================
window.addressTimeout = null;

window.handleAddressInput = (event) => {
    const query = event.target.value.trim();
    const suggestionsBox = document.getElementById('address-suggestions');

    // Если введено меньше 3 символов, прячем подсказки
    if (query.length < 3) {
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.add('hidden');
        return;
    }

    // Очищаем таймер, чтобы не спамить API при быстром наборе текста
    if (window.addressTimeout) clearTimeout(window.addressTimeout);

    // Устанавливаем задержку 400мс
    window.addressTimeout = setTimeout(async () => {
        try {
            // Ищем адреса (Ограничиваем поиск только Сербией: countrycodes=rs)
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=rs&addressdetails=1&limit=5`);
            const data = await response.json();

            if (data && data.length > 0) {
                const html = data.map(place => `
                    <div class="p-3 hover:bg-brand-50 dark:hover:bg-stone-700 cursor-pointer transition-colors" 
                         onclick="window.selectAddress(${place.lat}, ${place.lon}, '${place.display_name.replace(/'/g, "\\'")}')">
                        <div class="font-bold text-sm text-stone-800 dark:text-white truncate flex items-center gap-2">
                            <i class="fa-solid fa-location-dot text-brand-500 opacity-70"></i> 
                            ${place.display_name.split(',')[0]}
                        </div>
                        <div class="text-xs text-stone-500 truncate pl-5 mt-0.5">${place.display_name}</div>
                    </div>
                `).join('');

                suggestionsBox.innerHTML = html;
                suggestionsBox.classList.remove('hidden');
            } else {
                suggestionsBox.classList.add('hidden');
            }
        } catch (error) {
            console.error("Ошибка API карт:", error);
        }
    }, 400);
};

// Срабатывает при выборе адреса из выпадающего списка
window.selectAddress = (lat, lon, displayName) => {
    const input = document.getElementById('item-address');
    const suggestionsBox = document.getElementById('address-suggestions');

    // Сокращаем адрес до улицы, номера дома и города (оставляем первые 3 части)
    const parts = displayName.split(',');
    input.value = parts.slice(0, 3).join(',').trim();

    suggestionsBox.classList.add('hidden');
    window.itemCoords = [parseFloat(lat), parseFloat(lon)];

    // Синхронизируем карту: перемещаем камеру и маркер
    if (window.addMapObj && window.addMarkerObj) {
        window.addMapObj.setView(window.itemCoords, 16); // Зум 16 для улицы
        window.addMarkerObj.setLatLng(window.itemCoords);
    }
};

// Обратный геокодинг: Кардинаты -> Текст в поле ввода (при перетаскивании маркера)
window.reverseGeocode = async (lat, lon) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        if (data && data.display_name) {
            const input = document.getElementById('item-address');
            const parts = data.display_name.split(',');
            input.value = parts.slice(0, 3).join(',').trim();
        }
    } catch (e) {
        console.error(e);
    }
};

// Скрываем выпадающий список, если пользователь кликнул мимо него
document.addEventListener('click', (e) => {
    const suggestionsBox = document.getElementById('address-suggestions');
    const addressInput = document.getElementById('item-address');
    if (suggestionsBox && !suggestionsBox.contains(e.target) && e.target !== addressInput) {
        suggestionsBox.classList.add('hidden');
    }
});

window.mapItemData = function (i) {
    try {
        return {
            id: i.id, title: i.title || 'Без названия', description: i.description || '', price: i.price || 0, currency: i.currency || 'RSD',
            city: i.city || 'Сербия', imageUrl: i.image_url, images: Array.isArray(i.images) ? i.images : [], authorName: i.author_name || 'Пользователь',
            authorAvatar: i.author_avatar, userId: i.user_id, isHighlighted: i.highlighted_until ? new Date(i.highlighted_until) > new Date() : false, category: i.category || 'Другое', createdAt: i.created_at,
            status: i.status || 'active', phone: i.phone || '',
            address: i.address || '', condition: i.condition || 'Б/У', coords: Array.isArray(i.coords) ? i.coords : [0, 0], delivery: Array.isArray(i.delivery) ? i.delivery : ['Личная встреча'], payment: Array.isArray(i.payment) ? i.payment : ['Наличные'],
            
            // --- СЧЕТЧИКИ ---
            views: i.views || 0,
            favoritesCount: i.favorites_count || 0,
            
            // --- ПОЛЯ ДЛЯ МУЛЬТИ-ШАГОВОЙ ФОРМЫ ---
            item_type: i.item_type || 'product',
            deal_type: i.deal_type,
            area: i.area,
            rooms: i.rooms,
            salary: i.salary,
            work_format: i.work_format,
            schedule: i.schedule,
            company_name: i.company_name
        };
    } catch (err) { return null; }
}

window.navigateItem = (direction, e) => {
    if (e) e.stopPropagation();
    if (!window.loadedItems || !window.activeModalItemId) return;

    // Находим индекс текущего товара в массиве отображаемых
    const currentIndex = window.loadedItems.findIndex(i => i.id === window.activeModalItemId);
    if (currentIndex === -1) return;

    const newIndex = currentIndex + direction;
    
    // Проверяем, есть ли товар в эту сторону
    if (newIndex >= 0 && newIndex < window.loadedItems.length) {
        const nextItem = window.loadedItems[newIndex];
        // Имитируем клик (закрывает старый товар и сразу открывает новый без потери кэша)
        window.openItemDetails(nextItem.id);
    } else {
        // Уведомляем пользователя, если он дошел до конца или начала
        const msg = direction > 0 ? "Это последняя находка в списке" : "Это самая первая находка";
        if (typeof window.showToast === 'function') window.showToast(msg);
    }
};

window.changeItemStatus = async (newStatus) => {
    if (!window.currentUser || !window.activeModalItemId) return;
    try {
        await supabase.from('items').update({ status: newStatus }).eq('id', window.activeModalItemId);
        const item = window.loadedItems.find(i => i.id === window.activeModalItemId);
        if (item) item.status = newStatus;
        window.showToast("Статус обновлен!"); window.openItemDetails(window.activeModalItemId); window.fetchItems(false);
    } catch (e) { window.showToast("Ошибка", true); }
};

window.deleteItem = async (id) => {
    if (!window.currentUser) return;
    if (confirm("Удалить это объявление навсегда?")) {
        try { await supabase.from('items').delete().eq('id', id); window.showToast("Удалено!"); window.closeModal('item-modal'); window.fetchItems(false); } catch (e) { window.showToast("Ошибка удаления", true); }
    }
};

// --- ПОДНЯТИЕ ТОВАРА (Бесплатно или за VIP-токен) ---
window.bumpItem = async () => {
    if (!window.currentUser || !window.activeModalItemId) return;

    // Находим текст кнопки для анимации загрузки
    const btnText = document.getElementById('btn-owner-bump-text');
    let originalText = "В ТОП";
    if (btnText) {
        originalText = btnText.innerText;
        btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>...';
    }

    try {
        // Вызываем нашу умную SQL-функцию, которая сама решит: бесплатно или списать токен
        const { data, error } = await window.supabase.rpc('bump_item', { p_item_id: window.activeModalItemId });
        
        if (error) throw error; 
        
        // Показываем сообщение об успехе (из базы данных)
        window.showToast(data.message || "Объявление успешно поднято в ТОП!");
        
        // Закрываем окно товара и обновляем ленту
        window.closeModal('item-modal');
        if (typeof window.fetchItems === 'function') window.fetchItems(false);
        
        // Обновляем баланс токенов в локальной дате юзера, чтобы интерфейс обновился без перезагрузки
        if (data.type === 'token' && window.currentUserData) {
             window.currentUserData.vip_tokens = Math.max(0, (window.currentUserData.vip_tokens || 0) - 1);
        }

    } catch (err) {
        console.error("Ошибка поднятия:", err);
        // Выводим текст ошибки прямо из базы данных (например: "Достигнут лимит", "Кулдаун" и т.д.)
        window.showToast(err.message || "Произошла ошибка при поднятии", true);
        
        // Если ошибка связана с нехваткой токенов/лимитом — предлагаем докупить
        if (err.message && err.message.includes('Купите VIP-токены')) {
             setTimeout(() => window.openModal('token-purchase-modal'), 1500);
        }
    } finally {
        // Возвращаем текст кнопке
        if (btnText && btnText.innerHTML.includes('spinner')) {
            btnText.innerText = originalText;
        }
    }
};

window.highlightItem = async () => {
    if (!window.currentUser || !window.activeModalItemId) return;

    if (!confirm("Потратить 1 VIP-токен, чтобы выделить объявление и поместить в ТОП на 7 дней?")) return;

    const btn = document.getElementById('btn-owner-vip');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>...';
    btn.disabled = true;

    try {
        // Вызываем защищенную SQL-функцию
        const { error } = await supabase.rpc('spend_vip_token', { p_item_id: window.activeModalItemId });
        if (error) throw error;

        window.showToast("Объявление отправлено в ТОП!");
        window.closeModal('item-modal');
        window.fetchItems(false);
    } catch (e) {
        console.error("VIP error:", e);
        window.showToast(e.message || "Нет доступных VIP-токенов", true);
        // Если токенов нет — предлагаем купить PRO
        setTimeout(() => window.openModal('crypto-modal'), 1500);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

window.editItem = async (id) => {
    if (!window.currentUser) return;
    const item = window.loadedItems.find(i => i.id === id);
    if (!item) return;
    window.editingItemId = id;

    // 1. СРАЗУ ВКЛЮЧАЕМ НУЖНЫЙ РЕЖИМ (Пропускаем выбор "Что публикуем?")
    const itemType = item.item_type || 'product';
    window.selectAddType(itemType);

    // 2. ЗАПОЛНЯЕМ ОБЩИЕ ПОЛЯ
    document.getElementById('item-title').value = item.title || '';
    document.getElementById('item-city').value = item.city || '';
    document.getElementById('item-price').value = item.price || '';
    document.getElementById('item-currency').value = item.currency || 'RSD';
    document.getElementById('item-phone').value = item.phone || '';
    document.getElementById('item-desc').value = item.description || '';

    // 3. ЗАПОЛНЯЕМ СПЕЦИФИЧЕСКИЕ ПОЛЯ И ПЕРЕСТРАИВАЕМ ФОРМУ
    if (itemType === 'product') {
        document.getElementById('item-category').value = item.category || '';
        // Вызываем проверку, чтобы скрыть/показать блок "Состояние" 
        if (typeof window.handleCategoryChange === 'function') {
            window.handleCategoryChange(item.category || '');
        }
    } else if (itemType === 'estate') {
        document.getElementById('estate-deal-type').value = item.deal_type || 'Аренда';
        document.getElementById('estate-area').value = item.area || '';
        document.getElementById('estate-rooms').value = item.rooms || '';
    } else if (itemType === 'job') {
        document.getElementById('job-company').value = item.company_name || '';
        document.getElementById('job-format').value = item.work_format || '';
        document.getElementById('job-schedule').value = item.schedule || '';
    }

    const addressInput = document.getElementById('item-address');
    if (addressInput) addressInput.value = item.address || '';
    
    if (item.coords && Array.isArray(item.coords) && item.coords[0] !== 0) {
        window.itemCoords = item.coords;
    }

    // 4. МЕНЯЕМ ЗАГОЛОВКИ (selectAddType их сбрасывает, поэтому меняем после него)
    document.getElementById('add-modal-title').innerText = "Редактировать";
    document.getElementById('add-submit-btn').innerText = "Сохранить изменения";

    window.editExistingImages = item.images || [];
    window.tempPhotos = []; 
    window.renderPhotoPreviews();

    document.getElementById('del-meet').checked = item.delivery ? item.delivery.includes('Личная встреча') : true;
    document.getElementById('del-post').checked = item.delivery ? item.delivery.includes('PostExpress') : false;
    
    // 5. ПЕРЕКЛЮЧАЕМ ОКНА
    window.closeModal('item-modal'); 
    window.openModal('add-modal');
    
    // Для недвижимости и вакансий рендерим карту после открытия окна, чтобы не сбились размеры
    if (itemType === 'estate' || itemType === 'job') {
        setTimeout(() => { if (typeof window.initAddMap === 'function') window.initAddMap(); }, 300);
    }
};

window.currentAddType = 'product';

window.selectAddType = (type) => {
    window.currentAddType = type;
    const step1 = document.getElementById('add-step-1');
    const form = document.getElementById('add-form');
    const title = document.getElementById('add-modal-title');
    const mapContainer = document.getElementById('add-map-container');
    
    // Подключаем переводчик
    const t = window.t || (txt => txt);

    step1.classList.add('hidden');
    form.classList.remove('hidden');
    form.classList.add('flex');
    
    document.getElementById('add-block-product').classList.add('hidden');
    document.getElementById('add-block-product').classList.remove('flex');
    document.getElementById('add-block-estate').classList.add('hidden');
    document.getElementById('add-block-estate').classList.remove('flex');
    document.getElementById('add-block-job').classList.add('hidden');
    document.getElementById('add-block-job').classList.remove('flex');
    
    if(type === 'product') {
        title.innerText = t('modal_add_item'); // ПЕРЕВОД ЗДЕСЬ
        document.getElementById('add-block-product').classList.remove('hidden');
        document.getElementById('add-block-product').classList.add('flex');
        document.getElementById('item-category').required = true;
        mapContainer.classList.add('hidden');
        mapContainer.classList.remove('flex');
    } else if(type === 'estate') {
        title.innerText = t('modal_add_estate'); // ПЕРЕВОД ЗДЕСЬ
        document.getElementById('add-block-estate').classList.remove('hidden');
        document.getElementById('add-block-estate').classList.add('flex');
        document.getElementById('item-category').required = false;
        mapContainer.classList.remove('hidden');
        mapContainer.classList.add('flex');
        window.initAddMap();
    } else if(type === 'job') {
        title.innerText = t('modal_add_job'); // ПЕРЕВОД ЗДЕСЬ
        document.getElementById('add-block-job').classList.remove('hidden');
        document.getElementById('add-block-job').classList.add('flex');
        document.getElementById('item-category').required = false;
        mapContainer.classList.remove('hidden');
        mapContainer.classList.add('flex');
        window.initAddMap();
    }
};

window.backToAddStep1 = () => {
    document.getElementById('add-step-1').classList.remove('hidden');
    document.getElementById('add-form').classList.add('hidden');
    document.getElementById('add-form').classList.remove('flex');
    document.getElementById('add-modal-title').innerText = 'Что публикуем?';
};

// ==========================================
// 3. БЕЗТАЙМЕРНАЯ ИНИЦИАЛИЗАЦИЯ КАРТЫ (ResizeObserver)
// ==========================================
window.initAddMap = async () => {
    if (typeof window.loadMapLibrary === 'function') {
        await window.loadMapLibrary();
    }
    if (typeof L === 'undefined') return;

    const mapContainer = document.getElementById('add-map');
    if (!mapContainer) return;

    // Инициализируем или обновляем объект карты
    if (!window.addMapObj) {
        window.addMapObj = L.map('add-map').setView(window.itemCoords || [44.8125, 20.4612], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(window.addMapObj);
        window.addMarkerObj = L.marker(window.itemCoords || [44.8125, 20.4612], { draggable: true }).addTo(window.addMapObj);
        
        window.addMarkerObj.on('dragend', async function () {
            const pos = window.addMarkerObj.getLatLng();
            window.itemCoords = [pos.lat, pos.lng];
            await window.reverseGeocode(pos.lat, pos.lng);
        });
        
        window.addMapObj.on('click', async function (event) {
            window.itemCoords = [event.latlng.lat, event.latlng.lng];
            window.addMarkerObj.setLatLng(window.itemCoords);
            await window.reverseGeocode(window.itemCoords[0], window.itemCoords[1]);
        });
    } else {
        window.addMarkerObj.setLatLng(window.itemCoords || [44.8125, 20.4612]);
        window.addMapObj.setView(window.itemCoords || [44.8125, 20.4612], 13);
    }

    // Уничтожаем setTimeout. Используем ResizeObserver, который сам поймет, когда DOM отрисовался
    if (!window.addMapObserver) {
        window.addMapObserver = new ResizeObserver(() => {
            if (window.addMapObj && mapContainer.clientWidth > 0) {
                window.addMapObj.invalidateSize();
            }
        });
        window.addMapObserver.observe(mapContainer);
    }
};

window.submitNewItem = async (event) => {
    if (event) event.preventDefault();

    const btn = document.getElementById('add-submit-btn');
    const progCont = document.getElementById('submit-progress-container');
    const progBar = document.getElementById('submit-progress-bar');
    const progText = document.getElementById('submit-progress-text');
    const progPerc = document.getElementById('submit-progress-percent');

    if (btn) btn.style.display = 'none';
    if (progCont) { progCont.classList.remove('hidden'); progCont.classList.add('flex'); }
    if (progBar) progBar.style.width = '0%';

    try {
        if (!window.currentUser) throw new Error("Войдите в аккаунт");

        const titleEl = document.getElementById('item-title').value.trim();
        const cityEl = document.getElementById('item-city').value;
        const priceEl = document.getElementById('item-price').value;
        const currencyEl = document.getElementById('item-currency').value;
        const addressEl = document.getElementById('item-address') ? document.getElementById('item-address').value.trim() : '';
        const phoneEl = document.getElementById('item-phone') ? document.getElementById('item-phone').value.trim() : '';
        const descEl = document.getElementById('item-desc').value.trim();

        let categoryEl = 'Другое';
        let conditionEl = 'Б/У';
        let paymentArr = [];
        let deliveryArr = [];
        let dealType = null, area = null, rooms = null, salary = null, workFormat = null, schedule = null, companyName = null;

        if (window.currentAddType === 'product') {
            categoryEl = document.getElementById('item-category').value;
            conditionEl = document.querySelector('input[name="item-condition"]:checked')?.value || 'Б/У';
            if (document.getElementById('pay-cash')?.checked) paymentArr.push('Наличные');
            if (document.getElementById('pay-card')?.checked) paymentArr.push('Перевод на карту');
            if (document.getElementById('pay-crypto')?.checked) paymentArr.push('Криптоперевод');
            if (document.getElementById('del-meet')?.checked) deliveryArr.push('Личная встреча');
            if (document.getElementById('del-post')?.checked) deliveryArr.push('PostExpress');
            if (!categoryEl) throw new Error("Выберите категорию");
        } else if (window.currentAddType === 'estate') {
            dealType = document.getElementById('estate-deal-type').value;
            categoryEl = 'Жилье - ' + dealType;
            area = document.getElementById('estate-area').value;
            rooms = document.getElementById('estate-rooms').value;
            if(!area) throw new Error("Укажите площадь");
        } else if (window.currentAddType === 'job') {
            categoryEl = 'Работа - Вакансии';
            companyName = document.getElementById('job-company').value.trim();
            workFormat = document.getElementById('job-format').value;
            schedule = document.getElementById('job-schedule').value;
            salary = priceEl;
            if(!companyName) throw new Error("Укажите компанию");
        }

        if (!titleEl || !cityEl || !priceEl) throw new Error("Заполните все обязательные поля");

        let finalImages = window.editingItemId ? (window.editExistingImages || []) : [];
        function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
            return new Blob([ab], { type: mimeString });
        }

        if (window.tempPhotos && window.tempPhotos.length > 0) {
            const totalPhotos = window.tempPhotos.length;
            for (let i = 0; i < totalPhotos; i++) {
                const dataUrl = window.tempPhotos[i];
                if (dataUrl.startsWith('http')) {
                    finalImages.push(dataUrl);
                } else {
                    if (progText) progText.innerText = `Обработка фото ${i + 1} из ${totalPhotos}...`;
                    const blob = dataURItoBlob(dataUrl);
                    const fileName = `${window.currentUser.id}_${Date.now()}_${i}.jpg`;
                    const { error } = await window.supabase.storage.from('item-images').upload(fileName, blob, { contentType: 'image/jpeg' });
                    if (error) throw error;
                    const { data } = window.supabase.storage.from('item-images').getPublicUrl(fileName);
                    if (data && data.publicUrl) finalImages.push(data.publicUrl);
                }
                const progress = Math.round(((i + 1) / totalPhotos) * 90);
                if (progBar) progBar.style.width = `${progress}%`;
                if (progPerc) progPerc.innerText = `${progress}%`;
            }
        }

        if (progText) progText.innerText = `Сохранение данных...`;
        if (progBar) progBar.style.width = `95%`;
        if (progPerc) progPerc.innerText = `95%`;

        const itemData = {
            item_type: window.currentAddType || 'product',
            title: titleEl,
            category: categoryEl,
            city: cityEl,
            price: parseFloat(priceEl) || 0,
            currency: currencyEl,
            address: addressEl,
            phone: phoneEl,
            description: descEl,
            condition: conditionEl,
            payment: paymentArr,
            delivery: deliveryArr,
            images: finalImages,
            image_url: finalImages[0] || '',
            user_id: window.currentUser.id,
            author_name: window.currentUser.user_metadata?.name || window.currentUser.user_metadata?.full_name || 'Продавец',
            author_avatar: window.currentUser.user_metadata?.avatar_url || '',
            status: 'active',
            coords: window.itemCoords || [0,0],
            deal_type: dealType,
            area: area ? parseFloat(area) : null,
            rooms: rooms,
            salary: salary ? parseFloat(salary) : null,
            work_format: workFormat,
            schedule: schedule,
            company_name: companyName
        };

        if (window.editingItemId) {
            const { error } = await window.supabase.from('items').update(itemData).eq('id', window.editingItemId);
            if (error) throw error;
        } else {
            const { error } = await window.supabase.from('items').insert([itemData]);
            if (error) throw error;
        }

        if (progBar) progBar.style.width = `100%`;
        if (progPerc) progPerc.innerText = `100%`;

        window.showToast(window.editingItemId ? "Обновлено!" : "Опубликовано!");
        window.closeModal('add-modal');
        document.getElementById('add-form').reset();
        window.tempPhotos = [];
        const photoList = document.getElementById('photo-preview-list');
        if (photoList) photoList.innerHTML = '';
        
        window.backToAddStep1(); // Сброс на первый шаг

        if (typeof window.fetchItems === 'function') window.fetchItems(false);
        if (typeof window.renderProfileTabs === 'function') window.renderProfileTabs();
    } catch (e) {
        console.error("Ошибка публикации:", e);
        window.showToast(`Ошибка: ${e.message}`, true);
    } finally {
        if (progCont) { progCont.classList.add('hidden'); progCont.classList.remove('flex'); }
        if (btn) {
            btn.style.display = 'block';
            btn.innerHTML = window.editingItemId ? `Сохранить` : `Опубликовать`;
        }
    }
};

window.renderPhotoPreviews = () => {
    const list = document.getElementById('photo-preview-list'); if (!list) return; let html = '';
    (window.editExistingImages || []).forEach((src, i) => {
        html += `<div class="relative w-16 h-16 sm:w-20 sm:h-20 bg-stone-100 rounded-xl shrink-0 border border-stone-200 dark:border-stone-700 mt-2"><img src="${src}" class="w-full h-full object-cover rounded-xl"><button type="button" onclick="window.removePhoto('existing', ${i})" class="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-[10px] flex items-center justify-center shadow-md hover:scale-110 hover:bg-red-600 transition cursor-pointer z-10"><i class="fa-solid fa-xmark"></i></button></div>`;
    });
    (window.tempPhotos || []).forEach((dataUrl, i) => {
        html += `<div class="relative w-16 h-16 sm:w-20 sm:h-20 bg-stone-100 rounded-xl shrink-0 border border-stone-200 dark:border-stone-700 mt-2"><img src="${dataUrl}" class="w-full h-full object-cover rounded-xl"><button type="button" onclick="window.removePhoto('temp', ${i})" class="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-[10px] flex items-center justify-center shadow-md hover:scale-110 hover:bg-red-600 transition cursor-pointer z-10"><i class="fa-solid fa-xmark"></i></button></div>`;
    });
    list.innerHTML = html;
};

window.removePhoto = (type, index) => { if (type === 'existing') window.editExistingImages.splice(index, 1); else window.tempPhotos.splice(index, 1); window.renderPhotoPreviews(); };

window.previewPhotos = async (e) => {
    const files = Array.from(e.target.files); 
    const isPro = window.currentUserData && window.currentUserData.is_pro;
    const maxPhotos = isPro ? 10 : 5; 
    const currentTotal = (window.editExistingImages?.length || 0) + (window.tempPhotos?.length || 0);
    
    if (currentTotal + files.length > maxPhotos) { 
        window.showToast(`Доступно максимум ${maxPhotos} фото ${isPro ? '' : '(Купите PRO для 10)'}`, true);
        e.target.value = ''; 
        return; 
    }

    for (let file of files) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1000; const MAX_HEIGHT = 1000; 
                let width = img.width; let height = img.height;
                
                if (width > height) { 
                    if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } 
                } else { 
                    if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } 
                }
                
                canvas.width = width;
                canvas.height = height; 
                const ctx = canvas.getContext('2d'); 
                
                // 1. Сначала отрисовываем оригинальную фотографию (сжатую)
                ctx.drawImage(img, 0, 0, width, height);

                // 2. СРАЗУ НАКЛАДЫВАЕМ ВОДЯНОЙ ЗНАК SVALKA
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // Белый цвет, 40% прозрачности
                ctx.font = `bold ${Math.floor(width / 10)}px Montserrat, sans-serif`; // Размер текста зависит от размера фото
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Добавляем темную тень, чтобы белый текст читался даже на белом фоне
                ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
                ctx.shadowBlur = 12;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                
                // Печатаем текст ровно по центру фотографии
                ctx.fillText('SVALKA.TRADE', width / 2, height / 2);

                // 3. Сохраняем готовую картинку в предпросмотр (уже с водяным знаком)
                window.tempPhotos.push(canvas.toDataURL('image/jpeg', 0.8)); 
                window.renderPhotoPreviews();
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
    e.target.value = '';
};

window.switchProfileTab = tab => {
    window.currentProfileTab = tab;
    const t1 = document.getElementById('tab-my-items'); const t2 = document.getElementById('tab-my-saved');
    if (t1) { if (tab === 'items') { t1.classList.add('active', 'border-brand-600', 'text-brand-600'); t1.classList.remove('border-transparent', 'text-stone-400'); } else { t1.classList.remove('active', 'border-brand-600', 'text-brand-600'); t1.classList.add('border-transparent', 'text-stone-400'); } }
    if (t2) { if (tab === 'saved') { t2.classList.add('active', 'border-brand-600', 'text-brand-600'); t2.classList.remove('border-transparent', 'text-stone-400'); } else { t2.classList.remove('active', 'border-brand-600', 'text-brand-600'); t2.classList.add('border-transparent', 'text-stone-400'); } }
    window.renderProfileTabs();
};

window.renderProfileTabs = async () => {
    const grid = document.getElementById('profile-items-grid'); const empty = document.getElementById('profile-empty');
    if (!grid || !empty || !window.currentUser) return;
    grid.style.display = 'none'; empty.style.display = 'none';

    try {
        const favCount = window.userFavorites ? window.userFavorites.size : 0;
        const tabSaved = document.getElementById('tab-my-saved'); if (tabSaved) tabSaved.innerText = `${window.t('Склад')} (${favCount})`;

        let items = [];
        if (window.currentProfileTab === 'items') {
            const { data } = await supabase.from('items').select('*').eq('user_id', window.currentUser.id).order('created_at', { ascending: false });
            items = (data || []).map(window.mapItemData).filter(Boolean);
            const tabItems = document.getElementById('tab-my-items'); if (tabItems) tabItems.innerText = `${window.t('Мои вещи')} (${items.length})`;
        } else {
            const favIds = Array.from(window.userFavorites);
            if (favIds.length > 0) {
                const { data } = await supabase.from('items').select('*').in('id', favIds).order('created_at', { ascending: false });
                items = (data || []).map(window.mapItemData).filter(Boolean);
            }
        }

        items.forEach(v => { const exists = window.loadedItems.findIndex(i => i.id === v.id); if (exists === -1) window.loadedItems.push(v); else window.loadedItems[exists] = v; });
        if (items.length > 0) { grid.style.display = 'grid'; grid.innerHTML = items.map(i => window.createCardHtml(i, i.isHighlighted, true)).join(''); }
        else { empty.style.display = 'flex'; }
    } catch (e) { }
};

window.filterProfileItems = (input, gridId) => {
    const term = input.value.toLowerCase().trim(); const grid = document.getElementById(gridId); if (!grid) return;
    const cards = grid.querySelectorAll('.item-card'); let hasVisible = false;
    cards.forEach(card => { const title = card.querySelector('h4').innerText.toLowerCase(); if (title.includes(term)) { card.style.display = 'flex'; hasVisible = true; } else { card.style.display = 'none'; } });
    const emptyState = document.getElementById(gridId.replace('-grid', '-empty'));
    if (emptyState) { if (!hasVisible && cards.length > 0) { emptyState.style.display = 'flex'; emptyState.querySelector('span').innerText = 'Ничего не найдено'; } else if (cards.length > 0) { emptyState.style.display = 'none'; } }
};

const originalSwitchTab = window.switchProfileTab;
window.switchProfileTab = (tab) => { const searchInput = document.getElementById('profile-search-input'); if (searchInput) searchInput.value = ''; originalSwitchTab(tab); };

window.applyCondition = (val) => {
    window.filterCondition = val;

    // Категории, у которых не бывает "Состояния"
    const noConditionCats = ['Услуги', 'Работа', 'Жилье', 'Животные'];

    // Если выбрали Б/У или Новое, а текущая категория "безусловная", сбрасываем ее
    if (val !== 'Все' && noConditionCats.some(c => window.currentCategory.startsWith(c))) {
        window.currentCategory = 'Все';

        // Сбрасываем визуально активные кнопки в шапке
        document.querySelectorAll('#main-cats-container .cat-btn:not(#btn-cat-urgent)').forEach(b => {
            b.className = "cat-btn px-5 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-brand-500 hover:text-brand-600 dark:hover:border-brand-500 dark:hover:text-brand-500 rounded-xl font-semibold text-sm transition cursor-pointer whitespace-nowrap shrink-0 snap-start";
        });

        const allBtn = document.querySelector('#main-cats-container .cat-btn[data-cat="Все"]');
        if (allBtn) allBtn.className = "cat-btn active px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm bg-brand-600 text-white border border-brand-600 cursor-pointer whitespace-nowrap shrink-0 snap-start";

        const subContainer = document.getElementById('sub-cats-container');
        if (subContainer) { subContainer.innerHTML = ''; subContainer.classList.add('hidden'); }
    }

    // Прячем или показываем несовместимые кнопки в верхнем скролле
    document.querySelectorAll('#main-cats-container .cat-btn').forEach(b => {
        const catName = b.dataset.cat;
        if (noConditionCats.includes(catName)) {
            b.style.display = (val !== 'Все') ? 'none' : '';
        }
    });

    // Перерисовываем сайдбар
    if (window.renderSidebarCategories) window.renderSidebarCategories();

    window.applyFilters();
};

setTimeout(window.renderSidebarCategories, 200);

window.selectCustomCat = (val, label, e) => {
    if (e) e.stopPropagation(); const input = document.getElementById('filter-category'); const labelEl = document.getElementById('custom-cat-label');
    if (input) input.value = val; if (labelEl) labelEl.innerText = label;
    const dd = document.getElementById('custom-cat-dropdown'); if (dd && !dd.classList.contains('hidden')) window.toggleCustomCat();
};

document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('custom-cat-wrapper'); const dd = document.getElementById('custom-cat-dropdown');
    if (wrapper && !wrapper.contains(e.target) && dd && !dd.classList.contains('hidden')) window.toggleCustomCat();
});

setTimeout(window.renderCustomCategorySelect, 200);

// --- ПРОФЕССИОНАЛЬНЫЕ ФИЛЬТРЫ (Авито-стиль) ---

// 1. Отрисовка Категорий
window.renderSidebarCategories = () => {
    const container = document.getElementById('sidebar-categories');
    if (!container || !window.subcategoriesMap) return;

    let html = `<button onclick="window.filterByCategory('Все', event)" class="text-left w-full py-1.5 text-sm font-bold ${window.currentCategory === 'Все' ? 'text-brand-600' : 'text-stone-700 dark:text-stone-300 hover:text-brand-600'} transition-colors">${window.t('Все категории')}</button>`;
    const noConditionCats = ['Услуги', 'Работа', 'Жилье', 'Животные'];

    for (const [mainCat, subs] of Object.entries(window.subcategoriesMap)) {
        if (window.filterCondition !== 'Все' && noConditionCats.includes(mainCat)) continue;
        const isActiveMain = window.currentCategory.startsWith(mainCat);
        html += `
        <div class="sidebar-cat-group mt-1">
            <div class="flex items-center justify-between group cursor-pointer" onclick="window.toggleSidebarCat(this)">
                <button onclick="window.filterByCategory('${mainCat}', event, true)" class="text-left flex-1 py-1.5 text-sm font-bold ${isActiveMain ? 'text-brand-600' : 'text-stone-700 dark:text-stone-300 hover:text-brand-600'} transition-colors">${window.t(mainCat)}</button>
                <i class="fa-solid fa-chevron-down text-[10px] text-stone-400 transition-transform duration-300 ${isActiveMain ? 'rotate-180' : ''}"></i>
            </div>
            <div class="sidebar-sub-cats pl-3 border-l-2 border-brand-500/20 ml-1.5 flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ease-in-out ${isActiveMain ? 'max-h-[500px] mt-1 mb-2 opacity-100' : 'max-h-0 opacity-0'}">`;
        subs.forEach(sub => {
            const fullCat = `${sub.prefix || mainCat} - ${sub.val}`;
            html += `<button onclick="window.filterByCategory('${fullCat}', event, true)" class="text-left py-1 text-sm font-medium ${window.currentCategory === fullCat ? 'text-brand-600 font-bold' : 'text-stone-500 dark:text-stone-400 hover:text-brand-600'} transition-colors">${window.t(sub.label || sub.val)}</button>`;
        });
        html += `</div></div>`;
    }
    container.innerHTML = html;
};

// 2. Отрисовка Городов (Чекбоксы с мультивыбором)
window.renderSidebarCities = () => {
    const container = document.getElementById('sidebar-cities');
    const cities = ["Белград", "Нови-Сад", "Ниш", "Крагуевац", "Суботица", "Зренянин", "Панчево", "Чачак", "Кралево", "Нови-Пазар", "Смедерево", "Лесковац", "Вране", "Сомбор", "Другой"];
    if (!container) return;

    container.innerHTML = cities.map(city => {
        const isChecked = window.filterCities.includes(city);
        return `
        <label class="flex items-center gap-3 cursor-pointer group py-1">
            <input type="checkbox" value="${city}" onchange="window.toggleCity(this.value, this.checked)" class="hidden peer" ${isChecked ? 'checked' : ''}>
            <div class="w-5 h-5 rounded border-2 border-stone-300 dark:border-stone-600 peer-checked:bg-brand-500 peer-checked:border-brand-500 flex items-center justify-center transition-all shrink-0">
                <i class="fa-solid fa-check text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity"></i>
            </div>
            <span class="text-sm font-bold text-stone-700 dark:text-stone-300 group-hover:text-brand-600 transition-colors">${window.t(city)}</span>
        </label>
    `}).join('');
};

window.toggleCity = (city, isChecked) => {
    if (isChecked) {
        if (!window.filterCities.includes(city)) window.filterCities.push(city);
    } else {
        window.filterCities = window.filterCities.filter(c => c !== city);
    }
    window.applyFilters();
};

// 3. Универсальный рендер Радио-кнопок (для Состояния и Валюты)
window.renderCustomRadios = (id, name, options, currentVal, callbackName) => {
    const container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = options.map(opt => `
        <label class="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="${name}" value="${opt.val}" onchange="window.${callbackName}(this.value)" class="hidden peer" ${currentVal === opt.val ? 'checked' : ''}>
            <div class="w-5 h-5 rounded border-2 border-stone-300 dark:border-stone-600 peer-checked:bg-brand-500 peer-checked:border-brand-500 flex items-center justify-center transition-all">
                <i class="fa-solid fa-check text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity"></i>
            </div>
            <span class="text-sm font-bold text-stone-700 dark:text-stone-300 group-hover:text-brand-600 transition-colors">${opt.label}</span>
        </label>
    `).join('');
};

window.applyCurrency = (val) => { window.filterCurrency = val; window.applyFilters(); };

window.toggleSidebarCat = (element) => {
    // 1. Применяем фильтр (если клик был по галочке/строке, а не по самой кнопке)
    const btn = element.querySelector('button');
    if (btn && window.event && window.event.target !== btn) {
        btn.click();
    }

    // 2. Независимое визуальное открытие/закрытие списка подкатегорий
    const subWrap = element.nextElementSibling;
    const icon = element.querySelector('i.fa-chevron-down');

    if (subWrap) {
        if (subWrap.classList.contains('max-h-0')) {
            subWrap.classList.remove('max-h-0', 'opacity-0');
            subWrap.classList.add('max-h-[500px]', 'mt-1', 'mb-2', 'opacity-100');
            if (icon) icon.classList.add('rotate-180');
        } else {
            subWrap.classList.add('max-h-0', 'opacity-0');
            subWrap.classList.remove('max-h-[500px]', 'mt-1', 'mb-2', 'opacity-100');
            if (icon) icon.classList.remove('rotate-180');
        }
    }
};

// Инициализация при загрузке
window.initSidebar = () => {
    window.renderSidebarCategories();
    window.renderSidebarCities();
    window.renderCustomRadios('condition-radios-wrap', 'cond', [{ val: 'Все', label: window.t('Любое') }, { val: 'Новое', label: '✨ ' + window.t('Новое') }, { val: 'Б/У', label: '♻️ ' + window.t('Б/У') }], window.filterCondition, 'applyCondition');
    window.renderCustomRadios('currency-radios-wrap', 'curr', [{ val: 'Все', label: window.t('Любая') }, { val: 'RSD', label: 'RSD (' + window.t('Динары') + ')' }, { val: 'EUR', label: 'EUR (' + window.t('Евро') + ')' }], window.filterCurrency, 'applyCurrency');
};

// --- ЛОГИКА КАСТОМНОЙ СОРТИРОВКИ ---
window.toggleSortMenu = () => {
    const menu = document.getElementById('custom-sort-menu');
    const icon = document.getElementById('custom-sort-icon');
    if (menu) menu.classList.toggle('hidden');
    if (icon) icon.classList.toggle('rotate-180');
};

window.selectSort = (val, label) => {
    document.getElementById('custom-sort-label').innerText = label;
    document.getElementById('sort-select').value = val;
    window.toggleSortMenu();
    if (window.handleSort) window.handleSort(); // Запускаем фильтрацию
};

// Закрываем меню сортировки при клике в любое другое место экрана
document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('custom-sort-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        document.getElementById('custom-sort-menu')?.classList.add('hidden');
        document.getElementById('custom-sort-icon')?.classList.remove('rotate-180');
    }
});

setTimeout(window.initSidebar, 200);
window.fetchItems();
const urlParams = new URLSearchParams(window.location.search);
const itemIdFromUrl = urlParams.get('item'); if (itemIdFromUrl) window.openItemDetails(itemIdFromUrl);

window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const item = params.get('item');
    if (item) {
        window.openItemDetails(item);
    } else {
        // Если нажали "Назад" на главную — жестко закрываем весь стек окон
        if (window.modalStack) {
            window.modalStack.forEach(id => {
                const el = document.getElementById(id);
                if (el) { el.classList.remove('active'); el.style.display = ''; }
            });
            window.modalStack = [];
        }
        document.body.classList.remove('modal-open');
    }
});

// --- ПЕРЕКЛЮЧЕНИЕ ВИДА (СЕТКА / СПИСОК) ---
window.currentViewMode = localStorage.getItem('svalka_view_mode') || 'grid';

window.setViewMode = (mode) => {
    window.currentViewMode = mode;
    localStorage.setItem('svalka_view_mode', mode);

    // Триггер для CSS: включаем режим сайдбара
    if (mode === 'list') { document.body.classList.add('is-list-mode'); }
    else { document.body.classList.remove('is-list-mode'); }

    const btnGrid = document.getElementById('btn-view-grid');
    const btnList = document.getElementById('btn-view-list');
    const grid = document.getElementById('main-items-grid');

    if (btnGrid && btnList) {
        // Задаем базовые классы, чтобы кнопки всегда сохраняли центрирование и размер
        const baseClass = "h-full px-3 rounded-md transition cursor-pointer flex items-center justify-center ";
        const activeClass = baseClass + "bg-white dark:bg-stone-600 shadow-sm text-brand-600 dark:text-brand-400";
        const inactiveClass = baseClass + "text-stone-400 hover:text-brand-600";

        if (mode === 'grid') {
            btnGrid.className = activeClass;
            btnList.className = inactiveClass;
        } else {
            btnList.className = activeClass;
            btnGrid.className = inactiveClass;
        }
    }

    // Восстановили переключение классов самой сетки!
    if (grid) {
        grid.classList.remove('view-grid', 'view-list');
        grid.classList.add(`view-${mode}`);
    }
};

// --- УЛУЧШЕННОЕ УПРАВЛЕНИЕ ОКНАМИ (Esc, клик вне окна, стрелочки) ---

// 1. Закрытие по клику вне окна (используем mousedown для 100% срабатывания)
document.addEventListener('mousedown', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('modal-overlay')) {
        window.closeModal(e.target.id);
    }
});

// 2. Управление с клавиатуры
document.addEventListener('keydown', (e) => {
    // Находим все открытые окна
    const openModals = Array.from(document.querySelectorAll('.modal-overlay.active'));
    if (openModals.length === 0) return;

    // Сортируем их по z-index, чтобы найти самое верхнее (то, что видит юзер)
    openModals.sort((a, b) => {
        const zA = parseInt(window.getComputedStyle(a).zIndex) || 0;
        const zB = parseInt(window.getComputedStyle(b).zIndex) || 0;
        return zB - zA;
    });
    const topModal = openModals[0];

    // Закрытие верхнего окна по Esc
    if (e.key === 'Escape') {
        window.closeModal(topModal.id);
        return;
    }

    // Защита: не перелистываем, если пользователь вводит текст (например, пишет в поиске)
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (['INPUT', 'TEXTAREA'].includes(activeTag)) return;

    // Перелистывание товаров (если открыта карточка)
    if (topModal.id === 'item-modal') {
        if (e.key === 'ArrowLeft') window.navigateItem(-1);
        if (e.key === 'ArrowRight') window.navigateItem(1);
    }

    // Перелистывание фото (если открыт полноэкранный режим просмотра картинки)
    if (topModal.id === 'lightbox') {
        if (e.key === 'ArrowLeft') window.lightboxPrev();
        if (e.key === 'ArrowRight') window.lightboxNext();
    }
});

// --- УМНЫЕ СВАЙПЫ ПАЛЬЦЕМ (Только для фото) ---
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Вешаем свайп только на контейнер с фото, чтобы не мешать скроллить текст описания
const imgContainer = document.getElementById('modal-img-container');
if (imgContainer) {
    imgContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    imgContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Проверяем: это действительно жест "влево-вправо", а не прокрутка "вниз-вверх"?
        if (Math.abs(diffX) > Math.abs(diffY)) {
            const swipeThreshold = 40; // Чувствительность в пикселях

            if (diffX > swipeThreshold) {
                window.navigateItem(1); // Свайп влево -> следующий
            } else if (diffX < -swipeThreshold) {
                window.navigateItem(-1); // Свайп вправо -> предыдущий
            }
        }
    }, { passive: true });
}

// 1. ОТКРЫТИЕ ОКНА И ПРОВЕРКА КУЛДАУНА
window.bumpViaShare = async (itemId = null) => {
    const targetId = itemId || window.activeModalItemId;
    if (!targetId) return;

    window.currentShareItemId = targetId;

    // Сбрасываем внешний вид окна
    document.getElementById('share-platforms').classList.remove('hidden');
    const verifyBlock = document.getElementById('share-verify-block');
    if (verifyBlock) {
        verifyBlock.classList.add('hidden');
        verifyBlock.classList.remove('flex');
    }

    const cooldownText = document.getElementById('share-cooldown-text');
    const item = window.loadedItems.find(i => i.id === targetId);
    const isOwner = window.currentUser && item && item.userId === window.currentUser.id;

    // Логика таймеров (только для владельца)
    if (isOwner) {
        let hoursPassed = 25;
        if (item.last_shared_at) {
            hoursPassed = (new Date().getTime() - new Date(item.last_shared_at).getTime()) / (1000 * 60 * 60);
        }

        if (hoursPassed < 24) {
            cooldownText.innerHTML = `<i class="fa-solid fa-clock text-amber-500 mr-1"></i> Следующее бесплатное поднятие через ${Math.ceil(24 - hoursPassed)} ч.`;
            cooldownText.classList.remove('hidden');
            window.currentShareEligible = false;
        } else {
            cooldownText.innerHTML = `<i class="fa-solid fa-gift text-brand-500 mr-1"></i> Мы автоматически поднимем товар в ТОП!`;
            cooldownText.classList.remove('hidden');
            window.currentShareEligible = true;
        }
    } else {
        cooldownText.classList.add('hidden');
        window.currentShareEligible = false;
    }

    window.openModal('share-modal');
};

// 2. ОТПРАВКА ССЫЛКИ В СОЦСЕТИ И ГЕНЕРАЦИЯ ТРЕКЕРА
window.triggerShare = async (platform) => {
    const targetId = window.currentShareItemId;
    if (!targetId || !window.currentUser) return;

    const item = window.loadedItems.find(i => i.id === targetId);
    const title = item ? item.title : 'SVALKA';

    // Генерируем уникальный токен
    const shareToken = `sh_${window.currentUser.id}_${targetId}_${Date.now().toString(36)}`;
    const trackingUrl = `${window.location.origin}${window.location.pathname}?item=${targetId}&share=${shareToken}`;

    try {
        if (window.currentShareEligible) {
            // ИСПРАВЛЕНО: используется supabaseClient
            await supabaseClient.from('share_tracking').insert([
                { user_id: window.currentUser.id, item_id: targetId, share_token: shareToken, clicks_count: 0 }
            ]);
        }
    } catch (e) { console.error(e); }

    const text = `Смотри, что продают на SVALKA: ${title}`;

    if (platform === 'telegram') {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(trackingUrl)}&text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'whatsapp') {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + trackingUrl)}`, '_blank');
    } else if (platform === 'viber') {
        window.open(`viber://forward?text=${encodeURIComponent(text + " " + trackingUrl)}`, '_blank');
    } else if (platform === 'copy') {
        navigator.clipboard.writeText(trackingUrl);
        window.showToast("Уникальная ссылка скопирована!");
    }

    // Прячем кнопки соцсетей и показываем радар ожидания
    document.getElementById('share-platforms').classList.add('hidden');
    const verifyBlock = document.getElementById('share-verify-block');
    verifyBlock.classList.remove('hidden');
    verifyBlock.classList.add('flex');

    verifyBlock.innerHTML = `
        <div class="flex flex-col items-center text-center p-5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700">
            <i class="fa-solid fa-satellite-dish text-4xl text-brand-500 mb-3 animate-pulse"></i>
            <p class="text-sm text-stone-900 dark:text-white font-bold mb-1">Ожидаем переход покупателя...</p>
            <p class="text-[11px] text-stone-500">Бонус сработает автоматически, когда по ссылке перейдет первый уникальный человек.</p>
        </div>
        <button onclick="window.closeModal('share-modal')" class="w-full mt-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 py-3 rounded-xl font-bold text-sm hover:bg-stone-300 dark:hover:bg-stone-600 transition">Понятно, закрыть окно</button>
    `;

    // Мгновенно обновляем локальную дату
    if (window.currentShareEligible && item) {
        item.last_shared_at = new Date().toISOString();
    }
};

// 3. ВЕРИФИКАЦИЯ И ВЫДАЧА БОНУСА
window.completeShareTask = async () => {
    const btn = document.getElementById('btn-verify-share');
    const targetId = window.currentShareItemId;
    if (!targetId) return;

    const item = window.loadedItems.find(i => i.id === targetId);
    const isOwner = window.currentUser && item && item.userId === window.currentUser.id;

    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Проверяем...';
        btn.disabled = true;
    }

    // Имитация серверной задержки (1.5 сек) для создания ощущения проверки
    await new Promise(res => setTimeout(res, 1500));

    try {
        // Выдаем бонус только если это владелец И прошло 24 часа
        if (isOwner && window.currentShareEligible) {
            const nowIso = new Date().toISOString();
            const { error } = await supabase.from('items')
                .update({ created_at: nowIso, last_shared_at: nowIso })
                .eq('id', targetId);

            if (error) throw error;

            if (item) { item.created_at = nowIso; item.last_shared_at = nowIso; }

            window.showToast("Репост засчитан! Товар поднят в ТОП!");
            window.openItemDetails(targetId);
            if (window.fetchItems) window.fetchItems(false);
        } else if (isOwner) {
            window.showToast("Репост засчитан! (Поднятие недоступно, лимит 24 часа)");
        } else {
            window.showToast("Спасибо, что поделились ссылкой!");
        }
    } catch (error) {
        window.showToast("Ошибка при обработке репоста", true);
    } finally {
        window.closeModal('share-modal');
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-check-double"></i> Да, я поделился!';
            btn.disabled = false;
        }
    }
};

window.shareTimerInterval = null;
window.updateAllShareTimers = () => {
    if (window.shareTimerInterval) clearInterval(window.shareTimerInterval);

    window.shareTimerInterval = setInterval(() => {
        if (!window.currentUser || !window.loadedItems) return;
        
        window.loadedItems.forEach(item => {
            const itemOwnerId = item.user_id || item.userId;
            if (itemOwnerId !== window.currentUser.id) return;
            
            let timePassedMs = 25 * 60 * 60 * 1000;
            if (item.last_shared_at) timePassedMs = Date.now() - new Date(item.last_shared_at).getTime();
            
            const timeLeft = (24 * 60 * 60 * 1000) - timePassedMs;
            
            // ОПТИМИЗАЦИЯ: Ищем элементы только если они действительно сейчас на экране
            if (timeLeft > 0) {
                const h = Math.floor(timeLeft / (1000 * 60 * 60));
                const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((timeLeft % (1000 * 60)) / 1000);
                const timeStr = `${h}ч ${m}м ${s}с`;
                
                // Обновляем кнопку в модалке (только если она открыта)
                if (window.activeModalItemId === item.id) {
                    const modalBtn = document.getElementById('btn-owner-share');
                    if (modalBtn && !modalBtn.disabled) {
                        modalBtn.disabled = true;
                        modalBtn.className = "group flex flex-col items-center justify-center p-3 bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 border border-stone-200 dark:border-stone-700 rounded-2xl cursor-not-allowed opacity-70";
                    }
                    if (modalBtn) modalBtn.innerHTML = `<i class="fa-solid fa-clock text-lg mb-1"></i><span class="text-xs font-bold">Ожидание</span><span class="text-[9px] mt-0.5">${timeStr}</span>`;
                }

                // Обновляем кнопку в карточке (ищем ее только если товар на таймере)
                const cardBtn = document.getElementById(`bump-btn-card-${item.id}`);
                if (cardBtn) {
                    if (!cardBtn.disabled) {
                        cardBtn.disabled = true;
                        cardBtn.className = "px-3 py-1.5 bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500 rounded-lg flex items-center justify-center border border-transparent text-[10px] font-bold cursor-not-allowed";
                    }
                    cardBtn.innerHTML = `<i class="fa-solid fa-clock mr-1"></i> ${timeStr}`;
                }
            } else {
                // Если таймер истек, активируем кнопки (один раз)
                if (window.activeModalItemId === item.id) {
                    const modalBtn = document.getElementById('btn-owner-share');
                    if (modalBtn && modalBtn.disabled) {
                        modalBtn.disabled = false;
                        modalBtn.className = "group flex flex-col items-center justify-center p-3 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-800/50 rounded-2xl hover:bg-brand-100 hover:border-brand-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all relative overflow-hidden cursor-pointer";
                        modalBtn.innerHTML = `<div class="absolute top-0 right-0 bg-brand-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-bl-lg uppercase tracking-widest animate-pulse">Доступно</div><i class="fa-solid fa-share-nodes text-lg mb-1 group-hover:scale-110 transition-transform"></i><span class="text-xs font-bold">Репост</span><span class="text-[9px] opacity-70 mt-0.5 transition-colors">+ Поднятие</span>`;
                    }
                }
                const cardBtn = document.getElementById(`bump-btn-card-${item.id}`);
                if (cardBtn && cardBtn.disabled) {
                    cardBtn.disabled = false;
                    cardBtn.className = "px-3 py-1.5 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400 rounded-lg transition hover:bg-brand-100 flex items-center justify-center border border-brand-200 dark:border-brand-800/50 cursor-pointer";
                    cardBtn.innerHTML = `<i class="fa-solid fa-share-nodes mr-1.5"></i> В ТОП`;
                }
            }
        });
    }, 1000);
};

// ==========================================
// 2. ГЛОБАЛЬНЫЙ ПЕРЕХВАТЧИК СОБЫТИЙ (Event Delegator)
// ==========================================
document.body.addEventListener('click', (e) => {
    // Ищем ближайший элемент с атрибутом data-action
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    switch (action) {
        case 'open-item':
            window.openItemDetails(id);
            break;
        case 'bump-item':
            e.stopPropagation();
            window.bumpViaShare(id);
            break;
        case 'edit-item':
            e.stopPropagation();
            window.editItem(id);
            break;
        case 'delete-item':
            e.stopPropagation();
            window.deleteItemConfirm(id); // Вызываем функцию с подтверждением
            break;
        case 'toggle-favorite':
            e.stopPropagation();
            window.toggleFavorite(btn, e, id);
            break;
        // ---> ВАШ НОВЫЙ БЛОК ДЛЯ КАРТЫ <---
        case 'select-address':
            // Передаем данные из атрибутов (lat, lon, name), которые мы задали в модуле карты
            window.selectAddress(btn.dataset.lat, btn.dataset.lon, btn.dataset.name);
            break;
        // ---> Клик по хлебным крошкам (Категории) <---
        case 'filter-category':
            e.stopPropagation();
            window.closeModal('item-modal'); // Закрываем карточку товара
            window.filterByCategory(btn.dataset.cat, e); // Запускаем фильтрацию ленты
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Плавно возвращаем пользователя в самый верх ленты
            break;
    }
});

// БЕЗОПАСНЫЙ ЗАПУСК ФУНКЦИЙ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof window.checkIncomingShareClick === 'function') {
            window.checkIncomingShareClick();
        }
        if (typeof window.updateAllShareTimers === 'function') {
            window.updateAllShareTimers();
        }
    }, 1000); // Даем 1 секунду на загрузку товаров перед запуском трекеров
});

// --- СКРЫТАЯ ПРОВЕРКА ВХОДЯЩИХ КЛИКОВ (АВТОМАТИЧЕСКИЙ БОНУС) ---
window.checkIncomingShareClick = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const shareToken = urlParams.get('share');
        const itemId = urlParams.get('item');

        if (!shareToken || !itemId) return;

        // Проверяем, не сам ли владелец кликнул по своей ссылке
        if (window.currentUser && shareToken.includes(`sh_${window.currentUser.id}`)) return;

        // Защита от спама перезагрузками в одной вкладке
        if (sessionStorage.getItem(`processed_share_${shareToken}`)) return;

        // Вызываем защищенную серверную функцию, которая безопасно обновит БД
        const { error } = await window.supabase.rpc('process_share_click', {
            p_share_token: shareToken,
            p_item_id: itemId
        });

        if (!error) {
            sessionStorage.setItem(`processed_share_${shareToken}`, 'true');
        }
    } catch (err) {
        console.error("Ошибка при проверке ссылки:", err);
    }
};

// 2. Анимированный плейсхолдер поиска (с динамическим переводом)
const searchInputAtm = document.getElementById('main-search-input');
const searchPhrases = ['iPhone 13 Pro', 'Кроссовки Nike', 'PlayStation 5', 'Велосипед', 'Квартира в Нови-Саде', 'Услуги электрика', 'Диван IKEA', 'MacBook Air'];
let phraseIndex = 0;

setInterval(() => {
    if (searchInputAtm && document.activeElement !== searchInputAtm && !searchInputAtm.value) {
        let prefix = 'Например: ';
        if (window.currentLang === 'en') prefix = 'For example: ';
        if (window.currentLang === 'sr') prefix = 'Na primer: ';

        let phrase = searchPhrases[phraseIndex];
        if (window.currentLang === 'en') {
            const enPhrases = { 'Кроссовки Nike': 'Nike sneakers', 'Велосипед': 'Bicycle', 'Квартира в Нови-Саде': 'Apartment in Novi Sad', 'Услуги электрика': 'Electrician services', 'Диван IKEA': 'IKEA Sofa' };
            phrase = enPhrases[phrase] || phrase;
        } else if (window.currentLang === 'sr') {
            const srPhrases = { 'Кроссовки Nike': 'Nike patike', 'Велосипед': 'Bicikl', 'Квартира в Нови-Саде': 'Stan u Novom Sadu', 'Услуги электрика': 'Usluge električara', 'Диван IKEA': 'IKEA kauč' };
            phrase = srPhrases[phrase] || phrase;
        }

        searchInputAtm.setAttribute('placeholder', prefix + phrase);
        phraseIndex = (phraseIndex + 1) % searchPhrases.length;
    }
}, 3500);

// DRAG AND DROP ДЛЯ ФОТОГРАФИЙ
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    if (dropZone && fileInput) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('border-brand-500', 'bg-brand-50', 'dark:bg-brand-900/20');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('border-brand-500', 'bg-brand-50', 'dark:bg-brand-900/20');
            }, false);
        });

        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            // Искусственно создаем событие для функции previewPhotos
            fileInput.files = files;
            window.previewPhotos({ target: fileInput });
        }, false);
    }
});

window.navigatePhoto = (direction, event) => {
    if (event) event.stopPropagation();
    const carousel = document.getElementById('modal-carousel');
    if (carousel) {
        const itemWidth = carousel.clientWidth;
        carousel.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
    }
};

// ==========================================
// УМНАЯ ШАПКА И ЕДИНЫЙ КОНТРОЛЛЕР СКРОЛЛА (Финальная архитектура)
// ==========================================
window.initSmartHeader = () => {
    const header = document.getElementById('main-header');
    const headerContainer = document.getElementById('header-container');
    const floatingBtn = document.getElementById('floating-filter-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!header) return;

    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.left = '0';
    header.style.width = '100%';
    header.style.zIndex = '40';
    header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease';

    // 2. ИДЕАЛЬНОЕ РЕШЕНИЕ проблемы перекрытия:
    // ResizeObserver следит за реальной высотой шапки и задает точный отступ для сайта.
    if (!window.headerObserverAdded) {
        document.body.style.paddingTop = `${header.offsetHeight}px`; // Базовый отступ при загрузке
        
        const ro = new ResizeObserver(() => {
            // Обновляем отступ только если мы на самом верху, чтобы страница не "дергалась" при скролле вниз
            if (window.scrollY <= 10) {
                document.body.style.paddingTop = `${header.offsetHeight}px`;
            }
        });
        ro.observe(header);
        window.headerObserverAdded = true;
    }

    let lastScrollY = window.scrollY;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const isScrolled = currentScrollY > 20;

                // --- Анимация фона и размеров шапки ---
                if (headerContainer) {
                    if (isScrolled) {
                        headerContainer.classList.replace('sm:py-4', 'sm:py-2');
                        headerContainer.classList.replace('py-3', 'py-2');
                    } else {
                        headerContainer.classList.replace('sm:py-2', 'sm:py-4');
                        headerContainer.classList.replace('py-2', 'py-3');
                    }
                }

                if (isScrolled) {
                    header.classList.add('bg-white/95', 'dark:bg-stone-900/95', 'shadow-md');
                    header.classList.remove('bg-white/40', 'dark:bg-stone-900/70', 'shadow-[0_4px_30px_rgba(20,184,166,0.08)]', 'dark:shadow-[0_10px_40px_rgba(20,184,166,0.05)]');
                } else {
                    header.classList.add('bg-white/40', 'dark:bg-stone-900/70', 'shadow-[0_4px_30px_rgba(20,184,166,0.08)]', 'dark:shadow-[0_10px_40px_rgba(20,184,166,0.05)]');
                    header.classList.remove('bg-white/95', 'dark:bg-stone-900/95', 'shadow-md');
                }

                // --- ЛОГИКА УМНОЙ ШАПКИ (Выезд при скролле вверх) ---
                if (currentScrollY <= 0) {
                    header.style.transform = 'translateY(0)';
                } else if (Math.abs(currentScrollY - lastScrollY) > 10) { 
                    if (currentScrollY > lastScrollY && currentScrollY > 150) {
                        // Скролл вниз - прячем шапку
                        header.style.transform = 'translateY(-100%)'; 
                    } else {
                        // Скролл вверх - показываем шапку
                        header.style.transform = 'translateY(0)'; 
                    }
                }

                // --- Плавающая кнопка мобильных фильтров ---
                if (floatingBtn) {
                    if (currentScrollY > 150) {
                        floatingBtn.classList.remove('-translate-x-full');
                    } else {
                        floatingBtn.classList.add('-translate-x-full');
                    }
                }

                // --- Подгрузка товаров (Load More) ---
                if (!document.body.classList.contains('modal-open')) {
                    if (loadMoreBtn && !loadMoreBtn.classList.contains('hidden') && ((window.innerHeight + currentScrollY) >= document.body.offsetHeight - 500)) {
                        loadMoreBtn.classList.add('hidden');
                        if (typeof window.loadMoreItems === 'function') window.loadMoreItems();
                    }
                }

                lastScrollY = currentScrollY;
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
};

// ==========================================
// ГЛАВНЫЙ СТАРТЕР ПРИЛОЖЕНИЯ
// ==========================================
function initSvalkaApp() {
    window.isInitialLoad = true;
    
    if (typeof window.changeLanguage === 'function') window.changeLanguage(window.currentLang);
    if (typeof window.initSidebar === 'function') window.initSidebar();
    
    // Запускаем из модулей!
    if (typeof AuthModule !== 'undefined') AuthModule.checkUserSession();
    if (typeof ItemsModule !== 'undefined') ItemsModule.fetchItems(false);
    
    // Запускаем умную шапку
    if (typeof window.initSmartHeader === 'function') {
        window.initSmartHeader();
    }
    
    setTimeout(() => { window.isInitialLoad = false; }, 1000);
}

// Запускаем двигатель
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSvalkaApp);
} else {
    initSvalkaApp();
}

// Функция входа через провайдеров (OAuth)
window.loginWithProvider = async (provider) => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                // После успешного входа Supabase вернет пользователя обратно на эту страницу
                redirectTo: window.location.origin
            }
        });

        if (error) throw error;
        
        // Supabase сам сделает редирект на страницу Google/Apple,
        // поэтому тут делать ничего не нужно.

    } catch (err) {
        console.error('Ошибка входа через соцсеть:', err.message);
        if (typeof window.showToast === 'function') {
            window.showToast('Ошибка авторизации', true);
        }
    }
};

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker успешно зарегистрирован! Scope:', registration.scope);
            })
            .catch(err => {
                console.error('Ошибка регистрации ServiceWorker:', err);
            });
    });
}

// ==========================================
// ПОХОЖИЕ ТОВАРЫ (СВАЙП-КАРУСЕЛЬ) И АНАЛИТИКА ПРОСМОТРОВ
// ==========================================
window.triggerItemViewsAndSimilar = async (id) => {
    const modalContent = document.getElementById('item-details-modal-content');
    if (modalContent && !document.getElementById('similar-items-section')) {
        modalContent.insertAdjacentHTML('beforeend', `
            <div id="similar-items-section" class="hidden flex-col mt-4 border-t border-stone-200 dark:border-stone-800 p-6 md:p-8 w-full shrink-0">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center border border-brand-100 dark:border-brand-800 shrink-0">
                        <i class="fa-solid fa-layer-group text-lg"></i>
                    </div>
                    <h3 class="text-xl font-display font-black text-stone-900 dark:text-white uppercase tracking-tight">Похожие находки</h3>
                </div>
                <div id="similar-items-carousel" class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 custom-scrollbar" style="scroll-behavior: smooth;"></div>
            </div>
        `);
    }

    const container = document.getElementById('similar-items-section');
    const carousel = document.getElementById('similar-items-carousel');
    
    if (container) { container.classList.add('hidden'); container.classList.remove('flex'); }
    if (carousel) carousel.innerHTML = '';

    window.supabase.rpc('increment_item_view', { p_item_id: id })
    .then(({ data, error }) => {
        if (error) console.error("Ошибка при обновлении просмотров:", error);
    });

    const currentItem = window.loadedItems.find(i => i.id === id);
    if (!currentItem) return;

    const ownerControls = document.getElementById('modal-owner-controls');
    const isOwner = window.currentUser && currentItem.userId === window.currentUser.id;
    let statsBlock = document.getElementById('modal-owner-stats');
    if (isOwner && ownerControls) {
        if (!statsBlock) {
            statsBlock = document.createElement('div');
            statsBlock.id = 'modal-owner-stats';
            statsBlock.className = 'flex items-center gap-4 bg-stone-50 dark:bg-stone-800 p-4 rounded-2xl mb-4 border border-stone-200 dark:border-stone-700 shadow-sm';
            ownerControls.parentNode.insertBefore(statsBlock, ownerControls);
        }
        window.supabase.from('items').select('views').eq('id', id).single().then(({data}) => {
            const viewsCount = data ? (data.views || 0) : 0;
            statsBlock.innerHTML = `
                <div class="flex-1">
                    <div class="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">Статистика объявления</div>
                    <div class="flex items-center gap-2">
                        <div class="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 border border-brand-200 dark:border-brand-800"><i class="fa-solid fa-eye"></i></div>
                        <div><div class="font-black text-lg text-stone-900 dark:text-white leading-none">${viewsCount}</div><div class="text-xs font-bold text-stone-500 mt-0.5">просмотров карточки</div></div>
                    </div>
                </div>
            `;
            statsBlock.style.display = 'flex';
        }).catch(()=>{});
    } else if (statsBlock) { statsBlock.style.display = 'none'; }

    // Загрузка 8 товаров для карусели
    if (currentItem.category) {
        window.supabase.from('items')
            .select('*')
            .eq('category', currentItem.category)
            .neq('id', id)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(8)
            .then(({data}) => {
                if (data && data.length > 0 && carousel && container) {
                    const mapped = data.map(window.mapItemData).filter(Boolean);
                    carousel.innerHTML = mapped.map(i => `<div class="w-[260px] sm:w-[280px] shrink-0 snap-start">${window.createCardHtml(i)}</div>`).join('');
                    container.classList.remove('hidden'); 
                    container.classList.add('flex');
                }
            }).catch(()=>{});
    }
};

// ==========================================
// ГЕНЕРАТОР ВОДЯНЫХ ЗНАКОВ
// ==========================================
window.applySvalkaWatermark = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Сохраняем оригинальные размеры
                canvas.width = img.width;
                canvas.height = img.height;

                // Рисуем оригинальное изображение
                ctx.drawImage(img, 0, 0);

                // --- НАСТРОЙКИ ВОДЯНОГО ЗНАКА ---
                
                // 1. Делаем шрифт совсем маленьким (1/40 от ширины фото)
                const fontSize = Math.floor(canvas.width / 40);
                ctx.font = `bold ${fontSize}px Montserrat, sans-serif`;
                
                // 2. Выравнивание по правому нижнему краю
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';
                
                // 3. Ультра-прозрачность (10% видимости)
                ctx.fillStyle = 'rgba(255, 255, 255, 0.10)';
                
                // 4. ТЕНЬ ПОЛНОСТЬЮ УДАЛЕНА 
                // Без тени текст будет максимально сливаться с фотографией
                
                // 5. Отступ от края делаем тоже чуть меньше (2% от ширины)
                const margin = Math.floor(canvas.width * 0.02);

                // 6. Печатаем текст
                ctx.fillText('SVALKA.TRADE', canvas.width - margin, canvas.height - margin);

                // Возвращаем новый файл
                canvas.toBlob((blob) => {
                    const watermarkedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
                    resolve(watermarkedFile);
                }, 'image/jpeg', 0.85); // 0.85 - сжатие для оптимизации
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Главное правило сайта: VIP существует, ТОЛЬКО если таймер больше текущей секунды
window.checkRealVipStatus = (userData) => {
    if (!userData || !userData.pro_until) return false;
    // Как только пройдет 30 дней, это условие само отключит VIP везде!
    return new Date(userData.pro_until) > new Date();
};

window.applyVipToItem = async (itemId, btnElement) => {
    btnElement.disabled = true;
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Обработка...';

    try {
        const { data, error } = await window.supabase.rpc('apply_vip_to_item', { target_item_id: itemId });
        
        if (error) throw error;

        if (data === 'success') {
            alert('Успех! Товар размещен в VIP-блоке на 7 дней.');
            window.location.reload(); 
        } else if (data === 'not_pro') {
            // Если каким-то образом юзер без PRO нажал кнопку
            alert('Для размещения в VIP-блоке требуется SVALKA PRO.');
            // window.openModal('payment'); // Можешь раскомментировать, чтобы сразу открывать кассу
        } else {
            // Здесь выведутся наши кастомные ошибки из SQL (например, про лимит в 5 товаров)
            alert(data); 
        }
    } catch (e) {
        alert('Произошла ошибка при связке с сервером.');
    } finally {
        btnElement.disabled = false;
        btnElement.innerHTML = originalText;
    }
};

// В main.js найдите вашу функцию handleSearch и оберните ее логику:
let searchTimeout;
window.handleSearch = (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        // ... здесь ваш старый код фильтрации ...
        window.searchQuery = event.target.value;
        window.fetchItems(); 
    }, 300); // Ждем 300мс после последнего нажатия клавиши
};

// ==========================================
// ПАТЧ: ЕДИНАЯ ЛОГИКА ДОБАВЛЕНИЯ И УДАЛЕНИЯ ИЗ ТОПА
// ==========================================
window.toggleItemVip = async (itemId, btnElement) => {
    if (!window.currentUser) return;
    const item = window.loadedItems.find(i => i.id === itemId);
    if (!item) return;

    const originalText = btnElement ? btnElement.innerHTML : '';
    if (btnElement) {
        btnElement.disabled = true;
        btnElement.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Обработка...';
    }

    try {
        // 1. УМНАЯ ПРОВЕРКА PRO-СТАТУСА
        let isPro = window.currentUserData && window.currentUserData.is_pro;
        if (!isPro) {
            const { data } = await supabase.from('profiles').select('pro_until').eq('id', window.currentUser.id).single();
            isPro = window.checkRealVipStatus ? window.checkRealVipStatus(data) : false;
            
            if (!window.currentUserData) window.currentUserData = {};
            window.currentUserData.is_pro = isPro;
        }

        // 2. Блокируем кассой ТОЛЬКО если юзер пытается ДОБАВИТЬ товар, и у него нет PRO
        if (!item.isHighlighted && !isPro) {
            window.showToast("Для размещения в VIP-ленте нужен SVALKA PRO", true);
            setTimeout(() => window.openModal('crypto-modal'), 1000);
            return; 
        }

        // 3. ЗАПРОСЫ К БАЗЕ ДАННЫХ (Без визуального оформления кнопок!)
        if (item.isHighlighted) {
            // СНИМАЕМ ИЗ ТОПА
            const { error } = await supabase.from('items').update({ highlighted_until: null }).eq('id', itemId);
            if (error) throw error;
            window.showToast("Слот освобожден! Товар убран из VIP-ленты.");
            item.isHighlighted = false; 
        } else {
            // ДОБАВЛЯЕМ В ТОП
            const { data, error } = await window.supabase.rpc('apply_vip_to_item', { target_item_id: itemId });
            if (error) throw error;

            if (data === 'success') {
                window.showToast('Товар размещен в VIP-блоке на 7 дней!');
                item.isHighlighted = true; 
            } else if (data === 'not_pro') {
                window.showToast('Для размещения требуется SVALKA PRO.', true);
                return;
            } else {
                window.showToast(data, true); 
                return;
            }
        }

        window.closeModal('item-modal');
        if (window.fetchItems) window.fetchItems(false);
        if (window.renderProfileTabs) window.renderProfileTabs();
        
    } catch (e) {
        console.error("VIP Toggle Error:", e);
        window.showToast("Произошла ошибка связи с сервером", true);
    } finally {
        if (btnElement) { 
            btnElement.disabled = false; 
            if (btnElement.innerHTML.includes('fa-spinner')) {
                btnElement.innerHTML = originalText;
            }
        }
    }
};

window.promoteToVip = () => window.toggleItemVip(window.activeModalItemId, document.getElementById('btn-owner-vip'));
window.highlightItem = window.promoteToVip;
window.applyVipToItem = window.toggleItemVip;

// --- АВТОМАТИЧЕСКАЯ СМЕНА КНОПКИ (В ТОП / УБРАТЬ ИЗ ТОПА) ---
if (typeof window.openItemDetails === 'function' && !window.openItemDetails.isVipButtonPatched) {
    const _origOpenItemForVip = window.openItemDetails;
    window.openItemDetails = async (id) => {
        await _origOpenItemForVip(id);
        
        const item = window.loadedItems.find(i => i.id === id);
        const btnVip = document.getElementById('btn-owner-vip') || document.querySelector('[onclick*="promoteToVip"]') || document.querySelector('[onclick*="highlightItem"]');
        
        if (item && btnVip && window.currentUser && window.currentUser.id === (item.userId || item.user_id)) {
            
            btnVip.disabled = false; 
            const t = window.t || (txt => txt);

            // ВИЗУАЛЬНОЕ ОФОРМЛЕНИЕ ПРОИСХОДИТ ТОЛЬКО ЗДЕСЬ
            if (item.isHighlighted) {
                btnVip.innerHTML = `<i class="fa-solid fa-arrow-down mr-1.5"></i> ${t('Убрать из VIP')}`;
                btnVip.className = "px-4 py-2.5 bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-xl font-bold text-sm transition-all duration-300 flex-1 flex items-center justify-center border border-transparent hover:border-red-200 dark:hover:border-red-800/50 shadow-sm";
            } else {
                btnVip.innerHTML = `<i class="fa-solid fa-crown mr-1.5 text-white drop-shadow-md"></i> ${t('В VIP-блок (7 дней)')}`;
                btnVip.className = "px-4 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl font-bold text-sm transition-all duration-300 flex-1 flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5";
            }
            
            btnVip.onclick = (e) => {
                e.preventDefault();
                window.toggleItemVip(item.id, btnVip);
            };
        }
    };
    window.openItemDetails.isVipButtonPatched = true;
}