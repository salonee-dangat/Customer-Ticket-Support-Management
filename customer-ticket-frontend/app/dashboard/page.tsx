"use client";

import { useState } from "react";
import TicketForm from "./components/TicketForm";
import MyTickets from "./components/MyTickets";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<"create" | "my">("create");

  return (
    <div className="p-10 text-gray-900">
      
      <h1 className="text-3xl font-bold mb-2">
        User Dashboard
      </h1>
      <p className="text-white/80 mb-8">
        Raise and track your support tickets
      </p>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            activeTab === "create"
              ? "bg-white text-purple-700 shadow-lg"
              : "bg-white/20 hover:bg-white/30"
          }`}
        >
          Create Ticket
        </button>

        <button
          onClick={() => setActiveTab("my")}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            activeTab === "my"
              ? "bg-white text-purple-700 shadow-lg"
              : "bg-white/20 hover:bg-white/30"
          }`}
        >
          My Tickets
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "create" && (
          <TicketForm onCreated={() => setRefreshKey((k) => k + 1)} />
        )}

        {activeTab === "my" && (
          <MyTickets refreshKey={refreshKey} />
        )}
      </div>
    </div>
  );
}