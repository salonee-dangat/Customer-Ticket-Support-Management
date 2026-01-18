import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

// Example user (replace with DB query)
const users = [
  {
    id: 1,
    email: "test@example.com",
    // password = "password123"
    password: "$2a$10$7a9E8K2rR6YtZJ0kKx6t2uN0k6yQ3X9G4NfP8c6nL4zRjP9YF2QeC"
  }
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // 1️⃣ Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // 2️⃣ Find user (replace with DB query)
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 3️⃣ Compare password using bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 4️⃣ Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 5️⃣ Store JWT in HTTP-only cookie
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/"
  });

  res.setHeader("Set-Cookie", cookie);

  // 6️⃣ Send response
  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email
    }
  });
}
