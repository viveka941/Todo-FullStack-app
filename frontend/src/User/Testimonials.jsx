"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, QuoteIcon, CheckCircle2Icon } from "lucide-react";
import Navbar from '../Navbar'
import Footer from '../Footer'
// Import icons

// Define theme colors for Tailwind JIT compiler if not using safelisting
// You might need to ensure these classes are generated if they are dynamic:
// e.g., border-t-blue-500, text-blue-500, bg-blue-50
// For simplicity, shadcn/ui primary/accent can also be used if themes are set up.

const themeClasses = {
  blue: {
    border: "border-t-sky-500",
    text: "text-sky-600 dark:text-sky-400",
    bgMuted: "bg-sky-50 dark:bg-sky-900/30",
    iconFill: "fill-sky-500 text-sky-500",
    verifiedIcon: "text-sky-500",
  },
  green: {
    border: "border-t-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bgMuted: "bg-emerald-50 dark:bg-emerald-900/30",
    iconFill: "fill-emerald-500 text-emerald-500",
    verifiedIcon: "text-emerald-500",
  },
  purple: {
    border: "border-t-purple-500",
    text: "text-purple-600 dark:text-purple-400",
    bgMuted: "bg-purple-50 dark:bg-purple-900/30",
    iconFill: "fill-purple-500 text-purple-500",
    verifiedIcon: "text-purple-500",
  },
  pink: {
    border: "border-t-pink-500",
    text: "text-pink-600 dark:text-pink-400",
    bgMuted: "bg-pink-50 dark:bg-pink-900/30",
    iconFill: "fill-pink-500 text-pink-500",
    verifiedIcon: "text-pink-500",
  },
};

const testimonialsData = [
  {
    name: "Aarav Mehta",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=1",
    quote:
      "This task management tool has genuinely revolutionized how I approach my daily goals. The consistency it brings is unparalleled!",
    rating: 5,
    verified: true,
    theme: "blue",
  },
  {
    name: "Sneha Kapoor",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?img=2",
    quote:
      "The task transfer feature is an absolute game-changer for our team's collaboration. It's intuitive and saves us so much time.",
    rating: 5,
    verified: true,
    theme: "green",
  },
  {
    name: "Rahul Verma",
    role: "Freelance Designer",
    image: "https://i.pravatar.cc/150?img=3",
    quote:
      "Being able to share my achievements publicly has been a huge motivation booster. The platform is fantastic and very user-friendly!",
    rating: 4,
    verified: false,
    theme: "purple",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Lead",
    image: "https://i.pravatar.cc/150?img=4",
    quote:
      "I've tried many tools, but this one strikes the perfect balance between simplicity and power. Highly recommend for boosting productivity.",
    rating: 5,
    verified: true,
    theme: "pink",
  },
];

// Star Rating Component
const StarRating = ({
  rating,
  colorClass = "text-yellow-400 fill-yellow-400",
}) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-5 w-5 ${
            i < rating
              ? colorClass
              : "text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <>
      <Navbar />
      <div className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 dark:from-slate-900 dark:via-gray-800 dark:to-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Loved by Professionals Like You
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear directly from our users about how our platform has
              transformed their productivity and goal achievement.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            {" "}
            {/* Usually 2 columns work better for longer testimonials */}
            {testimonialsData.map((t, idx) => {
              const currentTheme = themeClasses[t.theme] || themeClasses.blue; // Fallback to blue
              return (
                <Card
                  key={idx}
                  className={`overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border-t-4 ${currentTheme.border} ${currentTheme.bgMuted}`}
                >
                  <CardContent className="p-6 space-y-4 relative">
                    <QuoteIcon
                      className={`absolute top-4 right-4 h-12 w-12 ${currentTheme.text} opacity-10 dark:opacity-20`}
                    />
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16 border-2 border-white dark:border-gray-700 shadow-md">
                        <AvatarImage src={t.image} alt={t.name} />
                        <AvatarFallback
                          className={`font-semibold ${currentTheme.text} bg-white dark:bg-gray-700`}
                        >
                          {t.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p
                              className={`font-bold text-lg ${currentTheme.text}`}
                            >
                              {t.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                              {t.role}
                            </p>
                          </div>
                          {t.verified && (
                            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                              <CheckCircle2Icon
                                className={`mr-1 h-4 w-4 ${currentTheme.verifiedIcon}`}
                              />
                              Verified User
                            </div>
                          )}
                        </div>
                        <div className="mt-1">
                          <StarRating
                            rating={t.rating}
                            colorClass={`${currentTheme.iconFill}`}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed italic pt-2">
                      “{t.quote}”
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors">
              View All Testimonials
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
