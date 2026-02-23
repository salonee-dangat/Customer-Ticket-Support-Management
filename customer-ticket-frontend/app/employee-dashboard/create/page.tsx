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
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-fuchsia-600 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">🎫 Create Ticket</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: CREATE FORM */}
        <div className="bg-white/15 p-6 rounded-2xl backdrop-blur-lg shadow-xl">
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
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all py-3 rounded-lg shadow-lg"
          >
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </div>

        {/* RIGHT: MY TICKETS */}
        <div className="bg-white/15 p-6 rounded-2xl backdrop-blur-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4">📊 My Tickets</h2>

          {tickets.length === 0 ? (
            <p className="text-white/80">No tickets yet</p>
          ) : (
            tickets.map((t) => (
              <div
                key={t._id}
                className="bg-white/20 rounded-xl p-4 mb-3 backdrop-blur-md"
              >
                <p className="font-semibold text-white">{t.title}</p>
                <p className="text-sm text-white/80">
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