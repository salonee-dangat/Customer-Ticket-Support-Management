"use client";

import { useEffect, useState } from "react";
import {
  UserCircle,
  Mail,
  Phone,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch real user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // agar JWT localStorage me hai
        const res = await fetch("http://localhost:5050/api/users/me", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Failed to fetch profile:", text);
          setError("Failed to fetch profile. Check console.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("🔥 PROFILE DATA:", data);

        if (data.user) {
          setUser(data.user);
          setForm({
            name: data.user.name || "",
            phone: data.user.phone || "",
            email: data.user.email || "",
          });
        } else {
          setError("User data not found.");
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile. Check console.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Update profile
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5050/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to update profile:", text);
        setError("Failed to update profile. Check console.");
        return;
      }

      const data = await res.json();
      if (data.user) setUser(data.user);
      setEditOpen(false);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError("Error updating profile. Check console.");
    }
  };

  if (loading) return <p className="text-white p-10">Loading profile...</p>;
  if (error) return <p className="text-red-400 p-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
      <p className="text-purple-200 mb-8">
        Manage your personal information and account settings
      </p>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-6 border-b border-white/20 pb-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
            <UserCircle className="w-16 h-16 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              {user?.name || "N/A"}
            </h2>
            <p className="text-purple-200">{user?.role || "-"}</p>
          </div>

          <button
            onClick={() => setEditOpen(true)}
            className="ml-auto flex items-center gap-2 bg-pink-500 hover:bg-pink-600 px-5 py-2 rounded-lg text-white"
          >
            <Pencil size={16} /> Edit Profile
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Email" value={user?.email || "-"} icon={<Mail />} />
          <Info label="Phone" value={user?.phone || "Not added"} icon={<Phone />} />
          <Info label="Account Status" value="Active" icon={<ShieldCheck />} />
          <Info
            label="Member Since"
            value={user?.createdAt ? new Date(user.createdAt).toDateString() : "-"}
          />
        </div>

        {/* Extra Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section
            title="Account Security"
            text="Your account is protected with encrypted password and JWT authentication."
          />
          <Section
            title="Recent Activity"
            text="You can track all tickets you raised and their status from the dashboard."
          />
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <X onClick={() => setEditOpen(false)} className="cursor-pointer" />
            </div>

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded mb-3"
              placeholder="Full Name"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border p-2 rounded mb-3"
              placeholder="Email Address"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border p-2 rounded mb-4"
              placeholder="Phone Number"
            />

            <button
              onClick={handleUpdate}
              className="w-full bg-purple-600 text-white py-2 rounded flex items-center justify-center gap-2"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable Components */
function Info({ label, value, icon }: any) {
  return (
    <div className="bg-white/10 rounded-xl p-4 flex gap-3 items-center">
      <div className="text-pink-300">{icon}</div>
      <div>
        <p className="text-purple-200 text-sm">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, text }: any) {
  return (
    <div className="bg-white/10 rounded-xl p-6">
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-purple-200 text-sm">{text}</p>
    </div>
  );
}
