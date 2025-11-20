const express = require("express");
const app = express();
const { v4 } = require("uuid");
const cors = require("cors");
const { responseFormater } = require("./func");
const { Todo, subtask } = require("./data");
const joi = require("joi");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// --------------------------------Todo--------------------------------- //
app.get("/todos", (req, res) => {
  res.json(Todo);
});

app.get("/todos/:todoId", (req, res) => {
  const { todoId } = req.params;
  const result = Todo.find((v) => v.id == todoId);
  res.json(result || "404");
});

app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.json("유효하지 않습니다");
  } else {
    Todo.push({
      id: v4(),
      title,
      description,
      status: "pending",
      dueDate: new Date().toISOString().split("T")[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.json("등록되었습니다!");
  }
});

// const schema = joi.object({
//   id: joi.string().uuid(),
//   title: joi.string().required(),
//   description: joi.string().required(),
//   status: joi.string().valid("pending", "in-progress", "done").required(),
//   dueDate: joi.date().required(),
//   createdAt: joi.string().required(),
//   updatedAt: joi.string().required(),
// });

app.put("/todos/:todoId", (req, res) => {
  const { todoId } = req.params;
  const targetIndex = Todo.findIndex((v) => v.id == todoId);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${todoId} 유효하지 않습니다` });
  }

  const { title, description } = req.body;
  Todo[targetIndex].title = title || Todo[targetIndex].title;
  Todo[targetIndex].description = description || Todo[targetIndex].description;
  Todo[targetIndex].updatedAt = new Date();

  res.json({ msg: `${todoId} 수정되었습니다!` });
});

app.delete("/todos/:todoId", (req, res) => {
  const { todoId } = req.params;
  const targetIndex = Todo.findIndex((v) => v.id == todoId);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${todoId} 유효하지 않습니다` });
    return;
  }
  Todo.splice(targetIndex, 1);
  res.json({ msg: `${todoId} 삭제 되었습니다!` });
});

// ---------------------------------------------------------------------------- //

// -------------------------------------subtask-------------------------------- //

app.get("/todos/:todoId/subtasks", (req, res) => {
  const { todoId } = req.params;
  const result = Todo.find((v) => v.id == todoId);
  res.json(result || "404");

  res.json(subtask);
});

app.get("/todos/:todoId/subtasks", (req, res) => {
  const { todoId } = req.params;
  const result = Todo.find((v) => v.id == todoId);
  res.json(result || "404");
});

app.post("/todos/:todoId/subtasks", (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;
  if (!todoId || !title) {
    res.status(404).json({ msg: `${todoId} 존재하지 않는 ID입니다` });
    return;
  }
  const targetIndex = Todo.findIndex((v) => v.id == todoId);
  if (targetIndex == -1) {
    res.status(404).json({ msg: "해당 아이디는 존재하지 않습니다!" });
    return;
  }
  subtask.push({
    id: v4(),
    todoId: todoId,
    title,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.json("생성되었습니다!");
});

app.put("/todos/:todoId/subtasks", (req, res) => {
  const { id } = req.params;
  const targetIndex = Todo.findIndex((v) => v.id == id);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 유효하지 않습니다` });
  }

  const { title } = req.body;
  Todo[targetIndex].title = title || Todo[targetIndex].title;
  Todo[targetIndex].updatedAt = new Date();

  res.json({ msg: `${id} 수정되었습니다!` });
});

app.delete("/todos/:todoId/subtasks", (req, res) => {
  const { id } = req.params;
  const targetIndex = subtask.findIndex((v) => v.id == id);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 유효하지 않습니다` });
    return;
  }
  Todo.splice(targetIndex, 1);
  res.json({ msg: `${id} 삭제 되었습니다!` });
});

app.listen(3001, () => {
  console.log("부팅중!!");
});
