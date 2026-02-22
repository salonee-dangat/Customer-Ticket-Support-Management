"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  email: string;
  role: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>
        Manage Users
      </h1>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.role.charAt(0).toUpperCase() + u.role.slice(1)} – {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
