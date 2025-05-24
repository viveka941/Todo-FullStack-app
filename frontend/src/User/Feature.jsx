"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "../Navbar";
import Footer from "../Footer";

const dummyTasks = [
  {
    id: 1,
    title: "Develop New Feature Dashboard",
    status: "in progress",
    progress: 65,
    assignedTo: "You",
    dueDate: "2024-03-25",
    priority: "high",
    category: "Development",
  },
  {
    id: 2,
    title: "Create UI Documentation",
    status: "complete",
    progress: 100,
    assignedTo: "Design Team",
    dueDate: "2024-03-20",
    priority: "medium",
    category: "Documentation",
  },
  {
    id: 3,
    title: "User Testing Session",
    status: "pending",
    progress: 30,
    assignedTo: "QA Team",
    dueDate: "2024-04-01",
    priority: "urgent",
    category: "Testing",
  },
  {
    id: 4,
    title: "Implement Dark Mode",
    status: "incomplete",
    progress: 0,
    assignedTo: "Frontend Team",
    dueDate: "2024-04-05",
    priority: "medium",
    category: "Feature",
  },
];

function Feature() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [liked, setLiked] = useState({});
  const [shared, setShared] = useState("");
  const [experience, setExperience] = useState("");

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const transferTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, assignedTo: "Another user" } : task
      )
    );
  };

  const handleShare = () => {
    alert(`Achievement shared: ${shared}`);
    setShared("");
  };

  const handleExperience = () => {
    alert(`Experience submitted: ${experience}`);
    setExperience("");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 min-h-screen">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 bg-clip-text text-transparent">
            🚀 Project Management Hub
          </h1>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="bg-blue-100 text-blue-600">
              Active Tasks: {tasks.length}
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-600">
              Completed: {tasks.filter((t) => t.status === "complete").length}
            </Badge>
          </div>
        </div>

        {/* Todo Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                task.status === "complete"
                  ? "border-green-200 bg-green-50"
                  : task.status === "in progress"
                  ? "border-blue-200 bg-blue-50"
                  : "border-pink-200 bg-pink-50"
              }`}
            >
              <div className="absolute top-0 right-0 p-2">
                <span
                  className={`text-xs font-semibold ${
                    task.priority === "urgent"
                      ? "text-red-500"
                      : task.priority === "high"
                      ? "text-orange-500"
                      : "text-yellow-500"
                  }`}
                >
                  {task.priority} ⚡
                </span>
              </div>

              <CardContent className="pt-8 space-y-4">
                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      task.status === "complete"
                        ? "bg-green-500"
                        : task.status === "in progress"
                        ? "bg-blue-500"
                        : "bg-pink-500"
                    }`}
                  />
                  {task.title}
                </h2>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">👤 {task.assignedTo}</span>
                    <span className="text-gray-500">📅 {task.dueDate}</span>
                  </div>

                  <Progress
                    value={task.progress}
                    className={`h-2 ${
                      task.status === "complete"
                        ? "bg-green-200"
                        : task.status === "in progress"
                        ? "bg-blue-200"
                        : "bg-pink-200"
                    }`}
                  />

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-purple-100 text-purple-600"
                    >
                      {task.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-600"
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="justify-between border-t pt-4">
                <Button
                  className={`gap-2 transition-all ${
                    liked[task.id]
                      ? "bg-pink-500 hover:bg-pink-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={() => toggleLike(task.id)}
                >
                  {liked[task.id] ? "❤️ Liked" : "👍 Like"}
                </Button>
                {task.status !== "complete" && (
                  <Button
                    variant="ghost"
                    className="text-purple-600 hover:bg-purple-100"
                    onClick={() => transferTask(task.id)}
                  >
                    🔄 Transfer
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Interactive Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Share Achievement */}
          <div className="space-y-4 p-6 bg-white rounded-xl shadow-lg border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">🏆</span>
              </div>
              <h2 className="text-xl font-semibold text-blue-600">
                Share Your Achievement
              </h2>
            </div>
            <Textarea
              className="bg-blue-50 border-blue-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 h-32"
              placeholder="I just completed my internship at Google!"
              value={shared}
              onChange={(e) => setShared(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {shared.length}/280 characters
              </span>
              <Button
                onClick={handleShare}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                📤 Share with Community
              </Button>
            </div>
          </div>

          {/* User Experience */}
          <div className="space-y-4 p-6 bg-white rounded-xl shadow-lg border border-green-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">📚</span>
              </div>
              <h2 className="text-xl font-semibold text-green-600">
                Share Your Experience
              </h2>
            </div>
            <Textarea
              className="bg-green-50 border-green-200 focus:border-green-300 focus:ring-2 focus:ring-green-200 h-32"
              placeholder="Describe your recent project or internship experience..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {experience.length}/500 characters
              </span>
              <Button
                onClick={handleExperience}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
              >
                🚀 Submit Experience
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.length}
            </div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter((t) => t.status === "complete").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter((t) => t.priority === "urgent").length}
            </div>
            <div className="text-sm text-gray-600">Urgent</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">
              {Object.values(liked).filter(Boolean).length}
            </div>
            <div className="text-sm text-gray-600">Liked Tasks</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Feature;
