"use client";

import { useEffect, useState } from "react";

type Ticket = {
  _id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
  createdBy?: {
    name?: string;
    email?: string;
  };
};

export default function TicketTable() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch tickets from API
  const fetchTickets = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets`,
        {
          headers: {
            Authorization: `Bearer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : ""
            }`,
          },
        }
      );

      const data = await res.json();
      setTickets(data.tickets || data || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Update ticket status dynamically
  const updateStatus = async (id: string, status: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, status }),
      }
    );
    fetchTickets();
  };

  // Delete ticket dynamically
  const deleteTicket = async (id: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id }),
      }
    );
    fetchTickets();
  };

  const filteredTickets = tickets.filter(
    (t) =>
      (status === "" || t.status === status) &&
      (priority === "" || t.priority === priority) &&
      (category === "" || t.category === category)
  );

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <select onChange={(e) => setPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Category</option>
          <option value="login">Login</option>
          <option value="payment">Payment</option>
          <option value="feature">Feature</option>
        </select>
      </div>

      {/* Table */}
      <table width="100%" border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Category</th>
            <th>Raised By</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.title}</td>
              <td>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    updateStatus(ticket._id, e.target.value)
                  }
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td>{ticket.priority}</td>
              <td>{ticket.category}</td>

              {/* ✅ NEW COLUMN */}
              <td>
                {ticket.createdBy
                  ? `${ticket.createdBy.name || ""} (${
                      ticket.createdBy.email || ""
                    })`
                  : "N/A"}
              </td>

              <td>
                <button onClick={() => deleteTicket(ticket._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredTickets.length === 0 && (
            <tr>
              <td colSpan={7} align="center">
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
