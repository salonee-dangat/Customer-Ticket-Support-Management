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

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("http://localhost:5050/api/users/me", {
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
      setForm({ name: data.name, phone: data.phone || "", email: data.email });
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const res = await fetch("http://localhost:5050/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setUser(data);
    setEditOpen(false);
  };

  if (loading) {
    return <p className="text-gray-800 p-10">Loading profile...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
      <p className="text-gray-700 mb-8">
        Manage your personal information and account settings
      </p>

      <div className="bg-gradient-to-br from-purple-400 to-fuchsia-400 rounded-2xl p-8 shadow-xl max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-6 border-b border-purple-200 pb-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
            <UserCircle className="w-16 h-16 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-purple-600">{user.role}</p>
          </div>

          <button
            onClick={() => setEditOpen(true)}
            className="ml-auto flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-500 px-5 py-2 rounded-lg text-white shadow-md"
          >
            <Pencil size={16} /> Edit Profile
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Email" value={user.email} icon={<Mail />} />
          <Info label="Phone" value={user.phone || "Not added"} icon={<Phone />} />
          <Info label="Account Status" value="Active" icon={<ShieldCheck />} />
          <Info
            label="Member Since"
            value={new Date(user.createdAt).toDateString()}
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Edit Profile</h3>
              <X onClick={() => setEditOpen(false)} className="cursor-pointer" />
            </div>

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-purple-200 p-2 rounded mb-3"
              placeholder="Full Name"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-purple-200 p-2 rounded mb-3"
              placeholder="Email Address"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-purple-200 p-2 rounded mb-4"
              placeholder="Phone Number"
            />

            <button
              onClick={handleUpdate}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded flex items-center justify-center gap-2"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Components */
function Info({ label, value, icon }: any) {
  return (
    <div className="bg-white rounded-xl p-4 flex gap-3 items-center shadow-sm">
      <div className="text-purple-500">{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, text }: any) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-700 text-sm">{text}</p>
    </div>
  );
}