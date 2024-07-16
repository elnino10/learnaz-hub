import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  manageUsers,
  applyInstructor
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;