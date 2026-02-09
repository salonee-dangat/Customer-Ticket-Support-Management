"use client";

import { useEffect, useState } from "react";
import TicketForm from "@/app/dashboard/components/TicketForm";
import MyTickets from "@/app/dashboard/components/MyTickets";

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");
  const [refreshKey, setRefreshKey] = useState(0);

  // 🔍 search & filters
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
  });

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
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "list"
              ? "bg-purple-700 text-white"
              : "bg-gray-200"
          }`}
        >
          My Tickets
        </button>
      </div>

      {/* CREATE TICKET */}
      {activeTab === "create" && (
        <TicketForm onCreated={() => setRefreshKey((k) => k + 1)} />
      )}

      {/* MY TICKETS */}
      {activeTab === "list" && (
        <div className="space-y-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded border"
          />

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="p-2 rounded border"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
              className="p-2 rounded border"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="p-2 rounded border"
            >
              <option value="">All Category</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="general">General</option>
            </select>
          </div>

          {/* Tickets List */}
          <MyTickets
            refreshKey={refreshKey}
            search={search}
            filters={filters}
          />
        </div>
      )}
    </div>
  );
}
