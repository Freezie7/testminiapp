// Проверяем, что TonConnect загрузился
if (typeof TonConnect === 'undefined') {
    alert('TonConnect SDK не загружен! Проверьте подключение к интернету.');
}

const connector = new TonConnect.TonConnect({
    manifestUrl: "https://freezie7.github.io/testminiapp/tonconnect-manifest.json"
});

async function connectWallet() {
    if (!window.Telegram?.WebApp?.initData) {
        alert('Откройте приложение в Telegram!');
        return;
    }

    try {
        // Получаем список доступных кошельков
        const wallets = await connector.getWallets();
        const wallet = wallets[0]; // TonKeeper или другой кошелёк

        // Подключаемся
        await connector.connect({ jsBridgeKey: wallet.jsBridgeKey });

        // Обновляем статус
        connector.onStatusChange((wallet) => {
            const statusDiv = document.getElementById("status");
            statusDiv.innerText = wallet ? "Кошелёк подключён: " + wallet.device.appName : "Отключён";
        });

    } catch (err) {
        console.error("Ошибка подключения:", err);
        alert("Ошибка: " + err.message);
    }
}