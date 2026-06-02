import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://jeinonooelndbtjalnwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplaW5vbm9vZWxuZGJ0amFsbndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MjUwNDMsImV4cCI6MjA5MjIwMTA0M30.3g4TS3XSnnZujgXmyxSIy3d9SbiX7BSUOreq3LPH6gI';
const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// ГЛОБАЛЬНЫЙ ДВИЖОК МУЛЬТИЯЗЫЧНОСТИ (i18n)
// ==========================================
window.currentLang = localStorage.getItem('svalka_lang') || 'ru';

// 1. ПОЛНЫЙ СЛОВАРЬ (Охватывает весь index.html)
window.i18n = {
    ru: {
        'page_title': 'SVALKA — Маркетплейс вещей в Сербии', 'og_desc': 'Отличные находки и быстрые продажи в Сербии.',
        'search_placeholder': 'Я ищу...', 'btn_login': 'Войти', 'btn_publish': 'Пристроить добро', 'btn_publish_mob': 'Продать',
        'nav_info': 'Инфо', 'nav_about': 'О проекте', 'nav_rules': 'Правила', 'nav_security': 'Безопасность',
        'nav_faq': 'Помощь / FAQ', 'nav_privacy': 'Политика', 'nav_terms': 'Условия', 'nav_contacts': 'Контакты',
        'nav_profile': 'Профиль', 'nav_messages': 'Сообщения', 'nav_logout': 'Выйти',
        'bot_nav_home': 'Главная', 'bot_nav_saved': 'Склад', 'bot_nav_chat': 'Чат', 'feed_title': 'Находки', 'feed_desc': 'Самые свежие объявления Сербии',
        'filter_btn': 'Фильтры', 'filter_cat': 'Категория', 'filter_city': 'Город', 'filter_condition': 'Состояние',
        'filter_price': 'Цена', 'filter_currency': 'Валюта', 'filter_payment': 'Оплата', 'filter_price_from': 'От',
        'filter_price_to': 'До', 'pay_cash': 'Наличные', 'pay_card': 'Перевод на карту', 'pay_crypto': 'Криптоперевод',
        'btn_reset': 'Сбросить', 'btn_show_results': 'Показать находки', 'cat_all': 'Все', 'cat_top': 'ТОП',
        'cat_clothes': 'Одежда', 'cat_kids': 'Детям', 'cat_electro': 'Электроника', 'cat_interior': 'Интерьер',
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
        'btn_send_review': 'Отправить отзыв',
        'pro_feat1_title': 'Бесплатные поднятия',
        'pro_feat1_desc': 'Каждый день 1 поднятие в ТОП',
        'pro_feat2_title': 'VIP-бейдж',
        'pro_feat2_desc': 'Выделяет вас среди других продавцов',
        'pro_price_label': 'Стоимость на 30 дней:',
        'pro_network_label': 'Выберите сеть оплаты:',
        'pro_network_hint': 'Комиссии сети BEP-20 самые низкие.',
        'pro_secure_label': 'Безопасная оплата криптовалютой',
        'pro_pay_btn': 'ОПЛАТИТЬ',
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
        'Другое': 'Другое', 'Билеты': 'Билеты', 'Продукты': 'Продукты', 'Продукты питания': 'Продукты питания', 'Разное': 'Разное', 'Бесплатно': 'Бесплатно', 'Отдам даром': 'Отдам даром', 'Бюро': 'Бюро', 'Бюро находок': 'Бюро находок'
    },
    en: {
        'page_title': 'SVALKA — Classifieds in Serbia', 'og_desc': 'Great finds and quick sales in Serbia.',
        'search_placeholder': 'I am looking for...', 'btn_login': 'Log in', 'btn_publish': 'Post an Ad', 'btn_publish_mob': 'Sell',
        'nav_info': 'Info', 'nav_about': 'About Project', 'nav_rules': 'Rules', 'nav_security': 'Security',
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
        'report_ph': 'Describe the problem (optional)...', 'btn_send_report': 'Send Report',
        'review_title': 'Rate the seller', 'review_sub': 'Your review will help other buyers!', 'review_ph': 'Write a few words...',
        'btn_send_review': 'Send Review',
        'pro_feat1_title': 'Free Bumps',
        'pro_feat1_desc': '1 free top bump every day',
        'pro_feat2_title': 'VIP Badge',
        'pro_feat2_desc': 'Makes you stand out from other sellers',
        'pro_price_label': 'Cost for 30 days:',
        'pro_network_label': 'Select payment network:',
        'pro_network_hint': 'BEP-20 network fees are the lowest.',
        'pro_secure_label': 'Secure cryptocurrency payment',
        'pro_pay_btn': 'PAY',
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
        'Другое': 'Other', 'Билеты': 'Tickets', 'Продукты': 'Groceries', 'Продукты питания': 'Food', 'Разное': 'Miscellaneous', 'Бесплатно': 'Free', 'Отдам даром': 'Give away', 'Бюро': 'Bureau', 'Бюро находок': 'Lost & Found'
    },
    sr: {
        'page_title': 'SVALKA — Oglasi u Srbiji', 'og_desc': 'Odlične stvari i brza prodaja u Srbiji.',
        'search_placeholder': 'Tražim...', 'btn_login': 'Prijavi se', 'btn_publish': 'Objavi oglas', 'btn_publish_mob': 'Prodaj',
        'nav_info': 'Info', 'nav_about': 'O projektu', 'nav_rules': 'Pravila', 'nav_security': 'Bezbednost',
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
        'report_ph': 'Opišite problem...', 'btn_send_report': 'Pošalji žalbu',
        'review_title': 'Ocenite prodavca', 'review_sub': 'Vaša recenzija će pomoći drugim kupcima!', 'review_ph': 'Napišite nekoliko reči...',
        'btn_send_review': 'Pošalji recenziju',
        'pro_feat1_title': 'Besplatna podizanja',
        'pro_feat1_desc': 'Svakog dana 1 podizanje na vrh',
        'pro_feat2_title': 'VIP bedž',
        'pro_feat2_desc': 'Izdvaja vas od ostalih prodavaca',
        'pro_price_label': 'Cena za 30 dana:',
        'pro_network_label': 'Izaberite mrežu za plaćanje:',
        'pro_network_hint': 'Naknade za BEP-20 mrežu su najniže.',
        'pro_secure_label': 'Sigurno plaćanje kriptovalutom',
        'pro_pay_btn': 'PLATI',
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
        'Другое': 'Ostalo', 'Билеты': 'Ulaznice', 'Продукты': 'Hrana', 'Продукты питания': 'Prehrambeni proizvodi', 'Разное': 'Razno', 'Бесплатно': 'Besplatno', 'Отдам даром': 'Poklanjam', 'Бюро': 'Biro', 'Бюро находок': 'Izgubljeno - nađeno'
    }
};

window.t = (key) => { return window.i18n[window.currentLang][key] || key; };

// Основная функция переключения языка
window.changeLanguage = (lang) => {
    window.currentLang = lang;
    localStorage.setItem('svalka_lang', lang);

    // Переводим Title и Meta теги
    document.title = window.t('page_title');
    const ogTitle = document.getElementById('og-title');
    const ogDesc = document.getElementById('og-desc');
    if (ogTitle) ogTitle.content = window.t('page_title');
    if (ogDesc) ogDesc.content = window.t('og_desc');

    // Закрываем выпадающее меню
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.add('hidden');

    // ЕДИНЫЙ ИНДИКАТОР В КНОПКЕ (Оставляем только чистый код языка)
    const indicator = document.getElementById('lang-indicator');
    if (indicator) {
        if (lang === 'ru') indicator.innerText = 'RU';
        if (lang === 'sr') indicator.innerText = 'SR';
        if (lang === 'en') indicator.innerText = 'EN';
    }

    // Подменяем все размеченные тексты "на лету"
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.i18n[lang] && window.i18n[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = window.i18n[lang][key];
            } else if (el.tagName === 'OPTION') {
                el.innerText = window.i18n[lang][key];
            } else {
                el.innerHTML = window.i18n[lang][key];
            }
        }
    });

    // Динамический перевод окна категорий "Пристроить добро"
    const catSelect = document.getElementById('item-category');
    if (catSelect) {
        Array.from(catSelect.options).forEach(opt => {
            if (opt.value) {
                const parts = opt.value.split(' - ');
                opt.innerText = parts.map(p => window.t(p)).join(' - ');
            }
        });
        Array.from(catSelect.getElementsByTagName('optgroup')).forEach(grp => {
            if (!grp.dataset.orig) grp.dataset.orig = grp.label; // Сохраняем оригинал
            grp.label = window.t(grp.dataset.orig);
        });
    }

    // Обновляем текст вкладок профиля при смене языка
    if (window.currentUser && typeof window.switchProfileTab === 'function') {
        window.switchProfileTab(window.currentProfileTab);
    }

    // --- ПЕРЕРИСОВКА ДИНАМИЧЕСКИХ БЛОКОВ ---
    if (!window.isInitialLoad) {
        if (typeof window.initSidebar === 'function') window.initSidebar();
        if (typeof window.fetchItems === 'function') window.fetchItems(false);
    }
};

// Закрываем меню при клике в пустую область
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown && !e.target.closest('#lang-dropdown') && !e.target.closest('[onclick*="lang-dropdown"]')) {
        dropdown.classList.add('hidden');
    }
});

// Запуск при загрузке (с флагом первой загрузки)
document.addEventListener('DOMContentLoaded', () => {
    window.isInitialLoad = true;
    window.changeLanguage(window.currentLang);
    setTimeout(() => { window.isInitialLoad = false; }, 1000);
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

window.filterCondition = 'Все'; window.currentUser = null; window.loadedItems = [];
window.tempPhotos = []; window.editExistingImages = []; window.currentCategory = 'Все';
window.searchQuery = ''; window.showUrgentOnly = false; window.filterCities = [];
window.filterPriceMin = ''; window.filterPriceMax = ''; window.filterCurrency = 'Все';
window.currentProfileTab = 'items'; window.activeModalItemId = null;
window.editingItemId = null; window.userFavorites = new Set();
window.displayedCount = 12; window.authMode = 'login'; window.authInitialized = false;

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

window.initGlobalChatListener = () => {
    if (window.globalChatSubscription) supabase.removeChannel(window.globalChatSubscription);

    const channelName = 'global_chats_' + (window.currentUser?.id || 'guest');

    // Запрашиваем права на уведомления (если еще не запрашивали)
    if (window.currentUser && "Notification" in window) {
        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    }

    window.globalChatSubscription = supabase.channel(channelName)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async (payload) => {
            if (window.currentUser) {
                const newMsg = payload.new;

                // Если сообщение написали НАМ (а не мы сами)
                if (newMsg.sender_id !== window.currentUser.id) {
                    window.updateChatBadges();

                    const listModal = document.getElementById('chat-list-modal');
                    if (listModal && listModal.classList.contains('active')) {
                        window.openChatListModal(true);
                    }

                    // ОТПРАВКА PUSH УВЕДОМЛЕНИЯ
                    if ("Notification" in window && Notification.permission === "granted") {
                        // Не показываем Push, если мы уже находимся внутри этого чата
                        if (window.currentChatId !== newMsg.chat_id) {
                            const notification = new Notification("SVALKA: Новое сообщение!", {
                                body: newMsg.text,
                                icon: "https://jeinonooelndbtjalnwa.supabase.co/storage/v1/object/public/assets/logorobot.png"
                            });

                            notification.onclick = function () {
                                window.focus(); // Возвращаем фокус на вкладку
                                window.openChatListModal(); // Открываем чаты
                            };
                        }
                    } else {
                        // Фолбэк: если системные Push запрещены, показываем внутренний Toast
                        if (window.currentChatId !== newMsg.chat_id) {
                            window.showToast("У вас новое сообщение!");
                        }
                    }
                }
            }
        }).subscribe();
};

window.loadMessages = async () => {
    if (!window.currentChatId) return;
    const { data, error } = await supabase.from('messages').select('*').eq('chat_id', window.currentChatId).order('created_at', { ascending: true });

    if (window.currentUser) {
        supabase.from('messages').update({ is_read: true }).eq('chat_id', window.currentChatId).neq('sender_id', window.currentUser.id).eq('is_read', false).then(() => window.updateChatBadges());
    }

    const container = document.getElementById('chat-messages');
    if (error || !data || data.length === 0) {
        container.innerHTML = `<div class="text-center text-xs font-bold text-stone-400 my-4">Напишите первое сообщение!</div>`;
        return;
    }

    container.innerHTML = data.map(m => {
        const isMe = m.sender_id === window.currentUser.id;
        if (isMe) return `<div class="flex items-end justify-end gap-2 w-full mt-2"><div class="bg-brand-600 text-white p-3 rounded-2xl rounded-br-none shadow-sm text-base font-medium max-w-[85%] break-words">${m.text}</div></div>`;
        else return `<div class="flex items-end gap-2 max-w-[85%] mt-2"><div class="bg-stone-100 dark:bg-stone-800 p-3 rounded-2xl rounded-bl-none shadow-sm text-base text-stone-800 dark:text-stone-200 font-medium break-words">${m.text}</div></div>`;
    }).join('');
    container.scrollTop = container.scrollHeight;
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

window.subscribeToMessages = () => {
    // 1. На всякий случай добиваем старую подписку
    if (window.chatSubscription) {
        supabase.removeChannel(window.chatSubscription);
        window.chatSubscription = null;
    }

    // 2. Создаем УНИКАЛЬНОЕ имя комнаты, чтобы обойти баг кэширования веб-сокетов Supabase
    const roomName = 'chat_room_' + window.currentChatId + '_' + Date.now();

    window.chatSubscription = supabase.channel(roomName)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${window.currentChatId}` }, payload => {
            const newMsg = payload.new;
            if (newMsg.sender_id !== window.currentUser?.id) {
                const container = document.getElementById('chat-messages');
                if (container.innerHTML.includes('Напишите первое')) container.innerHTML = '';

                container.insertAdjacentHTML('beforeend', `<div class="flex items-end gap-2 max-w-[85%] mt-2"><div class="bg-stone-100 dark:bg-stone-800 p-3 rounded-2xl rounded-bl-none shadow-sm text-base text-stone-800 dark:text-stone-200 font-medium break-words">${newMsg.text}</div></div>`);
                container.scrollTop = container.scrollHeight;

                supabase.from('messages').update({ is_read: true }).eq('id', newMsg.id).then(() => window.updateChatBadges());
            }
        }).subscribe();
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
        await window.loadMessages();
        window.subscribeToMessages();
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
                ? `<span class="bg-amber-100 text-amber-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase border border-amber-200">Вы продаете</span>`
                : `<span class="bg-brand-50 text-brand-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase border border-brand-100">Вы покупаете</span>`;

            html += `
            <div onclick="window.openExistingChat('${chat.chat_id}', '${chat.item_id}', '${isSeller}', '${interlocutorName.replace(/'/g, "\\'")}')" class="flex items-center gap-4 p-4 border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 transition cursor-pointer">
                <img src="${itemImg}" class="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-700">
                <div class="flex-1 overflow-hidden text-left">
                    <div class="flex items-center gap-2 mb-1">
                        ${roleBadge}
                        <h4 class="font-bold text-sm text-stone-900 dark:text-white truncate">${chat.item_title || 'Товар удален'}</h4>
                    </div>
                    <p class="text-[11px] text-stone-500 font-bold mb-0.5 truncate"><i class="fa-solid fa-user-circle mr-1 text-stone-400"></i> Собеседник: <span class="text-stone-800 dark:text-stone-200">${interlocutorName}</span></p>
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

    await window.loadMessages();
    window.subscribeToMessages();
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

const updateThemeIcons = (isDark) => {
    document.querySelectorAll('button[onclick="window.toggleDarkMode()"] i').forEach(icon => {
        // 1. Анимация исчезновения и вращения старой иконки
        icon.style.transform = 'rotate(-180deg) scale(0.5)';
        icon.style.opacity = '0';

        setTimeout(() => {
            // 2. Меняем иконку (ДОБАВЛЕН класс inline-block для работы анимации transform)
            icon.className = isDark 
                ? 'fa-solid fa-sun text-amber-500 text-lg inline-block transition-all duration-300' 
                : 'fa-solid fa-moon text-indigo-400 text-lg inline-block transition-all duration-300';
            
            // 3. Плавное появление новой иконки
            icon.style.transform = 'rotate(0deg) scale(1)';
            icon.style.opacity = '1';
        }, 150); // Ждем половину анимации перед сменой
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
    setTimeout(() => updateThemeIcons(isDark), 50);
};
setAutoTheme();

window.toggleDarkMode = () => {
    const html = document.documentElement;
    const newIsDark = !html.classList.contains('dark');

    // 1. ЖЕСТКО БЛОКИРУЕМ ВСЕ АНИМАЦИИ НА СТРАНИЦЕ
    html.classList.add('disable-transitions');

    // 2. Мгновенно меняем тему
    html.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');

    // Обновляем иконки (Луна/Солнце)
    if (typeof window.updateThemeIcons === 'function') {
        window.updateThemeIcons(newIsDark);
    }

    // 3. Магия: заставляем браузер отрисовать кадр без анимаций, 
    // и только потом возвращаем плавность (через двойной requestAnimationFrame)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            html.classList.remove('disable-transitions');
        });
    });
};

window.goHome = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => window.resetFilters(), 300); };

window.modalStack = []; // Инициализируем стек открытых окон

window.openModal = id => {
    const el = document.getElementById(id);
    if (el) {
        // 1. УМНЫЙ СТЕК: Прячем предыдущее окно, чтобы не было наложения теней
        if (window.modalStack.length > 0) {
            const prevId = window.modalStack[window.modalStack.length - 1];
            const prevEl = document.getElementById(prevId);
            // Прячем визуально, но оставляем в DOM
            if (prevEl && prevId !== id) prevEl.style.display = 'none';
        }

        // Добавляем текущее окно в стек
        if (!window.modalStack.includes(id)) {
            window.modalStack.push(id);
        }

        el.style.display = ''; // Восстанавливаем видимость
        el.classList.add('active');
        document.body.classList.add('modal-open');

        // Подставляем ID юзера в окно Boosty
        if (id === 'crypto-modal' && window.currentUser) {
            const boostyInput = document.getElementById('boosty-user-id');
            if (boostyInput) boostyInput.value = window.currentUser.id;
        }

        // Динамическое обновление статуса PRO в профиле
        if (id === 'profile-modal') {
            const statusText = document.getElementById('profile-account-status');
            const proBtn = document.getElementById('profile-buy-pro-btn');

            if (statusText && proBtn) {
                if (window.currentUserData && window.currentUserData.is_pro) {
                    statusText.innerText = 'PRO (Активен)';
                    statusText.className = 'text-sm font-black text-amber-500';
                    proBtn.classList.add('hidden');
                } else {
                    statusText.innerText = 'Базовый';
                    statusText.className = 'text-sm font-black text-stone-700 dark:text-stone-300';
                    proBtn.classList.remove('hidden');
                }
            }
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
            if (!document.querySelector('.modal-overlay.active')) document.body.classList.remove('modal-open');
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

    // === ИСПРАВЛЕНИЕ: ЖЕСТКАЯ ОЧИСТКА ЧАТА ===
    if (id === 'chat-modal') {
        window.currentChatId = null; // Сбрасываем ID, чтобы глобальный слушатель понял, что мы вышли
        if (window.chatSubscription) {
            supabase.removeChannel(window.chatSubscription); // Убиваем фонового зомби
            window.chatSubscription = null;
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

window.toggleFavorite = async (btn, event, itemId) => {
    if (event) event.stopPropagation();

    if (!window.currentUser) {
        window.openModal('auth-modal');
        window.showToast((typeof window.t === 'function') ? window.t('auth_hint') : "Войдите в аккаунт", true);
        return;
    }

    if (!itemId) return;

    const isLiked = window.userFavorites.has(itemId);
    const icon = btn ? btn.querySelector('i') : null;

    try {
        if (isLiked) {
            await supabase.from('favorites').delete().match({ user_id: window.currentUser.id, item_id: itemId });
            window.userFavorites.delete(itemId);
            if (icon) {
                icon.className = 'fa-solid text-stone-400 fa-box-open drop-shadow-sm transition-transform hover:scale-110';
            }
            if (btn) btn.title = "Добавить на склад";
        } else {
            await supabase.from('favorites').insert([{ user_id: window.currentUser.id, item_id: itemId }]);
            window.userFavorites.add(itemId);
            if (icon) {
                icon.className = 'fa-solid text-brand-500 fa-box drop-shadow-sm transition-transform scale-110 animate-pop';
                setTimeout(() => icon.classList.remove('animate-pop'), 300);
            }
            if (btn) btn.title = "Убрать со склада";
        }

        if (window.renderProfileTabs) window.renderProfileTabs();

        // Синхронизация с открытой карточкой товара
        if (window.activeModalItemId === itemId) {
            const modalFavBtn = document.getElementById('modal-fav-btn');
            const modalFavIcon = document.querySelector('#modal-fav-btn i');

            if (modalFavIcon) {
                const isNowLiked = window.userFavorites.has(itemId);
                modalFavIcon.className = isNowLiked
                    ? 'fa-solid text-brand-500 fa-box drop-shadow-sm transition-transform scale-110 animate-pop'
                    : 'fa-solid text-stone-400 fa-box-open drop-shadow-sm transition-transform hover:scale-110';

                if (modalFavBtn) modalFavBtn.title = isNowLiked ? "Убрать со склада" : "Добавить на склад";
                setTimeout(() => modalFavIcon.classList.remove('animate-pop'), 300);
            }
        }
    } catch (e) {
        console.error("Ошибка при сохранении:", e);
        window.showToast("Ошибка сохранения", true);
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

window.toggleMobileMenu = () => { const el = document.getElementById('mobile-menu'); if (el) el.classList.toggle('translate-x-full'); };

window.toggleFilters = () => {
    const el = document.getElementById('filter-panel-wrapper');
    if (!el) return;

    if (el.classList.contains('active')) {
        // ЛОГИКА ЗАКРЫТИЯ ШТОРКИ (Теперь без скроллинга)
        el.style.overflow = 'hidden';
        el.classList.remove('active');
        const dd = document.getElementById('custom-cat-dropdown');
        if (dd && !dd.classList.contains('hidden')) window.toggleCustomCat();
    } else {
        // ЛОГИКА ОТКРЫТИЯ ШТОРКИ
        el.classList.add('active');
        setTimeout(() => {
            el.style.overflow = 'visible';
        }, 300);
    }
};

window.showToast = (msg, err = false) => {
    const t = document.getElementById('toast'); const tMsg = document.getElementById('toast-msg'); const tIco = document.getElementById('toast-icon');
    if (tMsg) tMsg.innerText = msg;
    if (tIco) tIco.className = `fa-solid ${err ? 'fa-circle-exclamation text-red-400' : 'fa-circle-check text-brand-400'} text-lg`;
    if (t) {
        t.className = `fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-full font-bold text-sm shadow-2xl flex items-center gap-3 z-[9999] transition-opacity duration-300 pointer-events-none ${err ? 'bg-red-600 text-white' : 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'} opacity-100`;
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

    if (mode === 'register') {
        if (fields) { fields.classList.remove('hidden'); fields.classList.add('flex'); }
        if (confirmCont) { confirmCont.classList.remove('hidden'); confirmCont.classList.add('block'); }
        if (confirmInput) confirmInput.required = true;
        if (tabR) tabR.className = "text-brand-600 border-b-2 border-brand-600 pb-1 transition cursor-pointer";
        if (tabL) tabL.className = "text-stone-400 pb-1 transition cursor-pointer";

        // === ИСПРАВЛЕНИЕ: Вызываем генерацию аватарок при переключении ===
        if (typeof window.renderRegistrationAvatars === 'function') {
            window.renderRegistrationAvatars();
        }
        // ==================================================================

    } else {
        if (fields) { fields.classList.add('hidden'); fields.classList.remove('flex'); }
        if (confirmCont) { confirmCont.classList.add('hidden'); confirmCont.classList.remove('block'); }
        if (confirmInput) confirmInput.required = false;
        if (tabL) tabL.className = "text-brand-600 border-b-2 border-brand-600 pb-1 transition cursor-pointer";
        if (tabR) tabR.className = "text-stone-400 pb-1 transition cursor-pointer";
    }
};

window.submitAuth = async (event) => {
    if (event) event.preventDefault();
    const btn = document.getElementById('auth-submit-btn');
    const emailEl = document.getElementById('auth-email');
    const passEl = document.getElementById('auth-password');
    const email = emailEl ? emailEl.value.trim() : '';
    const pass = passEl ? passEl.value : '';

    // Финальная проверка на кириллицу (на случай если вставили копипастом)
    if (/[А-Яа-яЁё]/.test(email) || /[А-Яа-яЁё]/.test(pass)) {
        window.showToast("Почта и пароль не должны содержать русские буквы!", true);
        return;
    }

    if (window.authMode === 'register') {
        const passConfirmEl = document.getElementById('auth-password-confirm');
        const passConfirm = passConfirmEl ? passConfirmEl.value : '';

        if (pass !== passConfirm) {
            window.showToast("Пароли не совпадают!", true);
            return;
        }

        const passRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        if (!passRegex.test(pass)) { window.showToast("Пароль от 8 символов (буквы + цифры)", true); return; }
    }

    if (btn) { btn.disabled = true; btn.innerText = "..."; }
    try {
        if (window.authMode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
            if (error) throw error;
        } else {
            const nameEl = document.getElementById('auth-name'); const name = (nameEl && nameEl.value.trim()) ? nameEl.value.trim() : 'Пользователь';
            const avatarEl = document.querySelector('input[name="avatar"]:checked'); const avatar = avatarEl ? avatarEl.value : 'https://api.dicebear.com/9.x/bottts/svg?seed=R2D2';
            const { error } = await supabase.auth.signUp({ email, password: pass, options: { data: { full_name: name, avatar_url: avatar } } });
            if (error) throw error;
        }
        window.closeModal('auth-modal'); window.showToast("Успешно!");
        if (emailEl) emailEl.value = ''; if (passEl) passEl.value = '';
    } catch (e) { window.showToast(e.message, true); }
    finally { if (btn) { btn.disabled = false; btn.innerHTML = window.authMode === 'login' ? 'Войти' : 'Регистрация'; } }
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

window.logout = async () => {
    // 1. Ждем, пока Supabase точно удалит сессию
    await supabase.auth.signOut();

    // 2. Очищаем локальные данные
    sessionStorage.clear();
    window.currentUser = null;
    window.closeModal('profile-modal');

    // 3.Перезагружаем страницу
    window.location.reload();
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

window.fetchItems = async (isLoadMore = false) => {
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
                vipGrid.innerHTML = vipMapped.map(i => window.createCardHtml(i, true)).join('');
                vipSection.classList.remove('hidden');
                // Добавляем в общий список загруженных, чтобы открывались модалки
                vipMapped.forEach(v => { if (!window.loadedItems.find(i => i.id === v.id)) window.loadedItems.push(v); });
            }
        }

        if (itemsToDisplay.length > 0) {
            let html = '';
            itemsToDisplay.forEach(item => { html += window.createCardHtml(item, item.isHighlighted); });
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
        if (window.loadedItems.length === 0 && loader) {
            loader.style.display = 'block';
            loader.innerHTML = `<div class="text-red-500 font-bold uppercase tracking-widest text-[10px] bg-red-50 p-4 rounded-2xl max-w-sm mx-auto border border-red-100"><i class="fa-solid fa-triangle-exclamation text-3xl mb-3"></i><br>Ошибка БД<br><span class="text-[9px] text-stone-500 lowercase normal-case mt-2 block break-all">${e.message || 'Ошибка сети'}</span></div>`;
        }
    } finally { if (loader && loader.innerHTML.indexOf('Ошибка') === -1) loader.style.display = 'none'; }
};

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

window.filterByCategory = (cat, event, isSubCat = false) => {
    if (event) event.preventDefault();

    // --- СЕНЬОР-ЛОГИКА: Умное закрытие ---
    if (window.currentCategory === cat && cat !== 'Все') {
        if (cat.includes(' - ')) {
            cat = cat.split(' - ')[0];
        } else {
            cat = 'Все';
        }
    }
    // -------------------------------------

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
                window.renderCustomRadios('condition-radios-wrap', 'cond', [{ val: 'Все', label: window.t('Любое') }, { val: 'Новое', label: '✨ ' + window.t('Новое') }, { val: 'Б/У', label: '♻️ ' + window.t('Б/У') }], 'Все', 'applyCondition');
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
            let subHtml = `<button onclick="window.filterByCategory('${mainCat}', event, true)" class="sub-cat-btn ${cat === mainCat ? 'active px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.25)] bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 border border-brand-400 dark:border-brand-600 cursor-pointer whitespace-nowrap shrink-0 snap-start scale-[1.02]' : 'px-4 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-brand-300 hover:text-brand-600 dark:hover:border-brand-700 dark:hover:text-brand-400 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 snap-start hover:scale-[1.02]'}">${window.t('Все в')} «${window.t(mainCat)}»</button>`;
            
            window.subcategoriesMap[mainCat].forEach(sub => {
                const prefix = sub.prefix || mainCat;
                const fullCat = `${prefix} - ${sub.val}`;
                const isActive = cat === fullCat;
                const activeClass = isActive
                    ? "active px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.25)] bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 border border-brand-400 dark:border-brand-600 cursor-pointer whitespace-nowrap shrink-0 snap-start scale-[1.02]"
                    : "px-4 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-brand-300 hover:text-brand-600 dark:hover:border-brand-700 dark:hover:text-brand-400 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 snap-start hover:scale-[1.02]";
                subHtml += `<button onclick="window.filterByCategory('${fullCat}', event, true)" class="sub-cat-btn ${activeClass}">${window.t(sub.label || sub.val)}</button>`;
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
        if (typeof window.fetchItems === 'function') window.fetchItems(false);
    }
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
    const reFields = document.getElementById('re-fields'); const condBlock = document.getElementById('add-condition-block');

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
    // ------------------------------------------

    if (condBlock) {
        // Если это питомец, но НЕ зоотовары — прячем выбор "Новое/БУ"
        const isAnimalNoCond = val && val.startsWith('Животные') && !val.includes('Товары');

        if (val && (val.includes('Жилье') || val.includes('Недвижимость') || val.includes('Услуги') || val.includes('Работа') || isAnimalNoCond)) {
            condBlock.classList.add('hidden'); condBlock.classList.remove('flex');
        } else {
            condBlock.classList.remove('hidden'); condBlock.classList.add('flex');
        }
    }

    if (val && (val.includes('Жилье') || val.includes('Недвижимость'))) {
        reFields.classList.remove('hidden'); reFields.classList.add('flex');
        setTimeout(() => {
            if (!window.addMapObj) {
                window.addMapObj = L.map('add-map').setView(window.itemCoords, 13);
                L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(window.addMapObj);
                window.addMarkerObj = L.marker(window.itemCoords, { draggable: true }).addTo(window.addMapObj);
                window.addMarkerObj.on('dragend', async function () {
                    const pos = window.addMarkerObj.getLatLng();
                    window.itemCoords = [pos.lat, pos.lng];
                    await window.reverseGeocode(pos.lat, pos.lng); // НОВОЕ: Автозаполнение адреса
                });

                window.addMapObj.on('click', async function (event) {
                    window.itemCoords = [event.latlng.lat, event.latlng.lng];
                    window.addMarkerObj.setLatLng(window.itemCoords);
                    await window.reverseGeocode(window.itemCoords[0], window.itemCoords[1]); // НОВОЕ: Автозаполнение адреса
                });
            } else {
                window.addMarkerObj.setLatLng(window.itemCoords); window.addMapObj.setView(window.itemCoords, 13);
            }
            window.addMapObj.invalidateSize();
        }, 150);
    } else { reFields.classList.add('hidden'); reFields.classList.remove('flex'); window.itemCoords = [0, 0]; }
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
        };
    } catch (err) { return null; }
}

window.createCardHtml = function (i, isVIP, isProfileView = false) {
    const isOwner = window.currentUser && window.currentUser.id === i.userId;
    const isService = i.category && i.category.includes('Услуги');
    const isJob = i.category && i.category.includes('Работа');
    const isEstate = i.category && (i.category.includes('Жилье') || i.category.includes('Недвижимость'));
    const isAnimalEntity = i.category && i.category.startsWith('Животные') && !i.category.includes('Товары');
    const cardClass = isVIP ? 'item-card vip-card cursor-pointer flex flex-col relative h-full' : 'item-card bg-white dark:bg-stone-800 cursor-pointer flex flex-col relative h-full';
    const imageUrl = (Array.isArray(i.images) && i.images.length > 0) ? i.images[0] : (i.imageUrl || 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=500&q=80');
    const isLiked = window.userFavorites && window.userFavorites.has(i.id);
    const iconClass = isLiked ? 'text-brand-500 fa-box' : 'text-stone-400 fa-box-open';

    let statusBadge = ''; let opacityClass = '';
    if (i.status === 'reserved') { statusBadge = `<div class="absolute bottom-2 left-2 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 w-max">В РЕЗЕРВЕ</div>`; }
    else if (i.status === 'sold') { statusBadge = `<div class="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/60 z-10 backdrop-blur-[1px]"><span class="bg-stone-800 text-white text-[11px] font-black px-4 py-1.5 rounded shadow-lg tracking-widest rotate-[-15deg] w-max">ПРОДАНО</span></div>`; opacityClass = 'opacity-70 grayscale-[0.5]'; }

    const vipCrown = isVIP ? `<span class="text-amber-500 mr-1.5 text-sm inline-block" title="VIP Товар"><i class="fa-solid fa-crown"></i></span>` : '';
    const imgHeight = 'h-36 sm:h-40';
    const pClass = 'p-3 sm:p-4'; const titleClass = 'text-sm sm:text-base'; const priceClass = 'text-base sm:text-lg';

    let deliveryBadges = '';
    if (i.delivery && i.delivery.includes('PostExpress')) deliveryBadges += `<span class="flex items-center justify-center w-6 h-6 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-[12px] rounded-md border border-brand-200 dark:border-brand-800/50 cursor-help transition-transform hover:scale-110" title="Отправка PostExpress"><i class="fa-solid fa-box"></i></span>`;
    if (i.delivery && i.delivery.includes('Личная встреча')) deliveryBadges += `<span class="flex items-center justify-center w-6 h-6 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[12px] rounded-md border border-stone-200 dark:border-stone-700 cursor-help transition-transform hover:scale-110" title="Личная встреча"><i class="fa-solid fa-handshake"></i></span>`;
    
    let paymentBadges = '';
    if (i.payment) {
        const hasCrypto = i.payment.includes('Криптоперевод') || i.payment.includes('USDT TRC-20');
        const hasCard = i.payment.includes('Перевод на карту') || i.payment.includes('Перевод');
        if (hasCrypto) paymentBadges += `<span class="flex items-center justify-center w-6 h-6 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[12px] rounded-md border border-emerald-200 dark:border-emerald-800/50 cursor-help transition-transform hover:scale-110" title="Оплата криптовалютой"><i class="fa-brands fa-bitcoin"></i></span>`;
        if (hasCard) paymentBadges += `<span class="flex items-center justify-center w-6 h-6 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[12px] rounded-md border border-indigo-200 dark:border-indigo-800/50 cursor-help transition-transform hover:scale-110" title="Перевод на карту"><i class="fa-regular fa-credit-card"></i></span>`;
    }

    let condBadge = '';
    if (isService) condBadge = `<div class="absolute top-2 left-2 bg-blue-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">УСЛУГИ</div>`;
    else if (isJob) condBadge = `<div class="absolute top-2 left-2 bg-fuchsia-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">РАБОТА</div>`;
    else if (isEstate) condBadge = `<div class="absolute top-2 left-2 bg-indigo-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">НЕДВИЖИМОСТЬ</div>`;
    else if (isAnimalEntity) condBadge = '';
    else {
        if (i.condition === 'Новое') condBadge = `<div class="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">НОВОЕ</div>`;
        else condBadge = `<div class="absolute top-2 left-2 bg-stone-800/80 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10 uppercase">Б/У</div>`;
    }

    const favTitle = isLiked ? 'Убрать со склада' : 'Добавить на склад';
    const favHtml = isOwner ? '' : `<button type="button" title="${favTitle}" class="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 dark:bg-stone-900/80 backdrop-blur-sm rounded-full flex items-center justify-center transition shadow-sm hover:scale-110 cursor-pointer" onclick="window.toggleFavorite(this, event, '${i.id}')"><i class="fa-solid ${iconClass} text-sm drop-shadow-sm"></i></button>`;
    
    // Кнопки управления показываем ТОЛЬКО если это владелец И мы находимся в профиле
    const cardFooter = (isOwner && isProfileView) ? `
        <div class="view-grid-city text-[10px] font-bold mt-auto pt-2 flex gap-2">
            <button id="bump-btn-card-${i.id}" type="button" onclick="event.stopPropagation(); window.bumpViaShare('${i.id}')" class="px-3 py-1.5 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400 rounded-lg transition hover:bg-brand-100 flex items-center justify-center border border-brand-200 dark:border-brand-800/50"> <i class="fa-solid fa-share-nodes mr-1.5"></i> В ТОП </button>
            <button type="button" onclick="event.stopPropagation(); window.editItem('${i.id}')" class="px-3 py-1.5 bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300 rounded-lg transition hover:bg-stone-200 flex items-center justify-center border border-stone-200 dark:border-stone-700">
                <i class="fa-solid fa-pen mr-1.5"></i> Редакт.
            </button>
        </div>
    ` : ``; 

    return `
    <div class="${cardClass} ${opacityClass}" onclick="window.openItemDetails('${i.id}')">
        ${favHtml}
        <div class="card-img-wrap ${imgHeight} bg-stone-100 dark:bg-stone-700 relative overflow-hidden shrink-0">
            <img src="${imageUrl}" loading="lazy" decoding="async" class="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-700 group-hover:scale-110" alt="${i.title}">
            ${statusBadge}
            ${condBadge}
        </div>
        
        <div class="card-body-wrap ${pClass} flex-1 flex flex-col">
            
            <div class="view-list-col-2 flex-1 flex flex-col">
                <h4 class="font-bold ${titleClass} mb-1 pr-7 text-stone-900 dark:text-white line-clamp-2 leading-tight break-words">
                    ${vipCrown}${i.title || 'Без названия'}
                </h4>
                <div class="text-brand-600 price-text ${priceClass} mt-0.5 font-black">
                    ${i.price || 0} ${i.currency || 'RSD'}
                </div>
                
                <div class="flex flex-wrap gap-1.5 mb-3 mt-2">
                    <span class="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-md text-[10px] font-bold border border-stone-200 dark:border-stone-700 uppercase tracking-wide"><i class="fa-solid fa-location-dot mr-1 text-stone-400"></i>${window.t(i.city)}</span>
                    ${!(isService || isJob || isEstate || isAnimalEntity) ? `<span class="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-md text-[10px] font-bold border border-stone-200 dark:border-stone-700 uppercase tracking-wide">${i.condition === 'Новое' ? '✨ ' : '♻️ '}${window.t(i.condition || 'Б/У')}</span>` : ''}
                </div>

                <div class="view-badges items-center mt-auto pt-2 flex flex-wrap gap-1.5">${deliveryBadges}${paymentBadges}</div>
            </div>
            
            <div class="view-list-col-3 hidden">
                <h5 class="text-base font-black text-stone-900 dark:text-white uppercase tracking-wider mb-3 block">Описание находки</h5>
                <p class="view-list-desc">
                    ${i.description || 'Продавец не добавил описание к этому товару.'}
                </p>
            </div>
            
            ${cardFooter}
        </div>
    </div>`;
};

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
        window.openItemDetails(nextItem.id);
    }
};

window.openItemDetails = async (id) => {
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
        // ... (дальше идет твой стандартный код загрузки карточки товара)
        let item = window.loadedItems.find(i => i.id === id);
        if (!item) {
            const { data } = await supabase.from('items').select('*').eq('id', id).maybeSingle();
            if (data) { item = window.mapItemData(data); window.loadedItems.push(item); }
        }
        if (!item) { window.showToast("Товар не найден", true); return; }

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
                    phoneText.innerText = item.phone; // Динамически вставляем номер
                }
            } else {
                phoneContainer.classList.add('hidden');
                phoneContainer.classList.remove('flex');
            }
        }

        // --- СТАТУСЫ ТОВАРА (ПРОДАНО / РЕЗЕРВ) ---
        const statusBadge = document.getElementById('modal-status-badge');
        if (statusBadge) {
            // Проверяем оба варианта на всякий случай (и новую логику, и старую)
            const isReserved = item.status === 'reserved' || item.is_reserved === true;

            if (item.status === 'sold') {
                statusBadge.innerHTML = '<i class="fa-solid fa-check-circle mr-1"></i> ПРОДАНО';
                // Красная плашка для проданного
                statusBadge.className = 'text-[11px] font-bold px-2.5 py-1 rounded-lg text-white bg-red-500 shadow-sm inline-flex items-center';
            } else if (isReserved) {
                statusBadge.innerHTML = '<i class="fa-solid fa-clock mr-1"></i> В РЕЗЕРВЕ';
                // Желтая/Оранжевая плашка для резерва
                statusBadge.className = 'text-[11px] font-bold px-2.5 py-1 rounded-lg text-white bg-amber-500 shadow-sm inline-flex items-center';
            } else {
                // Если товар активен — прячем бейдж
                statusBadge.className = 'hidden';
            }
        }

        const addrCont = document.getElementById('modal-address-container');
        if (addrCont) {
            if (isEstate && item.coords && Array.isArray(item.coords) && item.coords.length === 2 && item.coords[0] !== 0) {
                addrCont.classList.remove('hidden'); addrCont.classList.add('flex');
                const modalAddrEl = document.getElementById('modal-address');
                if (modalAddrEl) modalAddrEl.innerText = item.address || item.city || '';
                setTimeout(() => {
                    try {
                        if (!window.viewMapObj) {
                            window.viewMapObj = L.map('view-map').setView([item.coords[0], item.coords[1]], 15);
                            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(window.viewMapObj);
                            window.viewMarkerObj = L.marker([item.coords[0], item.coords[1]]).addTo(window.viewMapObj);
                        } else {
                            window.viewMapObj.setView([item.coords[0], item.coords[1]], 15);
                            window.viewMarkerObj.setLatLng([item.coords[0], item.coords[1]]);
                        }
                        window.viewMapObj.invalidateSize();
                    } catch (mapErr) { }
                }, 150);
            } else { addrCont.classList.add('hidden'); addrCont.classList.remove('flex'); }
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
            // Делаем контейнер flex-строкой, чтобы статус и рейтинг выстроились в красивый ряд
            authorSubEl.className = "text-[11px] text-stone-500 font-bold mt-1 flex items-center flex-wrap gap-2";

            const statusHtml = item.isHighlighted ?
                `<span class="bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-widest shrink-0">VIP ПРОДАВЕЦ</span>` :
                `<span class="shrink-0">Продавец SVALKA</span>`;

            authorSubEl.innerHTML = statusHtml;

            // Запрашиваем рейтинг напрямую из базы без сложных RPC запросов
            supabase.from('reviews').select('rating').eq('seller_id', item.userId).then(({ data, error }) => {
                if (!error && data && data.length > 0) {
                    const avg = (data.reduce((sum, r) => sum + (r.rating || 5), 0) / data.length).toFixed(1);
                    // Добавляем красивую мини-плашку с рейтингом прямо рядом со статусом
                    authorSubEl.innerHTML = `${statusHtml} <span class="flex items-center gap-1 text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 px-1.5 py-0.5 rounded-md shadow-sm border border-stone-200 dark:border-stone-700"><i class="fa-solid fa-star text-amber-500 text-[10px]"></i> <span class="font-black">${avg}</span> <span class="text-stone-400 font-medium ml-0.5">(${data.length})</span></span>`;
                }
            });
        }

        // Прячем старую отдельную кнопку рейтинга (чтобы не было дублирования)
        const ratingEl = document.getElementById('modal-author-rating');
        if (ratingEl) {
            ratingEl.classList.add('hidden');
            ratingEl.classList.remove('flex');
        }

        // === ЛОГИКА КНОПКИ ПРОДАВЦА (внутри openItemDetails) ===
        const sellerBtn = document.getElementById('modal-seller-btn');
        if (sellerBtn) {
            sellerBtn.onclick = () => {
                // БОЛЬШЕ НЕ ЗАКРЫВАЕМ КАРТОЧКУ ТОВАРА! Стек сам ее спрячет.
                window.openSellerProfile(item.userId || item.user_id, item.authorName || item.author_name, item.authorAvatar || item.author_avatar);
            };
        }

        const coverImg = (Array.isArray(item.images) && item.images.length > 0) ? item.images[0] : (item.imageUrl || '');
        window.updateSEO(item.title, item.description, coverImg);

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
        const actionControls = document.getElementById('modal-owner-action-controls');

        // --- ПАНЕЛЬ ВЛАДЕЛЬЦА: ТАЙМЕРЫ И СТАТУСЫ ---
        const ownerControls = document.getElementById('modal-owner-controls');
        const chatBtn = document.getElementById('btn-contact-seller'); // Находим кнопку чата

        if (isOwner) {
            if (ownerControls) ownerControls.classList.remove('hidden');
            if (chatBtn) chatBtn.classList.add('hidden'); // Прячем кнопку чата от себя, чтобы не писать себе же

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

            // 2. Меняем текст кнопки резерва, если он уже включен
            const reserveBtnText = document.getElementById('btn-reserve-text');
            const isReserved = item.status === 'reserved' || item.is_reserved;
            if (reserveBtnText) reserveBtnText.innerText = isReserved ? "Снять резерв" : "В резерв";

        } else {
            if (ownerControls) ownerControls.classList.add('hidden');
            if (chatBtn) chatBtn.classList.remove('hidden'); // Показываем чат другим
        }

        // --- ЛОГИКА КНОПОК ПЕРЕЛИСТЫВАНИЯ ---
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
        // ------------------------------------

        window.openModal('item-modal');
        history.pushState({ modal: true }, '', '?item=' + id);
    } catch (err) { }
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

// ФУНКЦИЯ ПОКУПКИ PRO ЧЕРЕЗ CRYPTOMUS
window.buyProSubscription = async () => {
    try {
        window.showToast("Создаем защищенный счет...");
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return window.openModal('auth-modal');

        // ИСПОЛЬЗУЕМ ВСТРОЕННЫЙ МЕТОД SUPABASE (он сам подставит все нужные ключи и токены)
        const { data, error } = await supabase.functions.invoke('create-payment', {
            body: { amount: 5.00 }
        });

        if (error) {
            console.error("Ошибка вызова функции:", error);
            window.showToast("Ошибка сервера: " + error.message, true);
            return;
        }

        if (data && data.payment_url) {
            // Перекидываем пользователя на страницу оплаты Cryptomus
            window.location.href = data.payment_url;
        } else {
            window.showToast("Не удалось получить ссылку на оплату", true);
        }
    } catch (e) {
        console.error("Payment error:", e);
        window.showToast("Ошибка соединения с сервером", true);
    }
};

// ФУНКЦИЯ СОЗДАНИЯ ПЛАТЕЖА PLISIO
window.payWithPlisio = async () => {
    if (!window.currentUser) {
        window.showToast("Сначала войдите в аккаунт", true);
        return;
    }

    const btn = document.getElementById('btn-pay-plisio');
    const currencySelect = document.getElementById('plisio-currency-select');
    const selectedCurrency = currencySelect ? currencySelect.value : 'USDT_BSC';

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Создаем платеж...';
    }

    try {
        // ПЕРЕДАЕМ ВЫБРАННУЮ ВАЛЮТУ В SUPABASE (добавили currency)
        const { data, error } = await supabase.functions.invoke('create-plisio-invoice', {
            body: {
                userId: window.currentUser.id,
                currency: selectedCurrency
            }
        });

        if (error) {
            throw error;
        }

        if (data && data.url) {
            // Успех! Пробуем открыть страницу оплаты в новой вкладке (внешнем браузере)
            const opened = window.open(data.url, '_blank');
            if (!opened) {
                // Если браузер телефона заблокировал новую вкладку, открываем в текущей
                window.location.href = data.url;
            }
        } else if (data && data.error) {
            throw new Error(data.error);
        } else {
            throw new Error("Неизвестная ошибка генерации ссылки");
        }
    } catch (e) {
        console.error("Plisio Error:", e);
        // Теперь уведомление покажет конкретную причину ошибки
        window.showToast("Ошибка: " + (e.message || "Не удалось создать счет"), true);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-wallet text-xl"></i> ПЕРЕЙТИ К ОПЛАТЕ';
        }
    }
};

window.deleteItem = async (id) => {
    if (!window.currentUser) return;
    if (confirm("Удалить это объявление навсегда?")) {
        try { await supabase.from('items').delete().eq('id', id); window.showToast("Удалено!"); window.closeModal('item-modal'); window.fetchItems(false); } catch (e) { window.showToast("Ошибка удаления", true); }
    }
};

// --- PRO-статус ---
window.bumpItem = async () => {
    if (!window.currentUser || !window.activeModalItemId) return;

    // 1. Предлагаем купить PRO, если статуса нет
    if (!window.currentUserData || !window.currentUserData.is_pro) {
        window.showToast("Функция доступна только для PRO-пользователей", true);
        setTimeout(() => window.openModal('crypto-modal'), 1000);
        return;
    }

    const btnText = document.getElementById('btn-owner-bump-text');
    const originalText = btnText.innerText;
    btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>...';

    try {
        // 2. Получаем актуальные данные товара из БД для проверки кулдауна
        const { data: itemData, error: fetchError } = await supabase
            .from('items')
            .select('last_bumped_at')
            .eq('id', window.activeModalItemId)
            .single();

        if (fetchError) throw fetchError;

        // 3. Проверка кулдауна (24 часа)
        if (itemData.last_bumped_at) {
            const lastBump = new Date(itemData.last_bumped_at).getTime();
            const now = new Date().getTime();
            const hoursPassed = (now - lastBump) / (1000 * 60 * 60);

            if (hoursPassed < 24) {
                const hoursLeft = Math.ceil(24 - hoursPassed);
                window.showToast(`Следующее поднятие доступно через ${hoursLeft} ч.`, true);
                btnText.innerText = originalText;
                return;
            }
        }

        // 4. Поднимаем товар (обновляем created_at для сортировки и last_bumped_at для кулдауна)
        const nowIso = new Date().toISOString();
        const { error: updateError } = await supabase
            .from('items')
            .update({
                created_at: nowIso,
                last_bumped_at: nowIso
            })
            .eq('id', window.activeModalItemId);

        if (updateError) throw updateError;

        window.showToast("Объявление успешно поднято в ТОП!");
        window.closeModal('item-modal');
        window.fetchItems(false); // Перезагружаем ленту

    } catch (error) {
        console.error("Ошибка поднятия:", error);
        window.showToast("Произошла ошибка. Попробуйте позже.", true);
    } finally {
        if (btnText.innerText.includes('spinner')) btnText.innerText = originalText;
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
    document.getElementById('item-title').value = item.title || ''; document.getElementById('item-category').value = item.category || ''; document.getElementById('item-city').value = item.city || ''; document.getElementById('item-price').value = item.price || ''; document.getElementById('item-desc').value = item.description || ''; document.getElementById('item-currency').value = item.currency || 'RSD'; document.getElementById('item-phone').value = item.phone || '';
    document.getElementById('add-modal-title').innerText = "Редактировать"; document.getElementById('add-submit-btn').innerText = "Сохранить изменения";
    window.editExistingImages = item.images || [];
    window.tempPhotos = []; window.renderPhotoPreviews();
    document.getElementById('del-meet').checked = item.delivery ? item.delivery.includes('Личная встреча') : true;
    document.getElementById('del-post').checked = item.delivery ? item.delivery.includes('PostExpress') : false;
    window.closeModal('item-modal'); window.openModal('add-modal');
};

window.submitNewItem = async (event) => {
    if (event) event.preventDefault();

    const btn = document.getElementById('add-submit-btn');
    const progCont = document.getElementById('submit-progress-container');
    const progBar = document.getElementById('submit-progress-bar');
    const progText = document.getElementById('submit-progress-text');
    const progPerc = document.getElementById('submit-progress-percent');

    if (btn) { btn.style.display = 'none'; }
    if (progCont) { progCont.classList.remove('hidden'); progCont.classList.add('flex'); }
    if (progBar) progBar.style.width = '0%';

    try {
        if (!window.currentUser) throw new Error(window.t ? window.t('auth_hint') : "Войдите в аккаунт");

        // 1. СБОР ДАННЫХ ИЗ ФОРМЫ
        const titleEl = document.getElementById('item-title').value.trim();
        const categoryEl = document.getElementById('item-category').value;
        const cityEl = document.getElementById('item-city').value;
        const priceEl = document.getElementById('item-price').value;
        const currencyEl = document.getElementById('item-currency').value;
        const addressEl = document.getElementById('item-address') ? document.getElementById('item-address').value.trim() : '';
        const phoneEl = document.getElementById('item-phone') ? document.getElementById('item-phone').value.trim() : '';
        const descEl = document.getElementById('item-desc').value.trim();
        const conditionEl = document.querySelector('input[name="item-condition"]:checked')?.value || 'Б/У';

        const paymentArr = [];
        if (document.getElementById('pay-cash')?.checked) paymentArr.push('Наличные');
        if (document.getElementById('pay-card')?.checked) paymentArr.push('Перевод на карту');
        if (document.getElementById('pay-crypto')?.checked) paymentArr.push('Криптоперевод');

        const deliveryArr = [];
        if (document.getElementById('del-meet')?.checked) deliveryArr.push('Личная встреча');
        if (document.getElementById('del-post')?.checked) deliveryArr.push('PostExpress');

        if (!titleEl || !categoryEl || !priceEl) {
            throw new Error("Заполните все обязательные поля");
        }

        let finalImages = window.editingItemId ? (window.editExistingImages || []) : [];

        function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
            return new Blob([ab], { type: mimeString });
        }

        // 2. ЗАГРУЗКА ФОТО В SUPABASE С ПРОГРЕССОМ
        if (window.tempPhotos && window.tempPhotos.length > 0) {
            finalImages = [];
            const totalPhotos = window.tempPhotos.length;

            for (let i = 0; i < totalPhotos; i++) {
                const dataUrl = window.tempPhotos[i];
                if (dataUrl.startsWith('http')) {
                    finalImages.push(dataUrl);
                } else {
                    if (progText) progText.innerText = `Обработка фото ${i + 1} из ${totalPhotos}...`;
                    const blob = dataURItoBlob(dataUrl);
                    const fileName = `${window.currentUser.id}_${Date.now()}_${i}.jpg`;

                    const { error } = await supabase.storage.from('item-images').upload(fileName, blob, { contentType: 'image/jpeg' });
                    if (error) throw error;

                    const { data } = supabase.storage.from('item-images').getPublicUrl(fileName);
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

        // 3. ФОРМИРОВАНИЕ ОБЪЕКТА ДЛЯ БАЗЫ ДАННЫХ (ИСправлены названия колонок!)
        const itemData = {
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
            status: 'active'
        };

        // 4. РЕАЛЬНАЯ ОТПРАВКА В БАЗУ
        if (window.editingItemId) {
            const { error } = await supabase.from('items').update(itemData).eq('id', window.editingItemId);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('items').insert([itemData]);
            if (error) throw error;
        }

        if (progBar) progBar.style.width = `100%`;
        if (progPerc) progPerc.innerText = `100%`;

        // 5. УСПЕШНОЕ ЗАВЕРШЕНИЕ
        window.showToast(window.editingItemId ? "Обновлено!" : "Опубликовано!");
        window.closeModal('add-modal');

        document.getElementById('add-form').reset();
        window.tempPhotos = [];
        const photoList = document.getElementById('photo-preview-list');
        if (photoList) photoList.innerHTML = '';

        // Правильный перезапуск ленты товаров
        if (typeof window.fetchItems === 'function') {
            window.fetchItems(false);
        }

    } catch (e) {
        console.error("Ошибка публикации:", e);
        window.showToast(`Ошибка: ${e.message}`, true);
    } finally {
        if (progCont) { progCont.classList.add('hidden'); progCont.classList.remove('flex'); }
        if (btn) {
            btn.style.display = 'block';
            btn.innerHTML = window.editingItemId ? `Сохранить` : (window.t ? window.t('btn_publish_item') : `Опубликовать`);
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
    const files = Array.from(e.target.files); const isPro = window.currentUserData && window.currentUserData.is_pro;
    const maxPhotos = isPro ? 10 : 5; const currentTotal = (window.editExistingImages?.length || 0) + (window.tempPhotos?.length || 0);
    if (currentTotal + files.length > maxPhotos) { window.showToast(`Доступно максимум ${maxPhotos} фото ${isPro ? '' : '(Купите PRO для 10)'}`, true); e.target.value = ''; return; }

    for (let file of files) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas'); const MAX_WIDTH = 1000; const MAX_HEIGHT = 1000; let width = img.width; let height = img.height;
                if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } } else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
                canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, width, height);
                window.tempPhotos.push(canvas.toDataURL('image/jpeg', 0.8)); window.renderPhotoPreviews();
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

window.handleAuthChange = async (session) => {
    try {
        if (!window.authInitialized) window.authInitialized = true;
        window.currentUser = session?.user || null;

        // === ЗАЩИТА ОТ БАНА И УДАЛЕНИЯ ===
        if (window.currentUser) {
            const { data: banCheck, error: profileError } = await supabase.from('profiles').select('is_banned, ban_reason').eq('id', window.currentUser.id).single();
            if (profileError || !banCheck) {
                await supabase.auth.signOut();
                alert("Ваш аккаунт был удален. Сессия завершена.");
                window.location.reload();
                return;
            }

            if (banCheck && banCheck.is_banned) {
                await supabase.auth.signOut();
                alert(`Доступ к SVALKA ограничен.\n\nВаш аккаунт был заблокирован модератором.\nПричина: ${banCheck.ban_reason || 'Нарушение правил'}`);
                window.location.reload();
                return;
            }
        }

        const loginBtns = document.querySelectorAll('#nav-login-btn, #mob-nav-login, #profile-login-wrapper');
        const userControls = document.querySelectorAll('#nav-user-controls, #mob-user-controls, #profile-economy-section');
        const profileLogoutBtn = document.getElementById('profile-logout-btn');

        if (window.currentUser) {
            // 1. ЖЕСТКО ПРЯЧЕМ КНОПКИ ВХОДА (Побеждаем Tailwind lg:flex)
            loginBtns.forEach(el => {
                el.style.display = 'none';
                el.classList.add('hidden');
                el.classList.remove('block', 'flex', 'lg:block', 'lg:flex');
            });

            // 2. ПОКАЗЫВАЕМ ЭЛЕМЕНТЫ УПРАВЛЕНИЯ
            userControls.forEach(el => {
                el.style.display = '';
                el.classList.remove('hidden');
                el.classList.add('flex');
            });
            if (profileLogoutBtn) {
                profileLogoutBtn.style.display = '';
                profileLogoutBtn.classList.remove('hidden');
                profileLogoutBtn.classList.add('flex');
            }

            const editBtn = document.getElementById('btn-edit-profile');
            if (editBtn) editBtn.classList.remove('hidden');

            const meta = window.currentUser.user_metadata || {};
            document.querySelectorAll('#profile-name').forEach(el => el.innerText = meta.full_name || "Пользователь");
            document.querySelectorAll('#profile-email').forEach(el => el.innerText = window.currentUser.email || "");

            if (meta.avatar_url) {
                document.querySelectorAll('#profile-avatar-container').forEach(el => {
                    el.innerHTML = `<img src="${meta.avatar_url}" class="w-full h-full object-cover">`;
                });
            }

            try {
                const { data: profile } = await supabase.from('profiles').select('*').eq('id', window.currentUser.id).maybeSingle();
                const isProActive = profile?.pro_until ? new Date(profile.pro_until) > new Date() : false;

                window.currentUserData = profile || { wallet_balance: 0 };
                window.currentUserData.is_pro = isProActive;

                document.querySelectorAll('#profile-balance').forEach(el => el.innerText = `${window.currentUserData.bump_tokens || 0} шт.`);
                if (isProActive) document.querySelectorAll('#profile-pro-badge').forEach(el => el.classList.remove('hidden'));
            } catch (e) { }

            try {
                const { data: favs } = await supabase.from('favorites').select('item_id').eq('user_id', window.currentUser.id);
                window.userFavorites = new Set(favs?.map(f => f.item_id) || []);
            } catch (e) { }

            window.updateChatBadges();
            window.initGlobalChatListener();

        } else {
            // 3. ЕСЛИ НЕ АВТОРИЗОВАН — ВОЗВРАЩАЕМ КНОПКИ ВХОДА
            loginBtns.forEach(el => {
                el.style.display = '';
                el.classList.remove('hidden');
                if (el.id === 'nav-login-btn') el.classList.add('lg:flex');
                else el.classList.add('flex');
            });

            // 4. ПРЯЧЕМ ЭЛЕМЕНТЫ УПРАВЛЕНИЯ
            userControls.forEach(el => {
                el.style.display = 'none';
                el.classList.add('hidden');
                el.classList.remove('flex');
            });
            if (profileLogoutBtn) {
                profileLogoutBtn.style.display = 'none';
                profileLogoutBtn.classList.add('hidden');
                profileLogoutBtn.classList.remove('flex');
            }
            if (window.globalChatSubscription) supabase.removeChannel(window.globalChatSubscription);
        }

        if (window.currentUser) window.switchProfileTab(window.currentProfileTab);
    } catch (e) { console.error("Ошибка авторизации:", e); }
};

// Проверяем сессию при загрузке страницы
supabase.auth.getSession().then(({ data: { session } }) => { window.handleAuthChange(session); });

// === ОТСЛЕЖИВАНИЕ СТАТУСА АВТОРИЗАЦИИ ===
supabase.auth.onAuthStateChange((event, session) => {
    // Вызываем рабочую функцию вместо той опечатки
    if (window.authInitialized) window.handleAuthChange(session);
});

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

window.applyCondition = (val) => { window.filterCondition = val; window.applyFilters(); };
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

// Логика появления плавающей кнопки "Фильтры" на SVALKA
// 1. Адаптивная sticky-шапка (сжимается при скролле)
window.addEventListener('scroll', () => {
    const headerContainer = document.getElementById('header-container');
    const header = document.getElementById('main-header');
    if (window.scrollY > 20) {
        if (headerContainer) headerContainer.classList.replace('sm:py-4', 'sm:py-2');
        if (headerContainer) headerContainer.classList.replace('py-3', 'py-2');
        if (header) {
            header.classList.add('bg-white/80', 'dark:bg-stone-900/90', 'shadow-md');
            header.classList.remove('bg-white/40', 'dark:bg-stone-900/70', 'shadow-[0_4px_30px_rgba(20,184,166,0.08)]', 'dark:shadow-[0_10px_40px_rgba(20,184,166,0.05)]');
        }
    } else {
        if (headerContainer) headerContainer.classList.replace('sm:py-2', 'sm:py-4');
        if (headerContainer) headerContainer.classList.replace('py-2', 'py-3');
        if (header) {
            header.classList.add('bg-white/40', 'dark:bg-stone-900/70', 'shadow-[0_4px_30px_rgba(20,184,166,0.08)]', 'dark:shadow-[0_10px_40px_rgba(20,184,166,0.05)]');
            header.classList.remove('bg-white/80', 'dark:bg-stone-900/90', 'shadow-md');
        }
    }
    if (!document.body.classList.contains('modal-open')) {
        const loadMoreBtn = document.getElementById('load-more-btn');
        // Если кнопка есть и она не скрыта (значит есть еще товары)
        if (loadMoreBtn && !loadMoreBtn.classList.contains('hidden')) {
            // Если до конца страницы осталось меньше 500 пикселей
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                // Чтобы не отправить 100 запросов подряд, временно прячем кнопку
                loadMoreBtn.classList.add('hidden');
                window.loadMoreItems();
            }
        }
    }
});

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

// --- ГЛОБАЛЬНЫЙ ТАЙМЕР РЕПОСТОВ (ПРЕВРАЩАЕТ КНОПКИ В ЧАСЫ) ---
window.updateAllShareTimers = () => {
    setInterval(() => {
        try {
            if (!window.currentUser || !window.loadedItems) return;

            window.loadedItems.forEach(item => {
                // Защита: проверяем и user_id и userId
                const itemOwnerId = item.user_id || item.userId;
                if (itemOwnerId !== window.currentUser.id) return;

                let timePassedMs = 25 * 60 * 60 * 1000; // По умолчанию > 24 часов
                if (item.last_shared_at) {
                    timePassedMs = Date.now() - new Date(item.last_shared_at).getTime();
                }

                const cooldownMs = 24 * 60 * 60 * 1000;
                const timeLeft = cooldownMs - timePassedMs;

                const cardBtn = document.getElementById(`bump-btn-card-${item.id}`);
                const modalBtn = (window.activeModalItemId === item.id) ? document.getElementById('btn-owner-share') : null;

                if (timeLeft > 0) {
                    const h = Math.floor(timeLeft / (1000 * 60 * 60));
                    const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const s = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    const timeStr = `${h}ч ${m}м ${s}с`;

                    if (cardBtn) {
                        cardBtn.disabled = true;
                        cardBtn.className = "px-3 py-1.5 bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500 rounded-lg flex items-center justify-center border border-transparent text-[10px] font-bold cursor-not-allowed";
                        cardBtn.innerHTML = `<i class="fa-solid fa-clock mr-1"></i> ${timeStr}`;
                    }

                    if (modalBtn) {
                        modalBtn.disabled = true;
                        modalBtn.className = "group flex flex-col items-center justify-center p-3 bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 border border-stone-200 dark:border-stone-700 rounded-2xl cursor-not-allowed opacity-70";
                        modalBtn.innerHTML = `<i class="fa-solid fa-clock text-lg mb-1"></i><span class="text-xs font-bold">Ожидание</span><span class="text-[9px] mt-0.5">${timeStr}</span>`;
                    }
                } else {
                    if (cardBtn && cardBtn.disabled) {
                        cardBtn.disabled = false;
                        cardBtn.className = "px-3 py-1.5 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400 rounded-lg transition hover:bg-brand-100 flex items-center justify-center border border-brand-200 dark:border-brand-800/50 cursor-pointer";
                        cardBtn.innerHTML = `<i class="fa-solid fa-share-nodes mr-1.5"></i> В ТОП`;
                    }

                    if (modalBtn && modalBtn.disabled) {
                        modalBtn.disabled = false;
                        modalBtn.className = "group flex flex-col items-center justify-center p-3 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-800/50 rounded-2xl hover:bg-brand-100 hover:border-brand-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all relative overflow-hidden cursor-pointer";
                        modalBtn.innerHTML = `<div class="absolute top-0 right-0 bg-brand-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-bl-lg uppercase tracking-widest animate-pulse">Доступно</div><i class="fa-solid fa-share-nodes text-lg mb-1 group-hover:scale-110 transition-transform"></i><span class="text-xs font-bold">Репост</span><span class="text-[9px] opacity-70 mt-0.5 transition-colors">+ Поднятие</span>`;
                    }
                }
            });
        } catch (e) { console.error("Ошибка в таймере:", e); }
    }, 1000);
};

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

        // ИСПРАВЛЕНО: supabaseClient
        const localUser = (await supabaseClient.auth.getUser()).data?.user;
        if (localUser && shareToken.includes(`sh_${localUser.id}`)) return;

        // Защита от дублей в одной вкладке браузера
        if (sessionStorage.getItem(`processed_share_${shareToken}`)) return;

        // ИСПРАВЛЕНО: supabaseClient
        const { data: trackingData } = await supabaseClient.from('share_tracking').select('*').eq('share_token', shareToken).single();
        if (!trackingData || trackingData.clicks_count > 0) return;

        // Закрываем токен
        await supabaseClient.from('share_tracking').update({ clicks_count: 1 }).eq('share_token', shareToken);

        // Поднимаем товар и записываем время репоста (чтобы запустился таймер на 24 часа)
        const nowIso = new Date().toISOString();
        await supabaseClient.from('items').update({ created_at: nowIso, last_shared_at: nowIso }).eq('id', itemId);

        sessionStorage.setItem(`processed_share_${shareToken}`, 'true');
    } catch (err) {
        console.error("Ошибка при проверке ссылки:", err);
    }
};

// =====================================
// АТМОСФЕРНАЯ ШАПКА И ЖИВОЙ ПОИСК
// =====================================

// 1. Адаптивная sticky-шапка (сжимается при скролле)
window.addEventListener('scroll', () => {
    const headerContainer = document.getElementById('header-container');
    const header = document.getElementById('main-header');
    if (window.scrollY > 20) {
        if (headerContainer) headerContainer.classList.replace('sm:py-4', 'sm:py-2');
        if (headerContainer) headerContainer.classList.replace('py-3', 'py-2');
        if (header) {
            header.classList.add('bg-white/95', 'dark:bg-stone-900/95', 'shadow-md');
            header.classList.remove('bg-white/70', 'dark:bg-stone-900/70', 'shadow-[0_10px_30px_rgba(20,184,166,0.08)]');
        }
    } else {
        if (headerContainer) headerContainer.classList.replace('sm:py-2', 'sm:py-4');
        if (headerContainer) headerContainer.classList.replace('py-2', 'py-3');
        if (header) {
            header.classList.add('bg-white/70', 'dark:bg-stone-900/70', 'shadow-[0_10px_30px_rgba(20,184,166,0.08)]');
            header.classList.remove('bg-white/95', 'dark:bg-stone-900/95', 'shadow-md');
        }
    }
});

// 2. Анимированный плейсхолдер поиска (Магия перебора)
const searchInputAtm = document.getElementById('main-search-input');
const searchPhrases = ['iPhone 13 Pro', 'Кроссовки Nike', 'PlayStation 5', 'Велосипед', 'Квартира в Нови-Саде', 'Услуги электрика', 'Диван IKEA', 'MacBook Air'];
let phraseIndex = 0;

setInterval(() => {
    if (searchInputAtm && document.activeElement !== searchInputAtm && !searchInputAtm.value) {
        searchInputAtm.setAttribute('placeholder', 'Например: ' + searchPhrases[phraseIndex]);
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
