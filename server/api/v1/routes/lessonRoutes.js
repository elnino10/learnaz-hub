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
router.get("/lessons/:lessonId", getLessonById);
router.put("/lessons/:lessonId", updateLessonById);
router.delete("/lessons/:lessonId", deleteLessonById);

export default router;
