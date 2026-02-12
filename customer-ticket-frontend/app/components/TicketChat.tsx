"use client";

import { useEffect, useRef, useState } from "react";

export default function TicketChat({ ticket }: { ticket: any }) {
  const [message, setMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  if (!ticket) {
    return (
      <div className="w-1/2 bg-white rounded-xl p-4 shadow flex items-center justify-center text-gray-400">
        Select a ticket to view chat
      </div>
    );
  }

  const sendMessage = async () => {
    if (!message.trim()) return;

    await fetch(
      `http://localhost:5050/api/tickets/${ticket._id}/message`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", 
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify({ text: message }),
      }
    );

    setMessage("");
  };

  return (
    <div className="w-1/2 bg-white rounded-xl p-4 shadow flex flex-col">
      <h3 className="font-semibold mb-2">{ticket.title}</h3>

      <div className="flex-1 border rounded p-3 overflow-y-auto space-y-2">
        {ticket.messages?.length ? (
          ticket.messages.map((msg: any, i: number) => (
            <div
              key={i}
              className={`max-w-xs p-2 rounded ${
                msg.sender === "admin"
                  ? "bg-purple-600 text-white ml-auto"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No messages yet</p>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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