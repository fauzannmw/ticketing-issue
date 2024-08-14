// @/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Find user by email
  const account = await prisma.account.findUnique({
    where: { email },
    include: { user: true },
  });

  if (!account || !account.passwordHash) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, account.passwordHash);
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // If successful, return user data
  return NextResponse.json({
    user: {
      id: account.user.id,
      name: account.user.name,
      email: account.email,
      division: account.user.divisionId,
    },
  });
}
