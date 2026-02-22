"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/notifications", {
        credentials: "include",
      });

      const data = await res.json();

const notifications = Array.isArray(data.notifications)
  ? data.notifications
  : [];

const unread = notifications.filter((n: any) => !n.read).length;


      setUnreadCount(unread);
    } catch (error) {
      console.error("Notification fetch error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex items-center justify-between">
      
      {/* Hamburger (mobile) */}
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu />
      </button>

      <h1 className="text-lg font-semibold text-purple-700">
        Admin Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification Bell */}
        <Link href="/admin/notifications" className="relative">
        
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="text-sm text-gray-600">Admin</div>
      </div>
    </header>
  );
}
