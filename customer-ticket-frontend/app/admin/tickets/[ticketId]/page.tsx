"use client";
import { useEffect, useState } from "react";

export default function TicketChat({ params }: any) {
  const { ticketId } = params;
  const [ticket, setTicket] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTicket = async () => {
    try {
      const res = await fetch(
        `http://localhost:5050/api/tickets/${ticketId}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setTicket(data);
    } catch (err) {
      console.error("Failed to load ticket", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    await fetch(
      `http://localhost:5050/api/tickets/${ticketId}/message`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }
    );

    setMessage("");
    fetchTicket(); // refresh chat
  };

  if (loading) return <p className="p-6">Loading chat...</p>;
  if (!ticket) return <p className="p-6">Ticket not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {ticket.title}
      </h2>

      {/* Chat Messages */}
      <div className="border rounded-lg p-4 h-80 overflow-y-auto space-y-3 bg-gray-50">
        {ticket.messages?.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet</p>
        ) : (
          ticket.messages.map((msg: any, i: number) => (
            <div key={i} className="text-sm">
              <span className="font-semibold">
                {msg.sender === "admin" ? "Admin" : "You"}:
              </span>{" "}
              {msg.message || msg.text}
            </div>
          ))
        )}
      </div>

      {/* Message Box */}
      <div className="flex gap-2 mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
