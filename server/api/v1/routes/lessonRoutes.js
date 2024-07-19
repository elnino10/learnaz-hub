import express from "express";
import {
  createLesson,
  getAllLessonsByCourse,
  getLessonById,
  updateLessonById,
  deleteLessonById,
} from "../controllers/lessonController.js";
import { authMiddleware } from "../utils/authMiddleware.js";


const router = express.Router();

router.post('/', authMiddleware, createLesson);
router.get("/courses/:courseId/lessons", authMiddleware, getAllLessonsByCourse); // Get lessons for a specific course
router.get("/lesson/:lessonId", authMiddleware, getLessonById);
router.put("/lesson/:lessonId", authMiddleware, updateLessonById);
router.delete("/lesson/:lessonId", authMiddleware, deleteLessonById);

export default router;
