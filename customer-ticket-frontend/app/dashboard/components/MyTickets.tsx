"use client";
import { useEffect, useState } from "react";

interface MyTicketsProps {
  refreshKey: number;
  search: string;
  filters: {
    status: string;
    priority: string;
    category: string;
  };
}

export default function MyTickets({
  refreshKey,
  search,
  filters,
}: MyTicketsProps) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5050/api/tickets?page=${page}&limit=5`,
          {
            credentials: "include", // send JWT cookie
          }
        );
        const data = await res.json();
        setTickets(Array.isArray(data.tickets) ? data.tickets : []);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [page, refreshKey]);

  // 🔍 SEARCH + FILTER LOGIC (client-side)
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filters.status
      ? ticket.status === filters.status
      : true;

    const matchesPriority = filters.priority
      ? ticket.priority === filters.priority
      : true;

    const matchesCategory = filters.category
      ? ticket.category === filters.category
      : true;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesCategory
    );
  });

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
      <h2 className="text-2xl font-semibold">My Tickets</h2>
      <p className="text-sm text-purple-200 mb-6">Tickets raised by you</p>

      {loading ? (
        <p>Loading tickets...</p>
      ) : filteredTickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="space-y-3">
          {filteredTickets.map((ticket: any) => (
            <div
              key={ticket._id}
              className="p-4 rounded-xl bg-black/30 border border-pink-300"
            >
              <p className="font-medium">{ticket.title}</p>

              <div className="text-sm text-pink-200 flex gap-4 mt-1">
                <span>{ticket.priority || "Low"} Priority</span>
                <span>{ticket.status || "open"}</span>
                <span>{ticket.category || "general"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
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
    </div>
  );
}
