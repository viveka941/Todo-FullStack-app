import express from "express";
import {   slack, summarizeSlack } from "../controller/slack.controller.js";

const router = express.Router();

router.route("/summrize/:id").post(summarizeSlack);
router.route("/message").post(slack)

export default router;
