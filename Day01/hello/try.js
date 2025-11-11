const prompt = require("prompt-sync")();

// try {
//   const a = prompt("첫번째 숫자 입력");
//   const b = prompt("두번째 숫자 입력");
//   console.log(`a/b: ${a / b}`);
// } catch (e) {
//   console.log(e);
//   console.log(`에러 터짐!`);
// }

try {
  const test = +prompt("숫자입력");
  if (isNaN(test)) throw Error("부대찌개");
} catch (e) {
  console.log(e.name);
  console.log(e.message);
}
