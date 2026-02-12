"use client";

import { useEffect, useState } from "react";

interface Message {
  sender: string;
  text: string;
  createdAt: string;
}

interface Ticket {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  messages: Message[];
  category?: string;
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ status: "", priority: "", category: "" });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchTickets = async () => {
    try {
      const query = new URLSearchParams(filters as any).toString();
      const res = await fetch(`http://localhost:5050/api/admin/tickets?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const fetchTicketMessages = async (ticketId: string) => {
    try {
      const res = await fetch(`http://localhost:5050/api/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSelectedTicket(data.ticket);
    } catch (err) {
      console.error("Failed to fetch ticket messages", err);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedTicket) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5050/api/tickets/${selectedTicket._id}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: message }),
      });
      const data = await res.json();
      if (data.ticket) {
        setSelectedTicket(data.ticket);
        setTickets((prev) =>
          prev.map((t) => (t._id === data.ticket._id ? data.ticket : t))
        );
      }
      setMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-[calc(100vh-2rem)]">
      {/* Ticket List */}
      <div className="md:w-1/2 bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-xl flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-4 text-purple-900">All Tickets</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border px-2 py-1 rounded bg-white/40 text-black"
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="border px-2 py-1 rounded bg-white/40 text-black"
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="border px-2 py-1 rounded bg-white/40 text-black"
          >
            <option value="">All Category</option>
            <option value="General">General</option>
            <option value="Login">Login</option>
            <option value="Payment">Payment</option>
            <option value="Feature">Feature</option>
          </select>
        </div>

        {/* Tickets */}
        <div className="flex-1 overflow-y-auto">
          {tickets.length === 0 && <p className="text-purple-900 text-center mt-4">No tickets found</p>}
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              onClick={() => fetchTicketMessages(ticket._id)}
              className={`p-3 mb-2 rounded-lg cursor-pointer transition-all ${
                selectedTicket?._id === ticket._id
                  ? "bg-gradient-to-r from-pink-600 to-purple-700 text-white"
                  : "bg-white/30 hover:bg-white/50 text-black"
              }`}
            >
              <p className="font-medium">{ticket.title}</p>
              <p className="text-sm">{ticket.priority} • {ticket.status} • {ticket.category || "General"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="md:w-1/2 flex flex-col bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-xl h-full">
        {!selectedTicket ? (
          <p className="text-purple-900 text-center m-auto">Select a ticket to view chat</p>
        ) : (
          <>
            <h2 className="font-semibold text-purple-900 mb-2">{selectedTicket.title}</h2>

            <div className="flex-1 overflow-y-auto mb-3 p-2 space-y-2 border rounded bg-black/20">
              {selectedTicket.messages?.length ? (
                selectedTicket.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-xs p-2 rounded ${
                      msg.sender === "admin"
                        ? "bg-purple-700 text-white ml-auto"
                        : "bg-white/40 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-300">No messages yet</p>
              )}
            </div>

            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type reply..."
                className="flex-1 border rounded px-3 py-2 bg-white/50 text-black focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-700 text-white rounded disabled:opacity-70"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}