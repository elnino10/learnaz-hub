// server/src/api/v1/routes/userRoutes.js
import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();


router.get("/", getUsers);
router.get("/userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
