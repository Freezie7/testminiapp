// Инициализация TonConnect
const connector = new TonConnect.TonConnect({
    manifestUrl: "https://freezie7.github.io/testminiapp/webapp/tonconnect-manifest.json"
});

// Проверяем, запущено ли в Telegram WebApp
function isTelegram() {
    return Boolean(window.Telegram?.WebApp?.initData);
}

async function connectWallet() {
    if (!isTelegram()) {
        alert("Откройте мини-приложение в Telegram!");
        return;
    }

    try {
        // Подключаем кошелёк
        const wallets = await connector.getWallets();
        const wallet = wallets[0]; // Берём первый доступный кошелёк (например, TonKeeper)

        // Открываем интерфейс подключения
        await connector.connect({ jsBridgeKey: wallet.jsBridgeKey });

        // Обновляем статус
        connector.onStatusChange((wallet) => {
            const statusDiv = document.getElementById("status");
            statusDiv.innerText = wallet ? "Кошелёк подключён!" : "Отключён";
        });

    } catch (err) {
        console.error("Ошибка подключения:", err);
        alert("Ошибка: " + err.message);
    }
}