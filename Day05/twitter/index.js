const express = require("express");
const app = express();
const { v4 } = require("uuid");
const { feed, comment } = require("./data");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// -------------------------------FEED-------------------------------------------//
app.get("/", (req, res) => {
  res.send("<h1>🕊트위터에 오신 것을 환영합니다!🕊</h1>");
});

app.get("/feeds", (req, res) => {
  res.json(feed);
});

app.get("/feeds/:feedId", (req, res) => {
  const { feedId } = req.params;
  const result = feed.find((v) => v.id == feedId);
  res.json(result || "404");
});

app.post("/feeds", (req, res) => {
  const { author, content } = req.body;
  if (!author || !content) {
    res.json("유효하지 않습니다!");
  } else {
    feed.push({ id: v4(), author, content, createdAt: new Date() });
    res.json(`${author}님이 등록 되었습니다!`);
  }
});

app.put("/feeds/:feedId", (req, res) => {
  const { feedId } = req.params;
  const targetIndex = feed.findIndex((v) => v.id == feedId);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${feedId}라는 계정은 없습니다!` });
    return;
  }
  const { author, content } = req.body;
  feed[targetIndex].author = author || feed[targetIndex].author;
  feed[targetIndex].content = content || feed[targetIndex].content;

  res.json({ msg: `${feedId} 계정이 수정되었습니다!!` });
});

app.delete("/feeds/:feedId", (req, res) => {
  const { feedId } = req.params;
  const targetIndex = feed.findIndex((v) => v.id == feedId);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${feedId}라는 계정은 없습니다!` });
    return;
  }
  feed.splice(targetIndex, 1);
  res.json({ msg: `${feedId} 삭제 되었습니다!` });
});
// -------------------------------FEED-------------------------------------------//

// -------------------------------COMMENT----------------------------------------//
app.post("/feeds/:feedId/comments", (req, res) => {
  const { feedId } = req.params;
  const { author, content } = req.body;
  if (!feedId || !author || !content) {
    res.status(404).json({ msg: "데이터가 유효하지 않습니다!!" });
    return;
  }
  const targetIndex = feed.findIndex((V) => V.id == feedId);
  if (targetIndex == -1) {
    res.status(404).json({ msg: "해당 아이디는 존재하지 않습니다!" });
    return;
  }
  comment.push({ id: v4(), feedId, author, content, createdAt: new Date() });
  res.json({ msg: "댓글이 등록 되었습니다!!" });
});

app.get("/feeds/:feedId/comments", (req, res) => {
  const { feedId } = req.params;
  const result = comment.filter((v) => v.feedId == feedId);
  res.json(result);
});

app.put("/feeds/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const targetIndex = comment.findIndex((v) => v.id == commentId);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${commentId}라는 계정은 없습니다!` });
    return;
  }
  const { content } = req.body;
  comment[targetIndex].content = content || comment[targetIndex].content;

  res.json({ msg: `${commentId} 댓글이 수정되었습니다!!` });
});

app.delete("/feeds/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const targetIndex = comment.findIndex((v) => v.id == commentId);

  if (targetIndex == -1) {
    res.status(404).json({ msg: `${commentId}라는 계정은 없습니다!` });
    return;
  }
  comment.splice(targetIndex, 1);
  res.json({ msg: `${commentId} 삭제 되었습니다!` });
});

app.listen(3000, () => {
  console.log("트위터 부팅중!!");
});
