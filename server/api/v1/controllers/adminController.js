import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to register a new admin user
const registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!req.body || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ message: "Missing required fields: email and password" });
        }
        // ensure that only admins can register new admin
        if (!req.user.isAdmin) {
            return res
                .status(403)
                .json({ message: "Forbidden: Only admins can register admins" });
        }
        // Check for existing user (using optimized query)
        // const existingUser = await User.findOne({ email }).select("-password"); // Exclude password
        const existingUser = await Admin.exists({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            email,
            password: hashedPassword,
            first_name,
            last_name,
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin user registered successfully" });

    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const loginAdmin = async (req, res) => {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ message: "Missing required fields: email and password" });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await user.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Validate password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if user is an admin (using middleware is recommended)
        if (!user.isAdmin) {
            return res
                .status(403)
                .json({ message: "Forbidden: Only admins can log in" });
        }
        // Generate JWT token (consider adding expiry time and other security measures)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
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
