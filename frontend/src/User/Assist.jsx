"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function Assist() {
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("http://localhost:5000/task/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">AI Task Assistant</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Label htmlFor="prompt">Enter your request</Label>
          <Textarea
            id="prompt"
            placeholder="e.g., What are my pending tasks?"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </Button>
        </CardContent>
      </Card>

      {response && (
        <Card className="mt-6">
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-lg font-semibold">Assistant Response</h2>
            <Separator />
            <pre className="text-sm whitespace-pre-wrap bg-muted p-4 rounded">
              {JSON.stringify(response, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
