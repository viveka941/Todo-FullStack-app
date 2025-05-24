import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AddTask from "./AddTask";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import UserProfileUpdate from "./UserProfileUpdate";
import ShowAllTask from "./ShowAllTask";
import { PlusCircle, User } from "lucide-react";
import Navbar from "../Navbar";
import Footer  from "../Footer";

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
        console.error("Server error:", error);
      }
    };
    userData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* User Profile Card */}
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
              {[
                { label: "Name", value: user.name },
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
                { label: "Address", value: user.address },
              ].map((field, index) => (
                <div key={index} className="space-y-1">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {field.label}
                  </span>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {field.value || "-"}
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
              <DialogContent className="max-w-[500px] rounded-lg border-slate-200 dark:border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-xl text-slate-800 dark:text-slate-200">
                    Update Profile
                  </DialogTitle>
                  <DialogDescription className="text-slate-600 dark:text-slate-400">
                    Manage your account information
                  </DialogDescription>
                </DialogHeader>
                <UserProfileUpdate userId={id} onClose={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Tasks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>Your Tasks</span>
              <Badge
                variant="secondary"
                className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
              >
                {user.tasks?.length || 0}
              </Badge>
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[500px] rounded-lg border-slate-200 dark:border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-xl text-slate-800 dark:text-slate-200">
                    Create New Task
                  </DialogTitle>
                  <DialogDescription className="text-slate-600 dark:text-slate-400">
                    Organize your work with clear tasks
                  </DialogDescription>
                </DialogHeader>
                <AddTask
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
