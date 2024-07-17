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
    ref: "User",
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
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      default: [],
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  thumbnailURL: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    default: 'http://learnazHub.com/default-thumbnail.jpg',
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  review: String,
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
