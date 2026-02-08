<<<<<<< HEAD
// 1 Require modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

=======
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
>>>>>>> 99512481c7356fae88bf7f527132777ecb5863fe

// Initialize app
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

// Import routes
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes); // ✅ ONLY ONCE
app.use("/api/admin", require("./routes/adminRoutes"));


<<<<<<< HEAD
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
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

=======
// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));
>>>>>>> 99512481c7356fae88bf7f527132777ecb5863fe

// Start server
app.listen(5050, () => {
  console.log("🚀 Server running on port 5050");
});
