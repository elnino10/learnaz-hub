import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbClient from "./utils/db.js";

import courseRouter from "./routes/courseRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

// import lessonRouter from "./routes/lessonRoutes.js";
// import tutorRouter from "./routes/tutorRoutes.js";

const app = express();

// third-party middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
// app.use("/api/v1", lessonRouter);
app.use("/api/v1", adminRouter);
// app.use("/api/v1", tutorRouter);

export default app;
