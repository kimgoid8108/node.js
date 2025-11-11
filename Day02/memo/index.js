const fs = require("fs"); // file-system

const prompt = require("prompt-sync")();
const name = prompt("당신의 이름을 입력해주세요");
const age = prompt("당신의 나이를 입력해주세요");

fs.writeFileSync("hello.txt", `이름: ${name} 나이: ${age}`, "utf-8");
