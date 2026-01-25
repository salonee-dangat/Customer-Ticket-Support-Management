"use client";

import { useState } from "react";

const dummyTickets = [
  { id: 1, title: "Login issue", status: "open", priority: "high", category: "login" },
  { id: 2, title: "Payment failed", status: "in-progress", priority: "medium", category: "payment" },
  { id: 3, title: "Cannot reset password", status: "closed", priority: "low", category: "login" },
  { id: 4, title: "Feature request", status: "open", priority: "medium", category: "feature" },
];

export default function TicketTable() {
  const [tickets, setTickets] = useState(dummyTickets);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const updateStatus = (id: number, status: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status } : t));
  };

  const filteredTickets = tickets.filter(t =>
    (statusFilter === "" || t.status === statusFilter) &&
    (priorityFilter === "" || t.priority === priorityFilter) &&
    (categoryFilter === "" || t.category === categoryFilter)
  );

  return (
    <div style={{
      padding: "20px",
      borderRadius: "8px",
      background: "#000000",
      maxWidth: "1000px",
      margin: "20px auto",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    }}>
      <h2 style={{ marginBottom: "15px", color: "#333" }}>All Tickets</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "6px 10px" }}>
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ padding: "6px 10px" }}>
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ padding: "6px 10px" }}>
          <option value="">All Category</option>
          <option value="login">Login</option>
          <option value="payment">Payment</option>
          <option value="feature">Feature</option>
        </select>
      </div>

      {/* Ticket Table */}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "Arial, sans-serif"
      }}>
        <thead>
          <tr style={{ background: "#333", color: "#fff" }}>
            <th style={{ padding: "12px", border: "1px solid #444" }}>ID</th>
            <th style={{ padding: "12px", border: "1px solid #444" }}>Title</th>
            <th style={{ padding: "12px", border: "1px solid #444" }}>Status</th>
            <th style={{ padding: "12px", border: "1px solid #444" }}>Priority</th>
            <th style={{ padding: "12px", border: "1px solid #444" }}>Category</th>
            <th style={{ padding: "12px", border: "1px solid #444" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map(ticket => (
            <tr key={ticket.id} style={{ background: "#f9f9f9" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.id}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.title}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <select
                  value={ticket.status}
                  onChange={e => updateStatus(ticket.id, e.target.value)}
                  style={{ padding: "4px 6px" }}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.priority}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.category}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => alert(`Ticket #${ticket.id} details`)}
                  style={{ marginRight: "5px", padding: "4px 8px", background: "#333", color: "#fff", border: "none", borderRadius: "4px" }}
                >
                  View
                </button>
                <button
                  onClick={() => setTickets(tickets.filter(t => t.id !== ticket.id))}
                  style={{ padding: "4px 8px", background: "red", color: "#fff", border: "none", borderRadius: "4px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredTickets.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "12px" }}>
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
