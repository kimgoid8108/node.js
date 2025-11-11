const ccxt = require("ccxt");

let current = 0;
const getCoin = async () => {
  const exchange = new ccxt.binance();
  const coin = await exchange.fetchTicker("BTC/USDT");
  console.log(`현재 비트코인 가격 ${coin.last}`);
  if (coin.last > current) {
    console.log("한강뷰 가즈아~~");
  } else {
    console.log("떡락이다 팔아야 하나.... 덜덜");
  }
  current = coin.last;
};

setInterval(() => {
  getCoin();
}, 3000);
