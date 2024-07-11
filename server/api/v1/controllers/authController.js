import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secretKey = '__secret_key__';

import User from '../models/user.js';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashPassword, });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ message: 'Password incorrect' });

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login Successful!' });


    } catch (error) {
        res.status(500).json({ message: error });
    }
};