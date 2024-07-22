import Course from "../models/courseModel.js";
import Enrollment from "../models/enrollmentModel.js";
import User from "../models/userModel.js";

//Get all courses in the database
export const getCourses = async (req, res) => {
  const category = req.params.category;

  try {
    let courses = "";
    if (category) {
      courses = await Course.find({ category: category });
    } else {
      courses = await Course.find();
    }
    res
      .status(200)
      .json({ status: "success", numCourses: courses.length, data: courses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

//Get a course by ID
export const getCourseByID = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("lessons")
      .populate("studentsEnrolled")
      .populate("instructorId");
    if (!course) {
      return res
        .status(404)
        .json({ status: "failed", message: "Course not found" });
    }

    res.status(200).json({
      status: "success",
      message: "course found",
      data: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

//Update course by ID
export const updateCourse = async (req, res) => {
  const reqBody = req.body;
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { ...reqBody, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ status: "failed", message: "Course not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

//Delete a course by ID
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (!course) {
      return res
        .status(404)
        .json({ status: "fialed", message: "Course not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

////////////////////////////////  COURSE CREATION  //////////////////////////////////

// create a new course
export const createCourse = async (req, res) => {
  try {
    const newCourse = new Course({
      ...req.body,
      instructorId: req.user._id,
      author: `${req.user.firstName} ${req.user.lastName || ""}`,
    });
    const course = await newCourse.save();

    // update user's coursesCreated array
    req.user.coursesCreated.push(course._id);
    await req.user.save();

    res.status(201).json({
      status: "success",
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

// Get courses created by a particular instructor
export const getCreatedCourses = async (req, res) => {
  const { instructorId } = req.params;

  try {
    const courses = await Course.find({ instructorId });

    if (courses.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No courses found for this instructor",
      });
    }
    res
      .status(200)
      .json({ status: "success", numCourses: courses.length, data: courses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

//////////////////////////////// COURSE ENROLLMENT  //////////////////////////////////

// Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

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

      const enrollment = new Enrollment({ courseId, studentId });
      const newEnrollment = await enrollment.save();

      res.status(200).json({
        status: "success",
        message: "Enrolled in course successfully",
        data: newEnrollment,
      });
    } else {
      res.status(400).json({
        status: "failed",
        courseTitle: course.title,
        message: "Already enrolled in this course",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

// Get courses enrolled by a particular student
export const getEnrolledCourses = async (req, res) => {
  const { studentId } = req.params;

  try {
    const courses = await Course.find({ studentsEnrolled: studentId })
      .populate("instructorId")
      .populate("studentsEnrolled");

    if (courses.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No courses found for this student",
      });
    }
    res
      .status(200)
      .json({ status: "success", numCourses: courses.length, data: courses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

/////////////////////////////// COURSE REVIEW  //////////////////////////////////

// Leave a course review
export const courseReview = async (req, res) => {
  try {
    const { courseId, review, rating } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.review.push({ studentId: req.user.id, review, rating });
    await course.save();

    res.status(200).json({ message: "Review submitted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

/////////////////////////////// COURSE SEARCH  //////////////////////////////////

// filter courses by search query
export const manageCourses = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  try {
    const query = search
      ? { title: new RegExp(search, "i") } // Search by course title
      : {};

    const courses = await Course.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ courses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};
