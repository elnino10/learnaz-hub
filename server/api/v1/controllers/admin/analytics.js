import Course from "../../models/courseModel.js";
import User from "../../models/userModel.js";

export const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTotalCourses = async (req, res) => {
    try {
        const totalCourses = await Course.countDocuments();
        res.status(200).json({ totalCourses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
        res.status(200).json({ activeUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNewSignups = async (req, res) => {
    try {
        // Count users created within the last month (adjust as needed)
        const newSignups = await User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
        res.status(200).json({ newSignups });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
