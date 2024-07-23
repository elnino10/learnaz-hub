import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  applyInstructor,
  getUsersByRole,
} from "../controllers/userController.js";
import {authMiddleware} from "../utils/authMiddleware.js"

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.get("/role/:role", getUsersByRole);
router.post("/:userId/apply-instructor", authMiddleware, applyInstructor);
router.patch("/:userId", authMiddleware, updateUser);
router.delete("/:userId", deleteUser);

export default router;
