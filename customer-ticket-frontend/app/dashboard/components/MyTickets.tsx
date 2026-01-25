"use client";

import { useState } from "react";

const dummyTickets = [
  { id: 1, title: "Login issue", priority: "High" },
  { id: 2, title: "Page not loading", priority: "Medium" },
  { id: 3, title: "Bug in dashboard", priority: "Low" },
  { id: 4, title: "API error", priority: "High" },
];

export default function MyTickets() {
  const [page, setPage] = useState(1);
  const ticketsPerPage = 2;

  const start = (page - 1) * ticketsPerPage;
  const end = start + ticketsPerPage;

  const paginatedTickets = dummyTickets.slice(start, end);

  return (
    <div>
      <h2>My Tickets</h2>

      <ul>
        {paginatedTickets.map((ticket) => (
          <li key={ticket.id}>
            {ticket.title} - {ticket.priority}
          </li>
        ))}
      </ul>

      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <button
        disabled={end >= dummyTickets.length}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
