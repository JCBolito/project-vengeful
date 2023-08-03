"use client";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";
export default function Home() {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });

  async function handleSend(event: FormEvent) {
    event.preventDefault();
    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setFormData({ subject: "", email: "", message: "" });
  }

  function handleFormChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  console.log(formData);
  return (
    <main className="flex h-screen items-center justify-center">
      <section className="w-full max-w-sm">
        <form onSubmit={handleSend} className="grid gap-4">
          <h1 className="text-center text-xl font-bold">Project Vengeful</h1>
          <Label>
            Subject
            <Input
              type="text"
              name="subject"
              onChange={handleFormChange}
              value={formData.subject}
              required
            />
          </Label>
          <Label>
            Enter an email address to send an email to
            <Input
              type="email"
              name="email"
              onChange={handleFormChange}
              value={formData.email}
              required
            />
          </Label>
          <Label>
            Enter your message
            <Textarea
              name="message"
              onChange={handleFormChange}
              required
              value={formData.message}
            />
          </Label>
          <Button>Send</Button>
        </form>
      </section>
    </main>
  );
}
