//courses schema
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
  }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
