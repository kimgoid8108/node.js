const prompt = require("prompt-sync")();

while (true) {
  try {
    const first = +prompt("첫번째 숫자 입력:");
    const second = +prompt("두번째 숫자 입력:");
    if (isNaN(first) || isNaN(second)) throw new Error("숫자 입력 오류");
    const plus = first + second;
    const minus = first - second;
    const divide = first / second;
    if (second == 0) throw new Error("0으로는 나눌 수 없습니다.");
    const multiply = first * second;

    console.log(`${first}+${second}= ${plus}`);
    console.log(`${first}-${second}= ${minus}`);
    console.log(`${first}/${second}= ${divide}`);
    console.log(`${first}*${second}= ${multiply}`);
  } catch (e) {
    console.log(e.message);
  }
  console.log();
  console.log(`--------------------------------`);
  console.log();
  const conti = prompt("다시 입력 하시겠습니까? [Y / N]: ");
  if (conti.toLowerCase() == "n") break;
}
