import express from 'express';
import {
    registerInstructor,
    loginInstructor
} from '../controllers/instructor/instructorController.js';

const router = express.Router();

console.log("Setting up instructor routes...");

router.post('/register', (req, res, next) => {
    console.log("Register route hit");
    next();
}, registerInstructor);

router.post('/login', (req, res, next) => {
    console.log("Login route hit");
    next();
}, loginInstructor);

console.log("Instructor routes set up successfully");

export default router;