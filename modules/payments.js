// ==========================================
// modules/payments.js — Биллинг и крипто-платежи
// ==========================================
export const PaymentsModule = {
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
                body: { userId: window.currentUser.id, currency: selectedCurrency }
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