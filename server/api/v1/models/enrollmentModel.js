import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  enrolledAt: {
    type: Date,
    default: Date.now(),
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
