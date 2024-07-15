// server/src/api/v1/controllers/userController.js
import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";


// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the ID is already an ObjectId

    const user = await User.findById(userId); // Assuming proper ObjectId handling

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" }); // Fix the typo
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// Update user
export const updateUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const updates = { ...req.body }; // Create a copy of the request body

  try {
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Apply validation on update
    });

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// filter users by search query
export const manageUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search
      ? {
          $or: [{ _id: search }, { email: { $regex: search, $options: "i" } }],
        }
      : {};

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// instructor registration handler
export const applyInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // Check if user is an instructor
    if (user.role === "instructor") {
      return res
        .status(400)
        .json({ message: "User is already an instructor" });
    }

    // Update user role to instructor
    user.role = "instructor";

    await user.save();

    res.status(201).json({
      status: "success",
      message: "Instructor registered successfully",
    });
  } catch (error) {
    console.error("Error in registering instructor:", error);
    res.status(500).json({ message: error.message });
  }
};
