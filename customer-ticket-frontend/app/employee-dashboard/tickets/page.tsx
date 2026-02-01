"use client";

import { useState } from "react";
import TicketForm from "@/app/dashboard/components/TicketForm";
import MyTickets from "@/app/dashboard/components/MyTickets";

export default function TicketsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-purple-700 text-white rounded-lg">
          Create Ticket
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg">
          My Tickets
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TicketForm onCreated={() => setRefreshKey((k) => k + 1)} />
        <MyTickets refreshKey={refreshKey} />
      </div>
    </div>
  );
}
