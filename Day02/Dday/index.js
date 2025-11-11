// 수료식 디데이 프로그램 만들기
// .exe 프로그램으로 구현하기

const prompt = require("prompt-sync")();

while (true) {
  try {
    const today = new Date();
    const dday = new Date(`2026-01-27`);
    const diff = dday.getTime() - today.getTime();
    const diffday = diff / (1000 * 60 * 60 * 24);
    console.log(`D-day: ${diffday}`);
  } catch (e) {
    console.log(e.message);
  }

  const conti = prompt("다시 하겠습니까? [Y/N]");
  if (conti.toLowercase() == "n") break;
}
