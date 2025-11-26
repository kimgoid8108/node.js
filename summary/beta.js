const { data } = require("./data");

const express = require("express");
const app = express();

const students = [
  { name: "이영철", age: 25, gender: "male" },
  { name: "신여진", age: 26, gender: "female" },
  { name: "손정우", age: 25, gender: "male" },
  { name: "박신율", age: 31, gender: "male" },
];

const courses = [
  { name: "리눅스", timetable: ["sat", "sun"], teacher: "손흥민" },
  { name: "파이썬", timetable: ["mon", "wed", " fri"], teacher: "김민재" },
  { name: "자바", timetable: ["tue", "thu", "fri"], teacher: "황희찬" },
];

app.get("/courses", (req, res) => {
  const { name, timetable, teacher } = req.query;

  if (name && !["리눅스", "파이썬", "자바"].includes(name)) {
    return res.json({ msg: "그런 과목 없는데요....." });
  }

  if (
    timetable &&
    !["mon", "tue", "wed", "thu", "fri", "sat", "sun"].includes(timetable)
  ) {
    return res.json({ msg: "그날에 수업 없는데......" });
  }

  if (teacher && !["손흥민", "김민재", "황희찬"].includes(teacher)) {
    return res.json({ msg: "그런 선생님 없는데요....." });
  }

  res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  const { id } = req.params;
  res.json(courses[id] || "그런 과목, 날짜, 선생님 없슴다");
});

// Query
// /students?gender=female
// 1. 퀴리 존재 여부
// 2. 유효성 검사
// 3. 쿼리 조건에 맞도록 돌려줌

app.get("/students", (req, res) => {
  const { age, gender } = req.query;

  if (age && isNaN(+age)) {
    return res.json({ msg: "age값이 올바르지 않습니다!" });
  }

  if (gender && ["male", "female"].includes(gender)) {
    return res.json({ msg: "gender값이 올바르지 않습니다!" });
  }

  let result = [...students];

  if (age) {
    result = result.filter((v) => v.age == +age);
  }
  if (gender) {
    result = result.filter((v) => v.gender == gender);
  }
  res.json(students);
});

//Params[매개변수]
app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  res.json(students[id] || "그런 학생 없음다");
});

app.get("/humans", (req, res) => {
  const { language, company, department } = req.query;
  if (language) {
    const inspect = data.some((v) => v.language == language);
    if (!inspect) {
      return res.json({ msg: "그런 언어 없는뎁쇼" });
    }
  }

  if (company) {
    const inspect = data.some((v) => v.company == company);
    if (!inspect) {
      return res.json({ msg: "그런 회사 없는뎁쇼" });
    }
  }

  if (department) {
    const inspect = data.some((v) => v.department == department);
    if (!inspect) {
      return res.json({ msg: "그런 부서 없는뎁쇼" });
    }
  }

  let result = [...data]
    .filter((v) => !language || v.language == language)
    .filter((v) => !company || v.company == company)
    .filter((v) => !department || v.department == department);

  res.json(result);
});

app.get("/languages", (req, res) => {
  const languages = [...new Set(newData.map((v) => v.language))].sort();
  res.json(languages);
});

app.listen(3000, () => {
  console.log("서버 시즌 2 ON!!");
});
