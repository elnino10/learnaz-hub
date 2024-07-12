import Course from "../models/courseModel.js";

// create a new course
export const createCourse = async (req, res) => {
  try {
    // console.log(req.headers);
    // console.log(req.body);
    // console.log("Hola desde el controlador");
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
