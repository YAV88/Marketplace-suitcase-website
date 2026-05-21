// info-pages.js — Единый скрипт темной темы для инфо-страниц SVALKA

function applyCurrentTheme() {
    // Проверяем сохраненную тему в localStorage или системные предпочтения устройства
    const isDark = localStorage.getItem('theme') === 'dark' || 
                  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    const icon = document.getElementById('theme-icon');
    if (isDark) {
        document.documentElement.classList.add('dark');
        if(icon) { 
            icon.classList.remove('fa-moon'); 
            icon.classList.add('fa-sun'); 
        }
    } else {
        document.documentElement.classList.remove('dark');
        if(icon) { 
            icon.classList.remove('fa-sun'); 
            icon.classList.add('fa-moon'); 
        }
    }
}

function togglePageTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    applyCurrentTheme();
}

// Запускаем автоматическую проверку при загрузке страницы
applyCurrentTheme();
