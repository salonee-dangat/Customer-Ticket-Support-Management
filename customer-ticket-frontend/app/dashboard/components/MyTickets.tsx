"use client";
import { useEffect, useState } from "react";
import TicketChat from "@/app/components/TicketChat";

interface MyTicketsProps {
  refreshKey: number;
}

export default function MyTickets({ refreshKey }: MyTicketsProps) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5050/api/tickets?page=${page}&limit=5`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await res.json();
      setTickets(Array.isArray(data.tickets) ? data.tickets : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [page, refreshKey]);

  const openTicket = async (id: string) => {
    const res = await fetch(
      `http://localhost:5050/api/tickets/${id}`,
      {
        credentials: "include",
        cache: "no-store",
      }
    );
    const data = await res.json();
    setSelectedTicket(data);
  };

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white shadow-xl flex gap-6">

      {/* LEFT SIDE → Ticket List */}
      <div className="w-1/2">
        <h2 className="text-2xl font-semibold mb-4">My Tickets</h2>

        {loading ? (
          <p>Loading...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((t) => (
              <div
                key={t._id}
                onClick={() => openTicket(t._id)}
                className="p-4 bg-white/15 rounded-xl cursor-pointer hover:bg-white/25 transition"
              >
                <p className="font-semibold text-lg">{t.title}</p>
                <span className="text-sm text-white/80">
                  {t.priority} • {t.status}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-white/20 px-4 py-1 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-white/20 px-4 py-1 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT SIDE → Chat */}
      <TicketChat ticket={selectedTicket} />
    </div>
  );
}