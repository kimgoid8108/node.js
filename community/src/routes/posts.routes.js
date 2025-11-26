import express from "express";
import { createpost } from "../controller/posts.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createpost);
// router.get("/posts");
// router.get("/posts/:postId");
// router.patch("/posts/:postId");
// router.delete("/posts/:postId");

export default router;
