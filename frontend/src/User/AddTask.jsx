import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function AddTask({ userId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/task/addTask/${userId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success("Task added successfully!");
      reset(); // clear form
    } catch (error) {
      toast.error("Failed to add task.");
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Task Title */}
          <div className="grid gap-1.5">
            <Label>Task Title</Label>
            <Input
              placeholder="Enter task title"
              {...register("userTask", { required: "Task title is required" })}
              className="focus-visible:ring-2 focus-visible:ring-primary"
            />
            {errors.userTask && (
              <p className="text-sm text-red-500">{errors.userTask.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="grid gap-1.5">
            <Label>Description</Label>
            <Textarea
              placeholder="Task description"
              {...register("description")}
              className="min-h-[100px] focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* Priority */}
          <div className="grid gap-1.5">
            <Label>Priority</Label>
            <select
              {...register("priority")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <option value="low">Low</option>
              <option value="medium" selected>
                Medium
              </option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="grid gap-1.5">
            <Label>Due Date</Label>
            <Input
              type="date"
              {...register("dueDate")}
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
