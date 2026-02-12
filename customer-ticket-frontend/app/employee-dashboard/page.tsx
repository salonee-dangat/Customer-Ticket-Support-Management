"use client";

import { useEffect, useState } from "react";

export default function EmployeeDashboard() {
  const [view, setView] = useState<"home" | "create" | "track">("home");
  const [tickets, setTickets] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
  });
  const [loading, setLoading] = useState(false);

  // ======================
  // FETCH MY TICKETS
  // ======================
  const fetchTickets = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/tickets", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setTickets(data.tickets);
    } catch {
      console.error("Failed to fetch tickets");
    }
  };

  useEffect(() => {
    if (view !== "home") fetchTickets();
  }, [view]);

  // ======================
  // CREATE TICKET
  // ======================
  const handleCreateTicket = async () => {
    if (!form.title || !form.description) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5050/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setForm({ title: "", description: "", priority: "Low" });
        fetchTickets();
      }
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // HOME DASHBOARD
  // ======================
  if (view === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2b1055] via-[#3b0f75] to-[#6a0572] text-white px-12 py-14">

        {/* Welcome */}
        <div className="mb-16 max-w-5xl">
          <h1 className="text-5xl font-semibold mb-4 tracking-tight">
            Hello Employee 👋
          </h1>
          <p className="text-purple-200 text-xl leading-relaxed">
            Welcome to your employee workspace. Create tickets, track progress,
            and manage your support activities — all in one elegant dashboard.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Create Ticket */}
          <div
            onClick={() => setView("create")}
            className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 
                       border border-white/20 backdrop-blur-xl
                       p-10 rounded-[32px] cursor-pointer shadow-2xl
                       hover:scale-[1.03] hover:from-pink-500/30 hover:to-purple-600/30
                       transition-all duration-300"
          >
            <h2 className="text-3xl font-medium mb-4">🎫 Create Ticket</h2>
            <p className="text-purple-100 text-lg leading-relaxed">
              Raise a new support ticket for any issue or request.
              Provide details and submit it instantly for resolution.
            </p>
          </div>

          {/* Track Tickets */}
          <div
            onClick={() => setView("track")}
            className="bg-gradient-to-br from-indigo-500/20 to-purple-700/20 
                       border border-white/20 backdrop-blur-xl
                       p-10 rounded-[32px] cursor-pointer shadow-2xl
                       hover:scale-[1.03] hover:from-indigo-500/30 hover:to-purple-700/30
                       transition-all duration-300"
          >
            <h2 className="text-3xl font-medium mb-4">📊 Track Tickets</h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              View all tickets you have raised, monitor their status,
              and follow updates through the support lifecycle.
            </p>
          </div>

          {/* Account */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl
                          p-10 rounded-[32px] shadow-xl
                          hover:scale-[1.03] hover:bg-white/20
                          transition-all duration-300">
            <h2 className="text-3xl font-medium mb-4">⚙️ Account Overview</h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              You are logged in with employee access. Manage, raise,
              and monitor tickets efficiently within the system.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ======================
  // CREATE / TRACK VIEW
  // ======================
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b1055] via-[#3b0f75] to-[#6a0572] text-white px-10 py-10">
      <button
        onClick={() => setView("home")}
        className="mb-8 text-purple-200 hover:text-white text-lg"
      >
        ← Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* CREATE TICKET */}
        {view === "create" && (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-semibold mb-6">Create Ticket</h2>

            <input
              placeholder="Ticket Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full mb-4 p-4 rounded-xl bg-white/20 outline-none"
            />

            <textarea
              placeholder="Describe your issue..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full mb-4 p-4 rounded-xl bg-white/20 outline-none h-36"
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
              className="w-full mb-6 p-4 rounded-xl bg-white/20 outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button
              onClick={handleCreateTicket}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600
                         hover:opacity-90 py-4 rounded-xl text-lg font-semibold"
            >
              {loading ? "Creating..." : "Submit Ticket"}
            </button>
          </div>
        )}

        {/* MY TICKETS */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-semibold mb-6">My Tickets</h2>

          {tickets.length === 0 ? (
            <p className="text-purple-200">No tickets created yet.</p>
          ) : (
            <div className="space-y-4">
              {tickets.map((t) => (
                <div
                  key={t._id}
                  className="p-5 rounded-2xl bg-white/10 hover:bg-white/20 transition"
                >
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  <p className="text-sm text-purple-200">
                    {t.priority} • {t.status}
                  </p>
                  <p className="text-sm text-purple-300 mt-1">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}