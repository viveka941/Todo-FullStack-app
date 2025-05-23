import express from 'express'
import {  deleteProfile, login, register, updateProfile } from '../controller/user.controller.js'

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/updateProfile/:id").patch(updateProfile)
router.route("/deleteProfile/:id").delete(deleteProfile)
export default router