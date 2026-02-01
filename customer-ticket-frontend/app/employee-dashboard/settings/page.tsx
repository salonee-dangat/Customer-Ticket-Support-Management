"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(
          "http://localhost:5050/api/users/me",
          {
            credentials: "include", // ✅ THIS FIXES EVERYTHING
          }
        );

        if (!res.ok) {
          const text = await res.text();
          console.error("API Error:", text);
          throw new Error("API failed");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) return <p>Loading settings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-gray-500 mb-6">
        Manage your personal information and account preferences
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            value={user.name}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            value={user.email}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            value={user.role}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Account Created</label>
          <input
            value={new Date(user.createdAt).toLocaleDateString()}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
