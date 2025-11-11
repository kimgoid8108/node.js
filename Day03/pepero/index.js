const express = require("express");
const ExcelJS = require("exceljs");
const getPepero = require();
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>빼빼로 월드에 오신 것을 환영합니다!!</h1>");
});

app.get("/list", async (req, res) => {
  const data = await getPepero();
  res.json(data);
});

app.listen(3000, () => {
  console.log("Pepero Server is Booting");
});
