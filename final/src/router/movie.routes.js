import express from "express";
import {
  createMovie,
  deleteMovie,
  getMoives,
  getMoivesById,
  updateMovie,
} from "../controller/movie.controller.js";

const router = express.Router();

router.get("/", getMoives);
router.get("/:id", getMoivesById);
router.post("/register", createMovie);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);
export default router;
