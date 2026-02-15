"use client";

import { useState } from "react";
import TicketForm from "./components/TicketForm";
import MyTickets from "./components/MyTickets";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<"create" | "my">("create");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-10">
      <h1 className="text-3xl font-bold text-purple-800 mb-2">
        User Dashboard
      </h1>
      <p className="text-purple-600 mb-8">
        Raise and track your support tickets
      </p>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "create"
              ? "bg-purple-700 text-white"
              : "bg-white text-purple-700"
          }`}
        >
          Create Ticket
        </button>

        <button
  onClick={() => {
    console.log("MY BUTTON CLICKED");
    setActiveTab("my");
  }}

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
