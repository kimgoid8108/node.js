const { v4 } = require("uuid");

const Todo = [
  {
    id: v4(),
    title: "string",
    description: "string",
    status: "done",
    dueDate: new Date().toISOString().split("T")[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const subtask = [];

module.exports = { Todo, subtask };
