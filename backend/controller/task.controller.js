import { Task } from "../model/task.model.js";

export const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userTask, description, status, priority, dueDate, completedAt } =
      req.body;

    
    if (!userTask || !description || !priority) {
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



export const fetechTask = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        success: false,
      });
    }

    const allTasks = await Task.find({ userId });

    return res.status(200).json({
      message: "All tasks fetched successfully",
      success: true,
      tasks: allTasks,
    });
  } catch (error) {
    console.error("Fetch Task Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Task ID is required.",
        success: false,
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task does not exist.",
        success: false,
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true } 
    );

    return res.status(200).json({
      message: "Successfully updated task status.",
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update Task Error:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteT = await Task.findByIdAndDelete(id);

    if (!deleteT) {
      return res.status(404).json({
        message: "Task not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Successfully deleted task.",
      success: true,
    });
  } catch (error) {
    console.error("Delete Task Error:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};


export const assignOtherUser = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({
        message: "Assigned user ID is required.",
        success: false,
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
        success: false,
      });
    }

    task.assignedTo = assignedTo;
    await task.save();

    return res.status(200).json({
      message: "Task successfully assigned to another user.",
      success: true,
      task,
    });
  } catch (error) {
    console.error("Assign User Error:", error.message);
    return res.status(500).json({
      message: "Internal server error while assigning task.",
      success: false,
    });
  }
};
