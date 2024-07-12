import User from "../../models/userModel.js";
import bcrypt from 'bcrypt';

export const manageUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        const query = search ? {
            $or: [
                { _id: search },
                { email: { $regex: search, $options: 'i' } }
            ]
        } : {};

        const users = await User.find(query)
            .select("-password")
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalUsers = await User.countDocuments(query);

        res.status(200).json({
            users,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
