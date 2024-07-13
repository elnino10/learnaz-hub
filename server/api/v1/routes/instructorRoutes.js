import express from 'express';
import {
    registerInstructor,
    loginInstructor
} from '../controllers/instructor/instructorController.js';

const router = express.Router();

router.post('/register', registerInstructor);
router.post('/login', loginInstructor);

export default router;
