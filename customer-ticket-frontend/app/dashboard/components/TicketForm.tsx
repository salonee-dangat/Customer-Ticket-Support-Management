"use client";
import { useState } from "react";

interface TicketFormProps {
  onCreated: () => void; // callback to refresh tickets
}

export default function TicketForm({ onCreated }: TicketFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5050/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send JWT cookie
        body: JSON.stringify({ title, description, priority }),
      });

      const data = await res.json();
      console.log("🔥 Backend response:", data);

      if (res.ok) {
        // Reset form
        setTitle("");
        setDescription("");
        setPriority("Low");

        // Notify parent to refresh tickets
        onCreated();
      } else {
        setError(data.message || "Failed to create ticket");
      }
    } catch (err) {
      console.error("🔥 Create ticket error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white shadow-lg">
      <h2 className="text-2xl font-semibold">Create Ticket</h2>
      <p className="text-sm text-pink-100 mb-6">Raise a new support request</p>

      {error && <p className="text-red-200 mb-2">{error}</p>}

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
          disabled={loading}
          className="w-full bg-purple-800 hover:bg-purple-900 transition p-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
}
