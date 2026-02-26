"use client";

import { useEffect, useState } from "react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // ✅ Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/notifications", {
        credentials: "include",
      });

      const data = await res.json();
      const fetchedNotifications = Array.isArray(data.notifications)
        ? data.notifications
        : [];

      setNotifications(fetchedNotifications);

      const unread = fetchedNotifications.filter(
        (n: any) => !n.isRead
      ).length;

      setUnreadCount(unread);
    } catch (error) {
      console.error("Fetch notification error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark single notification as read
  const markAsRead = async (id: string) => {
    try {
      await fetch(
        `http://localhost:5050/api/notifications/${id}/read`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      // Update state locally
      const updatedNotifications = notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      );

      setNotifications(updatedNotifications);

      const unread = updatedNotifications.filter(
        (n) => !n.isRead
      ).length;

      setUnreadCount(unread);

      // 🔔 VERY IMPORTANT → Notify header to refresh
      window.dispatchEvent(new Event("notificationUpdated"));
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4 flex justify-between items-center">
        Notifications

        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            {unreadCount} Unread
          </span>
        )}
      </h1>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications yet</p>
      )}

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`p-4 rounded-lg border transition ${
              n.isRead ? "bg-gray-100" : "bg-purple-100"
            }`}
          >
            <p className="text-sm">{n.message}</p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </span>

              {!n.isRead && (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}