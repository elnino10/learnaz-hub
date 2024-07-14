import {Router } from "express";
import { enrollInCourse, getEnrolledCourses } from "../controllers/enrollmentController";

const router = Router();


router.post("/enroll-user", enrollInCourse);
router.get("/courses/:userId", getEnrolledCourses);
