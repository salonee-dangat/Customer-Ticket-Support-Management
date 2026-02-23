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
  <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-400 to-fuchsia-400 rounded-3xl shadow-2xl p-8 text-white">

    <h1 className="text-3xl font-bold mb-2 text-white">
      Settings
    </h1>

    <p className="text-white/90 mb-6">
      Manage your personal information and account preferences
    </p>

    <div className="space-y-5">

      <div>
        <label className="block text-sm font-semibold text-white mb-1">
          Full Name
        </label>
        <input
          value={user.name}
          disabled
          className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 shadow-md"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-1">
          Email
        </label>
        <input
          value={user.email}
          disabled
          className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 shadow-md"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-1">
          Role
        </label>
        <input
          value={user.role}
          disabled
          className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 shadow-md"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-1">
          Account Created
        </label>
        <input
          value={new Date(user.createdAt).toLocaleDateString()}
          disabled
          className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 shadow-md"
        />
      </div>

    </div>
  </div>
);}
