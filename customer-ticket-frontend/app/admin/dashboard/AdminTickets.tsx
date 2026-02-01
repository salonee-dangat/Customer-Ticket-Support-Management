"use client";

import { useEffect, useState } from "react";

export default function AdminTickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
  });

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams(filters as any).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets?${params}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      // ✅ FIX: set tickets to the array, not the object
      setTickets(data.tickets || []); 
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setTickets([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search filter
  const filteredTickets = (tickets || []).filter((ticket) =>
    ticket.title.toLowerCase().includes(search.toLowerCase()) ||
    ticket.description.toLowerCase().includes(search.toLowerCase())
  );

  // Summary counts
  const total = filteredTickets.length;
  const open = filteredTickets.filter((t) => t.status === "open").length;
  const closed = filteredTickets.filter((t) => t.status === "closed").length;

  const badgeColor = (status: string) => {
    if (status === "open") return "bg-pink-600";
    if (status === "in-progress") return "bg-purple-600";
    return "bg-gray-700";
  };

  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-6 shadow-xl text-white">
      {/* Search */}
      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 rounded text-black"
      />

      {/* Summary */}
      <div className="flex gap-6 mb-6 font-semibold">
        <span>Total: {total}</span>
        <span>Open: {open}</span>
        <span>Closed: {closed}</span>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-black">
        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Category</option>
          <option value="technical">Technical</option>
          <option value="billing">Billing</option>
          <option value="general">General</option>
        </select>
      </div>

      {/* Tickets List */}
      {loading ? (
        <p className="text-center animate-pulse font-medium">Loading tickets...</p>
      ) : filteredTickets.length === 0 ? (
        <p className="text-center font-medium">No tickets found</p>
      ) : (
        filteredTickets.map((ticket: any) => (
          <div key={ticket._id} className="bg-white text-black p-4 rounded-lg mb-3 shadow">
            <h3 className="font-semibold text-lg">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <div className="text-sm mt-2 flex gap-3 items-center">
              <span className={`px-2 py-1 rounded text-white text-xs font-semibold ${badgeColor(ticket.status)}`}>
                {ticket.status}
              </span>
              <span>Priority: {ticket.priority}</span>
              <span>Category: {ticket.category}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
