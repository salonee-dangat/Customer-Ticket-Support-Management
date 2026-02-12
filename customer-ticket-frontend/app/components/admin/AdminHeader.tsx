"use client";

import { Menu } from "lucide-react";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4">
      <button className="md:hidden text-pink-600 font-bold" onClick={onMenuClick}>
        Menu
      </button>
      <h2 className="font-bold text-gray-900 text-xl">Admin Dashboard</h2>
      <button 
      onClick={() => {
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/login";
      }}
      className="bg-pink-600 text-white px-3 py-1 rounded">Logout</button>
    </div>
  );
}
