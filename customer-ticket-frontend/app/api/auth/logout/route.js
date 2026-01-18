import { NextResponse } from "next/server";
import { removeTokenCookie } from "@/lib/authCookies";

export async function POST() {
  // Remove JWT cookie
  removeTokenCookie();

  // Redirect to login page
  return NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")
  );
}
