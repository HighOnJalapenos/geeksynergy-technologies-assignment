import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
const upload = multer();
app.use(upload.none());

//Routes
app.use("/api/v1/users", userRouter);

export { app };
