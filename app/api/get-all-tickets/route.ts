import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    // Check the presence of userId
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get the user along with their division
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { division: true },
    });

    // Check if the user exists and has a division
    if (!user || !user.divisionId) {
      return NextResponse.json(
        { error: "User or division not found" },
        { status: 404 }
      );
    }

    // Get all tickets for the user's division with author details
    const tickets = await prisma.ticket.findMany({
      where: { divisionId: user.divisionId },
      select: {
        id: true,
        issue: true,
        status: true,
        author: {
          select: {
            name: true,
          },
        },
        division: {
          select: {
            name: true,
          },
        },
      },
    });

    // Transform data to include only id, issue, status, and author's name
    const ticketData = tickets.map((ticket) => ({
      id: ticket.id,
      issue: ticket.issue,
      status: ticket.status,
      authorName: ticket.author?.name,
      authorDivision: ticket.division?.name,
    }));

    return NextResponse.json(ticketData, { status: 200 });
  } catch (error) {
    console.error("Error in get-tickets API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
