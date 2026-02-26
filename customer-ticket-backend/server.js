const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// Make io available globally
app.set("io", io);

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

// 🔥 SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("joinTicketRoom", (ticketId) => {
    socket.join(ticketId);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Start server
server.listen(5050, () => {
  console.log("🚀 Server running on port 5050");
});