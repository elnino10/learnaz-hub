import {Router } from "express";
import { enrollInCourse, getEnrolledCourses } from "../controllers/enrollmentController.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = Router();


router.post("/", authMiddleware, enrollInCourse);
router.get("/courses/:studentId", authMiddleware, getEnrolledCourses);

export default router;
