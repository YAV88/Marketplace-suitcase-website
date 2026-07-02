// ==========================================
// modules/payments.js — Биллинг и крипто-платежи
// ==========================================
export const PaymentsModule = {
    initiateTokenPurchase: async () => {
        if (!window.currentUser) {
            window.showToast("Сначала войдите в аккаунт", true);
            return;
        }

        const selectedPackage = document.querySelector('input[name="token_package"]:checked');
        if (!selectedPackage) return;
        
        const tokensAmount = parseInt(selectedPackage.value);
        // Убираем знак $ для передачи чистого числа на бэкенд
        const priceUsd = parseFloat(selectedPackage.dataset.price.replace('$', '')); 

        const currencySelect = document.getElementById('token-currency-select');
        const selectedCurrency = currencySelect ? currencySelect.value : 'USDT_BSC';

        // Ищем кнопку, чтобы заблокировать её от двойного клика и показать лоадер
        const btn = document.querySelector('#token-purchase-modal button[onclick="window.initiateTokenPurchase()"]');
        const originalBtnHtml = btn ? btn.innerHTML : '';

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Создаем платеж...';
        }

        try {
            // Вызываем ту же функцию Plisio, но с дополнительными параметрами
            const { data, error } = await window.supabase.functions.invoke('create-plisio-invoice', {
                body: {
                    userId: window.currentUser.id,
                    currency: selectedCurrency,
                    order_type: 'buy_tokens',   // Флаг для бэкенда: что именно покупаем
                    amount_usd: priceUsd,       // Сумма к оплате
                    tokens_count: tokensAmount  // Сколько токенов начислить после успешной оплаты
                }
            });

            if (error) throw error;

            if (data && data.url) {
                // Пытаемся открыть в новой вкладке, если браузер блокирует — открываем в текущей
                const opened = window.open(data.url, '_blank');
                if (!opened) window.location.href = data.url;
            } else if (data && data.error) {
                throw new Error(data.error);
            } else {
                throw new Error("Неизвестная ошибка генерации ссылки");
            }
        } catch (e) {
            console.error("Token Purchase Error:", e);
            window.showToast("Ошибка: " + (e.message || "Не удалось создать счет"), true);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalBtnHtml;
            }
        }
    },
    
    buyProSubscription: async () => {
        try {
            window.showToast("Создаем защищенный счет...");
            const { data: { session } } = await window.supabase.auth.getSession();
            if (!session) return window.openModal('auth-modal');

            const { data, error } = await window.supabase.functions.invoke('create-payment', {
                body: { amount: 5.00 }
            });

            if (error) throw error;
            if (data && data.payment_url) window.location.href = data.payment_url;
            else throw new Error("Не удалось получить ссылку");
        } catch (e) {
            window.showToast("Ошибка соединения с сервером", true);
        }
    },

    payWithPlisio: async () => {
        if (!window.currentUser) return window.showToast("Войдите в аккаунт", true);
        
        const btn = document.getElementById('btn-pay-plisio');
        const currencySelect = document.getElementById('plisio-currency-select');
        const selectedCurrency = currencySelect ? currencySelect.value : 'USDT_BSC';

        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Создаем платеж...'; }

        try {
            const { data, error } = await window.supabase.functions.invoke('create-plisio-invoice', {
                body: { 
                    userId: window.currentUser.id, 
                    currency: selectedCurrency,
                    order_type: 'buy_pro', // Добавлено: Флаг покупки VIP
                    amount_usd: 5.00       // Добавлено: Сумма для VIP
                }
            });
            if (error) throw error;

            if (data && data.url) {
                const opened = window.open(data.url, '_blank');
                if (!opened) window.location.href = data.url;
            } else throw new Error(data?.error || "Ошибка генерации ссылки");
        } catch (e) {
            window.showToast("Ошибка: " + e.message, true);
        } finally {
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-wallet text-xl"></i> ПЕРЕЙТИ К ОПЛАТЕ'; }
        }
    }
};