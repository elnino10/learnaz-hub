const instructorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    coursesTaught: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Virtual for instructor's full name
instructorSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
