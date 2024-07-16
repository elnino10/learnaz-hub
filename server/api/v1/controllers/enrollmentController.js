import Course from "../models/courseModel.js";
import User from "../models/userModel.js";


// Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!course.studentsEnrolled.includes(studentId)) {
      course.studentsEnrolled.push(studentId);
      await course.save();

      student.coursesEnrolled.push(courseId);
      await student.save();

      res.status(200).json({
        status: "success",
        courseTitle: course.title,
        message: "Enrolled in course successfully"
      });
    } else {
      res.status(400).json({
        status: "failed",
        courseTitle: course.title,
        message: "Already enrolled in this course"
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View courses enrolled by a student
export const getEnrolledCourses = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await User.findById(studentId).populate('coursesEnrolled', 'title description');

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      status: "success",
      numCourses: student.coursesEnrolled.length,
      courses: student.coursesEnrolled
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


