import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "./utils/db.js";
import courseRouter from "./routes/courseRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import lessonRouter from "./routes/lessonRoutes.js";

const app = express();

// third-party middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/lessons", lessonRouter);

export default app;
