import express from 'express'
import { addTask } from '../controller/task.controller.js'
import { authenticateUser } from '../middleware/authentication.middleware.js';


const router = express.Router()

router.route("/addTask/:id").post(authenticateUser, addTask);
export default router