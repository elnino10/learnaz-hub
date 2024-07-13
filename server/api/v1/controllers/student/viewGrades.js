import Course from "../../models/courseModel.js";
import User from "../../models/userModel.js";

export const viewGrades = async (studentId) => {
    try {
        const student = await User.findById(studentId).populate('coursesEnrolled');
        const courses = student.coursesEnrolled;

        const grades = [];

        for (const course of courses) {
            const fullCourse = await Course.findById(course._id).populate('assignments.grades.studentId');
            for (const assignment of fullCourse.assignments) {
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
        return grades;
    } catch (error) {
        throw error;
    }
};
