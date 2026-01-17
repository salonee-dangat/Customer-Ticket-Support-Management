import jwt from "jsonwebtoken";
import { serialize } from "cookie";

// Dummy user (replace with DB logic)
const USER = {
  id: 1,
  email: "admin@example.com",
  password: "admin123", // In real apps, store HASHED passwords
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // 1️⃣ Validate credentials
  if (email !== USER.email || password !== USER.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 2️⃣ Generate JWT
  const token = jwt.sign(
    {
      id: USER.id,
      email: USER.email,
    },
    process.env.JWT_SECRET || "secret_key",
    {
      expiresIn: "1d",
    }
  );

  // 3️⃣ Store JWT in HTTP-only cookie
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({
    message: "Login successful",
  });
}
