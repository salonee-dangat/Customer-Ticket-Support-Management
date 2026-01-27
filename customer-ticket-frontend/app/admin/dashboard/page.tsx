"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";

type Ticket = {
  _id: string;
  status: string;
};

export default function AdminDashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    const res = await fetch("/api/admin/tickets");
    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const inProgress = tickets.filter((t) => t.status === "in-progress").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <StatCard title="Total Tickets" value={total} />
        <StatCard title="Open Tickets" value={open} />
        <StatCard title="In Progress" value={inProgress} />
        <StatCard title="Closed Tickets" value={closed} />
      </div>
    </div>
  );
}
