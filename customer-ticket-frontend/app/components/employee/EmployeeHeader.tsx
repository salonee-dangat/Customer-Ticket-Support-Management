"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type EmployeeHeaderProps = {
  onMenuClick: () => void;
};

export default function EmployeeHeader({ onMenuClick }: EmployeeHeaderProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [employeeName, setEmployeeName] = useState("Employee");

  const router = useRouter();
  const pathname = usePathname(); // 🔥 Detect route change

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/notifications", {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();

      const unread = Array.isArray(data?.notifications)
        ? data.notifications.filter((n: any) => !n.isRead).length
        : 0;

      setUnreadCount(unread);
    } catch (error) {
      console.error("Notification fetch error:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/users/me", {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      if (data?.name) setEmployeeName(data.name);
    } catch (error) {
      console.error("User fetch error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5050/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUser();
  }, []);

  // 🔥 IMPORTANT: Refetch when route changes
  useEffect(() => {
    fetchNotifications();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu />
      </button>

      <h1 className="text-lg font-semibold text-blue-700">
        Employee Dashboard
      </h1>

      <div className="flex items-center gap-6">
        <Link href="/employee-dashboard/notifications" className="relative">
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{employeeName}</span>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}