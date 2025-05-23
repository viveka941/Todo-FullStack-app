import React from "react";
import {
  MountainIcon,
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: <GithubIcon className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: <TwitterIcon className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <LinkedinIcon className="h-5 w-5" />,
    },
  ];

  const footerNavLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
  ];

  return (
    <footer className="w-full bg-background border-t border-border/40 text-foreground/80">
      <div className="w-full px-6 py-10 md:py-12 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-semibold mb-2 text-foreground"
            >
              <MountainIcon className="h-7 w-7 text-primary" />
              <span>ProgressTrack</span>
            </Link>
            <p className="text-sm text-center md:text-left text-foreground/70">
              Helping you achieve your goals, one step at a time.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="text-md font-semibold mb-3 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-md font-semibold mb-3 text-foreground">
              Connect With Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 mt-8 text-center">
          <p className="text-sm text-foreground/60">
            &copy; {currentYear} ProgressTrack. All Rights Reserved.
          </p>
          <p className="text-xs text-foreground/50 mt-1">
            Built with passion in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
