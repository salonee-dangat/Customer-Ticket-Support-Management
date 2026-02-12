"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login again.");

        const res = await fetch("http://localhost:5050/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Backend response:", text);
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <p className="p-6 text-lg text-gray-300 font-medium">
        Loading users...
      </p>
    );
  if (error)
    return (
      <p className="p-6 text-red-400 font-medium text-lg">{error}</p>
    );

  return (
    <div className="p-6 bg-gray-900 min-h-screen rounded-xl shadow-inner">
      <h1 className="text-3xl font-bold mb-6 text-white">All Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-md border border-gray-700">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className={idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
              >
                <td className="p-4 text-white">{user.name}</td>
                <td className="p-4 text-gray-300">{user.email}</td>
                <td className="p-4 capitalize text-purple-400">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}