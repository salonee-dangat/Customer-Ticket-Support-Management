"use client";

import { useEffect, useRef, useState } from "react";

export default function TicketChat({ ticket }: { ticket: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Logged-in user data
  const currentUserId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId")
      : null;

  useEffect(() => {
    if (ticket?.messages) {
      setMessages(ticket.messages);
    }
  }, [ticket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${ticket._id}/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ text: input }),
      }
    );

    if (res.ok) {
      const newMessage = await res.json();
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    }
  };

  if (!ticket) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a ticket to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[80vh] bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-3">{ticket.title}</h2>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto space-y-3 bg-gray-50 p-3 rounded-lg">
        {messages?.map((msg: any, index: number) => {
          if (!msg) return null;

          // Handle both string & object sender
          let senderId = "";

          if (typeof msg.sender === "string") {
            senderId = msg.sender;
          } else if (msg.sender && msg.sender._id) {
            senderId = msg.sender._id;
          }

          const isCurrentUser =
            senderId &&
            currentUserId &&
            senderId.toString() === currentUserId.toString();

          return (
            <div
              key={index}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 text-sm rounded-2xl shadow ${
                  isCurrentUser
                    ? "bg-purple-600 text-white rounded-br-none"
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
        })}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-5 py-2 rounded-full hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}