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
  courseModules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  // //Allow courses from external sources like a third party api
  // externalId: {
  //   type: String,
  //   unique: true,
  //   sparse: true, // Allows for both unique and null values
  // },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
