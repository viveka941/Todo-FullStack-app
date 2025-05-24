import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function UserDashboard() {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/loginById/${id}`
        );
       
        setUser(res.data.user);
      } catch (error) {
        console.log("server is not responding");
      }
    };
    userData();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* User Card */}
      <Card className="shadow-xl rounded-xl border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Name:
              </span>
              <p className="text-gray-900 dark:text-gray-100">{user.name}</p>
            </div>
            <div className="space-y-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Email:
              </span>
              <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
            </div>
            <div className="space-y-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Phone:
              </span>
              <p className="text-gray-900 dark:text-gray-100">{user.phone}</p>
            </div>
            <div className="space-y-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Address:
              </span>
              <p className="text-gray-900 dark:text-gray-100">{user.address}</p>
            </div>
          </div>
          {/* <Button
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold"
            onClick={() => toast.info("Redirecting to update profile...")}
          >
            Update Profile
          </Button> */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Update Profile</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogDescription>
                  Update all details if you want.
                </DialogDescription>
              </DialogHeader>
              <UserProfileUpdate userId={id} onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add New Task</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a New Task</DialogTitle>
            <DialogDescription>
              Fill out the task details and click submit.
            </DialogDescription>
          </DialogHeader>

          {/* AddTask component */}
          <AddTask userId={id} />
        </DialogContent>
      </Dialog>
      <ShowAllTask userId={id} />
    </div>
  );
}
