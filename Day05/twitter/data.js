const { v4 } = require("uuid");

const feed = [
  { id: v4(), author: "이영철", content: "배고픔", createdAt: new Date() },
  { id: v4(), author: "이명철", content: "배고픔", createdAt: new Date() },
  { id: v4(), author: "이멍철", content: "배고픔", createdAt: new Date() },
  { id: v4(), author: "이제로스틸", content: "배고픔", createdAt: new Date() },
];

const comment = [];

module.exports = { feed, comment };
