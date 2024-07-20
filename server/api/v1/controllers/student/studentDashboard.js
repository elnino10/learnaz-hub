import Course from "../../models/courseModel.js";
import User from "../../models/userModel.js";
// import { getCourseByID } from "../courseController.js";
// import { getEnrolledCourses } from "../enrollmentController.js";

// view student's grades
// export const viewGrades = async (studentId) => {
//   try {
//     const student = await User.findById(studentId).populate("coursesEnrolled");
//     const courses = student.coursesEnrolled;

//     const grades = [];

//     for (const course of courses) {
//       const fullCourse = await Course.findById(course._id).populate(
//         "assignments.grades.studentId"
//       );
//       for (const assignment of fullCourse.assignments) {
//         const studentGrade = assignment.grades.find(
//           (grade) => grade.studentId._id.toString() === studentId
//         );
//         if (studentGrade) {
//           grades.push({
//             courseId: fullCourse._id,
//             courseTitle: fullCourse.title,
//             assignmentTitle: assignment.title,
//             grade: studentGrade.grade,
//           });
//         }
//       }
//     }
//     return grades;
//   } catch (error) {
//     throw error;
//   }
// };

// Get student dashboard data
export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Object to hold the dashboard data
    const dashboardData = {
      coursesEnrolled: [],
      suggestedCourses: [],
      // recentAssignments: [],
      // recentGrades: [],
    };

    // Get enrolled courses
    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the student is enrolled in any courses
    if (student.coursesEnrolled.length === 0) {
      dashboardData.coursesEnrolled = [];
    } else {
      dashboardData.coursesEnrolled = student.coursesEnrolled;
    }

    // Get all courses from the database
    const courses = await Course.find();

    // Suggest courses that the student is not enrolled in
    dashboardData.suggestedCourses = courses.filter((course) => !student.coursesEnrolled.includes(course._id));

    // // Get recent assignments
    // for (const course of dashboardData.coursesEnrolled) {
    //   const fullCourse = await getCourseByID(course._id);
    //   const assignments = fullCourse.assignments.filter((assignment) =>
    //     assignment.submissions.some(
    //       (submission) => submission.studentId.toString() === studentId
    //     )
    //   );

    //   dashboardData.recentAssignments.push(
    //     ...assignments.map((assignment) => ({
    //       courseId: fullCourse._id,
    //       courseTitle: fullCourse.title,
    //       assignmentId: assignment._id,
    //       assignmentTitle: assignment.title,
    //       dueDate: assignment.dueDate,
    //       submissionDate: assignment.submissions.find(
    //         (sub) => sub.studentId.toString() === studentId
    //       ).submissionDate,
    //     }))
    //   );
    // }

    // // Sort recent assignments by submission date
    // dashboardData.recentAssignments.sort(
    //   (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
    // );

    // // Get recent grades
    // dashboardData.recentGrades = await viewGrades(studentId);

    // // Sort recent grades by graded date
    // dashboardData.recentGrades.sort(
    //   (a, b) => new Date(b.gradedDate) - new Date(a.gradedDate)
    // );

    res.status(200).json(dashboardData);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

