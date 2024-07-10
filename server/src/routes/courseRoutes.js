<<<<<<< HEAD
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
=======
const express = require("express");
const router = express.Router();
const { getCourses, createCourse } = require("../controllers/courseController");

// route to get all courses
router.get("/", getCourses);

// route to create a course
router.post("/", createCourse);

module.exports = router;
>>>>>>> 726fb60fca7e807a0fc1e23875a2299dbc62b25d
