"use client";
import AdminLayout from "../layout";
import StatCard from "@/app/components/admin/StatCard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalTickets: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
    totalUsers: 0,
  });

  const fetchStats = async () => {
    try {
      const ticketsRes = await fetch("/api/admin/tickets");
      const ticketsData = await ticketsRes.json();

      const usersRes = await fetch("/api/admin/users");
      const usersData = await usersRes.json();

      const tickets = ticketsData.tickets || [];
      const users = usersData.users || [];

      setStats({
        totalTickets: tickets.length,
        open: tickets.filter((t: any) => t.status === "Open").length,
        inProgress: tickets.filter((t: any) => t.status === "In Progress").length,
        closed: tickets.filter((t: any) => t.status === "Closed").length,
        totalUsers: users.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Welcome, Admin!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total Tickets" value={stats.totalTickets} />
        <StatCard title="Open Tickets" value={stats.open} />
        <StatCard title="In Progress" value={stats.inProgress} />
        <StatCard title="Closed Tickets" value={stats.closed} />
        <StatCard title="Total Users" value={stats.totalUsers} />
      </div>
    </AdminLayout>
  );
}
