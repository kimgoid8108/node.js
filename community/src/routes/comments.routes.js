import express from "express";

const router = express.Router();

router.post("/posts/:postId/comments");
router.get("/posts/:postId/comments");
router.patch("/comments/commentId");
router.delete("/comments/commentId");

export default router;
