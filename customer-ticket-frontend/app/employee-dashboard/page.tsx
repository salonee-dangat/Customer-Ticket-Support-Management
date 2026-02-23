"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function EmployeeDashboard() {
  const [employeeName, setEmployeeName] = useState("Employee");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/users/me", {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          console.log("API Error:", text);
          // ✅ Redirect to login if token missing
          if (text.includes("No token provided")) {
            window.location.href = "/login";
            return;
          }
          return; // ✅ don't throw error
        }

        const data = await res.json();

        if (data?.name) {
          setEmployeeName(data.name);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="px-10 py-12 text-gray-900">

      {/* Top Welcome */}
      <div className="mb-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Hello, {employeeName} 👋
        </h1>

        <p className="mt-5 text-xl text-gray-800 max-w-4xl leading-relaxed">
          Welcome to your employee workspace. From here, you can create support tickets,
          track their progress, and manage your daily activities in one unified place.
        </p>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">

        {/* Create Ticket */}
        <Link href="/dashboard">
          <div className="cursor-pointer bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-3xl p-10 shadow-xl hover:scale-[1.03] transition-all duration-300">
            <h2 className="text-3xl font-semibold mb-4">🎫 Create Ticket</h2>
            <p className="text-lg leading-relaxed text-white/90">
              Raise a new support ticket for any issue or request. Provide details and
              submit it instantly for tracking and resolution.
            </p>
          </div>
        </Link>

        {/* Track Tickets */}
        <Link href="/dashboard">
          <div className="cursor-pointer bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white rounded-3xl p-10 shadow-xl hover:scale-[1.03] transition-all duration-300">
            <h2 className="text-3xl font-semibold mb-4">📊 Track Tickets</h2>
            <p className="text-lg leading-relaxed text-white/90">
              View all tickets you have raised, check their current status, and follow
              updates as they move through the support process.
            </p>
          </div>
        </Link>

        {/* Profile / Settings */}
        <Link href="/employee-dashboard/profile">
          <div className="cursor-pointer bg-gradient-to-br from-violet-400 to-purple-500 text-white rounded-3xl p-10 shadow-xl hover:scale-[1.03] transition-all duration-300">
            <h2 className="text-3xl font-semibold mb-4">
              ⚙️ Account Overview
            </h2>
            <p className="text-lg leading-relaxed text-white/90">
              You are logged in with employee access. Your account allows you to raise,
              manage, and monitor tickets efficiently within the system.
            </p>
          </div>
        </Link>
      </div>

      {/* Activity Section */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 shadow-lg border border-white/50 mb-20">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900">
          📌 Ticket Activity & Workflow
        </h3>

        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          Every ticket you create is recorded and tracked systematically. You can
          monitor responses, updates, and resolutions in real time to stay informed
          without unnecessary follow-ups.
        </p>

        <p className="text-lg text-gray-800 leading-relaxed">
          This dashboard ensures transparency, efficiency, and a smooth communication
          flow between you and the support team.
        </p>
      </div>

      {/* Bottom Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="bg-gradient-to-br from-violet-400 to-purple-500 text-white rounded-3xl p-10 shadow-lg">
          <h4 className="text-2xl font-semibold mb-3">🔒 Secure Environment</h4>
          <p className="text-lg leading-relaxed text-white/90">
            Your data and tickets are securely handled within the system, ensuring
            privacy and reliability at all times.
          </p>
        </div>

        <div className="bg-gradient-to-br from-rose-400 to-pink-500 text-white rounded-3xl p-10 shadow-lg">
          <h4 className="text-2xl font-semibold mb-3">🚀 Efficient Experience</h4>
          <p className="text-lg leading-relaxed text-white/90">
            Designed with simplicity and performance in mind, this dashboard helps you
            complete tasks faster and with confidence.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-gray-700 text-sm">
        Built for a smooth and professional employee experience ✨
      </div>

    </div>
  );
}