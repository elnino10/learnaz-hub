import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js"; // Import User model (adjust path as needed)

const registerAdmin = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Missing required fields: email and password" });
        }

        // Ensure that only admins can register new admin
        if (!req.user || req.user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Forbidden: Only admins can register admins" });
        }

        // Check for existing user
        const existingUser = await User.exists({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: "admin",
        });
        await newAdmin.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newAdmin._id, role: "admin" }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({
            message: "Admin user registered successfully",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Missing required fields: email and password" });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Validate password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if user is an admin
        if (user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Forbidden: Only admins can log in" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: "admin" }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({
            message: "Admin logged in successfully",
            token,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export { registerAdmin, loginAdmin };
