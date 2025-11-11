const ccxt = require("ccxt");
const prompt = require("prompt-sync")();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getCoin = async () => {
  const money = +prompt("얼마 정도 구매하실 건가요?");
  if (isNaN(money) || money <= 0) {
    throw new Error("금액 입력 오류");
  }
  const Enter = prompt("구매하시려면 Enter를 눌러주세요");
  if (Enter.toLowerCase() == "") {
    console.log(`지금이니~~ 인생역전 가보자고!!`);
    console.log(`구매하신 비트코인 투자금: ${money}원`);
  } else {
    console.log(`구매 취소`);
  }

  const exchange = new ccxt.binance();

  const first = await exchange.fetchTicker("BTC/USDT");
  const buyPrice = first.last;
  const amount = money / buyPrice;

  console.log(`매수가: ${buyPrice}`);
  console.log(`보유가: ${amount}`);
  const endTime = Date.now() + 60 * 5000;

  while (Date.now() < endTime) {
    const coin = await exchange.fetchTicker("BTC/USDT");
    const currentPrice = coin.last;

    const profit = (currentPrice - buyPrice) * amount;
    const profitRate = ((currentPrice - buyPrice) / buyPrice) * 100;

    console.log(
      `현재 가격: ${currentPrice} USDT | 수익: ${profit.toFixed(
        4
      )} USDT ${profitRate.toFixed(2)}%)`
    );

    await sleep(3000);
  }
  const lastPrice = (await exchange.fetchTicker("BTC/USDT")).last;
  const finalProfit = (lastPrice - buyPrice) * amount;
  const finalProfitRate = ((lastPrice - buyPrice) / buyPrice) * 100;

  console.log("\n===== 📊 5분 뒤 거래 결과 =====");
  console.log(` 매수가       : ${buyPrice} USDT`);
  console.log(` 5분 후 가격  : ${lastPrice} USDT`);
  console.log(` 보유 BTC     : ${amount}`);
  console.log(` 최종 수익    : ${finalProfit.toFixed(4)} USDT`);
  console.log(` 최종 수익률  : ${finalProfitRate.toFixed(2)} %`);
  console.log("==============================\n");

  console.log("✅ 거래 종료!");
};

getCoin();
