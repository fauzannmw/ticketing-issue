// @/app/api/get-ticket-by-id/[ticketId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  try {
    const { ticketId } = params;

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        author: {
          select: {
            name: true,
            division: {
              select: {
                name: true,
              },
            },
          },
        },
        division: {
          select: {
            name: true,
          },
        },
      },
    });

    // If the ticket is not found, return a 404 error
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
