"use client";

import { useEffect, useState } from "react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/notifications", {
        credentials: "include",
      });

      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Fetch notification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    await fetch(`http://localhost:5050/api/notifications/${id}/read`, {
      method: "PUT",
      credentials: "include",
    });

    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications yet</p>
      )}

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`p-4 rounded-lg border ${
              n.read ? "bg-gray-100" : "bg-purple-100"
            }`}
          >
            <p className="text-sm">{n.message}</p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </span>

              {!n.read && (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="text-xs bg-purple-600 text-white px-3 py-1 rounded"
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
