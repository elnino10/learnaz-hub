import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { generateToken } from "../utils/helperfunctions.js";
import { sendEmail } from "../utils/emailFunction.js";


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

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const validUser = await user.matchPassword(password);

    if (!validUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      status: "success",
      message: "User authenticated successfully",
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error" });
    }
  }
};


// forgot password handler
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateToken(user._id, user.role, { expiresIn: "1h" });

    const resetUrl = `${process.env.RESET_PWD_URL} ${resetToken}`;

    const emailOptions = {
      from: process.env.EMAIL_USER,
      email: user.email,
      subject: "Password Reset",
      content: `You requested to set your password.
      Click on this link to reset your password: ${resetUrl}`,
    };

    await sendEmail(emailOptions);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// reset password handler
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


