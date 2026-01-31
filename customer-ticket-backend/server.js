const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // ✅ add cookie parser
require("dotenv").config();

//  Initialize app
const app = express();

//  Middleware
app.use(express.json());

//  Allow frontend to send cookies
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,               // ✅ important for cookies
  })
);

//  Parse cookies
app.use(cookieParser());

//  Import Models
const User = require("./models/User");

//  Import Routes
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/ticketRoutes");

//  Auth Routes
app.use("/api/auth", authRoutes);

//  Ticket Routes
app.use("/api/tickets", ticketRoutes);

// Admin Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

//  USERS API (fetch real users)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "_id name email role");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

//  Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

//  Start server
app.listen(5050, () => {
  console.log(" Server running on port 5050");
});
