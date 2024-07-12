import { Router } from 'express';
import { registerAdmin, loginAdmin } from '../controllers/admin/adminController.js';
import { grantPrivileges, revokePrivileges } from '../controllers/admin/privileges.js';
import authMiddleware, { isAdmin } from '../utils/authMiddleware.js';

const router = Router();

router.post('/register_admin', registerAdmin);
router.post('/admin_login', authMiddleware, isAdmin, loginAdmin);
router.post("/grant-privileges", grantPrivileges);
router.post("/revoke-privileges", revokePrivileges);
export default router;
