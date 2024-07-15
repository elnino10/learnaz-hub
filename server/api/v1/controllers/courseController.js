import Course from "../models/courseModel.js";

// create a new course
export const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const course = await newCourse.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Read all courses in the database
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Read or Get a course by ID
export const getCourseByID = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Update course by ID
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedCourse) return res.status(200).json(updatedCourse);
    else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Delete a course by ID
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (course)
      return res.status(200).json({ message: "Course deleted successfully" });
    else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error });
  }
};
