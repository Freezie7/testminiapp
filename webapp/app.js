let connector;

// Подключаем кошелёк через TonConnect
function connectWallet() {
    connector = new TonConnect.TonConnect({
        manifestUrl: "https://freezie7.github.io/testminiapp/tonconnect-manifest.json"
    });

    connector.onStatusChange((wallet) => {
        document.getElementById("status").innerText = wallet ? "Кошелёк подключён!" : "Отключён";
    });

    connector.connect("tonconnect");
}

// Отправляем транзакцию
async function sendTon() {
    if (!connector.connected) {
        alert("Сначала подключите кошелёк!");
        return;
    }

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 300, // 5 минут
        messages: [
            {
                address: "EQAB...ваш_TON_адрес...", // Куда отправляем TON
                amount: "1000000000", // 1 TON (в нано-TON)
            }
        ]
    };

    try {
        const result = await connector.sendTransaction(transaction);
        Telegram.WebApp.sendData(JSON.stringify({ status: "paid", tx: result }));
    } catch (err) {
        alert("Ошибка: " + err.message);
    }
}