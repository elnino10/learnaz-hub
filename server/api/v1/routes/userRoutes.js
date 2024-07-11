// server/src/api/v1/routes/userRoutes.js
import express from 'express';
import { check } from 'express-validator';
import {
  registerUser,
  authUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
=========
// // server/src/api/v1/routes/userRoutes.js
// import express from "express";
// import { check } from "express-validator";
// import {
//   registerUser,
//   authUser,
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// } from "../controllers/userController.js";
>>>>>>>>> Temporary merge branch 2

// const router = express.Router();

<<<<<<<<< Temporary merge branch 1
// Route to register a new user
router.post('/register', registerUser);

// Route to authenticate a user (login)
router.post('/login', authUser);

// Route to get all users
router.get('/', getUsers);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);
=========
// router.post(
//   "/register",
//     [
//       check('name', 'Name is required').not().isEmpty(),
//       check('email', 'Please include a valid email').isEmail(),
//       check('password', 'Password is required').isLength({ min: 6 }),
//     ],
//   registerUser
// );

// router.post(
//   "/login",
//     [
//       check('email', 'Please include a valid email').isEmail(),
//       check('password', 'Password is required').exists(),
//     ],
//   authUser
// );

// router.get("/", getUsers);

// router.get("/:id", getUserById);

// router.put("/:id", updateUser);

// router.delete("/:id", deleteUser);
>>>>>>>>> Temporary merge branch 2

// export default router;
