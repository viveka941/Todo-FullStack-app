import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

function ShowAllTask({ userId, refreshKey }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUser, setAllUser] = useState([]);

  const fetchTasks = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_TASK}/allTask/${userId}`
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
  }, [userId, refreshKey]); // Added refreshKey to dependencies

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_TASK}/updateTask/${taskId}`, {
        status: newStatus,
      });
      toast.success("Status updated!");
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_TASK}/deleteTask/${taskId}`
      );
      toast.success("Task deleted successfully!");
      fetchTasks(); // Refresh the task list
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

  useEffect(() => {
    async function allUserData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_USER}/allUser`);

        setAllUser(res.data.users);
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete task.");
      }
    }
    allUserData();
  }, []);
  const handleAssignUser = async (taskId, assignedToUserId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_TASK}/assign/${taskId}`, {
        assignedTo: assignedToUserId,
      });
      toast.success("Task assigned successfully!");
      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign task.");
    }
  };

  async function summriseMsgSend(data) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_SLACK}/message`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign task.");
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="shadow-xl rounded-xl border border-gray-200 dark:border-gray-800 animate-pulse"
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
    <div className="p-6 space-y-10">
      {/* All Tasks */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              className="shadow-xl rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow group"
            >
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {task.userTask}
                </CardTitle>
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge
                    variant={getPriorityColor(task.priority)}
                    className="rounded-full px-3 py-1 text-sm capitalize"
                  >
                    {task.priority}
                  </Badge>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                    className="rounded px-2 py-1 text-sm border bg-background hover:bg-accent transition-colors"
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

                <div>
                  <span className="text-muted-foreground block mb-1">
                    Assign task to
                  </span>
                  <select
                    value={task.assignedTo || ""}
                    onChange={(e) => handleAssignUser(task._id, e.target.value)}
                    className="w-full px-2 py-1 border rounded bg-background text-sm"
                  >
                    <option value="">Unassigned</option>
                    {allUser.map((data) => (
                      <option key={data._id} value={data._id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  <Trash2
                    className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
                    size={20}
                    onClick={() => handleDelete(task._id)}
                    title="Delete task"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Assigned Tasks Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Assigned Tasks</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.filter((t) => t.assignedTo).length === 0 ? (
            <p className="text-muted-foreground col-span-full">
              No tasks have been assigned to any user.
            </p>
          ) : (
            tasks
              .filter((task) => task.assignedTo)
              .map((task) => {
                const assignedUser = allUser.find(
                  (u) => u._id === task.assignedTo
                );
                return (
                  <Card
                    key={task._id}
                    className="shadow-xl rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow group"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {task.userTask}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {task.description}
                      </p>
                      <p className="text-sm">
                        Assigned to:{" "}
                        <span className="font-medium">
                          {assignedUser?.name || "Unknown"}
                        </span>
                      </p>
                      <p className="text-sm">
                        Status:{" "}
                        <span className="capitalize">{task.status}</span>
                      </p>
                    </CardContent>
                  </Card>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowAllTask;
