const express = require("express");
const app = express();
const { students } = require("./data");

app.get("/", (req, res) => {
  res.send("<h1>도시락 파티에 오신 걸 환영합니다!</h1>");
});

// 옵션 주기(= 쿼리 스트링)
// /list?name=kim&overage=20
// /list?name=

app.get("/list", (req, res) => {
  const { name, menu } = req.query;
  if (name) {
    const result = students.filter((v) => v.name == name);
    return res.json(result || `${name} 학생은 없습니다.`);
  }
  if (menu) {
    const result = students.filter((v) => v.menu.includes(menu));
    return res.json(result || `${menu}를 가진 학생은 없습니다.`);
  }

  res.json(students);
});

app.get("/list/:num", (req, res) => {
  const { num } = req.params;

  if (+num < 0 || 3 < +num) {
    res.send("그런 도시락은 없지롱");
  } else {
    res.json(students[+num]);
  }
});

app.listen(3000, () => {
  console.log("Lunch Box is Booting!!");
});
