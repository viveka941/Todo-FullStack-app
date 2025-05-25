"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

export default function SlackMessageForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/slack/message", {
        message,
      });

      toast.success(response.data.message || "Message sent to Slack");
      setMessage("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send message to Slack"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <Card className="w-full max-w-lg p-6">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Send Slack Message 🚀</h2>
          <Textarea
            placeholder="Type your message to Slack..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
