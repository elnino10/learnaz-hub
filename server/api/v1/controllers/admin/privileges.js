import User from '../../models/userModel.js';

// Function to grant specific privileges to a user
const grantPrivileges = async (req, res) => {
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
const revokePrivileges = async (req, res) => {
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

export { grantPrivileges, revokePrivileges };
