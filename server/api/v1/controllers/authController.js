import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { generateToken } from "../utils/helperfunctions.js";


// user signup handler
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  // const errors = validateUserData(name, email, password);

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    if (user) {
      res.status(201).json({
        status: "success",
        userId: user._id,
        message: "User created successfully",
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// user authentication handler
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const validUser = await user.matchPassword(password);

    if (!validUser) {
      res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      status: "success",
      message: "User authenticated successfully",
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



