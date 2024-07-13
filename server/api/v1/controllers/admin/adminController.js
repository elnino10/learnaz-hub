// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

const registerAdmin = async (req, res) => {
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

        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log('Hashed Password:', hashedPassword);

        const newAdmin = new User({
            email,
            password, // hashedPassword,
            firstName,
            lastName,
            role: "admin",
        });
        await newAdmin.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newAdmin._id, role: "admin" }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(201).json({
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
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare the input password with the stored hashed password
        const passwordsMatch = user.password;
            // await bcrypt.compare(password, user.password);

        // console.log('Passwords Match:', passwordsMatch);

        // if (!passwordsMatch) {
        //     return res.status(401).json({ message: "Password does not match! Try again" });
        // }

        // Check if user is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Only admins can log in" });
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
        console.error("Error in loginAdmin:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { registerAdmin, loginAdmin };
