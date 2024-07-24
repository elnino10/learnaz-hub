import express from "express";
import {
  createCourse,
  getCourses,
  getCourseByID,
  updateCourse,
  deleteCourse,
  courseReview,
  getCreatedCourses,
  getEnrolledCourses,
  enrollInCourse,
} from "../controllers/courseController.js";
import { authMiddleware, checkRole } from "../utils/authMiddleware.js";
import {
  getStudentDashboard /*viewGrades*/,
} from "../controllers/student/studentDashboard.js";
import passport from "../utils/passport.js";

const router = express.Router();

// router.use(authMiddleware);

//Available to admin and instructor
const role = ["admin", "instructor"];

// course routes
router.post(
  "/create-course",
  passport.authenticate("jwt", { session: false }),
  createCourse
);
router.get("/", getCourses);
router.get("/:courseId", getCourseByID);
router.patch("/:courseId", authMiddleware, checkRole(role), updateCourse);
router.delete("/:courseId", authMiddleware, checkRole(role), deleteCourse);

router.get("/category/:category", getCourses); // Get courses by category

router.post("/enroll/:courseId", authMiddleware, enrollInCourse);  // Enroll in a course
router.get("/instructor/:instructorId/created", authMiddleware, getCreatedCourses);  // Get courses created by a particular instructor
router.get("/student/:studentId/enrolled", authMiddleware, getEnrolledCourses);  // Get courses enrolled by a student

// Student's course interaction routes
router.get("/dashboard", getStudentDashboard);
// router.post('/course/:courseId/submit', submitAssignment);
router.post("/course/:courseId/review", courseReview);
// router.get('/grades', viewGrades);

export default router;
