"use client";

import { useState } from "react";

const dummyTickets = [
  { id: 1, title: "Login issue", status: "open" },
  { id: 2, title: "Payment failed", status: "in-progress" },
];

export default function TicketTable() {
  const [tickets, setTickets] = useState(dummyTickets);

  const updateStatus = (id: number, status: string) => {
    setTickets(tickets.map(t =>
      t.id === id ? { ...t, status } : t
    ));
  };

  return (
    <table border={1} cellPadding={10}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {tickets.map(ticket => (
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
