"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Added CardHeader, CardTitle
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Share2, Users, Repeat, RocketIcon } from "lucide-react"; // Added 
import Navbar from "../Navbar";
import Footer from "../Footer";
// Theme definitions (as provided above)
const stepThemes = {
  green: {
    iconColor: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    cardBorder: "border-green-500",
    titleColor: "text-green-700 dark:text-green-300",
    cardBgHover: "hover:bg-green-50 dark:hover:bg-green-900/40",
  },
  blue: {
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-800/30",
    cardBorder: "border-blue-500",
    titleColor: "text-blue-700 dark:text-blue-300",
    cardBgHover: "hover:bg-blue-50 dark:hover:bg-blue-900/40",
  },
  purple: {
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-800/30",
    cardBorder: "border-purple-500",
    titleColor: "text-purple-700 dark:text-purple-300",
    cardBgHover: "hover:bg-purple-50 dark:hover:bg-purple-900/40",
  },
  red: {
    // Using 'rose' for Tailwind's red shades for better aesthetics
    iconColor: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-100 dark:bg-rose-800/30",
    cardBorder: "border-rose-500",
    titleColor: "text-rose-700 dark:text-rose-300",
    cardBgHover: "hover:bg-rose-50 dark:hover:bg-rose-900/40",
  },
};

const stepsData = [
  {
    IconComponent: CheckCircle,
    themeKey: "green", // Use a key to look up in stepThemes
    title: "1. Create Your To-Do Task",
    desc: "Easily add your new task, define its status, priority, and assign it to yourself or a teammate for clear ownership.",
  },
  {
    IconComponent: Share2,
    themeKey: "blue",
    title: "2. Share Achievements",
    desc: "Celebrate your progress! Post completed tasks or significant milestones to your activity feed and inspire your colleagues.",
  },
  {
    IconComponent: Users,
    themeKey: "purple",
    title: "3. Submit Experience",
    desc: "Document your journey. Write detailed notes about your experience, challenges faced, and solutions for projects.",
  },
  {
    IconComponent: Repeat,
    themeKey: "red",
    title: "4. Transfer Incomplete Tasks",
    desc: "Flexibility is key. If a task isn't complete or priorities shift, seamlessly reassign it to another team member to maintain momentum.",
  },
];

export default function HowToWork() {
  return (
    <>
      <Navbar />
      <section className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 flex items-center justify-center">
              <RocketIcon className="mr-3 h-8 w-8 text-primary" />
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A simple, streamlined way to manage your tasks, share your
              journey, and collaborate effectively with your team.
            </p>
          </div>

          {/* Removed Separator for a cleaner look with background contrast */}
          {/* <Separator className="my-8 bg-gray-200 dark:bg-gray-700" /> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {stepsData.map((step, index) => {
              const theme = stepThemes[step.themeKey];
              const { IconComponent } = step;
              return (
                <Card
                  key={index}
                  className={`shadow-lg rounded-xl overflow-hidden transition-all duration-300 ease-in-out border-l-4 ${theme.cardBorder} ${theme.cardBgHover} bg-card`}
                >
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className={`p-3 rounded-full ${theme.iconBg}`}>
                        <IconComponent
                          className={`h-7 w-7 ${theme.iconColor}`}
                        />
                      </div>
                      <h3
                        className={`text-xl font-semibold ${
                          theme.titleColor || "text-card-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Ready to get started? Streamline your workflow today!
            </p>
            {/* Optional: Add a CTA button here if relevant */}
            {/* <Button size="lg" className="mt-4">Explore Features</Button> */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
