import express from "express";
import { addTask, fetechTask } from "../controller/task.controller.js";
import { authenticateUser } from "../middleware/isAuthentication.js";

const router = express.Router();

router.route("/addTask/:id").post( addTask);
router.route("/allTask/:userId").get(fetechTask);
export default router;
