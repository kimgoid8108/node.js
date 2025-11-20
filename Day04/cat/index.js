const express = require("express");
const app = express();
const { catList } = require("./data");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>고양이 월드에 오신 것을 환영합니다!</h1>");
});

app.get("/cats", (req, res) => {
  const { name, age, color } = req.query;
  if (name) {
    res.json(catList.filter((v) => v.name == name));
  }
  if (age) {
    res.json(catList.filter((v) => v.age == age));
  }
  if (color) {
    res.json(catList.filter((v) => v.color == color));
  }
  res.json(catList);
});

app.get("/cats/:id", (req, res) => {
  const { id } = req.params;
  const result = catList
    .map((v, i) => ({ id: i, ...v }))
    .find((v) => v.id == id);
  res.json(result || "<h1>404 그런 고양이는 없습니다ㅠㅠ</h1>");
});

app.post("/add", (req, res) => {
  const { name, age, color } = req.body;
  if (!name || !age || !color) res.json("보낸 데이터가 유효하지 않습니다");
  else if (catList.some((v) => v.name == name))
    res.json(`${name} 이름은 중복입니다!`);
  else catList.push({ name, age, color });
  res.json(`${name} 고양이가 등록 되었습니다!`);
});

app.delete("/cats/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = catList.findIndex((v) => v.id == +id);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 고양이 없습니다!` });
    return;
  }
  catList.splice(targetIndex, 1);
  res.json(id);
});

app.put("/cats/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = catList.findIndex((v) => v.id == +id);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 고양이 없습니다!` });
    return;
  }
  const { name, age, color } = req.body;
  catList[targetIndex].name = name || catList[targetIndex].name;
  catList[targetIndex].age = age || catList[targetIndex].age;
  catList[targetIndex].color = color || catList[targetIndex].color;

  res.json({ msg: `${id} 고양이가 수정되었습니다!!` });
});

app.listen(3000, () => {
  console.log("고양이 월드 부팅중!!");
});
