const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // ✅ add cookie parser
require("dotenv").config();

// 1️⃣ Initialize app
const app = express();

// 2️⃣ Middleware
app.use(express.json());

// ✅ Allow frontend to send cookies
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,               // ✅ important for cookies
  })
);

// ✅ Parse cookies
app.use(cookieParser());

// 3️⃣ Import Models
const User = require("./models/User");

// 4️⃣ Import Routes
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/ticketRoutes");

// 5️⃣ Auth Routes
app.use("/api/auth", authRoutes);

// 6️⃣ Ticket Routes
app.use("/api/tickets", ticketRoutes);

// 7️⃣ USERS API (fetch real users)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "_id name email role");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// 8️⃣ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// 9️⃣ Start server
app.listen(5050, () => {
  console.log("🚀 Server running on port 5050");
});
