import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import ShowAllTask from "./ShowAllTask";
import { PlusCircle, User } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function UserProfileUpdate({ userId, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_USER}/loginById/${userId}`
        );
        reset(res.data.user);
      } catch (error) {
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, [userId, reset]);

  const onSubmit = async (formData) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_USER}/updateProfile/${userId}`,
        formData
      );
      toast.success("Profile updated successfully!");
      if (onClose) onClose();
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-slate-800 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}

        <Input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <Input
          type="text"
          {...register("phone", { required: "Phone is required" })}
          placeholder="Enter your phone"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}

        <Input
          type="text"
          {...register("address", { required: "Address is required" })}
          placeholder="Enter your address"
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary text-white">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

function AddTaskComponent({ userId, onClose, onTaskAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_TASK}/addTask/${userId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Task added successfully!");
      if (onClose) onClose();
      if (onTaskAdded) onTaskAdded();
      reset();
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
          <div className="grid gap-1.5">
            <Label>Task Title</Label>
            <Input
              placeholder="Enter task title"
              {...register("userTask", { required: "Task title is required" })}
            />
            {errors.userTask && (
              <p className="text-sm text-red-500">{errors.userTask.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label>Description</Label>
            <Textarea
              placeholder="Task description"
              {...register("description")}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-1.5">
            <Label>Priority</Label>
            <select
              defaultValue="medium"
              {...register("priority")}
              className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="grid gap-1.5">
            <Label>Due Date</Label>
            <Input type="date" {...register("dueDate")} />
          </div>

          <Button type="submit" className="w-full bg-primary text-white py-3">
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_USER}/loginById/${id}`
        );
        setUser(res.data.user);
      } catch (error) {
        toast.error("Failed to load user data");
      }
    };
    userData();
  }, [id, refreshKey]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Card className="rounded-lg shadow-sm border-0 bg-neutral-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700/50 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-30" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                User Profile
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {["name", "email", "phone", "address"].map((key, index) => (
                <div key={index} className="space-y-1">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {user[key] || "-"}
                  </p>
                </div>
              ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
                >
                  Update Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[500px] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Update Profile</DialogTitle>
                  <DialogDescription>
                    Manage your account information
                  </DialogDescription>
                </DialogHeader>
                <UserProfileUpdate
                  userId={id}
                  onClose={() => {
                    setOpen(false);
                    setRefreshKey((prev) => prev + 1);
                  }}
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>Your Tasks</span>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
              >
                {user.tasks?.length || 0}
              </Badge>
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                  <PlusCircle className="h-4 w-4" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[500px] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Organize your work with clear tasks
                  </DialogDescription>
                </DialogHeader>
                <AddTaskComponent
                  userId={id}
                  onClose={() => setOpen(false)}
                  onTaskAdded={() => setRefreshKey((prev) => prev + 1)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <Card className="rounded-lg shadow-sm border-0 bg-white dark:bg-slate-800">
            <CardContent className="p-6">
              <ShowAllTask userId={id} refreshKey={refreshKey} />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
