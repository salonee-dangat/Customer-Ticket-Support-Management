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
          className={`px-5 py-2 rounded-lg font-medium transition ${
            activeTab === "create"
              ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-md"
              : "bg-white/70 text-gray-800 hover:bg-white"
          }`}
        >
          Create Ticket
        </button>

        <button
          onClick={() => setActiveTab("my")}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            activeTab === "my"
              ? "bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white shadow-md"
              : "bg-white/70 text-gray-800 hover:bg-white"
          }`}
        >
          My Tickets
        </button>
      </div>

      {/* Content */}
      {activeTab === "create" && (
        <TicketForm onCreated={() => setRefreshKey((k) => k + 1)} />
      )}

      {activeTab === "my" && <MyTickets refreshKey={refreshKey} />}
    </div>
  );
}