// @/app/api/get-tickets-by-division/[divisionId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      divisionId: string;
      userId: string;
    };
  }
) {
  try {
    const { divisionId, userId } = params;
    const divisionIdInt = parseInt(divisionId, 10);

    if (isNaN(divisionIdInt)) {
      return NextResponse.json(
        { error: "Invalid division ID" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        divisionId: true,
      },
    });

    if (!user || !user.divisionId) {
      return NextResponse.json(
        { error: "User or user's division not found" },
        { status: 404 }
      );
    }

    const userDivisionId = user.divisionId;

    const tickets = await prisma.ticket.findMany({
      where: {
        author: {
          divisionId: divisionIdInt,
        },
        divisionId: userDivisionId,
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

    if (tickets.length === 0) {
      return NextResponse.json(
        { message: "No tickets found for this division" },
        { status: 404 }
      );
    }

    const ticketData = tickets.map((ticket) => ({
      id: ticket.id,
      issue: ticket.issue,
      status: ticket.status,
      authorName: ticket.author?.name,
      authorDivision: ticket.author?.division?.name,
    }));

    return NextResponse.json(ticketData, { status: 200 });
  } catch (error) {
    console.error("Error in get-tickets-by-division API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
