"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  // ✅ Logout function
  const handleLogout = () => {
    // Remove token or session data
    localStorage.removeItem("token"); // If using token in localStorage
    // You can also clear cookies here if needed

    // Redirect to login page
    router.push("/login");
  };

  return (
    <nav className="bg-purple-800 text-white flex justify-between items-center p-4 shadow-lg">
      <div className="text-xl font-bold">Employee Dashboard</div>
      <div className="flex items-center gap-4">
        <span>Welcome, Employee</span>
        <button
          onClick={handleLogout} // ✅ Attach logout function
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
