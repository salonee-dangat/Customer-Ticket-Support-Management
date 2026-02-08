"use client";

import { useState } from "react";
import TicketForm from "./components/TicketForm";
import MyTickets from "./components/MyTickets";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-10">
      <h1 className="text-3xl font-bold text-purple-800 mb-2">
        User Dashboard
      </h1>
      <p className="text-purple-600 mb-8">
        Raise and track your support tickets
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TicketForm onCreated={() => setRefreshKey((k) => k + 1)} />
        <MyTickets refreshKey={refreshKey} />
      </div>
    </div>
  );
}
