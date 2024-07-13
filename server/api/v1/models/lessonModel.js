import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Reference to the Course model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
