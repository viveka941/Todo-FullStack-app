import express from "express";
import cors from "cors";
import connectDb from "./utils/connectDB.js";
import userRoute from "./router/user.route.js";
import taskRoute from "./router/task.route.js";
import slackRoute from './router/slack.route.js'
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: [process.env.FRONTEND],
  credentials: true,
};

app.use(cors(corsOption));

app.use("/api", userRoute);
app.use("/task", taskRoute);
app.use("/slack", slackRoute);
app.listen(5000, () => {
  connectDb();
  console.log("Server is running port number 5000");
});
