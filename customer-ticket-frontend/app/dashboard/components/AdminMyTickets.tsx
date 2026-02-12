"use client";

import { useEffect, useState } from "react";

export default function AdminMyTickets({
  onSelectTicket,
}: {
  onSelectTicket: (ticket: any) => void;
}) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5050/api/admin/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("ADMIN API ERROR:", text);
          throw new Error("Failed to fetch admin tickets");
        }

        const data = await res.json();
        setTickets(Array.isArray(data.tickets) ? data.tickets : []);
      } catch (err) {
        setError("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminTickets();
  }, []);

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow p-4 text-black">
      <h2 className="font-semibold mb-4">All Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket._id}
            onClick={() => onSelectTicket(ticket)}
            className="p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100"
          >
            <p className="font-medium">{ticket.title}</p>
            <p className="text-sm text-gray-500">
              {ticket.priority} • {ticket.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
