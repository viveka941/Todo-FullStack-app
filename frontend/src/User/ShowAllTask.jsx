import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react"; // 🔥 Trash icon import

function ShowAllTask({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/task/allTask/${userId}`
      );
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/task/updateTask/${taskId}`, {
        status: newStatus,
      });
      toast.success("Status updated!");
      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/task/deleteTask/${taskId}`);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task.");
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="shadow-xl rounded-xl border border-gray-200 dark:border-gray-800"
          >
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {tasks.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">
            No tasks found. Start by creating a new task!
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <Card
            key={task._id}
            className="shadow-xl rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
          >
            <CardHeader className="space-y-3">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {task.userTask}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={getPriorityColor(task.priority)}
                  className="rounded-full px-3 py-1 text-sm"
                >
                  {task.priority}
                </Badge>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="rounded px-2 py-1 text-sm border"
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Completed</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {task.description || "No description provided"}
              </p>
              {task.dueDate && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Due:</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              <div className="flex justify-end">
                <Trash2
                  className="text-red-600 cursor-pointer hover:text-red-800 transition"
                  size={20}
                  onClick={() => handleDelete(task._id)}
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default ShowAllTask;
