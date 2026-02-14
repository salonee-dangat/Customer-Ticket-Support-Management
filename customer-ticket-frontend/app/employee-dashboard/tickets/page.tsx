"use client";

import { useState } from "react";
import TicketForm from "@/app/dashboard/components/TicketForm";
import MyTickets from "@/app/dashboard/components/MyTickets";

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState<"create" | "my">("create");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "create"
              ? "bg-purple-700 text-white"
              : "bg-gray-200"
          }`}
        >
          Create Ticket
        </button>

        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "my"
              ? "bg-purple-700 text-white"
              : "bg-gray-200"
          }`}
        >
          My Tickets
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "create" && (
        <TicketForm onCreated={() => setRefreshKey((k) => k + 1)} />
      )}

      {activeTab === "my" && (
        <MyTickets refreshKey={refreshKey} />
      )}
    </div>
  );
}
