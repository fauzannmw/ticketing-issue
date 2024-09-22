// @/app/api/get-all-tickets-progress/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("User-Id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { division: true },
    });

    if (!user || !user.divisionId) {
      return NextResponse.json(
        { error: "User or division not found" },
        { status: 404 }
      );
    }

    const tickets = await prisma.ticket.findMany({
      where: {
        author: {
          divisionId: user.divisionId,
        },
        divisionId: {
          not: user.divisionId,
        },
      },
      select: {
        id: true,
        issue: true,
        status: true,
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

    const ticketData = tickets.map((ticket) => ({
      id: ticket.id,
      issue: ticket.issue,
      status: ticket.status,
      authorName: ticket.author?.name,
      authorDivision: ticket.author?.division?.name,
      divisionName: ticket.division?.name,
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
