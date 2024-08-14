// @/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Cari user berdasarkan email
  const account = await prisma.account.findUnique({
    where: { email },
    include: { user: true },
  });

  if (!account || !account.passwordHash) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Verifikasi password
  const isPasswordValid = await bcrypt.compare(password, account.passwordHash);
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Jika sukses, kirim data user
  return NextResponse.json({
    user: {
      id: account.user.id,
      name: account.user.name,
      email: account.email,
      division: account.user.divisionId,
    },
  });
}
