import Lesson from "../models/lessonModel.js";
import Course from "../models/courseModel.js";

// Create a new lesson for a specific course
export const createLesson = async (req, res) => {
  try {
    const { title, contentUrl, courseId } = req.body;
    // console.log(title, contentUrl, courseId);
    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newLesson = new Lesson({ title, contentUrl, courseId });
    const savedLesson = await newLesson.save();

    // Push lesson to the lessons array in course collection
    course.lessons.push(savedLesson._id);
    await course.save();

    res.status(201).json({ status: "Lesson created", data: savedLesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lessons for a specific course
export const getAllLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lessons");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      status: "success",
      numLessons: course.lessons.length,
      data: course.lessons
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single lesson by ID
export const getLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a lesson by ID
export const updateLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, contentUrl } = req.body;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { title, contentUrl },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a lesson by ID
export const deleteLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!deletedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json({ status: "Done", message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
