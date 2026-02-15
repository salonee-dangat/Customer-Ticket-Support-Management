"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const router = useRouter();
  const [tickets, setTickets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch Tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoadingTickets(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets`,
          {
            headers: {
              Authorization: `Bearer ${
                typeof window !== "undefined"
                  ? localStorage.getItem("token")
                  : ""
              }`,
            },
          }
        );
        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        setTickets([]);
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchTickets();
  }, []);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${
                typeof window !== "undefined"
                  ? localStorage.getItem("token")
                  : ""
              }`,
            },
          }
        );
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);
  // ✅ Update Ticket Status
const updateStatus = async (ticketId: string, newStatus: string) => {
  try {
    const res = await fetch(
      `http://localhost:5050/api/admin/tickets/${ticketId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            typeof window !== "undefined"
              ? localStorage.getItem("token")
              : ""
          }`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert("Status update failed");
      console.error(data);
      return;
    }

    setTickets((prev) =>
      prev.map((t) =>
        t._id === ticketId ? { ...t, status: newStatus } : t
      )
    );
  } catch (error) {
    console.error("Update error:", error);
  }
};



  // ✅ Filter tickets by createdAt date
  const filteredTickets = tickets.filter((ticket) => {
    if (!startDate && !endDate) return true;

    const ticketDate = new Date(ticket.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && ticketDate < start) return false;

    if (end) {
      const endOfDay = new Date(end);
      endOfDay.setHours(23, 59, 59, 999);
      if (ticketDate > endOfDay) return false;
    }

    return true;
  });

  // ✅ Counts based on filtered tickets
  const totalTickets = filteredTickets.length;
  const openTickets = filteredTickets.filter((t) => t.status === "open").length;
  const closedTickets = filteredTickets.filter((t) => t.status === "closed").length;
  const inProgressTickets = filteredTickets.filter(
    (t) => t.status === "in-progress"
  ).length;

  const pieData = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: "Ticket Status",
        data: [openTickets, inProgressTickets, closedTickets],
        backgroundColor: ["#4B5563", "#6366F1", "#8B5CF6"],
        borderColor: ["#4B5563", "#6366F1", "#8B5CF6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-200 via-pink-300 to-purple-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome, Admin
        </h1>
      </div>

      {/* Date Filters */}
      <div className="mb-6 flex gap-4">
        <div>
          <label className="text-sm">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white/90 p-6 rounded-xl shadow">
          <h2 className="text-gray-500 font-semibold">Total Tickets</h2>
          <p className="text-3xl font-bold text-blue-500">
            {totalTickets}
          </p>
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow">
          <h2 className="text-gray-500 font-semibold">Open Tickets</h2>
          <p className="text-3xl font-bold text-indigo-500">
            {openTickets}
          </p>
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow">
          <h2 className="text-gray-500 font-semibold">In Progress</h2>
          <p className="text-3xl font-bold text-purple-600">
            {inProgressTickets}
          </p>
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow">
          <h2 className="text-gray-500 font-semibold">Closed Tickets</h2>
          <p className="text-3xl font-bold text-gray-700">
            {closedTickets}
          </p>
        </div>
      </div>

      {/* Users & Pie */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white/90 p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">Total Users</h3>
          {loadingUsers ? (
            <p className="text-gray-500 animate-pulse">Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-indigo-500">
              {users.length}
            </p>
          )}
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">
            Ticket Status Distribution
          </h3>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white/90 p-6 rounded-xl shadow mb-8">
        <h3 className="font-semibold text-lg mb-4">Recent Tickets</h3>
        {loadingTickets ? (
          <p className="text-gray-500 animate-pulse">
            Loading tickets...
          </p>
        ) : filteredTickets.length === 0 ? (
          <p className="text-gray-500">
            No tickets available.
          </p>
        ) : (
          filteredTickets
            .slice(-5)
            .reverse()
            .map((ticket) => (
              <div
                key={ticket._id}
                className="border-b py-3 last:border-b-0 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-700">
                    {ticket.title}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {ticket.description}
                  </p>
                </div>
                <select
  value={ticket.status}
  onChange={(e) =>
    updateStatus(ticket._id, e.target.value)
  }
  className="px-2 py-1 rounded border text-sm"
>
  <option value="open">Open</option>
  <option value="in-progress">In Progress</option>
  <option value="closed">Closed</option>
</select>

              </div>
            ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push("/admin/users")}
          className="px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600 transition"
        >
          View Users
        </button>

        <button
          onClick={() => router.push("/admin/settings")}
          className="px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition"
        >
          Settings
        </button>
      </div>
    </div>
  );
}
