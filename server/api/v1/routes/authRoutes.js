import { Router } from "express";
import { loginInstructor, loginUser, registerInstructor, registerUser } from "../controllers/authController.js";
import authMiddleware, { isAdmin } from "../utils/authMiddleware.js";
import { loginAdmin, registerAdmin } from "../controllers/admin/adminController.js";


const router = Router();

// Example of a protected route
// router.get('/protected', authMiddleware, (req, res) => {
//     res.status(200).json({ message: 'You have accessed a protected route' });
// });

// Routes for user authentication
router.post("/signup-user", registerUser);
router.post("/login-user", loginUser);


// routes for Instructor authentication
router.post("/signup-instructor", registerInstructor);
router.post("/login-instructor", loginInstructor);


// routes for Admin authentication
router.post("/register-admin", /*authMiddleware, isAdmin,*/ registerAdmin);
router.post("/admin-login", /*authMiddleware, isAdmin,*/ loginAdmin);

export default router;
