// ==========================================
// modules/i18n.js — Модуль локализации
// ==========================================
export const I18nModule = {
    currentLang: localStorage.getItem('svalka_lang') || 'ru',
    
    // Сюда полностью переносите ваш объект window.i18n из main.js
    dictionary: {
        ru: {
            'page_title': 'SVALKA — Маркетплейс вещей в Сербии', 'og_desc': 'Отличные находки и быстрые продажи в Сербии.',
            'search_placeholder': 'Я ищу...', 'btn_login': 'Войти', 'btn_publish': 'Пристроить добро', 'btn_publish_mob': 'Продать',
            'nav_info': 'Инфо', 'nav_about': 'О проекте', 'nav_rules': 'Правила', 'nav_security': 'Безопасность',
            'nav_faq': 'Помощь / FAQ', 'nav_privacy': 'Политика', 'nav_terms': 'Условия', 'nav_contacts': 'Контакты',
            'nav_profile': 'Профиль', 'nav_messages': 'Сообщения', 'nav_logout': 'Выйти', 'Вы продаете': 'Вы продаете', 'Вы покупаете': 'Вы покупаете', 'Собеседник:': 'Собеседник:', 'Товар удален': 'Товар удален',
            'bot_nav_home': 'Главная', 'bot_nav_saved': 'Склад', 'bot_nav_chat': 'Чат', 'feed_title': 'Находки', 'feed_desc': 'Самые свежие объявления Сербии',
            'filter_btn': 'Фильтры', 'filter_cat': 'Категория', 'filter_city': 'Город', 'filter_condition': 'Состояние',
            'filter_price': 'Цена', 'filter_currency': 'Валюта', 'filter_payment': 'Оплата', 'filter_price_from': 'От',
            'filter_price_to': 'До', 'pay_cash': 'Наличные', 'pay_card': 'Перевод на карту', 'pay_crypto': 'Криптоперевод',
            'btn_reset': 'Сбросить', 'btn_show_results': 'Показать находки', 'cat_all': 'Все', 'cat_top': 'ТОП', 'btn_edit': 'Редакт.',
            'cat_clothes': 'Одежда', 'cat_kids': 'Детям', 'cat_electro': 'Электроника', 'cat_interior': 'Интерьер', 'btn_edit_sub': 'Изменить',
            'cat_transport': 'Транспорт', 'cat_beauty': 'Красота', 'cat_services': 'Услуги', 'cat_job': 'Работа',
            'cat_business': 'Бизнес', 'cat_hobby': 'Хобби', 'cat_animals': 'Животные', 'cat_home': 'Жилье', 'cat_other': 'Другое',
            'vip_title': 'ТОП Находки', 'vip_promo': 'Получи VIP-статус и продавай вещи быстрее!', 'btn_connect': 'Подключить',
            'fresh_title': 'Свежие объявления', 'sort_new': 'Новые', 'sort_cheap': 'Дешевые', 'sort_exp': 'Дорогие',
            'btn_loading': 'Подгружаем...', 'empty_title': 'Тут пока пусто', 'empty_desc': 'Попробуйте изменить фильтры поиска или загляните позже.',
            'footer_support': 'Служба поддержки', 'footer_rights': '© 2026 SVALKA. ВСЕ ПРАВА ЗАЩИЩЕНЫ.', 'add_title': 'Пристроить добро',
            'add_drop_title': 'Перетащите фото сюда', 'add_drop_sub': 'Или нажмите для выбора', 'add_item_title': 'Название',
            'add_price': 'Цена', 'add_address_title': 'Точный адрес и локация', 'add_address_ph': 'Улица и номер дома...',
            'add_phone': 'Телефон (необязательно)', 'add_pay_title': 'Оплата (Можно несколько)', 'add_del_title': 'Способ передачи',
            'add_cond_title': 'Состояние', 'cond_new': 'Новое', 'cond_used': 'Б/У', 'add_desc_title': 'Описание',
            'add_desc_ph': 'Описание...', 'btn_publish_item': 'Опубликовать', 'profile_title': 'Гость', 'profile_status': 'Статус:',
            'profile_base': 'Базовый', 'profile_buy_pro': 'Купить PRO ($5)', 'tab_my_items': 'Мои вещи', 'tab_my_saved': 'Склад',
            'profile_search': 'Поиск по профилю...', 'profile_empty': 'Пусто', 'seller_ads': 'Объявлений:', 'btn_leave_review': 'Оставить отзыв',
            'tab_seller_items': 'Все объявления', 'tab_seller_reviews': 'Отзывы', 'seller_search': 'Поиск по товарам...',
            'seller_empty': 'Нет активных объявлений', 'share_title': 'Поделиться товаром', 'share_sub': 'Выберите способ отправки ссылки',
            'share_copy': 'Копировать', 'share_verify': 'Вы успешно поделились ссылкой?', 'btn_share_yes': 'Да, я поделился!',
            'chat_list_title': 'Сообщения', 'chat_list_empty': 'У вас пока нет активных диалогов', 'chat_ph': 'Написать сообщение...',
            'auth_tab_login': 'Вход', 'auth_tab_reg': 'Регистрация', 'auth_name': 'Ваше Имя', 'auth_avatar': 'Выберите аватар',
            'auth_pass': 'Пароль', 'auth_pass_conf': 'Повторите пароль', 'auth_hint': 'Мин. 8 символов: латиница и цифры',
            'auth_forgot': 'Забыли пароль?', 'edit_title': 'Настройки', 'edit_name': 'Ваше Имя', 'edit_phone': 'Телефон (для объявлений)',
            'btn_save': 'Сохранить изменения', 'item_desc_title': 'Описание находки', 'item_desc_empty': 'Описание отсутствует.',
            'item_address': 'Точный адрес:', 'btn_chat': 'Чат', 'btn_bump': 'Поднять', 'btn_bump_sub': 'Раз в 24 часа',
            'btn_repost': 'Репост', 'btn_vip': 'В VIP-блок', 'btn_reserve': 'В резерв', 'btn_sold': 'Продано', 'btn_delete': 'Удалить',
            'confirm_title': 'Вы уверены?', 'confirm_desc': 'Это действие нельзя отменить.', 'btn_cancel': 'Отмена', 'btn_yes': 'Да, уверен',
            'del_meet': 'Личная встреча', 'del_post': 'PostExpress', 'report_title': 'Жалоба', 'rep_fraud': 'Мошенничество',
            'rep_spam': 'Спам / Дубликаты', 'rep_toxic': 'Оскорбления', 'rep_illegal': 'Запрещенные вещи', 'rep_other': 'Другое',
            'report_ph': 'Опишите проблему подробнее (необязательно)...', 'btn_send_report': 'Отправить жалобу',
            'review_title': 'Оцените продавца', 'review_sub': 'Ваш отзыв поможет другим покупателям!', 'review_ph': 'Напишите пару слов о сделке...',
            'net_bep20': 'Tether (USDT) — сеть BEP-20 (BSC)', 'net_erc20': 'Tether (USDT) — сеть ERC-20', 'net_eth': 'Ethereum (ETH)', 'net_ton': 'Toncoin (TON)',
            'btn_send_review': 'Отправить отзыв', 'pro_feat1_title': 'Бесплатные поднятия', 'pro_feat1_desc': 'Каждый день 1 поднятие в ТОП', 'pro_feat2_title': 'VIP-бейдж',
            'pro_feat2_desc': 'Выделяет вас среди других продавцов', 'pro_price_label': 'Стоимость на 30 дней:', 'pro_network_label': 'Выберите сеть оплаты:', 'pro_network_hint': 'Комиссии сети BEP-20 самые низкие.',
            'pro_secure_label': 'Безопасная оплата криптовалютой', 'pro_pay_btn': 'ОПЛАТИТЬ',
            'Белград': 'Белград', 'Нови-Сад': 'Нови-Сад', 'Ниш': 'Ниш', 'Крагуевац': 'Крагуевац', 'Суботица': 'Суботица', 'Зренянин': 'Зренянин', 'Панчево': 'Панчево', 'Чачак': 'Чачак', 'Кралево': 'Кралево', 'Нови-Пазар': 'Нови-Пазар', 'Смедерево': 'Смедерево', 'Лесковац': 'Лесковац', 'Вране': 'Вране', 'Сомбор': 'Сомбор', 'Другой': 'Другой',
            'Все категории': 'Все категории', 'Любое': 'Любое', 'Любая': 'Любая', 'Динары': 'Динары', 'Евро': 'Евро', 'Все в': 'Все в', 'Склад': 'Склад', 'Мои вещи': 'Мои вещи',
            'Одежда': 'Одежда', 'Женская': 'Женская', 'Мужская': 'Мужская', 'Обувь': 'Обувь', 'Сумки': 'Сумки', 'Аксессуары': 'Аксессуары', 'Спецодежда': 'Спецодежда',
            'Детям': 'Детям', 'Игрушки': 'Игрушки', 'Коляски': 'Коляски', 'Автокресла': 'Автокресла', 'Детская мебель': 'Детская мебель', 'Мебель': 'Мебель',
            'Электроника': 'Электроника', 'Телефоны': 'Телефоны', 'Смартфоны': 'Смартфоны', 'ПК': 'ПК', 'Компьютеры / ПК': 'Компьютеры / ПК', 'Ноутбуки': 'Ноутбуки', 'Планшеты': 'Планшеты', 'ТВ': 'ТВ', 'ТВ и Видео': 'ТВ и Видео', 'Аудио': 'Аудио', 'Консоли': 'Консоли', 'Игры / Консоли': 'Игры / Консоли', 'Бытовая': 'Бытовая', 'Бытовая техника': 'Бытовая техника', 'Фото': 'Фото', 'Фототехника': 'Фототехника',
            'Интерьер': 'Интерьер', 'Декор': 'Декор', 'Посуда': 'Посуда', 'Текстиль': 'Текстиль', 'Ремонт': 'Ремонт', 'Стройматериалы': 'Стройматериалы', 'Инструменты': 'Инструменты', 'Сад': 'Сад', 'Сад и Огород': 'Сад и Огород',
            'Транспорт': 'Транспорт', 'Авто': 'Авто', 'Автомобили': 'Автомобили', 'Мото': 'Мото', 'Вело': 'Вело', 'Велосипеды': 'Велосипеды', 'Самокаты': 'Самокаты', 'Запчасти': 'Запчасти', 'Шины': 'Шины', 'Шины и диски': 'Шины и диски',
            'Красота': 'Красота', 'Косметика': 'Косметика', 'Парфюмерия': 'Парфюмерия', 'Уход': 'Уход', 'Уход за собой': 'Уход за собой', 'Приборы': 'Приборы', 'Фены и стайлеры': 'Фены и стайлеры',
            'Услуги': 'Услуги', 'Ремонт техники': 'Ремонт техники', 'Автосервис': 'Автосервис', 'Стройка': 'Стройка', 'Ремонт и стройка': 'Ремонт и стройка', 'Бьюти услуги': 'Бьюти услуги', 'Репетиторы': 'Репетиторы', 'Праздники': 'Праздники',
            'Работа': 'Работа', 'Вакансии': 'Вакансии', 'Резюме': 'Резюме', 'Ищу работу': 'Ищу работу',
            'Бизнес': 'Бизнес', 'Оборудование': 'Оборудование', 'Готовый бизнес': 'Готовый бизнес', 'Сырье': 'Сырье', 'Сырье и материалы': 'Сырье и материалы',
            'Хобби': 'Хобби', 'Спорт': 'Спорт', 'Туризм': 'Туризм', 'Туризм и палатки': 'Туризм и палатки', 'Книги': 'Книги', 'Музыка': 'Музыка', 'Музыкальные инструменты': 'Музыкальные инструменты', 'Игры': 'Игры', 'Настольные игры': 'Настольные игры', 'Коллекции': 'Коллекции', 'Коллекционирование': 'Коллекционирование',
            'Животные': 'Животные', 'Собаки': 'Собаки', 'Кошки': 'Кошки', 'Птицы': 'Птицы', 'Аквариум': 'Аквариум', 'Аквариумистика': 'Аквариумистика', 'Товары': 'Товары', 'Зоотовары': 'Зоотовары', 'Другие': 'Другие',
            'Жилье': 'Жилье', 'Аренда': 'Аренда', 'Посуточно': 'Посуточно', 'Аренда (посуточно)': 'Аренда (посуточно)', 'Покупка': 'Покупка', 'Продажа': 'Продажа', 'Коммерция': 'Коммерция', 'Коммерческая': 'Коммерческая', 'Дачи': 'Дачи', 'Дома и дачи': 'Дома и дачи',
            'Другое': 'Другое', 'Билеты': 'Билеты', 'Продукты': 'Продукты', 'Продукты питания': 'Продукты питания', 'Разное': 'Разное', 'Бесплатно': 'Бесплатно', 'Отдам даром': 'Отдам даром', 'Бюро': 'Бюро', 'Бюро находок': 'Бюро находок',
            'Убрать из ТОПа': 'Убрать из ТОПа', 'Снять резерв': 'Снять резерв', 'В резерв': 'В резерв',
            'VIP ПРОДАВЕЦ': 'VIP ПРОДАВЕЦ', 'Продавец SVALKA': 'Продавец SVALKA',
            'Активен еще': 'Активен еще', 'дн.': 'дн.', 'Способ получения': 'Способ получения', 
            'Варианты оплаты': 'Варианты оплаты', 'СЕРБИЯ': 'СЕРБИЯ', 'Криптовалюта': 'Криптовалюта', 'Личная встреча': 'Личная встреча', 'Наличные': 'Наличные'
        },
        en: {
            'page_title': 'SVALKA — Classifieds in Serbia', 'og_desc': 'Great finds and quick sales in Serbia.', 'Например: велосипед, макбук...': 'For example: bicycle, macbook...', 'Базовый': 'Basic', 'ВИП': 'VIP',
            'search_placeholder': 'I am looking for...', 'btn_login': 'Log in', 'btn_publish': 'Post an Ad', 'btn_publish_mob': 'Sell',
            'nav_info': 'Info', 'nav_about': 'About Project', 'nav_rules': 'Rules', 'nav_security': 'Security', 'Вы продаете': 'Selling', 'Вы покупаете': 'Buying', 'Собеседник:': 'Chat with:', 'Товар удален': 'Item deleted',
            'nav_faq': 'Help / FAQ', 'nav_privacy': 'Privacy', 'nav_terms': 'Terms', 'nav_contacts': 'Contacts',
            'nav_profile': 'Profile', 'nav_messages': 'Messages', 'nav_logout': 'Log out', 'bot_nav_home': 'Home',
            'bot_nav_saved': 'Saved', 'bot_nav_chat': 'Chat', 'feed_title': 'Finds', 'feed_desc': 'Latest classifieds in Serbia',
            'filter_btn': 'Filters', 'filter_cat': 'Category', 'filter_city': 'City', 'filter_condition': 'Condition',
            'filter_price': 'Price', 'filter_currency': 'Currency', 'filter_payment': 'Payment', 'filter_price_from': 'From',
            'filter_price_to': 'To', 'pay_cash': 'Cash', 'pay_card': 'Card Transfer', 'pay_crypto': 'Crypto',
            'btn_reset': 'Reset', 'btn_show_results': 'Show Results', 'cat_all': 'All', 'cat_top': 'TOP',
            'cat_clothes': 'Clothing', 'cat_kids': 'Kids', 'cat_electro': 'Electronics', 'cat_interior': 'Interior',
            'cat_transport': 'Transport', 'cat_beauty': 'Beauty', 'cat_services': 'Services', 'cat_job': 'Jobs',
            'cat_business': 'Business', 'cat_hobby': 'Hobby', 'cat_animals': 'Pets', 'cat_home': 'Real Estate', 'cat_other': 'Other',
            'vip_title': 'TOP Finds', 'vip_promo': 'Get VIP status and sell items faster!', 'btn_connect': 'Upgrade',
            'fresh_title': 'Latest Ads', 'sort_new': 'Newest', 'sort_cheap': 'Cheapest', 'sort_exp': 'Most Expensive',
            'btn_loading': 'Loading...', 'empty_title': 'It\'s empty here', 'empty_desc': 'Try changing your search filters or check back later.',
            'footer_support': 'Support', 'footer_rights': '© 2026 SVALKA. ALL RIGHTS RESERVED.', 'add_title': 'Post an Ad',
            'add_drop_title': 'Drop photos here', 'add_drop_sub': 'Or click to select', 'add_item_title': 'Title',
            'add_price': 'Price', 'add_address_title': 'Exact address and location', 'add_address_ph': 'Street and house number...',
            'add_phone': 'Phone (optional)', 'add_pay_title': 'Payment (Multiple possible)', 'add_del_title': 'Delivery method',
            'add_cond_title': 'Condition', 'cond_new': 'New', 'cond_used': 'Used', 'add_desc_title': 'Description',
            'add_desc_ph': 'Description...', 'btn_publish_item': 'Publish', 'profile_title': 'Guest', 'profile_status': 'Status:',
            'profile_base': 'Basic', 'profile_buy_pro': 'Buy PRO ($5)', 'tab_my_items': 'My Items', 'tab_my_saved': 'Saved',
            'profile_search': 'Search profile...', 'profile_empty': 'Empty', 'seller_ads': 'Ads:', 'btn_leave_review': 'Leave a review',
            'tab_seller_items': 'All Ads', 'tab_seller_reviews': 'Reviews', 'seller_search': 'Search items...',
            'seller_empty': 'No active ads', 'share_title': 'Share Item', 'share_sub': 'Choose how to send the link',
            'share_copy': 'Copy', 'share_verify': 'Did you successfully share the link?', 'btn_share_yes': 'Yes, I shared it!',
            'chat_list_title': 'Messages', 'chat_list_empty': 'You have no active dialogues yet', 'chat_ph': 'Write a message...',
            'auth_tab_login': 'Login', 'auth_tab_reg': 'Register', 'auth_name': 'Your Name', 'auth_avatar': 'Choose avatar',
            'auth_pass': 'Password', 'auth_pass_conf': 'Repeat password', 'auth_hint': 'Min. 8 chars: letters and numbers',
            'auth_forgot': 'Forgot password?', 'edit_title': 'Settings', 'edit_name': 'Your Name', 'edit_phone': 'Phone (for ads)',
            'btn_save': 'Save changes', 'item_desc_title': 'Item Description', 'item_desc_empty': 'No description provided.',
            'item_address': 'Exact address:', 'btn_chat': 'Chat', 'btn_bump': 'Bump', 'btn_bump_sub': 'Once per 24 hours',
            'btn_repost': 'Repost', 'btn_vip': 'To VIP block', 'btn_reserve': 'Reserve', 'btn_sold': 'Sold', 'btn_delete': 'Delete',
            'confirm_title': 'Are you sure?', 'confirm_desc': 'This action cannot be undone.', 'btn_cancel': 'Cancel', 'btn_yes': 'Yes, I am sure',
            'del_meet': 'Personal meeting', 'del_post': 'PostExpress', 'report_title': 'Report', 'rep_fraud': 'Fraud / Deception',
            'rep_spam': 'Spam / Duplicates', 'rep_toxic': 'Insults', 'rep_illegal': 'Prohibited items', 'rep_other': 'Other',
            'report_ph': 'Describe the problem (optional)...', 'btn_send_report': 'Send Report', 'btn_edit_sub': 'Change',
            'review_title': 'Rate the seller', 'review_sub': 'Your review will help other buyers!', 'review_ph': 'Write a few words...',
            'btn_send_review': 'Send Review', 'pro_feat1_title': 'Free Bumps', 'PRO (Активен)': 'PRO (Active)',
            'pro_feat1_desc': '1 free top bump every day', 'pro_feat2_title': 'VIP Badge', 'btn_edit': 'Edit',
            'pro_feat2_desc': 'Makes you stand out from other sellers', 'pro_price_label': 'Cost for 30 days:',
            'pro_network_label': 'Select payment network:', 'pro_network_hint': 'BEP-20 network fees are the lowest.',
            'pro_secure_label': 'Secure cryptocurrency payment', 'pro_pay_btn': 'PAY',
            'Одежда и Обувь':'Clothing & Shoes', 'Дом и Интерьер':'Home & Interior', 'Красота и Здоровье':'Beauty & Health', 'Для Бизнеса':'For Business', 'Хобби и Отдых':'Hobbies & Leisure',
            'Недвижимость':'Real Estate', 'Жилье':'Accommodation', 'Услуги':'Services', 'Работа':'Jobs', 'В ТОП':'To TOP', 'Редакт.':'Edit',
            'Статус':'Status', 'Базовый':'Basic', 'Любое':'Any', 'Новое':'New', 'Б/У':'Used', 'Новые находки':'New Finds',
            'Категория...':'Category...', 'Город...':'City...', 'Описание отсутствует.':'No description.',
            'Белград': 'Belgrade', 'Нови-Сад': 'Novi Sad', 'Ниш': 'Nis', 'Крагуевац': 'Kragujevac', 'Суботица': 'Subotica', 'Зренянин': 'Zrenjanin', 'Панчево': 'Pancevo', 'Чачак': 'Cacak', 'Кралево': 'Kraljevo', 'Нови-Пазар': 'Novi Pazar', 'Смедерево': 'Smederevo', 'Лесковац': 'Leskovac', 'Вране': 'Vranje', 'Сомбор': 'Sombor', 'Другой': 'Other',
            'Все категории': 'All Categories', 'Любое': 'Any', 'Любая': 'Any', 'Динары': 'Dinars', 'Евро': 'Euros', 'Все в': 'All in', 'Склад': 'Saved', 'Мои вещи': 'My Items',
            'Одежда': 'Clothing', 'Женская': 'Women\'s', 'Мужская': 'Men\'s', 'Обувь': 'Shoes', 'Сумки': 'Bags', 'Аксессуары': 'Accessories', 'Спецодежда': 'Workwear',
            'Детям': 'Kids', 'Игрушки': 'Toys', 'Коляски': 'Strollers', 'Автокресла': 'Car Seats', 'Детская мебель': 'Kids Furniture', 'Мебель': 'Furniture',
            'Электроника': 'Electronics', 'Телефоны': 'Phones', 'Смартфоны': 'Smartphones', 'ПК': 'PC', 'Компьютеры / ПК': 'Computers / PC', 'Ноутбуки': 'Laptops', 'Планшеты': 'Tablets', 'ТВ': 'TV', 'ТВ и Видео': 'TV & Video', 'Аудио': 'Audio', 'Консоли': 'Consoles', 'Игры / Консоли': 'Games / Consoles', 'Бытовая': 'Appliances', 'Бытовая техника': 'Home Appliances', 'Фото': 'Photo', 'Фототехника': 'Photo Equipment',
            'Интерьер': 'Interior', 'Декор': 'Decor', 'Посуда': 'Tableware', 'Текстиль': 'Textiles', 'Ремонт': 'Repair', 'Стройматериалы': 'Building Materials', 'Инструменты': 'Tools', 'Сад': 'Garden', 'Сад и Огород': 'Garden & Yard',
            'Транспорт': 'Transport', 'Авто': 'Auto', 'Автомобили': 'Cars', 'Мото': 'Moto', 'Вело': 'Bikes', 'Велосипеды': 'Bicycles', 'Самокаты': 'Scooters', 'Запчасти': 'Parts', 'Шины': 'Tires', 'Шины и диски': 'Tires & Wheels',
            'Красота': 'Beauty', 'Косметика': 'Cosmetics', 'Парфюмерия': 'Perfumery', 'Уход': 'Care', 'Уход за собой': 'Personal Care', 'Приборы': 'Devices', 'Фены и стайлеры': 'Hair Dryers & Stylers',
            'Услуги': 'Services', 'Ремонт техники': 'Tech Repair', 'Автосервис': 'Car Service', 'Стройка': 'Construction', 'Ремонт и стройка': 'Repair & Construction', 'Бьюти услуги': 'Beauty Services', 'Репетиторы': 'Tutors', 'Праздники': 'Events',
            'Работа': 'Jobs', 'Вакансии': 'Vacancies', 'Резюме': 'Resumes', 'Ищу работу': 'Looking for a job',
            'Бизнес': 'Business', 'Оборудование': 'Equipment', 'Готовый бизнес': 'Ready Business', 'Сырье': 'Raw Materials', 'Сырье и материалы': 'Raw Materials',
            'Хобби': 'Hobby', 'Спорт': 'Sport', 'Туризм': 'Tourism', 'Туризм и палатки': 'Tourism & Tents', 'Книги': 'Books', 'Музыка': 'Music', 'Музыкальные инструменты': 'Musical Instruments', 'Игры': 'Games', 'Настольные игры': 'Board Games', 'Коллекции': 'Collections', 'Коллекционирование': 'Collecting',
            'Животные': 'Pets', 'Собаки': 'Dogs', 'Кошки': 'Cats', 'Птицы': 'Birds', 'Аквариум': 'Aquarium', 'Аквариумистика': 'Aquaristics', 'Товары': 'Goods', 'Зоотовары': 'Pet Supplies', 'Другие': 'Others',
            'Жилье': 'Real Estate', 'Аренда': 'Rent', 'Посуточно': 'Daily', 'Аренда (посуточно)': 'Rent (Daily)', 'Покупка': 'Purchase', 'Продажа': 'Sale', 'Коммерция': 'Commerce', 'Коммерческая': 'Commercial', 'Дачи': 'Cottages', 'Дома и дачи': 'Houses & Cottages',
            'Другое': 'Other', 'Билеты': 'Tickets', 'Продукты': 'Groceries', 'Продукты питания': 'Food', 'Разное': 'Miscellaneous', 'Бесплатно': 'Free', 'Отдам даром': 'Give away', 'Бюро': 'Bureau', 'Бюро находок': 'Lost & Found',
            'page_contacts': 'SVALKA — Contacts', 'page_faq': 'SVALKA — Help / FAQ', 'nav_home_back': 'Back to home', 'contacts_title_1': 'Contact', 'contacts_title_2': 'Us',
            'net_bep20': 'Tether (USDT) — BEP-20 (BSC) network', 'net_erc20': 'Tether (USDT) — ERC-20 network', 'net_eth': 'Ethereum (ETH)', 'net_ton': 'Toncoin (TON)',
            'contacts_desc': 'If you have technical issues, found a bug, or want to suggest an idea to improve the marketplace — write to us.',
            'contacts_support': 'User Support:', 'contacts_fraud_title': 'How to report a scammer?',
            'contacts_fraud_desc': 'If you notice a suspicious seller, you don\'t have to write an email. You can click the "Report" button directly in the user\'s card. Our moderators check such reports with priority.',
            'faq_title_1': 'Help', 'faq_title_2': '/ FAQ', 'faq_q1': 'How to list an item for sale?',
            'faq_a1': 'It is as simple as possible: log into your profile, click the big "Post an Ad" button in the site header, fill in the description, specify the city, condition, price, and attach photos. The item card will appear in the main feed immediately, without long moderation.',
            'faq_q2_1': 'All about',
            'faq_q2_2': 'promotion',
            'faq_q2_3': 'and TOP statuses',
            'faq_a2_sub': 'How to sell faster and more efficiently',
            'faq_bump_title': 'Bump and VIP status',
            'faq_bump_desc': '<strong>Bump</strong> instantly returns your item to the very top of the regular feed.<br><br><strong>VIP status</strong> firmly pins the card in the premium block at the very top of the site.',
            'faq_attn_title': 'Maximum attention',
            'faq_attn_desc': 'Items with VIP status collect <strong>5–10 times more views</strong>. The item is always in sight of buyers, which guarantees a flurry of messages in the chat and a quick sale.',
            'faq_rot_title': 'Fair rotation',
            'faq_rot_desc': 'The algorithm uses <strong>dynamic shuffling</strong>. With each page refresh, TOP items swap places. Every seller gets their fair share of attention!',
            'faq_act_title': 'Instant activation',
            'faq_act_desc': 'Go to your profile and click the <strong>"Buy PRO"</strong> button. Choose a suitable token package and pay in 1 click. The system will credit the promotion to your account instantly.',
            'Убрать из ТОПа': 'Remove from TOP', 'Снять резерв': 'Remove Reserve', 'В резерв': 'Reserve',
            'VIP ПРОДАВЕЦ': 'VIP SELLER', 'Продавец SVALKA': 'SVALKA Seller',
            'Активен еще': 'Active for', 'дн.': 'days', 'Способ получения': 'Delivery Method', 
            'Варианты оплаты': 'Payment Options', 'СЕРБИЯ': 'SERBIA', 'Криптовалюта': 'Cryptocurrency', 'Личная встреча': 'Personal meeting', 'Наличные': 'Cash'
        },
        sr: {
            'page_title': 'SVALKA — Oglasi u Srbiji', 'og_desc': 'Odlične stvari i brza prodaja u Srbiji.', 'Вы продаете': 'Prodajete', 'Вы покупаете': 'Kupujete', 'Собеседник:': 'Sagovornik:', 'Товар удален': 'Oglas obrisan',
            'search_placeholder': 'Tražim...', 'btn_login': 'Prijavi se', 'btn_publish': 'Objavi oglas', 'btn_publish_mob': 'Prodaj',
            'nav_info': 'Info', 'nav_about': 'O projektu', 'nav_rules': 'Pravila', 'nav_security': 'Bezbednost', 'Например: велосипед, макбук...': 'Na primer: bicikl, macbook...', 'Базовый': 'Osnovni', 'ВИП': 'VIP',
            'nav_faq': 'Pomoć / FAQ', 'nav_privacy': 'Politika', 'nav_terms': 'Uslovi', 'nav_contacts': 'Kontakti', 
            'nav_profile': 'Profil', 'nav_messages': 'Poruke', 'nav_logout': 'Odjavi se', 'bot_nav_home': 'Početna',
            'bot_nav_saved': 'Sačuvano', 'bot_nav_chat': 'Čet', 'feed_title': 'Oglasi', 'feed_desc': 'Najnoviji oglasi u Srbiji',
            'filter_btn': 'Filteri', 'filter_cat': 'Kategorija', 'filter_city': 'Grad', 'filter_condition': 'Stanje',
            'filter_price': 'Cena', 'filter_currency': 'Valuta', 'filter_payment': 'Plaćanje', 'filter_price_from': 'Od',
            'filter_price_to': 'Do', 'pay_cash': 'Gotovina', 'pay_card': 'Kartica', 'pay_crypto': 'Kripto',
            'btn_reset': 'Resetuj', 'btn_show_results': 'Prikaži oglase', 'cat_all': 'Sve', 'cat_top': 'TOP',
            'cat_clothes': 'Odeća', 'cat_kids': 'Deca', 'cat_electro': 'Elektronika', 'cat_interior': 'Enterijer',
            'cat_transport': 'Transport', 'cat_beauty': 'Lepota', 'cat_services': 'Usluge', 'cat_job': 'Posao',
            'cat_business': 'Biznis', 'cat_hobby': 'Hobi', 'cat_animals': 'Životinje', 'cat_home': 'Nekretnine', 'cat_other': 'Ostalo',
            'vip_title': 'TOP Oglasi', 'vip_promo': 'Dobijte VIP status i prodajte stvari brže!', 'btn_connect': 'Poveži',
            'fresh_title': 'Novi oglasi', 'sort_new': 'Najnovije', 'sort_cheap': 'Najjeftinije', 'sort_exp': 'Najskuplje',
            'btn_loading': 'Učitavanje...', 'empty_title': 'Ovde je prazno', 'empty_desc': 'Pokušajte da promenite filtere ili navratite kasnije.',
            'footer_support': 'Podrška', 'footer_rights': '© 2026 SVALKA. SVA PRAVA ZADRŽANA.', 'add_title': 'Objavi oglas',
            'add_drop_title': 'Prevuci fotografije ovde', 'add_drop_sub': 'Ili klikni za izbor', 'add_item_title': 'Naslov',
            'add_price': 'Cena', 'add_address_title': 'Tačna adresa i lokacija', 'add_address_ph': 'Ulica i kućni broj...',
            'add_phone': 'Telefon (opciono)', 'add_pay_title': 'Plaćanje (Moguće je više opcija)', 'add_del_title': 'Način isporuke',
            'add_cond_title': 'Stanje', 'cond_new': 'Novo', 'cond_used': 'Polovno', 'add_desc_title': 'Opis',
            'add_desc_ph': 'Opis...', 'btn_publish_item': 'Objavi', 'profile_title': 'Gost', 'profile_status': 'Status:',
            'profile_base': 'Osnovni', 'profile_buy_pro': 'Kupi PRO ($5)', 'tab_my_items': 'Moje stvari', 'tab_my_saved': 'Sačuvano',
            'profile_search': 'Pretraga profila...', 'profile_empty': 'Prazno', 'seller_ads': 'Oglasi:', 'btn_leave_review': 'Ostavi recenziju',
            'tab_seller_items': 'Svi oglasi', 'tab_seller_reviews': 'Recenzije', 'seller_search': 'Pretraga stvari...',
            'seller_empty': 'Nema aktivnih oglasa', 'share_title': 'Podeli predmet', 'share_sub': 'Izaberi način za slanje linka',
            'share_copy': 'Kopiraj', 'share_verify': 'Da li ste uspešno podelili link?', 'btn_share_yes': 'Da, podelio sam!',
            'chat_list_title': 'Poruke', 'chat_list_empty': 'Još uvek nemate aktivnih dijaloga', 'chat_ph': 'Napiši poruku...',
            'auth_tab_login': 'Prijava', 'auth_tab_reg': 'Registracija', 'auth_name': 'Vaše Ime', 'auth_avatar': 'Izaberi avatar',
            'auth_pass': 'Lozinka', 'auth_pass_conf': 'Ponovite lozinku', 'auth_hint': 'Min. 8 karaktera',
            'auth_forgot': 'Zaboravili ste lozinku?', 'edit_title': 'Podešavanja', 'edit_name': 'Vaše Ime', 'edit_phone': 'Telefon (za oglase)',
            'btn_save': 'Sačuvaj promene', 'item_desc_title': 'Opis predmeta', 'item_desc_empty': 'Nema opisa.',
            'item_address': 'Tačna adresa:', 'btn_chat': 'Čet', 'btn_bump': 'Podigni', 'btn_bump_sub': 'Jednom u 24h',
            'btn_repost': 'Podeli', 'btn_vip': 'U VIP blok', 'btn_reserve': 'Rezerviši', 'btn_sold': 'Prodato', 'btn_delete': 'Obriši',
            'confirm_title': 'Da li ste sigurni?', 'confirm_desc': 'Ova akcija se ne može opozvati.', 'btn_cancel': 'Otkaži', 'btn_yes': 'Da, siguran sam',
            'del_meet': 'Lični susret', 'del_post': 'PostExpress', 'report_title': 'Žalba', 'rep_fraud': 'Prevara',
            'rep_spam': 'Spam / Duplikati', 'rep_toxic': 'Uvrede', 'rep_illegal': 'Zabranjene stvari', 'rep_other': 'Ostalo',
            'report_ph': 'Opišite problem...', 'btn_send_report': 'Pošalji žalbu', 'PRO (Активен)': 'PRO (Aktivan)',
            'review_title': 'Ocenite prodavca', 'review_sub': 'Vaša recenzija će pomoći drugim kupcima!', 'review_ph': 'Napišite nekoliko reči...',
            'btn_send_review': 'Pošalji recenziju', 'pro_feat1_title': 'Besplatna podizanja', 'pro_feat1_desc': 'Svakog dana 1 podizanje na vrh','pro_feat2_title': 'VIP bedž',
            'pro_feat2_desc': 'Izdvaja vas od ostalih prodavaca','pro_price_label': 'Cena za 30 dana:', 'pro_network_label': 'Izaberite mrežu za plaćanje:', 'pro_network_hint': 'Naknade za BEP-20 mrežu su najniže.',
            'pro_secure_label': 'Sigurno plaćanje kriptovalutom', 'pro_pay_btn': 'PLATI', 'btn_edit': 'Uredi',
            'Одежда и Обувь':'Odeća i Obuća', 'Дом и Интерьер':'Kuća i Enterijer', 'Красота и Здоровье':'Lepota i Zdravlje', 'Для Бизнеса':'Za Biznis', 'Хобби и Отдых':'Hobi i Odmor',
            'Недвижимость':'Nekretnine', 'Жилье':'Smeštaj', 'Услуги':'Usluge', 'Работа':'Posao', 'В ТОП':'U TOP', 'Редакт.':'Uredi',
            'Статус':'Status', 'Базовый':'Osnovni', 'Любое':'Bilo koje', 'Новое':'Novo', 'Б/У':'Polovno', 'Новые находки':'Novi nalazi',
            'Категория...':'Kategorija...', 'Город...':'Grad...', 'Описание отсутствует.':'Nema opisa.', 'btn_edit_sub': 'Izmeni',
            'Белград': 'Beograd', 'Нови-Сад': 'Novi Sad', 'Ниш': 'Niš', 'Крагуевац': 'Kragujevac', 'Суботица': 'Subotica', 'Зренянин': 'Zrenjanin', 'Панчево': 'Pančevo', 'Чачак': 'Čačak', 'Кралево': 'Kraljevo', 'Нови-Пазар': 'Novi Pazar', 'Смедерево': 'Smederevo', 'Лесковац': 'Leskovac', 'Вране': 'Vranje', 'Сомбор': 'Sombor', 'Другой': 'Drugi',
            'Все категории': 'Sve kategorije', 'Любое': 'Bilo koje', 'Любая': 'Bilo koja', 'Динары': 'Dinari', 'Евро': 'Evri', 'Все в': 'Sve u', 'Склад': 'Sačuvano', 'Мои вещи': 'Moje stvari',
            'Одежда': 'Odeća', 'Женская': 'Ženska', 'Мужская': 'Muška', 'Обувь': 'Obuća', 'Сумки': 'Torbe', 'Аксессуары': 'Aksesoari', 'Спецодежда': 'Radna odeća',
            'Детям': 'Deca', 'Игрушки': 'Igračke', 'Коляски': 'Kolica', 'Автокресла': 'Auto sedišta', 'Детская мебель': 'Dečiji nameštaj', 'Мебель': 'Nameštaj',
            'Электроника': 'Elektronika', 'Телефоны': 'Telefoni', 'Смартфоны': 'Pametni telefoni', 'ПК': 'PC', 'Компьютеры / ПК': 'Računari / PC', 'Ноутбуки': 'Laptopovi', 'Планшеты': 'Tableti', 'ТВ': 'TV', 'ТВ и Видео': 'TV i Video', 'Аудио': 'Audio', 'Консоли': 'Konzole', 'Игры / Консоли': 'Igre / Konzole', 'Бытовая': 'Aparati', 'Бытовая техника': 'Bela tehnika', 'Фото': 'Foto', 'Фототехника': 'Foto oprema',
            'Интерьер': 'Enterijer', 'Декор': 'Dekor', 'Посуда': 'Posuđe', 'Текстиль': 'Tekstil', 'Ремонт': 'Popravka', 'Стройматериалы': 'Građevinski materijali', 'Инструменты': 'Alati', 'Сад': 'Bašta', 'Сад и Огород': 'Bašta i dvorište',
            'Транспорт': 'Transport', 'Авто': 'Auto', 'Автомобили': 'Automobili', 'Мото': 'Motocikli', 'Вело': 'Bicikli', 'Велосипеды': 'Bicikli', 'Самокаты': 'Trotineti', 'Запчасти': 'Delovi', 'Шины': 'Gume', 'Шины и диски': 'Gume i felne',
            'Красота': 'Lepota', 'Косметика': 'Kozmetika', 'Парфюмерия': 'Parfimerija', 'Уход': 'Nega', 'Уход за собой': 'Nega lica i tela', 'Приборы': 'Uređaji', 'Фены и стайлеры': 'Fenovi i stajleri',
            'Услуги': 'Usluge', 'Ремонт техники': 'Popravka tehnike', 'Автосервис': 'Auto servis', 'Стройка': 'Gradnja', 'Ремонт и стройка': 'Popravke i gradnja', 'Бьюти услуги': 'Beauty usluge', 'Репетиторы': 'Profesori', 'Праздники': 'Proslave',
            'Работа': 'Posao', 'Вакансии': 'Poslovi', 'Резюме': 'CV', 'Ищу работу': 'Tražim posao',
            'Бизнес': 'Biznis', 'Оборудование': 'Oprema', 'Готовый бизнес': 'Gotov biznis', 'Сырье': 'Sirovine', 'Сырье и материалы': 'Sirovine i materijali',
            'Хобби': 'Hobi', 'Спорт': 'Sport', 'Туризм': 'Turizam', 'Туризм и палатки': 'Turizam i šatori', 'Книги': 'Knjige', 'Музыка': 'Muzika', 'Музыкальные инструменты': 'Muzički instrumenti', 'Игры': 'Igre', 'Настольные игры': 'Društvene igre', 'Коллекции': 'Kolekcije', 'Коллекционирование': 'Kolekcionarstvo',
            'Животные': 'Životinje', 'Собаки': 'Psi', 'Кошки': 'Mačke', 'Птицы': 'Ptice', 'Аквариум': 'Akvarijum', 'Аквариумистика': 'Akvaristika', 'Товары': 'Roba', 'Зоотовары': 'Oprema za ljubimce', 'Другие': 'Ostali',
            'Жилье': 'Nekretnine', 'Аренда': 'Izdavanje', 'Посуточно': 'Na dan', 'Аренда (посуточно)': 'Izdavanje (na dan)', 'Покупка': 'Kupovina', 'Продажа': 'Prodaja', 'Коммерция': 'Komercijala', 'Коммерческая': 'Komercijalni objekti', 'Дачи': 'Vikendice', 'Дома и дачи': 'Kuće i vikendice',
            'Другое': 'Ostalo', 'Билеты': 'Ulaznice', 'Продукты': 'Hrana', 'Продукты питания': 'Prehrambeni proizvodi', 'Разное': 'Razno', 'Бесплатно': 'Besplatno', 'Отдам даром': 'Poklanjam', 'Бюро': 'Biro', 'Бюро находок': 'Izgubljeno - nađeno',
            'page_contacts': 'SVALKA — Kontakti', 'page_faq': 'SVALKA — Pomoć / FAQ', 'nav_home_back': 'Nazad na početnu', 'contacts_title_1': 'Kontaktirajte', 'contacts_title_2': 'Nas',
            'contacts_desc': 'Ako imate tehničkih problema, pronašli ste grešku ili želite da predložite ideju za poboljšanje platforme — pišite nam.', 'contacts_support': 'Korisnička podrška:', 'contacts_fraud_title': 'Kako prijaviti prevaranta?',
            'contacts_fraud_desc': 'Ako primetite sumnjivog prodavca, ne morate pisati na mejl. Možete kliknuti na dugme "Prijavi" direktno na kartici korisnika. Naši moderatori prioritetno proveravaju takve prijave.',
            'net_bep20': 'Tether (USDT) — BEP-20 (BSC) mreža', 'net_erc20': 'Tether (USDT) — ERC-20 mreža', 'net_eth': 'Ethereum (ETH)', 'net_ton': 'Toncoin (TON)',
            'faq_title_1': 'Pomoć', 'faq_title_2': '/ FAQ', 'faq_q1': 'Kako postaviti stvar na prodaju?',
            'faq_a1': 'Sve je maksimalno jednostavno: prijavite se na svoj profil, kliknite na veliko dugme "Objavi oglas" u zaglavlju sajta, popunite opis, navedite grad, stanje, cenu i priložite fotografije. Kartica predmeta će se odmah pojaviti u glavnom feed-u, bez duge moderacije.',
            'faq_q2_1': 'Sve o', 'faq_q2_2': 'promociji', 'faq_q2_3': 'i TOP statusima', 'faq_a2_sub': 'Kako prodavati brže i efikasnije', 'faq_bump_title': 'Bump i VIP status',
            'faq_bump_desc': '<strong>Bump (Podizanje)</strong> trenutno vraća vaš predmet na sam vrh običnog feed-a.<br><br><strong>VIP status</strong> čvrsto fiksira karticu u premium bloku na samom vrhu sajta.',
            'faq_attn_title': 'Maksimalna pažnja',
            'faq_attn_desc': 'Predmeti sa VIP statusom sakupljaju <strong>5–10 puta više pregleda</strong>. Stvar je uvek pred očima kupaca, što garantuje lavinu poruka u četu i brzu prodaju.',
            'faq_rot_title': 'Pravedna rotacija',
            'faq_rot_desc': 'Algoritam koristi <strong>dinamičko mešanje</strong>. Pri svakom osvežavanju stranice, TOP predmeti menjaju mesta. Svaki prodavac dobija svoj pošten deo pažnje!',
            'faq_act_title': 'Trenutna aktivacija',
            'faq_act_desc': 'Uđite u svoj profil i kliknite na dugme <strong>"Kupi PRO"</strong>. Izaberite odgovarajući paket tokena i platite u 1 klik. Sistem će momentalno pripisati promociju vašem nalogu.',
            'Убрать из ТОПа': 'Ukloni iz TOP-a', 'Снять резерв': 'Ukini rezervaciju', 'В резерв': 'Rezerviši',
            'VIP ПРОДАВЕЦ': 'VIP PRODAVAC', 'Продавец SVALKA': 'SVALKA Prodavac',
            'Активен еще': 'Aktivan još', 'дн.': 'dana', 'Способ получения': 'Način preuzimanja', 
            'Варианты оплаты': 'Opcije plaćanja', 'СЕРБИЯ': 'SRBIJA', 'Криптовалюта': 'Kriptovaluta', 'Личная встреча': 'Lični susret', 'Наличные': 'Gotovina'
        }
    },

    t(key) {
        return this.dictionary[this.currentLang]?.[key] || key;
    },

    changeLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('svalka_lang', lang);
        
        // Переводим Title и Meta
        document.title = this.t('page_title');
        const ogTitle = document.getElementById('og-title');
        const ogDesc = document.getElementById('og-desc');
        if (ogTitle) ogTitle.content = this.t('page_title');
        if (ogDesc) ogDesc.content = this.t('og_desc');

        // Закрываем дропдаун
        const dropdown = document.getElementById('lang-dropdown');
        if (dropdown) dropdown.classList.add('hidden');

        // Индикатор языка
        const currentLangSpan = document.getElementById('lang-current');
        if (currentLangSpan) currentLangSpan.innerText = lang.toUpperCase();

        // Подмена текстов [data-i18n]
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.dictionary[lang]?.[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = this.dictionary[lang][key];
                } else if (el.tagName === 'OPTION') {
                    el.innerText = this.dictionary[lang][key];
                } else {
                    el.innerHTML = this.dictionary[lang][key];
                }
            }
        });

        // Запуск перерисовки остальных блоков (сайдбар, селекты)
        // Вызываем через window, так как функции пока глобальные
        if (!window.isInitialLoad) {
            if (typeof window.initSidebar === 'function') window.initSidebar();
            if (typeof window.fetchItems === 'function') window.fetchItems(false);
        }
    }
};