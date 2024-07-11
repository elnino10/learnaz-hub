// server/src/api/v1/controllers/userController.js
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Helper function for validation.....used manual instead of express validator
const validateUserData = (name, email, password) => {
  const errors = [];
  if (!name || typeof name !== 'string') errors.push('Name is required and must be a string.');
  if (!email || typeof email !== 'string') errors.push('Email is required and must be a string.');
  if (!password || typeof password !== 'string') errors.push('Password is required and must be a string.');
  return errors;
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const errors = validateUserData(name, email, password);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Authenticate user and get token
export const authUser = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string') errors.push('Email is required and must be a string.');
  if (!password || typeof password !== 'string') errors.push('Password is required and must be a string.');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { name, email, role } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string') errors.push('Name is required and must be a string.');
  if (!email || typeof email !== 'string') errors.push('Email is required and must be a string.');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
