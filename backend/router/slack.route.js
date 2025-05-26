import express from "express";
import {   slack, summarizeSlack } from "../controller/slack.controller.js";

const router = express.Router();
router.route("/message").post(slack);
router.route("/summrize").post(summarizeSlack);


export default router;
