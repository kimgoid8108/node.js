// import PromptSync from "prompt-sync";
// const prompt = PromptSync();

const prompt = require("prompt-sync")();

while (ture) {
  try {
    const year = prompt("년도 입력");
    const month = prompt("월 입력");
    const day = prompt("일 입력");
    if (isNaN(year) || isNaN(month) || isNaN(day))
      throw new Error("날짜 입력 오류");
    const today = new Date();
    const dday = new Date(`${year}-${month}-${day}`);
    const diff = dday.getTime() - today.getTime();
    const diffday = diff / (1000 * 60 * 60 * 24);
    console.log(`D-day: ${diffday}`);
  } catch (e) {
    console.log(e.message);
  }

  const conti = prompt("다시 하시겠습니까? [Y / N]: ");
  if (conti.toLowerCase() == "n") break;
}
