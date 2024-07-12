import { Router } from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import authMiddleware, { isAdmin } from '../utils/authMiddleware.js';

const router = Router();

router.post('/register_admin', registerAdmin);
router.post('/admin_login', authMiddleware, isAdmin, loginAdmin);

export default router;
