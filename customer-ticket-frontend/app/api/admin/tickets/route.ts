import { NextResponse } from "next/server";
import { connectDB } from "@lib/mongodb";
import Ticket from "@/models/ticket";  


// GET: All tickets
export async function GET() {
  await connectDB();
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  return NextResponse.json(tickets);
}

// PATCH: Update ticket status
export async function PATCH(req: Request) {
  const { id, status } = await req.json();

  await connectDB();
  await Ticket.findByIdAndUpdate(id, { status });

  return NextResponse.json({ success: true });
}

// DELETE: Delete ticket
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await connectDB();
  await Ticket.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
