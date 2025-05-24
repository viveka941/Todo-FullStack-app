import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

function ShowAllTask({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks when userId changes
  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/task/allTask/${userId}`
        );
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  // Handle status update
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/task/updateTask/${taskId}`,
        {
          status: newStatus,
        }
      );

      // Update tasks state locally
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );

      toast.success("Task status updated");
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status");
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

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "info";
      default:
        return "outline";
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
              <div className="flex flex-wrap gap-2 items-center">
                <Badge
                  variant={getPriorityColor(task.priority)}
                  className="rounded-full px-3 py-1 text-sm"
                >
                  {task.priority}
                </Badge>
                <div>
                  <select
                    className={`rounded-md border px-2 py-1 text-sm`}
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
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
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default ShowAllTask;
