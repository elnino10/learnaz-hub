import { getCourseDetails } from "./courseController.js";
import { getEnrolledCourses } from "./enrollInCourse.js";
import { viewGrades } from "./viewGrades.js";

// Get student dashboard data
export const getStudentDashboard = async (req, res) => {
    try {
        const studentId = req.user.id;

        // Object to hold the dashboard data
        const dashboardData = {
            coursesEnrolled: [],
            recentAssignments: [],
            recentGrades: []
        };

        // Get enrolled courses
        dashboardData.coursesEnrolled = await getEnrolledCourses(studentId);

        // Get recent assignments
        for (const course of dashboardData.coursesEnrolled) {
            const fullCourse = await getCourseDetails(course._id);
            const assignments = fullCourse.assignments.filter(assignment =>
                assignment.submissions.some(submission => submission.studentId.toString() === studentId)
            );

            dashboardData.recentAssignments.push(...assignments.map(assignment => ({
                courseId: fullCourse._id,
                courseTitle: fullCourse.title,
                assignmentId: assignment._id,
                assignmentTitle: assignment.title,
                dueDate: assignment.dueDate,
                submissionDate: assignment.submissions.find(sub => sub.studentId.toString() === studentId).submissionDate
            })));
        }

        // Sort recent assignments by submission date
        dashboardData.recentAssignments.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));

        // Get recent grades
        dashboardData.recentGrades = await viewGrades(studentId);

        // Sort recent grades by graded date
        dashboardData.recentGrades.sort((a, b) => new Date(b.gradedDate) - new Date(a.gradedDate));


        res.status(200).json(dashboardData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
