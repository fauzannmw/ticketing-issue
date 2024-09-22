// @/app/api/create-ticket/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { issue, description, divisionId, priority, dueDate, userId } =
      await request.json();

    if (!issue || !divisionId || !userId || !priority || !dueDate || !userId) {
      console.error("Missing required fields:", {
        issue,
        description,
        divisionId,
        priority,
        dueDate,
        userId,
      });
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 }
      );
    }

    // Ensure that divisionId is an integer, convert if necessary
    const idDivision = parseInt(divisionId, 10);

    const divisionExists = await prisma.division.findUnique({
      where: { id: idDivision },
    });

    if (!divisionExists) {
      console.error("Division not found:", idDivision);
      return NextResponse.json({ error: "Invalid division" }, { status: 404 });
    }

    const newTicket = await prisma.ticket.create({
      data: {
        issue,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: "backlog",
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
