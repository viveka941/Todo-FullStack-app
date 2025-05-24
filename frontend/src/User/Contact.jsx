"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  SendIcon,
  BuildingIcon,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // To reset the form after submission
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    console.log("Contact form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    // In a real application, you would send this data to your backend:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
    //   if (response.ok) {
    //     alert("Message sent successfully!");
    //     reset();
    //   } else {
    //     alert("Failed to send message. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Contact form submission error:", error);
    //   alert("An error occurred. Please try again.");
    // }
    alert("Message sent successfully! (Simulated)");
    reset();
  };

  const contactDetails = [
    {
      icon: <MapPinIcon className="h-6 w-6 text-sky-500" />,
      label: "Our Office",
      value: "123 Innovation Drive, Tech Park, Bangalore, KA 560001, India",
      href: "https://maps.google.com/?q=123+Innovation+Drive,+Tech+Park,+Bangalore",
    },
    {
      icon: <MailIcon className="h-6 w-6 text-emerald-500" />,
      label: "Email Us",
      value: "support@progresstrack.com",
      href: "mailto:support@progresstrack.com",
    },
    {
      icon: <PhoneIcon className="h-6 w-6 text-amber-500" />,
      label: "Call Us",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-100 dark:via-purple-100 dark:to-pink-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-indigo-100 dark:text-indigo-200 max-w-2xl mx-auto">
            We're here to help and answer any question you might have. We look
            forward to hearing from you!
          </p>
        </div>

        <div className="w-full max-w-5xl lg:grid lg:grid-cols-5 gap-8 md:gap-12">
          {/* Contact Form Section */}
          <Card className="lg:col-span-3 shadow-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                Send us a Message
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Fill out the form and our team will get back to you within 24
                hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                id="contact-form"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-gray-700 dark:text-gray-200"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      {...register("name", {
                        required: "Full name is required.",
                      })}
                      className={`bg-white/70 dark:bg-slate-800/60 ${
                        errors.name
                          ? "border-destructive"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 dark:text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 dark:text-gray-200"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address.",
                        },
                      })}
                      className={`bg-white/70 dark:bg-slate-800/60 ${
                        errors.email
                          ? "border-destructive"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 dark:text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="subject"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What can we help you with?"
                    {...register("subject", {
                      required: "Subject is required.",
                    })}
                    className={`bg-white/70 dark:bg-slate-800/60 ${
                      errors.subject
                        ? "border-destructive"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    aria-invalid={errors.subject ? "true" : "false"}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="message"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    rows={5}
                    {...register("message", {
                      required: "Message is required.",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters.",
                      },
                    })}
                    className={`bg-white/70 dark:bg-slate-800/60 ${
                      errors.message
                        ? "border-destructive"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                form="contact-form"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <>
                    <SendIcon className="mr-2 h-5 w-5" /> Send Message
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Contact Information Section */}
          <div className="lg:col-span-2 mt-10 lg:mt-0">
            <Card className="shadow-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <BuildingIcon className="mr-3 h-6 w-6 text-purple-500" />{" "}
                  Contact Information
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Reach out to us directly through any of these channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactDetails.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 mt-1 p-2 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full group-hover:scale-110 transition-transform">
                      {detail.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {detail.label}
                      </h4>
                      <a
                        href={detail.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-sky-400 transition-colors break-words"
                      >
                        {detail.value}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-6">
                <p className="text-xs text-center w-full text-gray-500 dark:text-gray-400">
                  Business Hours: Mon - Fri, 9:00 AM - 6:00 PM (IST)
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
}
