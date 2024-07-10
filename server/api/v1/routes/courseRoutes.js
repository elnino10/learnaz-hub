import express from 'express';
import {
    createCourse,
    getCourses,
    getCourseByID,
    updateCourse,
    deleteCourse
} from '../controllers/courseController.js'

export const router = express.Router();

router.post('/', createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseByID);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
