import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// ===== SET TOKEN =====
export function setTokenCookie(token) {
  const cookieStore = cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

// ===== REMOVE TOKEN =====
export function removeTokenCookie() {
  const cookieStore = cookies();

  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
}

// ===== GET USER FROM TOKEN (SERVER ONLY) =====
export function getUserFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { id, role }
  } catch (err) {
    return null;
  }
}
