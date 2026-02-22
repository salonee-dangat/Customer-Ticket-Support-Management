"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

export default function TicketChat() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch ticket
  const fetchTicket = async () => {
    try {
      const res = await fetch(
        `http://localhost:5050/api/tickets/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setTicket(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (ticketId) fetchTicket();
  }, [ticketId]);

  useEffect(() => {
    scrollToBottom();
  }, [ticket]);

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5050/api/tickets/${ticketId}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: newMessage }),
        }
      );

      const updated = await res.json();
      setTicket(updated);
      setNewMessage("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  if (!ticket) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col h-[80vh] bg-white rounded-xl shadow p-4">
      <h2 className="font-bold text-lg mb-4">
        {ticket.title}
      </h2>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {ticket.messages?.map((msg: any, index: number) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "admin" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                msg.sender === "admin"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Type a reply..."
        />
        <button
          onClick={sendMessage}
          className="bg-purple-500 text-white px-5 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}