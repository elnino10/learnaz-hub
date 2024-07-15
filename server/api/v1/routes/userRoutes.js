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
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/manage", manageUsers);
router.put("/apply-instructor/:id", applyInstructor);

export default router;