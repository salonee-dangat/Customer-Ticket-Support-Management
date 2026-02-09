"use client";

import { useEffect, useState } from "react";

export default function AdminTickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [priority, setPriority] = useState("");

  //  FETCH ADMIN TICKETS
  const fetchTickets = async (selectedPriority = "") => {
    try {
      setLoading(true);

      const url = selectedPriority
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets?priority=${selectedPriority}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  //  LOAD ON PAGE OPEN
  useEffect(() => {
    fetchTickets();
  }, []);

  //  STATUS BADGE COLOR
  const statusColor = (status: string) => {
    if (status === "Open") return "bg-pink-600";
    if (status === "In Progress") return "bg-purple-600";
    if (status === "Resolved") return "bg-green-600";
    if (status === "Closed") return "bg-gray-700";
    return "bg-gray-700";
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-purple-200 p-6 rounded-xl shadow-xl text-black">
      <h1 className="text-2xl font-bold mb-4">Admin Tickets</h1>

      {/* PRIORITY SORT */}
      <select
        className="mb-6 p-2 rounded border text-black"
        value={priority}
        onChange={(e) => {
          const value = e.target.value;
          setPriority(value);
          fetchTickets(value);
        }}
      >
        <option value="">Sort by Priority</option>
        <option value="High">High → Low</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/*  TICKETS LIST */}
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
                  <b>User:</b>{" "}
                  {ticket.createdBy?.name || "Unknown"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}