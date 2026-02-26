"use client";

import { useEffect, useState } from "react";

interface Notification {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    name: string;
    email: string;
  };
  ticket: {
    title: string;
    status: string;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/notifications", {
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", text);
        // ✅ Redirect to login if no token
        if (text.includes("No token provided")) {
          window.location.href = "/login";
          return;
        }
      }

      const data = await res.json();
      setNotifications(data.notifications || []); // ✅ Always array
    } catch (error) {
      console.error("Fetch notifications error:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`http://localhost:5050/api/notifications/${id}/read`, {
        method: "PUT",
        credentials: "include",
      });
      fetchNotifications(); // ✅ Refresh after marking as read
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // ✅ Optional: Poll every 10s for new notifications
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>

      {notifications.length === 0 && <p>No notifications yet.</p>}

      {notifications.map((notif) => (
        <div
          key={notif._id}
          className={`p-4 mb-3 border rounded ${
            notif.isRead ? "bg-gray-100" : "bg-blue-100"
          }`}
          onClick={() => markAsRead(notif._id)}
        >
          <p className="font-medium">{notif.message}</p>
          <p className="text-sm text-gray-600">
            Ticket: {notif.ticket?.title}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(notif.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}