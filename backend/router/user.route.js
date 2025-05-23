import express from "express";
import {
  deleteProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import { authenticateUser } from "../middleware/isAuthentication.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authenticateUser, logout);
router.route("/updateProfile/:id").patch(authenticateUser, updateProfile);
router.route("/deleteProfile/:id").delete(authenticateUser, deleteProfile);
export default router;
