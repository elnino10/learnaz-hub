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

router.post('/admin-register', authMiddleware, isAdmin, registerAdmin);
router.post('/admin-login', authMiddleware, isAdmin, loginAdmin);
router.post("/grant-privileges", authMiddleware, isAdmin, grantPrivileges);
router.post("/revoke-privileges", authMiddleware, isAdmin, revokePrivileges);
router.get('/manage-users', authMiddleware, isAdmin, manageUsers);
router.post('/add-user', authMiddleware, isAdmin, addUser);
router.get('/manage-courses', authMiddleware, isAdmin, manageCourses);
router.get('/settings', authMiddleware, isAdmin, getSettings);
router.get('/analytics/totalUsers', authMiddleware, isAdmin, getTotalUsers);
router.get('/analytics/totalCourses', authMiddleware, isAdmin, getTotalCourses);
router.get('/analytics/activeUsers', authMiddleware, isAdmin, getActiveUsers);
router.get('/analytics/newSignups', authMiddleware, isAdmin, getNewSignups);

export default router;
