// modules/security.js
// Общие хелперы для защиты от XSS при вставке пользовательских данных в HTML.
// Используются везде, где строка от пользователя (title, avatar_url, images, category и т.д.)
// попадает в innerHTML — это единственное место, где нужно "напоминать" браузеру,
// что это данные, а не разметка.

/**
 * Экранирует спецсимволы HTML, чтобы строка не могла быть интерпретирована
 * как теги/атрибуты при вставке через innerHTML.
 */
export function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>'"]/g, (match) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[match]));
}

/**
 * Пропускает только "безопасные" схемы URL для картинок (http/https/data:image).
 * Отсекает javascript:, vbscript: и подобные векторы, если строка с URL
 * пришла не через форму загрузки, а напрямую через API.
 */
export function safeImageUrl(url, fallback = '') {
    if (!url || typeof url !== 'string') return fallback;
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (/^data:image\//i.test(trimmed)) return trimmed;
    return fallback;
}

/**
 * Безопасно устанавливает картинку в контейнер через DOM API (не innerHTML),
 * поэтому значение src никогда не парсится как HTML — надёжнее, чем экранирование строк.
 */
export function renderSafeAvatar(container, url, fallbackIconHtml = '<i class="fa-solid fa-user"></i>') {
    if (!container) return;
    const safeUrl = safeImageUrl(url);
    if (!safeUrl) {
        container.innerHTML = fallbackIconHtml;
        return;
    }
    container.innerHTML = '';
    const img = document.createElement('img');
    img.className = 'w-full h-full object-cover';
    img.src = safeUrl;
    img.alt = '';
    container.appendChild(img);
}
