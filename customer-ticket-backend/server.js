// 1 Require modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 2 Initialize app
const app = express();

// 3 Middleware
app.use(express.json());
app.use(cors()); // allow frontend to access backend

// 4 Example Users (Today’s Task)
const exampleUsers = [
  { _id: 1, name: "Neha", email: "neha@example.com", role: "admin" },
  { _id: 2, name: "Saloni", email: "saloni12@example.com", role: "user" },
];

// 5 User Routes
app.get("/api/users", (req, res) => {
  res.json(exampleUsers);
});

// 6 Example Tickets (Yesterday’s Task)
const tickets = [
  { _id: 101, title: "Login Issue", status: "created" },
  { _id: 102, title: "Page not loading", status: "created" },
];

// GET tickets
app.get("/api/tickets", (req, res) => {
  res.json(tickets);
});

// POST ticket
app.post("/api/tickets", (req, res) => {
  const { title } = req.body;
  const newTicket = { _id: Date.now(), title, status: "created" };
  tickets.push(newTicket);
  res.json(newTicket);
});

// 7 Connect to MongoDB (optional for demo)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 8 Start server
app.listen(5050, () => {
  console.log("Server running on port 5050");
});
