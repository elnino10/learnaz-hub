import { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = Router();

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route' });
});
router.post("/login", login);
router.post("/signup", signup);

export default router;
