import Course from "../../models/courseModel.js";
import User from "../../models/userModel.js";

export const viewGrades = async (req, res) => {
    try {
        const studentId = req.user.id;

        // Find all courses the student is enrolled in
        const student = await User.findById(studentId).populate('coursesEnrolled');
        const courses = student.coursesEnrolled;

        // Initialize an array to hold the grades
        const grades = [];

        // Loop through each course to find grades for the student
        for (const course of courses) {
        const fullCourse = await Course.findById(course._id).populate('assignments.grades.studentId');

        // Loop through each assignment in the course
        for (const assignment of fullCourse.assignments) {
            // Find the grade for the student
            const studentGrade = assignment.grades.find(grade => grade.studentId._id.toString() === studentId);
            if (studentGrade) {
            grades.push({
                courseId: fullCourse._id,
                courseTitle: fullCourse.title,
                assignmentTitle: assignment.title,
                grade: studentGrade.grade,
            });
            }
        }
        }

        // Return the grades to the student
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
