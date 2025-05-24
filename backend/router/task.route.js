import express from "express";
import { addTask, deleteTask, fetechTask, updateTask } from "../controller/task.controller.js";
import { authenticateUser } from "../middleware/isAuthentication.js";

const router = express.Router();

router.route("/addTask/:id").post( addTask);
router.route("/allTask/:userId").get(fetechTask);
router.route("/updateTask/:id").put(updateTask);
router.route("/deleteTask/:id").delete(deleteTask)
export default router;
