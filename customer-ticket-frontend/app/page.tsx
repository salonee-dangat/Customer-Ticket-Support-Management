"use client";

import { useState, useEffect } from "react";
import { getTickets, createTicket } from "../lib/ticketApi";

interface Ticket {
  _id: string;
  title: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export default function HomePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState<User[]>([]);

 useEffect(() => {
  fetchTickets();
  fetchUsers();
}, []);

  const fetchTickets = async () => {
    const data = await getTickets();
    setTickets(data);
  };
  const fetchUsers = async () => {
  const res = await fetch("http://localhost:5050/api/users");
  const data = await res.json();
  setUsers(data);
};

  const handleCreate = async () => {
    if (!title) return;
    await createTicket({ title });
    setTitle("");
    fetchTickets();
  };

  return (
  <div style={{ padding: "20px" }}>
    <h1>Customer Tickets</h1>

    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Ticket Title"
    />
    <button onClick={handleCreate}>Create Ticket</button>

    {/* TICKETS LIST */}
    <h2>Tickets</h2>
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket._id}>{ticket.title}</li>
      ))}
    </ul>

    {/* USERS LIST – TODAY’S TASK */}
    <h2>Users</h2>
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {user.name} - {user.email} ({user.role})
        </li>
      ))}
    </ul>
  </div>
);
}