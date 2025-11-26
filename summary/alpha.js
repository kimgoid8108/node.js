const express = require("express");
const app = express();

app.get("/caffeins", (req, res) => {
  res.json(["아메리카노", "라떼", "카페모카"]);
});

app.get("/breads", (req, res) => {
  res.json(["단팥빵", "크림빵", "모카빵"]);
});

app.listen(3000, () => {
  console.log("서버 실행중");
});
