import express from "express";
import {
  createCourse,
  getCourses,
  getCourseByID,
  updateCourse,
  deleteCourse,
  courseReview,
  getCoursesByInstructor,
} from "../controllers/courseController.js";
import {
  authMiddleware,
  checkRole,
} from "../utils/authMiddleware.js";
import { getStudentDashboard, /*viewGrades*/ } from "../controllers/student/studentDashboard.js";
import passport from '../utils/passport.js';

const router = express.Router();

// router.use(authMiddleware);

//Available to admin and instructor
const role = ["admin", "instructor"];

// course routes
router.post("/create-course", passport.authenticate('jwt', { session: false }), createCourse);
router.get("/", authMiddleware, getCourses);
router.get('/instructor/:instructorId', authMiddleware, getCoursesByInstructor);
router.get("/:courseId", authMiddleware, getCourseByID);
router.patch("/:courseId", authMiddleware, checkRole(role), updateCourse);
router.delete("/:courseId", authMiddleware, checkRole(role), deleteCourse);


// Student's course interaction routes
router.get('/dashboard', getStudentDashboard);
// router.post('/course/:courseId/submit', submitAssignment);
router.post('/course/:courseId/review', courseReview);
// router.get('/grades', viewGrades);

export default router;
