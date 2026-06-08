// modules/items.js
import { supabase } from '../config.js';

export const ItemsModule = {
    // ==========================================
    // 1. УМНАЯ ФИЛЬТРАЦИЯ ПО КАТЕГОРИЯМ
    // ==========================================
    filterByCategory: (cat, event, isSubCat = false) => {
        if (event) event.preventDefault();

        // Сеньор-логика: Умное закрытие
        if (window.currentCategory === cat && cat !== 'Все') {
            if (cat.includes(' - ')) {
                cat = cat.split(' - ')[0];
            } else {
                cat = 'Все';
            }
        }

        window.currentCategory = cat;
        window.showUrgentOnly = false;
        window.displayedCount = 12;

        const noConditionCats = ['Услуги', 'Работа', 'Жилье', 'Животные'];
        const condRadios = document.getElementById('condition-radios-wrap');
        if (condRadios) {
            const condBlock = condRadios.parentElement;
            const prevDivider = condBlock.previousElementSibling;
            const isNoCondCat = noConditionCats.some(c => cat.startsWith(c));

            if (isNoCondCat) {
                condBlock.style.display = 'none';
                if (prevDivider && prevDivider.classList.contains('sidebar-divider')) prevDivider.style.display = 'none';

                if (window.filterCondition !== 'Все') {
                    window.filterCondition = 'Все';
                    if (typeof window.renderCustomRadios === 'function') {
                        window.renderCustomRadios('condition-radios-wrap', 'cond', [{ val: 'Все', label: window.t('Любое') }, { val: 'Новое', label: '✨ ' + window.t('Новое') }, { val: 'Б/У', label: '♻️ ' + window.t('Б/У') }], 'Все', 'applyCondition');
                    }
                }
            } else {
                condBlock.style.display = 'block';
                if (prevDivider && prevDivider.classList.contains('sidebar-divider')) prevDivider.style.display = '';
            }
        }

        const urgentBtn = document.getElementById('btn-cat-urgent');
        if (urgentBtn) urgentBtn.classList.remove('active', 'bg-amber-100', 'border-amber-400', 'text-amber-700');

        document.querySelectorAll('.sidebar-cat-group').forEach(grp => {
            const btn = grp.querySelector('button');
            if (!btn) return;
            
            const grpCat = btn.innerText.trim();

            if (cat.startsWith(grpCat) && cat !== 'Все') {
                btn.classList.add('text-brand-600');
                btn.classList.remove('text-stone-700', 'dark:text-stone-300');
            } else {
                btn.classList.remove('text-brand-600');
                btn.classList.add('text-stone-700', 'dark:text-stone-300');
            }
            
            const subWrap = grp.querySelector('.sidebar-sub-cats');
            if (subWrap) {
                subWrap.querySelectorAll('button').forEach(subBtn => {
                    const isSubActive = window.currentCategory === (grpCat + ' - ' + subBtn.innerText.trim());
                    if (isSubActive) {
                        subBtn.classList.add('text-brand-600', 'font-bold');
                        subBtn.classList.remove('text-stone-500', 'dark:text-stone-400');
                    } else {
                        subBtn.classList.remove('text-brand-600', 'font-bold');
                        subBtn.classList.add('text-stone-500', 'dark:text-stone-400');
                    }
                });
            }
        });

        const allBtn = document.querySelector('#sidebar-categories > button');
        if (allBtn) {
            if (cat === 'Все') {
                allBtn.classList.add('text-brand-600');
                allBtn.classList.remove('text-stone-700', 'dark:text-stone-300');
            } else {
                allBtn.classList.remove('text-brand-600');
                allBtn.classList.add('text-stone-700', 'dark:text-stone-300');
            }
        }

        const subCatsContainer = document.getElementById('sub-cats-container') || document.getElementById('sub-categories');
        if (subCatsContainer) {
            if (cat !== 'Все' && window.subcategoriesMap && window.subcategoriesMap[cat.split(' - ')[0]]) {
                const mainCat = cat.split(' - ')[0];
                let subHtml = `<button onclick="window.filterByCategory('${mainCat}', event, true)" class="sub-cat-btn ${cat === mainCat ? 'active px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.25)] bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 border border-brand-400 dark:border-brand-600 cursor-pointer whitespace-nowrap shrink-0 snap-start scale-[1.02]' : 'px-4 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-brand-300 hover:text-brand-600 dark:hover:border-brand-700 dark:hover:text-brand-400 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 snap-start hover:scale-[1.02]'}">${window.t ? window.t('Все в') : 'Все в'} «${window.t ? window.t(mainCat) : mainCat}»</button>`;
                
                window.subcategoriesMap[mainCat].forEach(sub => {
                    const prefix = sub.prefix || mainCat;
                    const fullCat = `${prefix} - ${sub.val}`;
                    const isActive = cat === fullCat;
                    const activeClass = isActive
                        ? "active px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.25)] bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 border border-brand-400 dark:border-brand-600 cursor-pointer whitespace-nowrap shrink-0 snap-start scale-[1.02]"
                        : "px-4 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-brand-300 hover:text-brand-600 dark:hover:border-brand-700 dark:hover:text-brand-400 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 snap-start hover:scale-[1.02]";
                    subHtml += `<button onclick="window.filterByCategory('${fullCat}', event, true)" class="sub-cat-btn ${activeClass}">${window.t ? window.t(sub.label || sub.val) : (sub.label || sub.val)}</button>`;
                });
                subCatsContainer.innerHTML = subHtml;
                subCatsContainer.style.display = 'flex';
                subCatsContainer.classList.remove('hidden'); 
            } else {
                subCatsContainer.style.display = 'none';
                subCatsContainer.classList.add('hidden');
            }
        }

        const isMobile = window.innerWidth < 1024;
        if (!isMobile || isSubCat) {
            // Запрашиваем карточки, не дублируя их (isLoadMore = false)
            if (typeof window.fetchItems === 'function') window.fetchItems(false);
        }
    },

    // ==========================================
    // 2. ИДЕАЛЬНАЯ КАРТОЧКА (Исправлен баг с функцией t)
    // ==========================================
    createCardHtml: (i, isVIP, isProfileView = false) => {
        // === ИСПРАВЛЕНИЕ: Функция перевода теперь в самом начале! ===
        const t = window.t || (text => text); 

        const isOwner = window.currentUser && window.currentUser.id === (i.user_id || i.userId);
        const isService = i.category && i.category.includes('Услуги');
        const isJob = i.category && i.category.includes('Работа');
        const isEstate = i.category && (i.category.includes('Жилье') || i.category.includes('Недвижимость'));
        const isAnimalEntity = i.category && i.category.startsWith('Животные') && !i.category.includes('Товары');
        
        const cardClass = isVIP ?
            'item-card vip-card cursor-pointer flex flex-col relative h-full w-full' : 
            'item-card bg-white dark:bg-stone-800 cursor-pointer flex flex-col relative h-full w-full';
            
        const imageUrl = (Array.isArray(i.images) && i.images.length > 0) ? i.images[0] : (i.imageUrl || 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=500&q=80');
        
        const isLiked = window.userFavorites && window.userFavorites.has(i.id);
        const iconClass = isLiked ? 'text-brand-500 fa-box' : 'text-stone-400 fa-box-open';

        let statusBadge = ''; let opacityClass = '';
        if (i.status === 'reserved') { statusBadge = `<div class="absolute bottom-2 left-2 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 w-max">${t('В РЕЗЕРВЕ')}</div>`; }
        else if (i.status === 'sold') { statusBadge = `<div class="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/60 z-10 backdrop-blur-[1px]"><span class="bg-stone-800 text-white text-[11px] font-black px-4 py-1.5 rounded shadow-lg tracking-widest rotate-[-15deg] w-max">${t('ПРОДАНО')}</span></div>`;
        opacityClass = 'opacity-70 grayscale-[0.5]'; }

        const vipCrown = isVIP ? `<span class="text-amber-500 mr-1.5 text-sm inline-block" title="VIP Товар"><i class="fa-solid fa-crown"></i></span>` : '';
        const imgHeight = 'h-40 sm:h-48 shrink-0'; 
        const pClass = 'p-3 sm:p-4 flex-1 flex flex-col w-full'; 
        const titleClass = 'text-sm sm:text-base leading-tight'; 
        const priceClass = 'text-base sm:text-lg shrink-0';

        let deliveryBadges = '';
        if (i.delivery && i.delivery.includes('PostExpress')) deliveryBadges += `<span class="flex items-center justify-center w-6 h-6 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-[12px] rounded-md border border-brand-200 dark:border-brand-800/50 cursor-help transition-transform hover:scale-110" title="Отправка PostExpress"><i class="fa-solid fa-truck-fast"></i></span>`;
        if (i.delivery && i.delivery.includes('Личная встреча')) deliveryBadges += `<span class="flex items-center justify-center w-6 h-6 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[12px] rounded-md border border-stone-200 dark:border-stone-700 cursor-help transition-transform hover:scale-110" title="Личная встреча"><i class="fa-solid fa-handshake"></i></span>`;
        
        let paymentBadges = '';
        if (i.payment) {
            const hasCrypto = i.payment.includes('Криптоперевод') || i.payment.includes('USDT TRC-20');
            const hasCard = i.payment.includes('Перевод на карту') || i.payment.includes('Перевод');
            if (hasCrypto) paymentBadges += `<span class="flex items-center justify-center w-6 h-6 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[12px] rounded-md border border-emerald-200 dark:border-emerald-800/50 cursor-help transition-transform hover:scale-110" title="Оплата криптовалютой"><i class="fa-brands fa-bitcoin"></i></span>`;
            if (hasCard) paymentBadges += `<span class="flex items-center justify-center w-6 h-6 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[12px] rounded-md border border-indigo-200 dark:border-indigo-800/50 cursor-help transition-transform hover:scale-110" title="Перевод на карту"><i class="fa-regular fa-credit-card"></i></span>`;
        }

        let condBadge = '';
        if (isService) condBadge = `<div class="absolute top-2 left-2 bg-blue-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">${t('Услуги')}</div>`;
        else if (isJob) condBadge = `<div class="absolute top-2 left-2 bg-fuchsia-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">${t('Работа')}</div>`;
        else if (isEstate) condBadge = `<div class="absolute top-2 left-2 bg-indigo-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">${t('Недвижимость')}</div>`;
        else if (isAnimalEntity) condBadge = '';
        else {
            if (i.condition === 'Новое') condBadge = `<div class="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">${t('Новое')}</div>`;
            else condBadge = `<div class="absolute top-2 left-2 bg-stone-800/80 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">${t('Б/У')}</div>`;
        }

        const favTitle = isLiked ? t('Убрать со склада') : t('Добавить на склад');
        const favHtml = isOwner ? '' : `<button type="button" title="${favTitle}" class="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 dark:bg-stone-900/80 backdrop-blur-sm rounded-full flex items-center justify-center transition shadow-sm hover:scale-110 cursor-pointer" onclick="window.toggleFavorite(this, event, '${i.id}')"><i class="fa-solid ${iconClass} text-sm drop-shadow-sm"></i></button>`;
        
        const cardFooter = (isOwner && isProfileView) ? `
            <div class="view-grid-city text-[10px] font-bold mt-3 pt-3 flex gap-2 shrink-0 border-t border-stone-100 dark:border-stone-700">
                <button id="bump-btn-card-${i.id}" type="button" onclick="event.stopPropagation(); window.bumpViaShare('${i.id}')" class="px-3 py-1.5 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400 rounded-lg transition hover:bg-brand-100 flex items-center justify-center border border-brand-200 dark:border-brand-800/50 w-full"> <i class="fa-solid fa-share-nodes mr-1.5"></i> ${t('В ТОП')} </button>
                <button type="button" onclick="event.stopPropagation(); window.editItem('${i.id}')" class="px-3 py-1.5 bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300 rounded-lg transition hover:bg-stone-200 flex items-center justify-center border border-stone-200 dark:border-stone-700 w-full">
                    <i class="fa-solid fa-pen mr-1.5"></i> ${t('Редакт.')}
                </button>
            </div>
        ` : ``;

        let safeDesc = i.description ? i.description.replace(/<[^>]+>/g, ' ').replace(/[\n\r]+/g, ' ').trim() : t('Описание отсутствует.');
        if (safeDesc.length > 400) safeDesc = safeDesc.substring(0, 400) + '...';

        return `
        <div class="${cardClass} ${opacityClass} overflow-hidden" onclick="window.openItemDetails('${i.id}')">
            ${favHtml}
            <div class="card-img-wrap ${imgHeight} bg-stone-100 dark:bg-stone-700 relative overflow-hidden shrink-0 w-full">
                <img src="${imageUrl}" loading="lazy" decoding="async" class="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-700 group-hover:scale-110" alt="${i.title}">
                ${statusBadge}
                ${condBadge}
            </div>
            
            <div class="card-body-wrap ${pClass} w-full">
                <div class="view-list-col-2 flex-1 flex flex-col h-full w-full min-w-0">
                    
                    <h4 class="font-bold ${titleClass} mb-1 pr-7 text-stone-900 dark:text-white line-clamp-2 break-words shrink-0 h-11 sm:h-12 overflow-hidden">
                        ${vipCrown}${i.title || 'Без названия'}
                    </h4>
                    
                    <div class="text-brand-600 price-text ${priceClass} mt-0.5 mb-2 font-black shrink-0">
                        ${i.price || 0} ${i.currency || 'RSD'}
                    </div>
                    
                    <div class="flex flex-col gap-2 mt-auto shrink-0 w-full">
                        <div class="flex items-center">
                            <span class="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-md text-[10px] font-bold border border-stone-200 dark:border-stone-700 uppercase tracking-wide truncate max-w-full">
                                <i class="fa-solid fa-location-dot mr-1 text-stone-400"></i>${t(i.city)}
                            </span>
                        </div>
                        
                        ${(deliveryBadges || paymentBadges) ? `
                        <div class="flex flex-wrap items-center gap-1.5 mt-0.5">
                            ${deliveryBadges}
                            ${paymentBadges}
                        </div>` : ''}
                    </div>
                </div>

                <div class="view-list-col-3 hidden flex-col flex-1 h-full overflow-hidden relative">
                    <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed break-words whitespace-normal pb-2">
                        ${safeDesc}
                    </p>
                    <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-stone-800 to-transparent pointer-events-none"></div>
                </div>
                
                ${cardFooter}
            </div>
        </div>`;
    },

    // ==========================================
    // 3. ЗАГРУЗКА И ОТКРЫТИЕ ТОВАРОВ
    // ==========================================
    fetchItems: async (isLoadMore = false) => {
        const loader = document.getElementById('loading-placeholder');
        const mainGrid = document.getElementById('main-items-grid');
        const emptyState = document.getElementById('empty-state');
        const loadMoreBtn = document.getElementById('load-more-btn');
        const vipSection = document.getElementById('vip-section');
        const vipGrid = document.getElementById('vip-items-grid');
        const proBanner = document.getElementById('pro-thin-banner');

        if (!isLoadMore) {
            window.displayedCount = 12;
            if (!window.searchQuery) {
                if (mainGrid) { mainGrid.style.opacity = '0.5'; mainGrid.style.pointerEvents = 'none'; }
                if (vipGrid) { vipGrid.style.opacity = '0.5'; vipGrid.style.pointerEvents = 'none'; }
                if (loader && (!mainGrid || mainGrid.innerHTML === '')) loader.style.display = 'block';
            }

            if (emptyState) emptyState.classList.add('hidden');
            if (loadMoreBtn) loadMoreBtn.classList.add('hidden');

            const feedTitle = document.getElementById('main-feed-title');
            const feedIcon = document.getElementById('main-feed-icon');
            if (feedTitle && feedIcon) {
                if (window.showUrgentOnly) {
                    feedTitle.innerText = "ТОП Находки"; feedTitle.className = "font-black text-xl text-stone-800 dark:text-stone-200";
                    feedIcon.className = "fa-solid fa-crown text-amber-500 text-2xl";
                } else {
                    feedTitle.innerText = "Новые находки"; feedTitle.className = "font-black text-xl text-stone-500";
                    feedIcon.className = "fa-regular fa-clock text-stone-400 text-2xl";
                }
            }
        }

        try {
            let res, vipRes = { data: [] };
            let fallbackMode = false;

            try {
                let q = supabase.from('items').select('*').neq('status', 'sold');
                let vq = supabase.from('items').select('*').neq('status', 'sold').gt('highlighted_until', new Date().toISOString()).limit(40);

                // Фильтр по способам оплаты (если выбран хотя бы один чекбокс)
                const selectedPayments = Array.from(document.querySelectorAll('.filter-payment:checked')).map(cb => cb.value);
                if (selectedPayments.length > 0) {
                    q = q.overlaps('payment', selectedPayments);
                    vq = vq.overlaps('payment', selectedPayments);
                }

                if (window.currentCategory !== 'Все') {
                    q = q.ilike('category', `${window.currentCategory}%`);
                    vq = vq.ilike('category', `${window.currentCategory}%`);
                }
                if (window.filterCities.length > 0) {
                    q = q.in('city', window.filterCities);
                    vq = vq.in('city', window.filterCities);
                }
                // ==========================================
                // ГЛОБАЛЬНЫЙ ПОИСК ПО ВСЕЙ КАРТОЧКЕ ТОВАРА
                // ==========================================
                if (window.searchQuery) {
                    const sq = window.searchQuery.trim();

                    // Убрали несуществующую subcategory. Ищем только по реальным колонкам!
                    const orQuery = `title.ilike.%${sq}%,description.ilike.%${sq}%,city.ilike.%${sq}%,category.ilike.%${sq}%`;

                    // Применяем расширенный поиск к обычным и VIP товарам
                    q = q.or(orQuery);
                    vq = vq.or(orQuery);
                }

                // --- ЛОГИКА СЕНЬОРА: Исключение несовместимых категорий при поиске по состоянию ---
                if (window.filterCondition && window.filterCondition !== 'Все') {
                    if (window.filterCondition === 'Б/У') {
                        q = q.or('condition.eq.Б/У,condition.is.null');
                        vq = vq.or('condition.eq.Б/У,condition.is.null');
                    } else {
                        q = q.eq('condition', window.filterCondition);
                        vq = vq.eq('condition', window.filterCondition);
                    }

                    // Жестко вырезаем категории из SQL-запроса
                    const noConditionCats = ['Услуги', 'Работа', 'Жилье', 'Животные'];
                    noConditionCats.forEach(cat => {
                        q = q.not('category', 'ilike', `${cat}%`);
                        vq = vq.not('category', 'ilike', `${cat}%`);
                    });
                }
                // -----------------------------------------------------------------------------------

                const needsJsPriceFilter = (window.filterPriceMin || window.filterPriceMax) && window.filterCurrency === 'Все';

                if (window.filterCurrency !== 'Все') {
                    q = q.eq('currency', window.filterCurrency);
                    vq = vq.eq('currency', window.filterCurrency);

                    if (window.filterPriceMin) {
                        q = q.gte('price', Number(window.filterPriceMin));
                        vq = vq.gte('price', Number(window.filterPriceMin));
                    }
                    if (window.filterPriceMax) {
                        q = q.lte('price', Number(window.filterPriceMax));
                        vq = vq.lte('price', Number(window.filterPriceMax));
                    }
                }

                if (window.showUrgentOnly) {
                    q = q.gt('highlighted_until', new Date().toISOString());
                }

                if (window.currentSortMode !== 'cheap' && window.currentSortMode !== 'exp' && !needsJsPriceFilter) {
                    q = q.order('created_at', { ascending: false });
                    q = q.limit(window.displayedCount + 1);
                }

                const results = await Promise.all([q, vq]);
                if (results[0].error) throw results[0].error;

                let itemsData = results[0].data || [];
                let vipData = results[1].data || [];

                if (needsJsPriceFilter) {
                    const minRsd = window.filterPriceMin ? Number(window.filterPriceMin) : 0;
                    const maxRsd = window.filterPriceMax ? Number(window.filterPriceMax) : Infinity;

                    const filterByPrice = (items) => items.filter(item => {
                        const itemRsd = item.currency === 'EUR' ? (Number(item.price) || 0) * 117 : (Number(item.price) || 0);
                        return itemRsd >= minRsd && itemRsd <= maxRsd;
                    });

                    itemsData = filterByPrice(itemsData);
                    vipData = filterByPrice(vipData);
                }

                if (window.currentSortMode === 'cheap' || window.currentSortMode === 'exp') {
                    const getPriceForSort = (item) => {
                        const p = Number(item.price) || 0;
                        return item.currency === 'EUR' ? p * 117 : p;
                    };
                    const sortFn = window.currentSortMode === 'cheap'
                        ? (a, b) => getPriceForSort(a) - getPriceForSort(b)
                        : (a, b) => getPriceForSort(b) - getPriceForSort(a);

                    itemsData.sort(sortFn);
                }

                if (window.currentSortMode === 'cheap' || window.currentSortMode === 'exp' || needsJsPriceFilter) {
                    itemsData = itemsData.slice(0, window.displayedCount + 1);
                }

                results[0].data = itemsData;
                results[1].data = vipData;
                res = results[0]; vipRes = results[1];

            } catch (err) {
                fallbackMode = true;
                res = await supabase.from('items').select('*').order('created_at', { ascending: false });
            }

            if (fallbackMode && res.data) {
                let filtered = res.data.filter(i => {
                    const matchCat = window.currentCategory === 'Все' || (i.category && i.category.startsWith(window.currentCategory));
                    const searchQ = (window.searchQuery || '').toLowerCase(); const titleStr = (i.title || '').toLowerCase();
                    const matchSearch = titleStr.includes(searchQ); const matchUrgent = !window.showUrgentOnly || i.is_highlighted;
                    const matchCity = window.filterCities.length === 0 || window.filterCities.includes(i.city);

                    const matchCond = window.filterCondition === 'Все' || (window.filterCondition === 'Б/У' ? (i.condition === 'Б/У' || !i.condition) : i.condition === window.filterCondition);

                    // Защита в fallback: выкидываем Услуги и Животных, если включен фильтр
                    const noConditionCats = ['Услуги', 'Работа', 'Жилье', 'Животные'];
                    const isNoCondCat = noConditionCats.some(c => (i.category || '').startsWith(c));
                    if (window.filterCondition !== 'Все' && isNoCondCat) return false;

                    let matchPrice = true; const p = Number(i.price) || 0;
                    const itemRsd = i.currency === 'EUR' ? p * 117 : p;

                    if (window.filterCurrency === 'Все') {
                        if (window.filterPriceMin && itemRsd < Number(window.filterPriceMin)) matchPrice = false;
                        if (window.filterPriceMax && itemRsd > Number(window.filterPriceMax)) matchPrice = false;
                    } else {
                        if (window.filterPriceMin && p < Number(window.filterPriceMin)) matchPrice = false;
                        if (window.filterPriceMax && p > Number(window.filterPriceMax)) matchPrice = false;
                        if (i.currency !== window.filterCurrency) matchPrice = false;
                    }

                    return matchCat && matchSearch && matchUrgent && matchCity && matchPrice && matchCond;
                });

                const getPriceForSort = (item) => {
                    const p = Number(item.price) || 0;
                    return item.currency === 'EUR' ? p * 117 : p;
                };

                if (window.currentSortMode === 'cheap') {
                    filtered.sort((a, b) => getPriceForSort(a) - getPriceForSort(b));
                } else if (window.currentSortMode === 'exp') {
                    filtered.sort((a, b) => getPriceForSort(b) - getPriceForSort(a));
                }

                vipRes.data = filtered.filter(i => i.is_highlighted).slice(0, 6);
                res.data = filtered.slice(0, window.displayedCount + 1);
            }

            const items = (res.data || []).map(window.mapItemData).filter(Boolean);
            const hasMore = items.length > window.displayedCount;
            const itemsToDisplay = hasMore ? items.slice(0, window.displayedCount) : items;

            if (!isLoadMore) window.loadedItems = itemsToDisplay;
            else window.loadedItems = [...window.loadedItems, ...itemsToDisplay];

            if (!isLoadMore && vipRes.data && vipRes.data.length > 0 && !window.showUrgentOnly) {
                // Перемешиваем массив и берем 8 штук
                const vipMapped = vipRes.data
                    .map(window.mapItemData)
                    .filter(Boolean)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 8);

                if (vipMapped.length > 0 && vipGrid && vipSection) {
                    vipGrid.style.opacity = '1'; vipGrid.style.pointerEvents = 'auto';
                    vipGrid.innerHTML = vipMapped.map(i => ItemsModule.createCardHtml(i, true)).join('');
                    vipSection.classList.remove('hidden');
                    // Добавляем в общий список загруженных, чтобы открывались модалки
                    vipMapped.forEach(v => { if (!window.loadedItems.find(i => i.id === v.id)) window.loadedItems.push(v); });
                }
            }

            if (itemsToDisplay.length > 0) {
                let html = '';
                itemsToDisplay.forEach(item => { html += ItemsModule.createCardHtml(item, item.isHighlighted); });
                if (mainGrid) {
                    mainGrid.style.opacity = '1'; mainGrid.style.pointerEvents = 'auto';
                    if (!isLoadMore) mainGrid.innerHTML = html; else mainGrid.insertAdjacentHTML('beforeend', html);
                    mainGrid.classList.remove('hidden');
                }
                if (loadMoreBtn) { if (hasMore) loadMoreBtn.classList.remove('hidden'); else loadMoreBtn.classList.add('hidden'); }
                if (proBanner && !window.showUrgentOnly) proBanner.classList.remove('hidden');
            } else {
                if (!isLoadMore) {
                    if (mainGrid) { mainGrid.innerHTML = ''; mainGrid.classList.add('hidden'); mainGrid.style.opacity = '1'; mainGrid.style.pointerEvents = 'auto'; }
                    if (emptyState) emptyState.classList.remove('hidden');
                    if (proBanner) proBanner.classList.add('hidden');
                }
                if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
            }
        } catch (e) {
            if (window.loadedItems && window.loadedItems.length === 0 && loader) {
                loader.style.display = 'block';
                loader.innerHTML = `<div class="text-red-500 font-bold uppercase tracking-widest text-[10px] bg-red-50 p-4 rounded-2xl max-w-sm mx-auto border border-red-100"><i class="fa-solid fa-triangle-exclamation text-3xl mb-3"></i><br>Ошибка БД<br><span class="text-[9px] text-stone-500 lowercase normal-case mt-2 block break-all">${e.message || 'Ошибка сети'}</span></div>`;
            }
        } finally { if (loader && loader.innerHTML.indexOf('Ошибка') === -1) loader.style.display = 'none'; }
    },

    openItemDetails: async (id) => {
        // 1. СОХРАНЯЕМ ID ТОВАРА ДЛЯ КНОПКИ "СКЛАД" И "ПОДЕЛИТЬСЯ"
        window.currentOpenedItemId = id;

        // 2. СРАЗУ КРАСИМ КНОПКУ "СКЛАД", ЕСЛИ ТОВАР УЖЕ СОХРАНЕН
        const favBtn = document.getElementById('modal-fav-btn');
        if (favBtn) {
            const isSaved = window.currentUserData && window.currentUserData.saved_items && window.currentUserData.saved_items.includes(id);
            if (isSaved) {
                favBtn.classList.add('text-brand-600');
                favBtn.classList.remove('text-stone-400');
            } else {
                favBtn.classList.add('text-stone-400');
                favBtn.classList.remove('text-brand-600');
            }
        }

        try {
            let item = window.loadedItems.find(i => i.id === id);
            if (!item) {
                const { data } = await supabase.from('items').select('*').eq('id', id).maybeSingle();
                if (data) { item = window.mapItemData(data); window.loadedItems.push(item); }
            }
            if (!item) { 
                if (typeof window.showToast === 'function') window.showToast("Товар не найден", true); 
                return; 
            }

            window.activeModalItemId = item.id;

            // ВАУ-ЭФФЕКТ: Свайп-карусель изображений
            const carousel = document.getElementById('modal-carousel');
            const dotsContainer = document.getElementById('modal-pagination-dots');
            const btnPrev = document.getElementById('modal-prev-photo');
            const btnNext = document.getElementById('modal-next-photo');

            if (carousel && dotsContainer) {
                let images = Array.isArray(item.images) && item.images.length > 0
                    ? item.images
                    : [item.imageUrl || item.image_url || 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=100'];

                window.currentLightboxImages = images;

                // Генерируем слайды
                carousel.innerHTML = images.map((src) => `
                    <div class="w-full h-full shrink-0 flex items-center justify-center snap-center relative">
                        <img src="${src}" class="max-w-full max-h-full object-contain cursor-zoom-in transition duration-500 hover:scale-[1.02]" onclick="window.openLightbox('${src}')">
                    </div>
                `).join('');

                // Генерируем точки
                if (images.length > 1) {
                    dotsContainer.innerHTML = images.map((_, idx) => `
                        <div class="carousel-dot w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-white scale-125 shadow-sm' : 'bg-white/50'}"></div>
                    `).join('');
                    dotsContainer.classList.remove('hidden');
                    if (btnPrev) btnPrev.classList.replace('hidden', 'md:flex');
                    if (btnNext) btnNext.classList.replace('hidden', 'md:flex');

                    // Синхронизация скролла с точками
                    carousel.onscroll = () => {
                        const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
                        const dots = dotsContainer.querySelectorAll('.carousel-dot');
                        dots.forEach((dot, i) => {
                            dot.className = i === index
                                ? "carousel-dot w-2 h-2 rounded-full transition-all duration-300 bg-white scale-125 shadow-sm"
                                : "carousel-dot w-2 h-2 rounded-full transition-all duration-300 bg-white/50";
                        });
                        window.currentLightboxIndex = index;
                    };

                    // Прокрутка в начало при открытии нового товара
                    carousel.scrollLeft = 0;
                } else {
                    dotsContainer.innerHTML = '';
                    dotsContainer.classList.add('hidden');
                    if (btnPrev) btnPrev.classList.replace('md:flex', 'hidden');
                    if (btnNext) btnNext.classList.replace('md:flex', 'hidden');
                }
            }

            const vipCrown = item.isHighlighted ? `<span class="text-amber-500 ml-3 text-2xl" title="VIP Товар"><i class="fa-solid fa-crown"></i></span>` : '';
            const titleEl = document.getElementById('modal-title');
            if (titleEl) titleEl.innerHTML = `${item.title || 'Без названия'} ${vipCrown}`;

            const isService = item.category && item.category.includes('Услуги');
            const isJob = item.category && item.category.includes('Работа');
            const isEstate = item.category && (item.category.includes('Жилье') || item.category.includes('Недвижимость'));
            const isAnimalEntity = item.category && item.category.startsWith('Животные') && !item.category.includes('Товары');

            const condTextEl = document.getElementById('modal-condition-text');
            if (condTextEl) {
                if (isService || isJob || isEstate || isAnimalEntity) { condTextEl.classList.add('hidden'); }
                else { condTextEl.classList.remove('hidden'); condTextEl.innerHTML = item.condition === 'Новое' ? '<i class="fa-solid fa-sparkles mr-1"></i> Новое' : '<i class="fa-solid fa-recycle mr-1"></i> Б/У'; }
            }

            const catTextEl = document.getElementById('modal-category-text');
            if (catTextEl) {
                const catText = (item.category && item.category.includes('-')) ? item.category.split('-')[1].trim() : (item.category || 'Другое');
                catTextEl.innerText = catText.toUpperCase();

                let bgClass = 'bg-brand-600';
                if (isService) bgClass = 'bg-blue-500';
                else if (isJob) bgClass = 'bg-fuchsia-500';
                else if (isEstate) bgClass = 'bg-indigo-500';

                catTextEl.className = `text-xs sm:text-sm font-black text-white px-3 py-1 rounded ${bgClass}`;
            }

            const priceEl = document.getElementById('modal-price');
            if (priceEl) priceEl.innerText = `${item.price || 0} ${item.currency || 'RSD'}`;

            const delCont = document.getElementById('modal-delivery-container');
            if (delCont) {
                let delHtml = '';
                const delList = item.delivery || ['Личная встреча'];
                if (delList.includes('PostExpress')) delHtml += `<span class="bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-brand-200 dark:border-brand-800/50"><i class="fa-solid fa-box mr-1.5"></i> Отправка PostExpress</span>`;
                if (delList.includes('Личная встреча')) delHtml += `<span class="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700"><i class="fa-solid fa-handshake mr-1.5"></i> Личная встреча</span>`;
                delCont.innerHTML = delHtml;
            }

            const phoneContainer = document.getElementById('modal-phone-container');
            if (phoneContainer) {
                if (item.phone) {
                    phoneContainer.classList.remove('hidden');
                    phoneContainer.classList.add('flex');
                    const phoneEl = document.getElementById('modal-phone');
                    const phoneText = document.getElementById('modal-phone-text');
                    if (phoneEl && phoneText) {
                        phoneEl.href = `tel:${item.phone}`;
                        phoneText.innerText = item.phone; 
                    }
                } else {
                    phoneContainer.classList.add('hidden');
                    phoneContainer.classList.remove('flex');
                }
            }

            // --- СТАТУСЫ ТОВАРА (ПРОДАНО / РЕЗЕРВ) ---
            const statusBadge = document.getElementById('modal-status-badge');
            if (statusBadge) {
                const isReserved = item.status === 'reserved' || item.is_reserved === true;

                if (item.status === 'sold') {
                    statusBadge.innerHTML = '<i class="fa-solid fa-check-circle mr-1"></i> ПРОДАНО';
                    statusBadge.className = 'text-[11px] font-bold px-2.5 py-1 rounded-lg text-white bg-red-500 shadow-sm inline-flex items-center';
                } else if (isReserved) {
                    statusBadge.innerHTML = '<i class="fa-solid fa-clock mr-1"></i> В РЕЗЕРВЕ';
                    statusBadge.className = 'text-[11px] font-bold px-2.5 py-1 rounded-lg text-white bg-amber-500 shadow-sm inline-flex items-center';
                } else {
                    statusBadge.className = 'hidden';
                }
            }

            // Подготовка блока адреса (без запуска карты)
            const addrCont = document.getElementById('modal-address-container');
            if (addrCont) {
                if (isEstate && item.coords && Array.isArray(item.coords) && item.coords.length === 2 && item.coords[0] !== 0) {
                    addrCont.classList.remove('hidden');
                    addrCont.classList.add('flex');
                    const modalAddrEl = document.getElementById('modal-address');
                    if (modalAddrEl) modalAddrEl.innerText = window.t ? window.t(item.address || item.city || '') : (item.address || item.city || '');
                } else {
                    addrCont.classList.add('hidden'); addrCont.classList.remove('flex');
                }
            }
            
            const descEl = document.getElementById('modal-desc');
            if (descEl) descEl.innerText = item.description || "Описание отсутствует.";

            const cityTextEl = document.getElementById('modal-city-text');
            if (cityTextEl) cityTextEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${(item.city || "СЕРБИЯ").toUpperCase()}`;

            const authorEl = document.getElementById('modal-author');
            if (authorEl) authorEl.innerText = item.authorName || "Пользователь";

            const avatarEl = document.getElementById('modal-author-avatar');
            if (avatarEl) avatarEl.innerHTML = item.authorAvatar ? `<img src="${item.authorAvatar}" class="w-full h-full object-cover">` : `<i class="fa-solid fa-user"></i>`;

            // --- ЛОГИКА ПЛАШКИ ПРОДАВЦА + РЕЙТИНГ ---
            const authorSubEl = document.getElementById('modal-author-sub');
            if (authorSubEl) {
                authorSubEl.className = "text-[11px] text-stone-500 font-bold mt-1 flex items-center flex-wrap gap-2";

                const statusHtml = item.isHighlighted ?
                    `<span class="bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-widest shrink-0">VIP ПРОДАВЕЦ</span>` :
                    `<span class="shrink-0">Продавец SVALKA</span>`;

                authorSubEl.innerHTML = statusHtml;

                supabase.from('reviews').select('rating').eq('seller_id', item.userId).then(({ data, error }) => {
                    if (!error && data && data.length > 0) {
                        const avg = (data.reduce((sum, r) => sum + (r.rating || 5), 0) / data.length).toFixed(1);
                        authorSubEl.innerHTML = `${statusHtml} <span class="flex items-center gap-1 text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 px-1.5 py-0.5 rounded-md shadow-sm border border-stone-200 dark:border-stone-700"><i class="fa-solid fa-star text-amber-500 text-[10px]"></i> <span class="font-black">${avg}</span> <span class="text-stone-400 font-medium ml-0.5">(${data.length})</span></span>`;
                    }
                });
            }

            const ratingEl = document.getElementById('modal-author-rating');
            if (ratingEl) {
                ratingEl.classList.add('hidden');
                ratingEl.classList.remove('flex');
            }

            const sellerBtn = document.getElementById('modal-seller-btn');
            if (sellerBtn) {
                sellerBtn.onclick = () => {
                    if (typeof window.openSellerProfile === 'function') {
                        window.openSellerProfile(item.userId || item.user_id, item.authorName || item.author_name, item.authorAvatar || item.author_avatar);
                    }
                };
            }

            if (typeof window.updateSEO === 'function') {
                const coverImg = (Array.isArray(item.images) && item.images.length > 0) ? item.images[0] : (item.imageUrl || '');
                window.updateSEO(item.title, item.description, coverImg);
            }

            const modalFavBtn = document.getElementById('modal-fav-btn');
            const modalFavIcon = document.querySelector('#modal-fav-btn i');
            if (modalFavIcon && window.userFavorites) {
                const isLiked = window.userFavorites.has(item.id);
                modalFavIcon.className = isLiked ? 'fa-solid text-brand-500 fa-box drop-shadow-sm transition-transform scale-110' : 'fa-solid text-stone-400 fa-box-open drop-shadow-sm transition-transform';
                if (modalFavBtn) modalFavBtn.title = isLiked ? "Убрать со склада" : "Добавить на склад";
            }

            const isOwner = window.currentUser && window.currentUser.id === item.userId;
            const ctrl = document.getElementById('modal-owner-controls');
            const contactBtn = document.getElementById('btn-contact-seller');

            // --- ПАНЕЛЬ ВЛАДЕЛЬЦА: ТАЙМЕРЫ И СТАТУСЫ ---
            const ownerControls = document.getElementById('modal-owner-controls');
            const chatBtn = document.getElementById('btn-contact-seller'); 

            if (isOwner) {
                if (ownerControls) ownerControls.classList.remove('hidden');
                if (chatBtn) chatBtn.classList.add('hidden');

                const shareBadge = document.getElementById('share-bump-badge');
                const shareTimer = document.getElementById('share-bump-timer');
                if (shareBadge && shareTimer) {
                    const lastShared = item.last_shared_at ? new Date(item.last_shared_at).getTime() : 0;
                    const now = new Date().getTime();
                    const hoursPassed = lastShared ? (now - lastShared) / (1000 * 60 * 60) : 25;

                    if (hoursPassed >= 24) {
                        shareBadge.classList.remove('hidden');
                        shareTimer.innerText = "+1 В ТОП бесплатно";
                        shareTimer.classList.add('text-brand-600', 'dark:text-brand-400', 'font-black');
                    } else {
                        shareBadge.classList.add('hidden');
                        const hoursLeft = Math.ceil(24 - hoursPassed);
                        shareTimer.innerText = `Кулдаун: ${hoursLeft} ч.`;
                        shareTimer.classList.remove('text-brand-600', 'dark:text-brand-400', 'font-black');
                    }
                }

                const reserveBtnText = document.getElementById('btn-reserve-text');
                const isReserved = item.status === 'reserved' || item.is_reserved;
                if (reserveBtnText) reserveBtnText.innerText = isReserved ? "Снять резерв" : "В резерв";

            } else {
                if (ownerControls) ownerControls.classList.add('hidden');
                if (chatBtn) {
                    chatBtn.classList.remove('hidden'); 
                    
                    chatBtn.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        if (!window.currentUser) {
                            if (typeof window.showToast === 'function') window.showToast(window.t('Войдите, чтобы написать продавцу'), 'error');
                            return;
                        }
                        
                        const ownerId = item.userId || item.user_id;
                        const chatId = [window.currentUser.id, ownerId].sort().join('_') + '_' + item.id;
                        const itemImg = (Array.isArray(item.images) && item.images.length > 0) ? item.images[0] : (item.imageUrl || '');
                        
                        if (typeof window.openChat === 'function') {
                            window.openChat(chatId, item.title, item.id, itemImg, ownerId);
                        }
                    };
                } 
            }

            const currentIndex = window.loadedItems.findIndex(i => i.id === item.id);
            const prevBtn = document.getElementById('modal-prev-item');
            const nextBtn = document.getElementById('modal-next-item');

            if (prevBtn) {
                if (currentIndex > 0) { prevBtn.classList.remove('hidden'); prevBtn.classList.add('flex'); }
                else { prevBtn.classList.add('hidden'); prevBtn.classList.remove('flex'); }
            }
            if (nextBtn) {
                if (currentIndex !== -1 && currentIndex < window.loadedItems.length - 1) { nextBtn.classList.remove('hidden'); nextBtn.classList.add('flex'); }
                else { nextBtn.classList.add('hidden'); nextBtn.classList.remove('flex'); }
            }

            if (typeof window.openModal === 'function') {
                window.openModal('item-modal');
            }
            history.pushState({ modal: true }, '', '?item=' + id);

            // ИСПРАВЛЕНИЕ: Карта недвижимости запускается СТРОГО ПОСЛЕ открытия модального окна!
            if (isEstate && item.coords && Array.isArray(item.coords) && item.coords.length === 2 && item.coords[0] !== 0) {
                setTimeout(() => {
                    try {
                        if (typeof L === 'undefined') return; 
                        
                        const mapEl = document.getElementById('view-map');
                        if (!mapEl) return;

                        if (!window.viewMapObj) {
                            window.viewMapObj = L.map('view-map').setView([item.coords[0], item.coords[1]], 15);
                            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(window.viewMapObj);
                            window.viewMarkerObj = L.marker([item.coords[0], item.coords[1]]).addTo(window.viewMapObj);
                        } else {
                            window.viewMapObj.setView([item.coords[0], item.coords[1]], 15);
                            window.viewMarkerObj.setLatLng([item.coords[0], item.coords[1]]);
                        }
                        
                        window.viewMapObj.invalidateSize();
                        // Двойной вызов перерасчета размера карты гарантирует её прогрузку
                        setTimeout(() => { if (window.viewMapObj) window.viewMapObj.invalidateSize(); }, 200);
                        
                    } catch (mapErr) { console.error("Ошибка инициализации карты:", mapErr); }
                }, 400); // Задержка 400мс, чтобы анимация модалки точно завершилась
            }

        } catch (err) { console.error(err); }
    }
};
