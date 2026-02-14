"use client";

import { useState } from "react";
import TicketForm from "./components/TicketForm";
import MyTickets from "./components/MyTickets";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"create" | "my">("create");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-10">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">
        User Dashboard
      </h1>

      {/* TAB BUTTONS */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "create"
              ? "bg-purple-700 text-white"
              : "bg-white text-purple-700"
          }`}
        >
          Create Ticket
        </button>

        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "my"
              ? "bg-purple-700 text-white"
              : "bg-white text-purple-700"
          }`}
        >
          My Tickets
        </button>
      </div>

      {/* CONDITIONAL RENDERING */}
      {activeTab === "create" && (
        <TicketForm onCreated={() => setRefreshKey((k) => k + 1)} />
      )}

      {activeTab === "my" && (
        <MyTickets refreshKey={refreshKey} />
      )}
    </div>
  );
}
