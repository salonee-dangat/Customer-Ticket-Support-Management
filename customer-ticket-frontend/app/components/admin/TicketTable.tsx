"use client";

import { useEffect, useState } from "react";

type Ticket = {
  id: number;
  title: string;
  status: string;
  priority: string;
  category: string;
};

export default function TicketTable() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch tickets from API
  const fetchTickets = async () => {
    const res = await fetch("/api/admin/tickets");
    const data = await res.json();
    setTickets(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Update ticket status
  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/admin/tickets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchTickets();
  };

  // Delete ticket
  const deleteTicket = async (id: number) => {
    await fetch("/api/admin/tickets", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTickets();
  };

  const filteredTickets = tickets.filter(t =>
    (status === "" || t.status === status) &&
    (priority === "" || t.priority === priority) &&
    (category === "" || t.category === category)
  );

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <select onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <select onChange={e => setPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select onChange={e => setCategory(e.target.value)}>
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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>
                <select
                  value={ticket.status}
                  onChange={e => updateStatus(ticket.id, e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td>{ticket.priority}</td>
              <td>{ticket.category}</td>
              <td>
                <button onClick={() => deleteTicket(ticket.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredTickets.length === 0 && (
            <tr>
              <td colSpan={6} align="center">
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
