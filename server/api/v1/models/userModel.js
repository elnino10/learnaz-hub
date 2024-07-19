import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"], // Allowed roles
    default: "student", // Default role for new users
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  coursesEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: [],
    },
  ],
  coursesCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: [],
    },
  ],
  twitterUsername: String,
  twitterURL: String,
  facebookUsername: String,
  facebookURL: String,
  linkedInResourceId: String,
  linkedInURL: String,
  biography: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

// Method to match entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
