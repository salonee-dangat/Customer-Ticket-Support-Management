"use client";

import { useEffect, useState } from "react";

export default function AdminTickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);

      let query = [];

      if (priority) query.push(`priority=${priority}`);
      if (status) query.push(`status=${status}`);
      if (search) query.push(`search=${search}`);
      if (category) query.push(`category=${category}`);

      const queryString = query.length ? `?${query.join("&")}` : "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [priority, status, search, category]);

  const statusColor = (status: string) => {
    if (status === "Open") return "bg-pink-600";
    if (status === "In Progress") return "bg-purple-600";
    if (status === "Resolved") return "bg-green-600";
    if (status === "Closed") return "bg-gray-700";
    return "bg-gray-700";
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-purple-200 p-6 rounded-xl shadow-xl text-black">
      <h1 className="text-2xl font-bold mb-6">Admin Tickets</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by title..."
        className="p-2 border rounded mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎛 FILTERS */}
      <div className="flex flex-wrap gap-4 mb-6">

        {/* Priority */}
        <select
          className="p-2 rounded border"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Filter by Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Status */}
        <select
          className="p-2 rounded border"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Category */}
        <select
          className="p-2 rounded border"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Filter by Category</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
          <option value="General">General</option>
        </select>

      </div>

      {/* TICKETS */}
      {loading ? (
        <p className="text-center animate-pulse">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-center">No tickets found</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
              <p className="text-sm">{ticket.description}</p>

              <div className="flex gap-4 items-center mt-3 text-sm">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${statusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </span>

                <span>
                  <b>Priority:</b> {ticket.priority}
                </span>

                <span>
                  <b>Category:</b> {ticket.category || "N/A"}
                </span>

                <span>
                  <b>User:</b> {ticket.createdBy?.name || "Unknown"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
