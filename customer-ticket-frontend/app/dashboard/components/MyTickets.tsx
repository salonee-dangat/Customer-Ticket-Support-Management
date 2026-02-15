"use client";
import { useEffect, useState } from "react";

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

  // Filters
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: "5",
        search,
        priority,
        status,
      }).toString();

      const res = await fetch(
        `http://localhost:5050/api/tickets?${query}`,
        {
          credentials: "include",
          cache: "no-store", // ✅ ensures latest admin updates
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
}, [page, search, priority, status]);


  const openTicket = async (id: string) => {
    const res = await fetch(
      `http://localhost:5050/api/tickets/${id}`,
      {
        credentials: "include",
        cache: "no-store",
      }
    );

    const data = await res.json();
    setSelectedTicket(data); // ✅ fixed (backend returns ticket directly)
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedTicket) return;

    setSending(true);
    await fetch(
      `http://localhost:5050/api/tickets/${selectedTicket._id}/message`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      }
    );
    setMessage("");
    openTicket(selectedTicket._id);
    setSending(false);
  };

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">My Tickets</h2>

        {!selectedTicket && (
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="text-sm bg-purple-800 px-3 py-1 rounded"
          >
            Filters
          </button>
        )}
      </div>

      {!selectedTicket && (search || priority || status) && (
        <div className="flex gap-2 mb-3 text-xs">
          {search && <span className="bg-black/40 px-2 py-1 rounded">🔍 {search}</span>}
          {priority && <span className="bg-black/40 px-2 py-1 rounded">⚡ {priority}</span>}
          {status && <span className="bg-black/40 px-2 py-1 rounded">📌 {status}</span>}
        </div>
      )}

      {showFilter && !selectedTicket && (
        <div className="bg-black/40 p-4 rounded-xl mb-4 space-y-2">
          <input
            placeholder="Search title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded px-2 py-1 text-white bg-white/20 text-sm placeholder:text-gray-200"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded px-2 py-1 text-black text-sm bg-white"
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded px-2 py-1 text-black text-sm bg-white"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <button
            onClick={() => {
              setPage(1);
              fetchTickets();
              setShowFilter(false);
            }}
            className="w-full bg-purple-800 py-1 rounded"
          >
            Apply Filter
          </button>
        </div>
      )}

      {!selectedTicket ? (
        loading ? (
          <p>Loading...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t._id}
                onClick={() => openTicket(t._id)}
                className="p-4 bg-black/30 rounded-xl cursor-pointer"
              >
                <p className="font-medium">{t.title}</p>
                <span className="text-sm text-pink-200">
                  {t.priority} • {t.status}
                </span>
              </div>
            ))}
          </div>
        )
      ) : (
        <>
          <button
            onClick={() => setSelectedTicket(null)}
            className="text-sm underline mb-2"
          >
            ← Back
          </button>

          <h3 className="font-semibold mb-2">{selectedTicket.title}</h3>

          <div className="bg-black/30 h-60 p-3 rounded overflow-y-auto">
            {selectedTicket.messages?.map((m: any, i: number) => (
              <div key={i} className="bg-pink-200 text-black p-2 rounded mb-1 w-fit">
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded px-2 text-black"
              disabled={selectedTicket.status === "closed"} // ✅ prevent message if closed
            />
            <button
              onClick={sendMessage}
              className="bg-purple-800 px-3 rounded"
              disabled={selectedTicket.status === "closed"}
            >
              Send
            </button>
          </div>
        </>
      )}

      {!selectedTicket && (
        <div className="flex justify-between mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-purple-800 px-3 py-1 rounded"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-purple-800 px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
