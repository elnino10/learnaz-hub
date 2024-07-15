import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";


// Admin registration handler
export const registerAdmin = async (req, res) => {
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

    // Create new admin user
    const newAdmin = new User({
      email,
      password,
      firstName,
      lastName,
      role: "admin",
    });

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


// Admin login handler
export const loginAdmin = async (req, res) => {
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
      return res.status(401).json({ message: "User does not exist" });
    }

    // Validate password using bcrypt
    const validPassword = user.matchPassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email and password" });
    }

    // Check if user is an admin
    // if (user.role !== "admin") {
    //     return res.status(403).json({ message: "Forbidden: Only admins can log in" });
    // }

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


// Function to grant specific privileges to a user
export const grantPrivileges = async (req, res) => {
    try {
        const { userId, privileges } = req.body;

        // Validate input
        if (!userId || !Array.isArray(privileges) && !privileges === "*") { // Handle both individual privileges and admin wildcard
        return res.status(400).json({ message: "Invalid request: userId and privileges array or '*' required" });
        }

        if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Forbidden: Only admins can grant privileges" });
        }

        // Find user by userId
        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        // Grant privileges based on role or individual privileges
        if (privileges === "*") {
        user.privileges = privileges; // Grant all privileges to admin
        } else {
        const rolePrivileges = { // Role-based privileges here
            student: ["viewSelf", "editSelf", "viewCoursesEnrolled",
                "accessCourseContent", "viewGrades"],
            instructor: [...studentPrivileges, "viewAllCourses", "createCourse", "editCourse",
                "manageCourseEnrollment", "viewStudentProgress"],
        };
        user.privileges = privileges.filter(priv => rolePrivileges[user.role].includes(priv)); // Grant requested privileges within user's role
        }

    await user.save();

    res.status(200).json({ message: "Privileges granted successfully", user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Function to revoke specific privileges from a user
export const revokePrivileges = async (req, res) => {
    try {
        const { userId, privileges } = req.body;

        // Validate input
        if (!userId || !privileges || !Array.isArray(privileges)) {
            return res.status(400).json({ message: "Invalid request: userId and privileges array required" });
        }

        // Check if current user is an admin (you may have middleware for this)
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Forbidden: Only admins can revoke privileges" });
        }

        // Find user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Revoke privileges
        user.privileges = user.privileges.filter(priv => !privileges.includes(priv));
        await user.save();

        res.status(200).json({ message: "Privileges revoked successfully", user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};
