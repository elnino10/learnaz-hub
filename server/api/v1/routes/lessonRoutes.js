import express from "express";
import {
  createLesson,
  getAllLessonsByCourse,
  getLessonById,
  updateLessonById,
  deleteLessonById,
} from "../controllers/lessonController.js";

const router = express.Router();

router.post("/lessons", createLesson);
router.get("/courses/:courseId/lessons", getAllLessonsByCourse); // Get lessons for a specific course
router.get("/lessons/:id", getLessonById);
router.put("/lessons/:id", updateLessonById);
router.delete("/lessons/:id", deleteLessonById);

export default router;
