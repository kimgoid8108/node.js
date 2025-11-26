import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import boom from "express-boom";
import cors from "cors";

import { responseMiddleware } from "./src/middleware/response.middleware.js";

import authRoutes from "./src/routes/auth.routes.js";
import postRoutes from "./src/routes/posts.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(cookieParser());
app.use(express.json());
app.use(responseMiddleware);
app.use(boom());
app.use(cors());

// 라우터
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
// app.use("/comments");

app.get("/test", (req, res) => {
  res.boom.badRequest("율이 머리 검은색");
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`API 엔드포인트: http://localhost:${PORT}`);
});
