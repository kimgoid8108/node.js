const fs = require("fs");
const prompt = require("prompt-sync")();
const contents = prompt("오늘의 일기를 쓰세요!");
fs.writeFileSync(
  `diary_${new Date().toLocaleDateString().replaceAll(" ", "")}txt`,
  contents,
  "utf-8"
);
