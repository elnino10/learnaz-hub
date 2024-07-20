import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  manageUsers,
  applyInstructor,
  getUsersByRole,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.get("/role/:role", getUsersByRole);
router.post("/:userId/apply-instructor", applyInstructor);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
