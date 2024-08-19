// @/app/api/delete-ticket/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const { ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json(
        { message: "Ticket ID is required" },
        { status: 400 }
      );
    }

    await prisma.ticket.delete({
      where: { id: ticketId },
    });

    return NextResponse.json(
      { message: "Ticket deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json(
      { message: "Failed to delete ticket" },
      { status: 500 }
    );
  }
}
