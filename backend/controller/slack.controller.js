import axios from "axios";
import { Task } from "../model/task.model.js";

const SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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";

export const slack = async (req, res) => {
  const { message } = req.body;

  try {
     await axios.post(SLACK_WEBHOOK_URL, {
      text: message,
    });

    res
      .status(200)
      .json({ status: "success", message: "Message sent to Slack" });
  } catch (error) {
    console.error("Slack Error:", error.message);
    res
      .status(500)
      .json({ status: "error", message: "Failed to send message to Slack" });
  }
};

export const summarizeSlack = async (req, res) => {
  try {
  
    const {id} = req.body 
    const { userId, status, priority, fromDate, toDate } = req.body;

    const filter = {};

    if (userId) filter.userId = userId;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (fromDate || toDate) {
      filter.dueDate = {};
      if (fromDate) filter.dueDate.$gte = new Date(fromDate);
      if (toDate) filter.dueDate.$lte = new Date(toDate);
    }

    // ✅ Step 2: Fetch filtered tasks
    const tasks = await Task.find(filter).populate("assignedTo", "name");

    if (!tasks.length) {
      return res
        .status(200)
        .json({ status: "ok", message: "No tasks found to summarize" });
    }

    // ✅ Step 3: Format the summary
    const summaryText = tasks
      .map((task) => {
        const assignedName = task.assignedTo?.name || "Unassigned";
        return `• *${task.userTask}* _(Priority: ${task.priority})_ – Status: *${task.status}*, Assigned to: *${assignedName}*`;
      })
      .join("\n");

    const payload = {
      text: `📋 *Task Summary Report*:\n${summaryText}`,
    };

    // ✅ Step 4: Send to Slack
    await axios.post(SLACK_WEBHOOK_URL, payload);

    // ✅ Step 5: Respond to client
    res
      .status(200)
      .json({ status: "success", message: "Summary sent to Slack" });

  } catch (error) {
    console.error("Error sending summary to Slack:", error.message);
    res
      .status(500)
      .json({ status: "error", message: "Failed to send summary to Slack" });
  }
};

