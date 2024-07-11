//courses schema
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  //Allow courses from external sources like a third party api
  externalId: {
    type: String,
    unique: true,
    sparse: true, // Allows for both unique and null values
  },
  source: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
