import { Router } from 'express';
import {
    getTotalUsers,
    getTotalCourses,
    getActiveUsers,
    getNewSignups,
} from "../controllers/admin/analytics.js";

const router = Router();

router.get('/total-users', getTotalUsers);
router.get('/total-courses', getTotalCourses);
router.get('/active-users', getActiveUsers);
router.get('/new-signups', getNewSignups);

export default router;