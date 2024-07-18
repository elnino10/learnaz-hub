import Course from "../models/courseModel.js";
import Instructor from "../models/instructorModel.js";
import User from "../models/userModel.js";

// create a new course
export const createCourse = async (req, res) => {
  console.log(req.user._id);
  try {
    const newCourse = new Course({...req.body, instructorId: req.user._id });
    const course = await newCourse.save();

    res.status(201).json({ status: "success", message: "Course created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};


//Read all courses in the database
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res
      .status(200)
      .json({ status: "success", numCourses: courses.length, data: courses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

//Read or Get a course by ID
export const getCourseByID = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res
        .status(404)
        .json({ status: "failed", message: "Course not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "course found", data: course });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error", errorMessage: error.message });
  }
};

// Get courses created by a particular instructor
export const getCoursesByInstructor = async (req, res) => {
  const { instructorId } = req.params;

  try {
    const courses = await Course.find({ instructorId });

    if (courses.length === 0) {
      return res.status(404).json({ status: "failed", message: "No courses found for this instructor" });
    }

    res.status(200).json({ status: "success", numCourses: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ error: "Server error", errorMessage: error.message });
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

// Submit an assignment
// export const submitAssignment = async (
//   studentId,
//   courseId,
//   assignmentId,
//   submission
// ) => {
//   try {
//     const course = await Course.findById(courseId);
//     if (!course) {
//       throw new Error("Course not found");
//     }

//     const assignment = course.assignments.id(assignmentId);
//     if (!assignment) {
//       throw new Error("Assignment not found");
//     }

//     assignment.submissions.push({ studentId, submission });
//     await course.save();

//     return { message: "Assignment submitted successfully" };
//   } catch (error) {
//     throw error;
//   }
// };

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
