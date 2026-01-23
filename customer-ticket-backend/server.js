// 1 Require modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 2 Initialize app
const app = express();

// 3 Middleware
app.use(express.json());
app.use(cors());

// 4 Import Models
const User = require("./models/User");

// 5 Auth Routes
app.use("/api/auth", require("./routes/auth"));

// 6 Demo Tickets (temporary – until DB tickets are added)
const tickets = [
  { _id: 101, title: "Login Issue", status: "created" },
  { _id: 102, title: "Page not loading", status: "created" },
];

// 7 USERS API (FETCH REAL USERS FROM MONGODB)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "_id name email role");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// 8 GET tickets
app.get("/api/tickets", (req, res) => {
  res.json(tickets);
});

// 9 POST ticket
app.post("/api/tickets", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTicket = {
    _id: Date.now(),
    title,
    status: "created",
  };

  tickets.push(newTicket);
  res.json(newTicket);
});

// 10 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// 11 Start server
app.listen(5050, () => {
  console.log("🚀 Server running on port 5050");
});
