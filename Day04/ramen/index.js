const express = require("express");
const app = express();
const { v4 } = require("uuid");
const { ramen } = require("./data");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>🍜라면 월드에 오신 걸 환영합니다라면!!🍜</h1>");
});

app.get("/ramens", (req, res) => {
  const { spicyLevel } = req.query;
  if (spicyLevel) {
    res.json(ramen.filter((v) => v.spicyLevel == spicyLevel));
  }
  res.json(ramen);
});

app.get("/ramens/:id", (req, res) => {
  const { id } = req.params;
  const result = ramen.find((v) => v.id == id);
  res.json(result || "그런 라면은 없습니다ㅠㅠㅠ");
});

app.post("/ramens", (req, res) => {
  const { name, brand, soupType, spicyLevel } = req.body;
  if (!name || !brand || !soupType || !spicyLevel) {
    res.json("유효하지 않는 라면입니다!");
  } else if (spicyLevel < 1 || 3 < spicyLevel)
    res.json(`spicyLevel에 해당되지 않습니다!`);
  else ramen.push({ id: ramen.length, name, brand, soupType, spicyLevel });
  res.json(`${name}이(가) 등록되었습니다!`);
});

app.delete("/ramens/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = ramen.findIndex((v) => v.id == id);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 라면은 없습니다` });
    return;
  }
  ramen.splice(targetIndex, 1);
  res.json({ msg: `${id} 라면이 삭제 되었습니다!` });
});

app.put("/ramens/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = ramen.findIndex((v) => v.id == id);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 라면은 없습니다` });
    return;
  }
  const { name, brand, spicyLevel } = req.body;
  ramen[targetIndex].name = name || ramen[targetIndex].name;
  ramen[targetIndex].brand = brand || ramen[targetIndex].brand;
  ramen[targetIndex].spicyLevel = spicyLevel || ramen[targetIndex].spicyLevel;

  res.json({ msg: `${id} 라면이 수정되었습니다!!` });
});

app.listen(3000, () => {
  console.log("라면 월드 부팅중!!");
});
