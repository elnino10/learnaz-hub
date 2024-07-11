import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coursesTaught: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;
