"use client";
import { useState } from "react";

export default function TicketForm({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");

  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("User not logged in");
    return;
  }

  const payload = {
    title,
    description,
    priority,
    userId,
  };

  console.log("Sending payload:", payload);

  try {
    const res = await fetch("http://localhost:5050/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        userId: localStorage.getItem("userId"),
      }),
    });

    const data = await res.json();
    console.log("Backend response:", data);

    if (res.ok) {
      alert("Ticket created successfully");
      setTitle("");
      setDescription("");
      setPriority("Low");
    } else {
      alert(data.message || "Failed to create ticket");
    }
  } catch (error) {
    console.error("Create ticket error:", error);
  }
};

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
      <h2 className="text-2xl font-semibold">Create Ticket</h2>
      <p className="text-sm text-pink-100 mb-6">
        Raise a new support request
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 rounded-lg text-black bg-pink-100 focus:outline-none"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 rounded-lg text-black bg-pink-100 focus:outline-none"
          placeholder="Describe your issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full p-3 rounded-lg text-gray-900 bg-pink-100 focus:outline-none"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          type="submit"
          className="w-full bg-purple-800 hover:bg-purple-900 transition p-3 rounded-lg font-semibold"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
