const express = require("express");
const app = express();

// 미들웨어
const test = (req, res, next) => {
  console.log("뒷반 시작함");
  next();
};

// 시간 찍는 미들웨어 만들기

const time = (req, res, next) => {
  console.log(new Date().toLocaleTimeString());
  next();
};

app.use(test);
app.use(time);

app.get("/", (req, res) => {
  res.json({ msg: "시작이욤" });
});

app.get("/dogs", (req, res) => {
  res.json({ msg: "멍멍이욤" });
});

app.listen(3000, () => {
  console.log("뒷반 시작 on");
});
