// info-pages.js — Единый скрипт темной темы и мультиязычности для инфо-страниц SVALKA

// ==========================================
// 1. БЛОК СИНХРОНИЗАЦИИ ТЕМЫ
// ==========================================
function applyCurrentTheme() {
    const isDark = localStorage.getItem('theme') === 'dark' || 
                  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    const icon = document.getElementById('theme-icon');
    if (isDark) {
        document.documentElement.classList.add('dark');
        if(icon) { icon.className = 'fa-solid fa-sun text-amber-500'; }
    } else {
        document.documentElement.classList.remove('dark');
        if(icon) { icon.className = 'fa-solid fa-moon text-stone-600'; }
    }
}

function togglePageTheme() {
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    applyCurrentTheme();
}

// ==========================================
// 2. БЛОК МУЛЬТИЯЗЫЧНОСТИ (i18n)
// ==========================================
window.infoI18n = {
    ru: {
        'page_title': 'SVALKA — О проекте',
        'back_to_site': 'Назад на сайт',
        'about_title_1': 'О',
        'about_title_2': 'проекте',
        'about_p1': 'SVALKA — это современный, быстрый и удобный локальный маркетплейс, созданный специально для русскоязычного и интернационального сообщества в Сербии. Наша цель — дать пользователям простой инструмент для того, чтобы подарить вещам вторую жизнь, найти что-то уникальное или выгодно разгрузить свой дом.',
        'about_p2': 'Мы создали эту площадку как альтернативу громоздким, перегруженным рекламой сайтам объявлений. Наш приоритет — чистый минималистичный дизайн, высокая скорость работы как на ПК, так и на смартфонах, и максимальное удобство использования.',
        'features_title': 'Главные особенности SVALKA:',
        'feat_1_title': 'Простая публикация:',
        'feat_1_desc': 'Достаточно нажать одну кнопку «Пристроить добро», чтобы ваша вещь моментально оказалась перед глазами сотен покупателей.',
        'feat_2_title': 'Умная фильтрация:',
        'feat_2_desc': 'Мгновенный поиск объявлений по городам Сербии, категориям и состоянию предметов.',
        'feat_3_title': 'Безопасные диалоги:',
        'feat_3_desc': 'Договаривайтесь о встречах во встроенных приватных чатах без необходимости обмениваться личными номерами телефонов или переходить в сторонние мессенджеры.',
        'feat_4_title': 'Система репутации:',
        'feat_4_desc': 'Ставьте оценки и пишите отзывы о сделках, помогая формировать честное и открытое сообщество продавцов и покупателей.'
    },
    en: {
        'page_title': 'SVALKA — About project',
        'back_to_site': 'Back to site',
        'about_title_1': 'About',
        'about_title_2': 'project',
        'about_p1': 'SVALKA is a modern, fast, and convenient local marketplace built specifically for the international and expat community in Serbia. Our goal is to provide users with a simple tool to give items a second life, find something unique, or easily declutter their homes.',
        'about_p2': 'We created this platform as an alternative to bulky, ad-heavy classified websites. Our priority is a clean minimalist design, high operation speed on both PCs and smartphones, and ultimate ease of use.',
        'features_title': 'Key Features of SVALKA:',
        'feat_1_title': 'Simple Posting:',
        'feat_1_desc': 'Just click a single button to post your item, and it will immediately appear in front of hundreds of buyers.',
        'feat_2_title': 'Smart Filtering:',
        'feat_2_desc': 'Instant search of listings by cities in Serbia, categories, and item conditions.',
        'feat_3_title': 'Secure Dialogues:',
        'feat_3_desc': 'Arrange deals within built-in private chats without the need to exchange phone numbers or switch to third-party messengers.',
        'feat_4_title': 'Reputation System:',
        'feat_4_desc': 'Rate and review transactions, helping to shape an honest and transparent community of sellers and buyers.'
    },
    sr: {
        'page_title': 'SVALKA — O projektu',
        'back_to_site': 'Nazad на sajt',
        'about_title_1': 'O',
        'about_title_2': 'projektu',
        'about_p1': 'SVALKA je moderan, brz i jednostavan lokalni šoping prostor, kreiran specijalno za internacionalnu zajednicu u Srbiji. Naš cilj je da pružimo korisnicima jednostavan alat da stvarima daju drugi život, pronađu nešto jedinstveno ili lako rasterete svoj dom.',
        'about_p2': 'Ovu platformu smo napravili kao alternativu glomaznim sajtovima za oglašavanje koji su pretrpani reklamama. Naš prioritet je čist minimalistički dizajn, velika brzina rada na računarima i telefonima, i maksimalna udobnost.',
        'features_title': 'Glavne karakteristike SVALKA platforme:',
        'feat_1_title': 'Jednostavno objavljivanje:',
        'feat_1_desc': 'Dovoljno je da pritisnete jedno dugme da biste oglasili stvar i vaš predmet će se odmah naći pred očima stotina kupaca.',
        'feat_2_title': 'Pametno filtriranje:',
        'feat_2_desc': 'Instant pretraga oglasa po gradovima Srbije, kategorijama i stanju predmeta.',
        'feat_3_title': 'Bezbedni dijalozi:',
        'feat_3_desc': 'Dogovarajte se o sastancima unutar ugrađenih privatnih četova bez potrebe za razmenom ličnih brojeva telefona.',
        'feat_4_title': 'Sistem reputacije:',
        'feat_4_desc': 'Ocenjujte i pišite recenzije o transakcijama, pomažući u formiranju iskrene i otvorene zajednice.'
    }
};

window.changeLanguage = (lang) => {
    localStorage.setItem('svalka_lang', lang);
    
    // Переключаем флаги в селекторе шапки
    const flagEl = document.getElementById('lang-flag');
    const codeEl = document.getElementById('lang-code');
    if(flagEl && codeEl) {
        if(lang === 'ru') { flagEl.innerText = '🇷🇺'; codeEl.innerText = 'RU'; }
        if(lang === 'sr') { flagEl.innerText = '🇷🇸'; codeEl.innerText = 'SR'; }
        if(lang === 'en') { flagEl.innerText = '🇬🇧'; codeEl.innerText = 'EN'; }
    }

    // Подменяем тексты на странице
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.infoI18n[lang] && window.infoI18n[lang][key]) {
            if (el.tagName === 'TITLE') {
                document.title = window.infoI18n[lang][key];
            } else {
                el.innerHTML = window.infoI18n[lang][key];
            }
        }
    });
};

// Запуск при инициализации страницы
document.addEventListener('DOMContentLoaded', () => {
    applyCurrentTheme();
    // Берём язык, сохраненный главным сайтом, или ставим по умолчанию русский
    const savedLang = localStorage.getItem('svalka_lang') || 'ru';
    window.changeLanguage(savedLang);
});
