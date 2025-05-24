import express from "express";
import { addTask, deleteTask, fetechTask, updateTask } from "../controller/task.controller.js";
import { authenticateUser } from "../middleware/isAuthentication.js";
import { getTodoAssistantResponse } from "../controller/ai.controller.js";

const router = express.Router();

router.route("/addTask/:id").post( addTask);
router.route("/allTask/:userId").get(fetechTask);
router.route("/updateTask/:id").put(updateTask);
router.route("/deleteTask/:id").delete(deleteTask)
router.route("/assist").post(getTodoAssistantResponse);
export default router;
