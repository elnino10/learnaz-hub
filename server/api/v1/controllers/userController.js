// server/src/api/v1/controllers/userController.js
import User from "../models/userModel.js";
import bcrypt from "bcrypt";


// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { name, email, role } = req.body;
  const errors = [];

  if (!name || typeof name !== "string")
    errors.push("Name is required and must be a string.");
  if (!email || typeof email !== "string")
    errors.push("Email is required and must be a string.");

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
