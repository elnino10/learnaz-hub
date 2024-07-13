import Course from "../../models/courseModel.js";
import User from "../../models/userModel.js";

// Enroll in a course
export const enrollInCourse = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (!course.studentsEnrolled.includes(studentId)) {
            course.studentsEnrolled.push(studentId);
            await course.save();

            const student = await User.findById(studentId);
            student.coursesEnrolled.push(courseId);
            await student.save();

            res.status(200).json({ message: "Enrolled in course successfully" });
            } else {
            res.status(400).json({ message: "Already enrolled in this course" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

// View enrolled courses
export const getEnrolledCourses = async (studentId) => {
    try {
        const student = await User.findById(studentId).populate('coursesEnrolled');
        return student.coursesEnrolled;
    } catch (error) {
        throw error;
    }
};
