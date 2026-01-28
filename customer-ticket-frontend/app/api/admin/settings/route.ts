import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";


import Settings from "@/models/Settings";

// GET settings
export async function GET() {
  await connectDB();

  let settings = await Settings.findOne();

  // Create default settings if not exists
  if (!settings) {
    settings = await Settings.create({
      supportEmail: "support@example.com",
    });
  }

  return NextResponse.json(settings);
}

// UPDATE settings
export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();

  const settings = await Settings.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });

  return NextResponse.json(settings);
}
