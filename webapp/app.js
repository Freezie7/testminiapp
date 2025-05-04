// 1. Проверяем, что TonConnect SDK загружен
if (typeof TonConnect === 'undefined') {
    alert('TonConnect SDK не загружен! Проверьте подключение к интернету.');
    throw new Error('TonConnect не загружен');
}

// 2. Инициализируем connector сразу (глобально)
const connector = new TonConnect.TonConnect({
    manifestUrl: "https://freezie7.github.io/testminiapp/webapp/tonconnect-manifest.json"
});

// 3. Функция для подключения кошелька
async function connectWallet() {
    if (!window.Telegram?.WebApp?.initData) {
        alert('Откройте приложение в Telegram!');
        return;
    }

    try {
        // Получаем список кошельков
        const wallets = await connector.getWallets();
        if (wallets.length === 0) {
            alert('Не найдено поддерживаемых кошельков!');
            return;
        }

        // Подключаем первый доступный кошелёк (например, TonKeeper)
        await connector.connect({
            jsBridgeKey: wallets[0].jsBridgeKey
        });

        // Обновляем статус при изменении
        connector.onStatusChange((wallet) => {
            const statusDiv = document.getElementById("status");
            statusDiv.innerText = wallet ? `Подключён: ${wallet.device.appName}` : "Отключён";
        });

    } catch (err) {
        console.error("Ошибка подключения:", err);
        alert("Ошибка: " + err.message);
    }
}