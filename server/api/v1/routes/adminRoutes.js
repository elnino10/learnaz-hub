import { Router } from 'express';
import { registerAdmin, loginAdmin } from '../controllers/admin/adminController.js';
import { grantPrivileges, revokePrivileges } from '../controllers/admin/privileges.js';
import { manageUsers, addUser } from '../controllers/admin/manageUsers.js';
import { manageCourses } from '../controllers/admin/manageCourses.js';
import { getSettings } from '../controllers/admin/settings.js';

import authMiddleware, { isAdmin } from '../utils/authMiddleware.js';
import {
    getTotalUsers,
    getTotalCourses,
    getActiveUsers,
    getNewSignups,
} from '../controllers/admin/analytics.js';

const router = Router();

router.post('/register-admin', /*authMiddleware, isAdmin,*/ registerAdmin);
router.post('/admin-login', /*authMiddleware, isAdmin,*/ loginAdmin);
router.post("/grant-privileges", grantPrivileges);
router.post("/revoke-privileges", revokePrivileges);
router.get('/manage-users', manageUsers);
router.post('/add-user', addUser);
router.get('/manage-courses', manageCourses);
router.get('/settings', getSettings);
router.get('/analytics/totalUsers', getTotalUsers);
router.get('/analytics/totalCourses', getTotalCourses);
router.get('/analytics/activeUsers', getActiveUsers);
router.get('/analytics/newSignups', getNewSignups);


export default router;
