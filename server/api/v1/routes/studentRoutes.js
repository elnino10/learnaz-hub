import express from 'express';
import { enrollInCourse, getEnrolledCourses } from '../controllers/student/enrollInCourse.js';
import { getCourseDetails, submitAssignment } from '../controllers/student/courseController.js';
import { leaveReview } from '../controllers/student/leaveReview.js';
import { viewGrades } from '../controllers/student/viewGrades.js';
import { getStudentDashboard } from '../controllers/student/studentDashboard.js';

const router = express.Router();

// Student routes
router.get('/dashboard', getStudentDashboard);
router.post('/enroll', enrollInCourse);
router.get('/courses', getEnrolledCourses);
router.get('/course/:courseId', getCourseDetails);
router.post('/course/:courseId/submit', submitAssignment);
router.post('/course/:courseId/review', leaveReview);
router.get('/grades', viewGrades);

export default router;
