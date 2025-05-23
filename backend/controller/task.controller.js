import { Task } from "../model/task.model.js";

export const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userTask, description, status, priority, dueDate, completedAt } =
      req.body;

    
    if (!userTask || !description || !status || !priority) {
      return res.status(400).json({
        message: "Required fields are missing",
        success: false,
      });
    }

    const newTask = await Task.create({
      userId: id,
      userTask,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      completedAt: completedAt || null,
    });

    return res.status(201).json({
      message: "Task created successfully",
      success: true,
      task: newTask,
    });
  } catch (error) {
    console.error("Add Task Error:", error.message);
    return res.status(500).json({
      message: "Server error while adding task",
      success: false,
      error: error.message,
    });
  }
};
