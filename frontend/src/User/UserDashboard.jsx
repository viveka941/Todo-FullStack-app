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

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/loginById/${id}`);
        setUser(res.data.user);
      } catch (error) {
        toast.error("Failed to load user data");
        console.error("Server error:", error);
      }
    };
    userData();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-6 min-h-screen">
      {/* User Profile Card */}
      <Card className="rounded-xl shadow-sm border">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-2xl font-semibold">User Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Name</span>
              <p className="font-medium text-foreground">{user.name || "-"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              <p className="font-medium text-foreground">{user.email || "-"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Phone</span>
              <p className="font-medium text-foreground">{user.phone || "-"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Address</span>
              <p className="font-medium text-foreground">{user.address || "-"}</p>
            </div>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-full sm:w-auto">
                Update Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Update Profile</DialogTitle>
                <DialogDescription>
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
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span>Your Tasks</span>
            <Badge variant="secondary" className="px-2 py-1">
              {user.tasks?.length || 0}
            </Badge>
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Create New Task</DialogTitle>
                <DialogDescription>
                  Organize your work with clear tasks
                </DialogDescription>
              </DialogHeader>
              <AddTask 
                userId={id} 
                onClose={() => setOpen(false)}
                onTaskAdded={() => setRefreshKey(prev => prev + 1)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6">
            <ShowAllTask userId={id} refreshKey={refreshKey} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}