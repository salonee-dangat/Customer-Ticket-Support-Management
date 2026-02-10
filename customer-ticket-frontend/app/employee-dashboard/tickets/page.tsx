"use client";

import { useState, useEffect, useRef } from "react";

interface MyTicketsProps {
  refreshKey: number;
}

export default function MyTickets({ refreshKey }: MyTicketsProps) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const USER_ID = "YOUR_LOGGED_IN_USER_ID"; // replace with actual logged-in user ID from auth

  // Scroll to bottom helper
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch tickets
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5050/api/tickets?page=${page}&limit=5`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setTickets(Array.isArray(data.tickets) ? data.tickets : []);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [page, refreshKey]);

  // Open single ticket (fetch messages)
  const openTicket = async (ticketId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5050/api/tickets/${ticketId}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setSelectedTicket(data.ticket);
    } catch (err) {
      console.error("Failed to open ticket", err);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!message.trim() || !selectedTicket) return;

    setSending(true);
    try {
      await fetch(
        `http://localhost:5050/api/tickets/${selectedTicket._id}/message`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: message }),
        }
      );

      // Optimistically update messages locally
      setSelectedTicket((prev: any) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { sender: USER_ID, text: message, createdAt: new Date().toISOString() },
        ],
      }));

      setMessage("");
      scrollToBottom();
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setSending(false);
    }
  };

  // Auto-scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [selectedTicket?.messages]);

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
      <h2 className="text-2xl font-semibold">My Tickets</h2>
      <p className="text-sm text-purple-200 mb-6">Tickets raised by you</p>

      {/* BACK BUTTON */}
      {selectedTicket && (
        <button
          onClick={() => setSelectedTicket(null)}
          className="text-sm mb-3 underline"
        >
          ← Back to tickets
        </button>
      )}

      {/* TICKET LIST */}
      {!selectedTicket ? (
        loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => openTicket(ticket._id)}
                className="p-4 rounded-xl bg-black/30 border border-pink-300 cursor-pointer hover:bg-black/40"
              >
                <p className="font-medium">{ticket.title}</p>
                <span className="text-sm text-pink-200">
                  {ticket.priority || "Low"} Priority • {ticket.status}
                </span>
              </div>
            ))}
          </div>
        )
      ) : (
        /* CHAT VIEW */
        <>
          <h3 className="font-semibold mb-2">{selectedTicket.title}</h3>

          <div className="bg-black/30 rounded-lg p-3 h-60 overflow-y-auto flex flex-col space-y-2">
            {selectedTicket.messages?.length > 0 ? (
              selectedTicket.messages.map((msg: any, i: number) => (
                <div
                  key={i}
                  className={`text-sm p-2 rounded w-fit max-w-[70%] break-words ${
                    msg.sender === USER_ID
                      ? "bg-blue-200 text-black self-end"
                      : "bg-pink-200 text-black self-start"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-600 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-purple-200">No messages yet</p>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* SEND MESSAGE */}
          <div className="flex gap-2 mt-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded px-3 py-2 text-black text-sm"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={sending}
              className="bg-purple-800 px-4 rounded disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </>
      )}

      {/* PAGINATION */}
      {!selectedTicket && (
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-1 rounded bg-purple-800 disabled:opacity-50"
            disabled={page === 1}
          >
            Previous
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1 rounded bg-purple-800"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}