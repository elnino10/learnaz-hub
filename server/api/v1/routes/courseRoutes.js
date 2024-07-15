import express from "express";
import {
  createCourse,
  getCourses,
  getCourseByID,
  updateCourse,
  deleteCourse,
  courseReview,
} from "../controllers/courseController.js";
import {
  authMiddleware,
  checkRole,
} from "../utils/authMiddleware.js";
import { getStudentDashboard, viewGrades } from "../controllers/student/studentDashboard.js";

const router = express.Router();

// Use mockAuth middleware for testing or authMiddleware for production
// Uncomment the following line for production
// router.use(authMiddleware);

//Available to admin and instructor
const roles = ["admin", "instructor"];


// course routes
router.post("/courses", checkRole(roles), createCourse);
router.get("/courses", checkRole(roles), getCourses);
router.get("/courses/:courseId", checkRole(roles), getCourseByID);
router.put("/courses/:courseId", checkRole(roles), updateCourse);
router.delete("/courses/:courseId", checkRole(roles), deleteCourse);


// Student's course interaction routes
router.get('/dashboard', getStudentDashboard);
// router.post('/course/:courseId/submit', submitAssignment);
router.post('/course/:courseId/review', courseReview);
router.get('/grades', viewGrades);

export default router;
