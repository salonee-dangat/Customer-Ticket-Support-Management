"use client";

import { useEffect, useRef, useState } from "react";

export default function TicketChat({ ticket }: { ticket: any }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ Get userId directly from token (100% match with backend)
  const getCurrentUserIdFromToken = () => {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (err) {
      return null;
    }
  };

  const currentUserId = getCurrentUserIdFromToken();

  // ✅ Sync messages when ticket changes (history fix)
  useEffect(() => {
    if (ticket?.messages) {
      setMessages(ticket.messages);
    }
  }, [ticket?._id]);

  // ✅ Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const res = await fetch(
      `http://localhost:5050/api/tickets/${ticket._id}/message`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: message }),
      }
    );

    if (res.ok) {
      setMessage("");

      // ✅ Re-fetch updated ticket (ADMIN refresh issue solved)
      const updated = await fetch(
        `http://localhost:5050/api/tickets/${ticket._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedTicket = await updated.json();
      setMessages(updatedTicket.messages);
    }
  };

  if (!ticket) {
    return (
      <div className="w-1/2 bg-white rounded-xl p-4 shadow flex items-center justify-center text-gray-400">
        Select a ticket to view chat
      </div>
    );
  }

  return (
    <div className="w-1/2 bg-white rounded-xl p-4 shadow flex flex-col">
      <h3 className="font-semibold mb-3">{ticket.title}</h3>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 border rounded p-3 bg-gray-50">
        {messages.length > 0 ? (
          messages.map((msg: any, i: number) => {
            const senderId =
              typeof msg.sender === "object"
                ? msg.sender?._id
                : msg.sender;

            const isSender =
              senderId?.toString() === currentUserId?.toString();

            return (
              <div
                key={i}
                className={`flex ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 text-sm rounded-2xl shadow ${
                    isSender
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.createdAt && (
                    <p className="text-[10px] mt-1 text-right opacity-70">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-400 text-center">
            No messages yet
          </p>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}