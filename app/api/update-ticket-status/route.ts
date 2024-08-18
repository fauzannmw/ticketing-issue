// @/app/api/update-ticket-status/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const { ticketId, status } = await request.json();

  if (!ticketId || !status) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update ticket" },
      { status: 500 }
    );
  }
}
