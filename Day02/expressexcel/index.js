const express = require("express");
const xlsx = require("xlsx");
const app = express();

app.get("/student", (req, res) => {
  const workbook = xlsx.readFile("student.xlsx");
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const Row = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  const data = Row.map((row) => ({
    name: row[0],
    major1: row[1],
    major2: row[2],
  }));

  res.json(data);
});

app.listen(3000, () => console.log("실행중!!!"));
