"use client";
import { useEffect, useState, useRef } from "react";

export default function UserTicketChat({ params }: any) {
  const { ticketId } = params;
  const [ticket, setTicket] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchTicket = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setTicket(data);
      scrollToBottom();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
    const interval = setInterval(fetchTicket, 5000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await fetch(`http://localhost:5050/api/tickets/${ticketId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: message }),
      });
      setMessage("");
      fetchTicket();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Loading chat...</p>;
  if (!ticket) return <p className="p-6">Ticket not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col h-[600px]">
      <h2 className="text-xl font-semibold mb-4">{ticket.title}</h2>

      {/* Chat Messages */}
      <div className="border rounded-lg p-4 flex-1 overflow-y-auto space-y-3 bg-gray-50 flex flex-col">
        {ticket.messages?.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet</p>
        ) : (
          ticket.messages.map((msg: any, i: number) => (
            <div
              key={i}
              className={`text-sm p-2 rounded max-w-[80%] ${
                msg.sender?.role === "admin"
                  ? "bg-purple-100 text-purple-800 self-start"
                  : "bg-gray-100 self-end"
              }`}
            >
              <strong>{msg.sender?.role === "admin" ? "Admin" : msg.sender?.name}</strong>: {msg.text}
              <div className="text-xs text-gray-400 mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
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
