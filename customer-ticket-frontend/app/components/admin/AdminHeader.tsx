"use client";

import { Menu } from "lucide-react";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex items-center justify-between">
      
      {/* Hamburger (mobile) */}
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu />
      </button>

      <h1 className="text-lg font-semibold text-purple-700">
        Admin Dashboard
      </h1>

      <div className="text-sm text-gray-600">Admin</div>
    </header>
  );
}
