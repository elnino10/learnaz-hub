import mongoose from 'mongoose';

const users = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'tutor'], // Allowed roles
        default: 'student' // Default role for new users
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createdAt: {
    type: Date,
    default: Date.now,
    },
});

export default mongoose.model('user', users);
