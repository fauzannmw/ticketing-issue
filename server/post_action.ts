"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function loginByCredential(email: string, password: string) {
  const account = await prisma.account.findUnique({
    where: {
      email: email,
      passwordHash: password,
    },
    include: {
      user: true, // Sertakan data User yang terhubung dengan Account
    },
  });

  // Jika tidak ada account dengan email tersebut, kembalikan null
  if (!account) {
    return null;
  }

  // Verifikasi password dengan hash yang disimpan
  const isPasswordValid = await bcrypt.compare(password, account.passwordHash);
  if (!isPasswordValid) {
    return null;
  }

  // Kembalikan objek user
  return account.user;
}
