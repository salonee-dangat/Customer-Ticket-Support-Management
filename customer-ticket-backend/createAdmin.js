require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adjust path if needed

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const existing = await User.findOne({ email: "admin@test.com" });

    if (existing) {
      console.log("Admin already exists");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();