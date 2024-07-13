import express from 'express';
import { enrollInCourse } from '../controllers/student/enrollInCourse.js';
import { getEnrolledCourses } from '../controllers/student/getEnrolledCourses.js';
import { getCourseDetails } from '../controllers/student/getCourseDetails.js';
import { leaveReview } from '../controllers/student/leaveReview.js';
import { viewGrades } from '../controllers/student/viewGrades.js';

// Middleware to protect routes and get user info
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Student routes
router.post('/enroll', protect, enrollInCourse);
router.get('/courses', protect, getEnrolledCourses);
router.get('/course/:courseId', protect, getCourseDetails);
router.post('/course/:courseId/submit', protect, submitAssignment);
router.post('/course/:courseId/review', protect, leaveReview);
router.get('/grades', protect, viewGrades);

export default router;
