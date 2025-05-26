"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { number } from "framer-motion";

export default function SlackSummaryForm() {
  const [formData, setFormData] = useState({
    userId: "",
    status: "",
    priority: "",
    fromDate: "",
    toDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/slack/summrize",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { status, message } = res.data;

      if (status === "ok") {
        toast({
          title: "Summary Sent 🎯",
          description: message,
        });
      } else {
        toast({
          title: "No Summary",
          description: message || "No tasks found",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong while sending the summary",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <Card className="w-full max-w-xl p-6 space-y-6">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Send Task Summary to Slack 📋</h2>
          <Separator />

          {["userId", "status", "priority"].map((field) => (
            <div key={field} className="space-y-1">
              <Label htmlFor={field} className="capitalize">
                {field}
              </Label>
              <Input
              type={number}
                id={field}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="fromDate">From Date</Label>
              <Input
                type="date"
                name="fromDate"
                id="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="toDate">To Date</Label>
              <Input
                type="date"
                name="toDate"
                id="toDate"
                value={formData.toDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send Summary"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
