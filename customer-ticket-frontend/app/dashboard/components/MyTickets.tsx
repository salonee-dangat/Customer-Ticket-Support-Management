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
    setSelectedTicket(data);
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
    <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white shadow-xl">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Tickets</h2>

        {!selectedTicket && (
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="text-sm bg-white/20 hover:bg-white/30 px-4 py-1 rounded-lg transition"
          >
            Filters
          </button>
        )}
      </div>

      {showFilter && !selectedTicket && (
        <div className="bg-white/15 backdrop-blur-md p-4 rounded-xl mb-4 space-y-3">
          <input
            placeholder="Search title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded px-3 py-2 text-black text-sm"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded px-3 py-2 text-black text-sm"
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded px-3 py-2 text-black text-sm"
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
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-lg shadow-md hover:scale-[1.02] transition"
          >
            Apply Filter
          </button>
        </div>
      )}

      {!selectedTicket ? (
        loading ? (
          <p className="text-white/80">Loading...</p>
        ) : tickets.length === 0 ? (
          <p className="text-white/80">No tickets found.</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((t) => (
              <div
                key={t._id}
                onClick={() => openTicket(t._id)}
                className="p-4 bg-white/15 backdrop-blur-md rounded-xl cursor-pointer hover:bg-white/25 transition"
              >
                <p className="font-semibold text-lg">{t.title}</p>
                <span className="text-sm text-white/80">
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
            className="text-sm underline mb-3 text-white/80"
          >
            ← Back
          </button>

          <h3 className="font-semibold text-lg mb-3">
            {selectedTicket.title}
          </h3>

          <div className="bg-white/15 backdrop-blur-md h-60 p-3 rounded-xl overflow-y-auto mb-3">
            {selectedTicket.messages?.map((m: any, i: number) => (
              <div
                key={i}
                className="bg-white/25 text-white p-2 rounded-lg mb-2 w-fit"
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded px-3 py-2 text-black"
              disabled={selectedTicket.status === "closed"}
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 rounded-lg shadow-md hover:scale-[1.02] transition"
              disabled={selectedTicket.status === "closed"}
            >
              Send
            </button>
          </div>
        </>
      )}

      {!selectedTicket && (
        <div className="flex justify-between mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-white/20 px-4 py-1 rounded-lg hover:bg-white/30 transition disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-white/20 px-4 py-1 rounded-lg hover:bg-white/30 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}