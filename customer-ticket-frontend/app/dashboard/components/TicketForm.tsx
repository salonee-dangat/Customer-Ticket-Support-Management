"use client";

import { useEffect, useState } from "react";

export default function TicketForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [userId, setUserId] = useState<string | null>(null);

 
  useEffect(() => {
    const id = localStorage.getItem("userId");
    console.log("User Id From LS", id);
    setUserId(id);
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const res = await fetch("http://localhost:5050/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        userId,
      }),
    });

    if (res.ok) {
      onSuccess();
      setTitle("");
      setDescription("");
      setPriority("Low");
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
      <h2 className="text-2xl font-semibold">Create Ticket</h2>
      <p className="text-sm text-pink-100 mb-6">Raise a new support request</p>

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
          
          className="w-full bg-purple-800 hover:bg-purple-900 transition p-3 rounded-lg font-semibold disabled:opacity-50"
        
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
