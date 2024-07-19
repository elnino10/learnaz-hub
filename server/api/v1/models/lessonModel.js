import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Lesson title is required"],
  },
  contentUrl: {
    type: String,
    required: [true, "Lesson content URL is required"],
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  lessonNumber: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
