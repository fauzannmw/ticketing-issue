import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { name, email, password, divisionId } = await request.json();

  // Check if the user already exists
  const existingUser = await prisma.account.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 400 }
    );
  }

  // Hash the password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create new user and account
  const user = await prisma.user.create({
    data: {
      name,
      division: divisionId
        ? { connect: { id: parseInt(divisionId) } }
        : undefined,
      account: {
        create: {
          email,
          passwordHash,
        },
      },
    },
  });

  return NextResponse.json({ user });
}
