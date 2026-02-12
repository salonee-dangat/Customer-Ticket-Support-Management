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
  category: string;
  messages: Message[];
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ Fetch Tickets
  useEffect(() => {
    const fetchTickets = async () => {
      if (!token) {
        setError("Token not found. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5050/api/tickets/my", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("Invalid JSON response", text);
          setError("Server returned invalid response. Check backend.");
          return;
        }

        if (res.ok) {
          setTickets(Array.isArray(data.tickets) ? data.tickets : []);
        } else {
          console.error("Fetch tickets failed", data);
          setError(data.message || "Failed to fetch tickets");
        }
      } catch (err) {
        console.error("FETCH TICKETS ERROR", err);
        setError("Network error while fetching tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  // ✅ Send Message
  const sendMessage = async () => {
    if (!message || !selectedTicket || !token) return;

    try {
      const res = await fetch(
        `http://localhost:5050/api/tickets/${selectedTicket._id}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: message }),
        }
      );

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON response", text);
        setError("Server returned invalid response while sending message");
        return;
      }

      if (res.ok) {
        setSelectedTicket(data.ticket);
        setMessage("");
        // Update ticket list
        setTickets((prev) =>
          prev.map((t) => (t._id === data.ticket._id ? data.ticket : t))
        );
      } else {
        console.error("Send message failed", data);
        setError(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error("SEND MESSAGE ERROR", err);
      setError("Network error while sending message");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a002e] via-[#2a003f] to-[#3b004f] text-purple-200">
        Loading tickets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a002e] via-[#2a003f] to-[#3b004f] text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-[#14001f] via-[#230033] to-[#3a004a] text-white">
      <h1 className="text-3xl font-semibold mb-8 tracking-wide">
        🎫 My Support Tickets
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl">
          <h2 className="text-lg font-medium mb-4 text-pink-200">Your Tickets</h2>

          {tickets.length === 0 ? (
            <p className="text-purple-200">No tickets found</p>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-3 mb-3 rounded-xl cursor-pointer transition-all ${
                  selectedTicket?._id === ticket._id
                    ? "bg-gradient-to-r from-pink-600 to-purple-700"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <p className="font-medium">{ticket.title}</p>
                <p className="text-sm text-purple-200">
                  {ticket.priority} • {ticket.status} • {ticket.category}
                </p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl flex flex-col">
          {selectedTicket ? (
            <>
              <h2 className="font-medium text-pink-200 mb-3">
                {selectedTicket.title}
              </h2>

              <div className="flex-1 overflow-y-auto rounded-xl bg-black/30 p-3 mb-3 space-y-2">
                {selectedTicket.messages?.length ? (
                  selectedTicket.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-xs px-3 py-2 rounded-xl text-sm ${
                        msg.sender === "admin"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 ml-auto text-white"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-purple-300">No messages yet</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-white placeholder-purple-300 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!message}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:opacity-90 disabled:opacity-40"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-purple-300 text-center mt-24">
              Select a ticket to view chat
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
