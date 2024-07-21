import express from "express";
import cors from "cors";
import morgan from "morgan";
import courseRouter from "./routes/courseRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import lessonRouter from "./routes/lessonRoutes.js";
import analyticsRouter from "./routes/analyticsRoutes.js";
import { jsonParserMiddleware } from "./utils/authMiddleware.js";
import dbClient from "./utils/db.js";
import passport from "./utils/passport.js";
const app = express();

// third-party middlewares
app.use(jsonParserMiddleware);
// app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/analytics", analyticsRouter);

export default app;
