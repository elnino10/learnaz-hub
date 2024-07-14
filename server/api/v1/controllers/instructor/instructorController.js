import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

// Utility function to generate JWT token
const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Register a new instructor
const registerInstructor = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check for existing user
        const existingUser = await User.exists({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create and save new instructor
        const newInstructor = new User({
            email,
            password,
            firstName,
            lastName,
            role: "instructor",
        });
        await newInstructor.save();

        // Generate JWT token
        const token = generateToken(newInstructor._id, "instructor");

        res.status(201).json({
            status: "success",
            message: "Instructor registered successfully",
            token,
        });
    } catch (error) {
        console.error("Error in registerInstructor:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login an instructor
const loginInstructor = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User does not exist" });
        }

        // Validate password
        const validPassword = await user.matchPassword(password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Check if user is an instructor
        if (user.role !== "instructor") {
            return res.status(403).json({ message: "Forbidden: Only instructors can log in" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: "instructor" }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

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

export { registerInstructor, loginInstructor };