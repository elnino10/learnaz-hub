import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import { comparePassword, hashPassword } from "../../utils/helperFunctions.js";

const registerAdmin = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields: email and password" });
        }

        // Check for existing user
        const existingUser = await User.exists({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);
        // console.log(email, password);

        // Create new admin user
        const newAdmin = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: "admin",
        });

        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log('Hashed Password:', hashedPassword);

        // Save the new admin user
        await newAdmin.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newAdmin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.status(201).json({
            status: "success",
            message: "Admin user registered successfully",
            token,
        });
    } catch (error) {
        console.error("Error in registerAdmin:", error);
        res.status(500).json({ message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login request received with:', { email, password });

        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields: email and password" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        console.log('User found:', user);
        if (!user) {
            return res.status(401).json({ message: "User does not exist" });
        }

        // Validate password using bcrypt
        const validPassword = await comparePassword(password, user.password);

        // Compare the input password with the stored hashed password
        const passwordsMatch = await bcrypt.compare(password, user.password);
        // console.log('Passwords Match:', passwordsMatch);

        if (!validPassword) {
            return res.status(401).json({ message: "Password does not match! Try again" });
        }

        // Check if user is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Only admins can log in" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            status: "success",
            message: "Admin logged in successfully",
            token,
        });
    } catch (error) {
        console.error("Error in loginAdmin:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { registerAdmin, loginAdmin };
