"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { MenuIcon, MountainIcon, RocketIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (from localStorage or token)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast("Logged out successfully!");
    navigate("/");
  };

  const navLinks = [
    { to: "/features", label: "Features" },
    { to: "/howtowork", label: "How It Works" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline-block">ProgressTrack</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className="hidden md:inline-flex"
              size="sm"
              variant="destructive"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                toast("Welcome back!", {
                  description: "This is progress webpages",
                  duration: 3000,
                });
                navigate("/login");
              }}
              className="hidden md:inline-flex"
              size="sm"
            >
              Login <RocketIcon className="ml-2 h-4 w-4" />
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
              <div className="flex flex-col h-full">
                <div className="border-b p-4">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <MountainIcon className="h-6 w-6 text-primary" />
                    <span>ProgressTrack</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 p-4 text-base font-medium">
                  {navLinks.map((link) => (
                    <SheetClose key={link.label} asChild>
                      <Link
                        to={link.to}
                        className="text-foreground/80 transition-colors hover:text-foreground py-2"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <Separator className="my-2" />
                <div className="p-4 mt-auto">
                  {isLoggedIn ? (
                    <Button
                      onClick={handleLogout}
                      className="w-full"
                      variant="destructive"
                      size="lg"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      onClick={() => navigate("/login")}
                      className="w-full"
                      size="lg"
                    >
                      Get Started <RocketIcon className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} ProgressTrack
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
