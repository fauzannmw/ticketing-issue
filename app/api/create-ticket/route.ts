import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { issue, divisionId, userId } = await request.json();

    // Check the presence of issue, divisionId, and userId
    if (!issue || !divisionId || !userId) {
      console.error("Missing required fields:", { issue, divisionId, userId });
      return NextResponse.json(
        { error: "Issue, divisionId, and userId are required" },
        { status: 400 }
      );
    }

    // Ensure that divisionId is an integer, convert if necessary
    const idDivision = parseInt(divisionId, 10);

    // Verify that the division with the specified ID exists in the database
    const divisionExists = await prisma.division.findUnique({
      where: { id: idDivision },
    });

    if (!divisionExists) {
      console.error("Division not found:", idDivision);
      return NextResponse.json({ error: "Invalid division" }, { status: 404 });
    }

    // Create a new ticket in the database
    const newTicket = await prisma.ticket.create({
      data: {
        issue,
        status: "PENDING",
        author: {
          connect: { id: userId },
        },
        division: {
          connect: { id: idDivision },
        },
      },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Error in create-ticket API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
