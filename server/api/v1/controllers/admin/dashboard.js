import User from "../../models/userModel";


const getAdminDashboard = async (req, res) => {
    try {
        // logic to retrieve data for the admin dashboard
        const admins = await User.find({ role: "admin" }).select("-password"); // Exclude password
        res.status(200).json({ admins });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export { getAdminDashboard };
