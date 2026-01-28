"use client";
import { useEffect, useState } from "react";

export default function MyTickets({ refreshKey }: { refreshKey: number }) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  const fetchTickets = async () => {
    try {
      const res = await fetch(
        `http://localhost:5050/api/tickets?userId=${userId}&page=${page}&limit=5`
      );
      const data = await res.json();
      setTickets(Array.isArray(data.tickets) ? data.tickets : []);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    }
  };

  fetchTickets();
}, [page, refreshKey]);

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
      <h2 className="text-2xl font-semibold">My Tickets</h2>
      <p className="text-sm text-purple-200 mb-6">
        Tickets raised by you
      </p>

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            
            className=" p-4 rounded-xl bg-black/30 border border-pink-300"
          >
            <p className="font-medium">{ticket.title}</p>
            <span className="text-sm text-pink-200">
              {ticket.priority} Priority
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-1 rounded bg-purple-800"
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
    </div>
  );
}
