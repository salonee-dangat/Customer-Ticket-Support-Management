"use client";

import { useEffect, useState } from "react";

export default function CreateTicketPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch my tickets
  const fetchTickets = async () => {
    const res = await fetch("http://localhost:5050/api/tickets/my", {
      credentials: "include",
    });
    const data = await res.json();
    setTickets(data.tickets || []);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Create ticket
  const handleSubmit = async () => {
    if (!title || !description) return;

    setLoading(true);
    await fetch("http://localhost:5050/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, description, priority }),
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
    setLoading(false);
    fetchTickets();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">🎫 Create Ticket</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: CREATE FORM */}
        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ticket Title"
            className="w-full p-3 rounded mb-4 text-black"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your issue"
            className="w-full p-3 rounded mb-4 text-black h-32"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 rounded mb-4 text-black"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 py-3 rounded-lg"
          >
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </div>

        {/* RIGHT: MY TICKETS */}
        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg">
          <h2 className="text-xl font-semibold mb-4">📊 My Tickets</h2>

          {tickets.length === 0 ? (
            <p className="text-purple-200">No tickets yet</p>
          ) : (
            tickets.map((t) => (
              <div
                key={t._id}
                className="border border-white/20 rounded p-3 mb-3"
              >
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-purple-200">
                  {t.priority} • {t.status}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
