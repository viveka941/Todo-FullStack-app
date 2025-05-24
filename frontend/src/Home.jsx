import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RocketIcon, CalendarIcon, LineChartIcon, ListChecksIcon, UsersIcon, MessageSquareIcon, ArrowRightIcon, ZapIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-6 flex flex-col items-center space-y-10 md:space-y-16 pb-16">
        {/* Hero Card */}
        <Card className="w-full max-w-2xl text-center bg-white/90 shadow-xl rounded-2xl backdrop-blur-md mt-10">
          <CardContent className="p-8 space-y-6">
            <RocketIcon className="mx-auto text-indigo-600 mb-4" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome to Your Progress Tracker
            </h1>
            <p className="text-lg text-gray-700">
              Track goals, measure daily progress, and celebrate your wins with
              an intuitive dashboard designed for productivity.
            </p>
            <Button
              onClick ={()=>navigate("/login")}
              size="lg"
              className="w-full md:w-auto px-8 py-6 text-lg group"
            >
              Get Started Now{" "}
              <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Feature Section */}
        <section className="w-full max-w-5xl">
          <h2 className="text-3xl font-semibold text-center mb-8 text-white">
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/90 text-gray-800 text-center p-6 backdrop-blur-md shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <CardHeader>
                <RocketIcon
                  className="mx-auto text-indigo-600 mb-3"
                  size={36}
                />
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Set Your Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Create personal or professional goals and organize them with
                  ease. Define clear objectives and milestones.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 text-gray-800 text-center p-6 backdrop-blur-md shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <CardHeader>
                <CalendarIcon
                  className="mx-auto text-purple-600 mb-3"
                  size={36}
                />
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Track Daily Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Log your achievements daily and get visual updates on your
                  journey towards success.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 text-gray-800 text-center p-6 backdrop-blur-md shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <CardHeader>
                <LineChartIcon
                  className="mx-auto text-pink-600 mb-3"
                  size={36}
                />
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Analyze & Improve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Review weekly insights and detailed reports to improve your
                  consistency and performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-8 text-white">
            How It Works
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full bg-white/90 text-gray-900 p-6 rounded-xl shadow-lg backdrop-blur-md"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                <ListChecksIcon className="mr-3 text-indigo-500" /> Step 1:
                Define Your Ambitions
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-left pl-10">
                Start by outlining what you want to achieve. Break down big
                goals into smaller, manageable tasks. Our platform makes it easy
                to set clear, actionable objectives.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                <CalendarIcon className="mr-3 text-purple-500" /> Step 2: Log
                Efforts Consistently
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-left pl-10">
                Make it a habit to record your progress daily or weekly. Note
                down completed tasks, time spent, and any challenges
                encountered.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                <LineChartIcon className="mr-3 text-pink-500" /> Step 3:
                Visualize & Adapt
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-left pl-10">
                Use our intuitive dashboards to see how far you've come. Analyze
                your patterns, celebrate milestones, and adjust your strategy to
                stay on track.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Testimonials Section */}
        <section className="w-full max-w-5xl">
          <h2 className="text-3xl font-semibold text-center mb-8 text-white">
            Loved by Achievers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/90 text-gray-800 backdrop-blur-md shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="mb-4 h-16 w-16">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <MessageSquareIcon className="text-purple-500 mb-2" size={24} />
                <p className="text-gray-700 italic mb-3">
                  "This tracker revolutionized how I approach my personal
                  projects. Seeing my progress visually is incredibly
                  motivating!"
                </p>
                <p className="font-semibold text-gray-900">- Alex P.</p>
                <p className="text-sm text-gray-600">Software Developer</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 text-gray-800 backdrop-blur-md shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="mb-4 h-16 w-16">
                  <AvatarImage
                    src="https://github.com/randomuser2.png"
                    alt="User B"
                  />{" "}
                  {/* Replace with actual or placeholder */}
                  <AvatarFallback>JB</AvatarFallback>
                </Avatar>
                <MessageSquareIcon className="text-purple-500 mb-2" size={24} />
                <p className="text-gray-700 italic mb-3">
                  "Finally, a tool that's both powerful and easy to use. My
                  productivity has soared since I started using it."
                </p>
                <p className="font-semibold text-gray-900">- Jamie B.</p>
                <p className="text-sm text-gray-600">Freelance Designer</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 text-gray-800 backdrop-blur-md shadow-lg rounded-xl hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              {" "}
              {/* Adjust span for responsiveness */}
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="mb-4 h-16 w-16">
                  <AvatarImage
                    src="https://github.com/randomuser3.png"
                    alt="User C"
                  />{" "}
                  {/* Replace with actual or placeholder */}
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <MessageSquareIcon className="text-purple-500 mb-2" size={24} />
                <p className="text-gray-700 italic mb-3">
                  "The analytics feature helps me understand my peak performance
                  times. Highly recommended for anyone serious about their
                  goals."
                </p>
                <p className="font-semibold text-gray-900">- Samira K.</p>
                <p className="text-sm text-gray-600">Entrepreneur</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final Call to Action Section */}
        <section className="w-full max-w-3xl text-center">
          <Card className="bg-white/90 shadow-xl rounded-2xl backdrop-blur-md overflow-hidden">
            <CardContent className="p-8 md:p-12 space-y-6">
              <ZapIcon className="mx-auto text-indigo-600 mb-4" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Ready to Supercharge Your Productivity?
              </h2>
              <p className="text-lg text-gray-700">
                Join thousands of users who are achieving their dreams one task
                at a time. Sign up today and take the first step towards a more
                organized and successful life.
              </p>
              <Button
              onClick={()=>navigate("/login")}
                size="lg"
                className="w-full md:w-auto px-10 py-6 text-lg group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Start Your Journey{" "}
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
      
        <Footer/>
      </div>
    </>
  );
}