import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const secretKey = process.env.JWT_SECRET;


// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// user signup handler
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
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
    });

    if (user) {
      res.status(201).json({
        status: "success",
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
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// instructor signup handler
export const registerInstructor = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields: email and password" });
    }

    // Check for existing user
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newInstructor = new User({
      email,
      password,
      firstName,
      lastName,
      role: "instructor",
    });
    await newInstructor.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newInstructor._id, role: "instructor" },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(201).json({
      status: "success",
      message: "Instructor registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error in registerInstructor:", error);
    res.status(500).json({ message: error.message });
  }
};


// instructor authentication handler
export const loginInstructor = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received with:", { email, password });

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields: email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Validate password using bcrypt
    const validPassword = await user.matchPassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Check if user is an instructor
    if (user.role !== "instructor") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only instructors can log in" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: "instructor" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      status: "success",
      message: "Instructor logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error in loginInstructor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
