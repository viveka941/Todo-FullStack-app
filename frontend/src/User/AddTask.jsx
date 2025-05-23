import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AddTask({ userId }) {
  const [task, setTask] = useState({
    userTask: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/task", { ...task, userId });
      toast.success("Task added successfully");
      setTask({
        userTask: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  return (
    <Card className="shadow-xl rounded-xl border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Add New Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTask} className="space-y-6">
          <div className="grid gap-1.5">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Task Title
            </Label>
            <Input
              value={task.userTask}
              onChange={(e) => setTask({ ...task, userTask: e.target.value })}
              placeholder="Enter task title"
              required
              className="focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </Label>
            <Textarea
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              placeholder="Task description"
              className="min-h-[100px] focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="grid gap-1.5">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </Label>
            <Input
              type="date"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              className="focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
          >
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
