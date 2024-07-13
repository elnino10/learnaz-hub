import express from 'express';
import {
    createCourse,
    getCourses,
    getCourseByID,
    updateCourse,
    deleteCourse,
} from '../controllers/instructor/courseController.js';
import { authMiddleware, checkRole, mockAuth } from '../utils/authMiddleware.js';

const router = express.Router();

// Use mockAuth middleware for testing or authMiddleware for production
// Uncomment the following line for production
// router.use(authMiddleware);
router.use(mockAuth);

//Available to admin and instructor
const roles = ['admin', 'instructor'];

router.post('/courses', checkRole(roles), createCourse);
router.get('/courses', checkRole(roles), getCourses);
router.get('/courses/:id', checkRole(roles), getCourseByID);
router.put('/courses/:id', checkRole(roles), updateCourse);
router.delete('/courses/:id', checkRole(roles), deleteCourse);

export default router;
