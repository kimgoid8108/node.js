const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.post("/students", async (req, res) => {
  const { name, id, password, email } = req.body;
  const newPW = await bcrypt.hash(password, 10);

  await prisma.students.create({
    data: {
      name: name,
      id: id,
      password: newPW,
      email: email,
    },
  });
  res.json({ msg: `당신의 id: ${id}가 생성됨!!` });
});

app.post("/login", async (req, res) => {
  const { id, password } = req.body;
  const user = await prisma.students.findUnique({ where: { id } });
  const oldPW = user.password;
  const result = await bcrypt.compare(password, oldPW);

  if (!result) {
    res.json({ msg: "아이디 또는 비밀번호가 일치하지 않습니다!" });
    return;
  }

  const uuid = crypto.randomUUID();
  const start = new Date();
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 30);

  await prisma.session.create({
    data: {
      id: uuid,
      start: start.toTimeString().split(" ")[0],
      end: end.toTimeString().split(" ")[0],
    },
  });

  res.cookie("sessionID", uuid, {
    httpOnly: true, // 브라우저에서 접근 못하게 함
    maxAge: 1000 * 60 * 1, // 쿠키 유통기한
    secure: false, // http 허용
  });
  res.json({ msg: "로그인 완료" });
});

app.listen(3000, () => {
  console.log("서버 실행됨!!");
});
