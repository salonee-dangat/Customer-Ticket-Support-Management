require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // path to your User model
const bcrypt = require("bcryptjs");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL); // ✅ Fixed

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully:", admin.email);
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
