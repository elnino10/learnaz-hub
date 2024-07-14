import { Router } from 'express';
import { grantPrivileges, revokePrivileges } from '../controllers/admin/adminController.js';
import { manageUsers } from '../controllers/userController.js';
import { manageCourses } from '../controllers/courseController.js';
import {
    getTotalUsers,
    getTotalCourses,
    getActiveUsers,
    getNewSignups,
} from '../controllers/admin/analytics.js';

const router = Router();

router.post("/grant-privileges", grantPrivileges);
router.post("/revoke-privileges", revokePrivileges);
router.get('/manage-users', manageUsers);
router.get('/manage-courses', manageCourses);
router.get('/analytics/total-users', getTotalUsers);
router.get('/analytics/total-courses', getTotalCourses);
router.get('/analytics/active-users', getActiveUsers);
router.get('/analytics/new-signups', getNewSignups);


export default router;
