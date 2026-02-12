"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5050/api/users/me", {
          method: "GET",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("SETTINGS API ERROR:", text);
          throw new Error("Failed to load settings");
        }

        const data = await res.json();
        setUser(data.user); // ✅ THIS WAS THE MAIN BUG
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
  if (!user) return <p>No user data found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-pink-900 p-10 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold mb-1">Settings ⚙️</h1>
        <p className="text-purple-300 mb-8">
          Manage your personal information and account preferences
        </p>

        <div className="space-y-6">
          <Field label="Full Name" value={user.name} />
          <Field label="Email" value={user.email} />
          <Field label="Role" value={user.role} />
          <Field
            label="Account Created"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  );
}

/* Reusable Field */

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm text-purple-300 mb-1">
        {label}
      </label>
      <input
        value={value}
        disabled
        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none"
      />
    </div>
  );
}