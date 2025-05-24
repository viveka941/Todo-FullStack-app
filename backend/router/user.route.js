import express from "express";
import {
  deleteProfile,
  login,
  loginById,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import { authenticateUser } from "../middleware/isAuthentication.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get( logout);
router.route("/updateProfile/:id").patch( updateProfile);
router.route("/deleteProfile/:id").delete( deleteProfile);
router.route("/loginById/:id").get(loginById)
export default router;
