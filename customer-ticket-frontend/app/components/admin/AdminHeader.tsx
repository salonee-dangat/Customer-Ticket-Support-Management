"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/notifications", {
        credentials: "include",
      });

      const data = await res.json();

      const notifications = Array.isArray(data.notifications)
        ? data.notifications
        : [];

      // ✅ SAFER CHECK (handles undefined also)
      const unread = notifications.filter(
        (n: any) => n.isRead === false
      ).length;

      setUnreadCount(unread);
    } catch (error) {
      console.error("Admin notification fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    const handleUpdate = () => {
      fetchUnreadCount();
    };

    window.addEventListener("notificationUpdated", handleUpdate);

    return () => {
      window.removeEventListener("notificationUpdated", handleUpdate);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex items-center justify-between">
      
      {/* Hamburger */}
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu />
      </button>

      <h1 className="text-lg font-semibold text-purple-700">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-6">

        <Link href="/admin/notifications" className="relative">
          <span className="text-xl">🔔</span>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="text-sm text-gray-600">Admin</div>
      </div>
    </header>
  );
}