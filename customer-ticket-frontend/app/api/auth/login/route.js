import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import connectDB from "@/lib/db";          // adjust path if needed
import User from "@/models/User";          // adjust path if needed

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Find user from DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate JWT (INCLUDE ROLE ✅)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role, // 👈 IMPORTANT
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5️⃣ Store JWT in HTTP-only cookie
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    // 6️⃣ Send response (SEND ROLE TO FRONTEND)
    return res.status(200).json({
      message: "Login successful",
      role: user.role, // 👈 frontend will use this
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
