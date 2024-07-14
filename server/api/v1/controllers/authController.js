import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const secretKey = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = "student" } = req.body;

    if (!email || !password || !firstName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password, firstName, lastName, role });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, secretKey, { expiresIn: "30d" });

    res.status(201).json({
      status: "success",
      message: "User registered successfully!",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      status: "success",
      message: "Login Successful!",
      token,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
