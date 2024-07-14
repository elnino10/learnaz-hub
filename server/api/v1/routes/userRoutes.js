// server/src/api/v1/routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  authUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to authenticate a user (login)
router.post('/login-user', authUser);

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
