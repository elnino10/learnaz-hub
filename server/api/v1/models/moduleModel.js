import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

const Module = mongoose.model("Module", moduleSchema);

export default Module;
