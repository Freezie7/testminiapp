// Проверяем, что TonConnect загружен
if (typeof TonConnect === 'undefined') {
    document.getElementById('status').textContent = 'Ошибка: TonConnect SDK не загружен!';
    throw new Error('TonConnect не загружен');
  }
  
  const connector = new TonConnect.TonConnect({
    manifestUrl: "https://freezie7.github.io/testminiapp/webapp/tonconnect-manifest.json"
  });
  
  // Активируем кнопку после загрузки SDK
  document.getElementById('connectButton').disabled = false;
  document.getElementById('connectButton').addEventListener('click', connectWallet);
  
  async function connectWallet() {
    if (!window.Telegram?.WebApp?.initData) {
      alert('Откройте приложение в Telegram!');
      return;
    }
  
    try {
      const wallets = await connector.getWallets();
      if (wallets.length === 0) {
        alert('Не найдено поддерживаемых кошельков (установите TonKeeper или MyTonWallet)');
        return;
      }
  
      await connector.connect({ jsBridgeKey: wallets[0].jsBridgeKey });
      
      connector.onStatusChange((wallet) => {
        document.getElementById('status').textContent = 
          wallet ? `Подключён: ${wallet.device.appName}` : "Отключён";
      });
  
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Ошибка подключения: " + err.message);
    }
  }