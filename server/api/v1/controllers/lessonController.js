import Lesson from "../models/lessonModel.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

// Create a new lesson for a specific course (associated with a student's enrollment)
export const createLesson = async (req, res) => {
    try {
        const { title, content } = req.body;
        const studentId = req.user.id; // Assuming authenticated user's ID is used for enrollment

        // Find the course(s) that the student is enrolled in
        const user = await User.findById(studentId).populate("coursesEnrolled");
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        // For simplicity, assuming the user has only one course enrolled (adjust logic as per your application)
        const courseId = user.coursesEnrolled[0]; // This will be adjusted based on the enrollment logic

        const course = await Course.findById(courseId);
        if (!course) {
        return res.status(404).json({ message: "Course not found" });
        }

        const newLesson = new Lesson({ title, content, courseId });
        const savedLesson = await newLesson.save();

        res.status(201).json(savedLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all lessons for a specific course
export const getAllLessonsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const lessons = await Lesson.find({ courseId });
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single lesson by ID
export const getLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await Lesson.findById(id);

        if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
        }

        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a lesson by ID
export const updateLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedLesson = await Lesson.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
        );

        if (!updatedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
        }

        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a lesson by ID
export const deleteLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLesson = await Lesson.findByIdAndDelete(id);

        if (!deletedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
        }

        res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
