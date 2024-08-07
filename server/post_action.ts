"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export const createUser = async (params: any) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(params.password, saltRounds);

  try {
    const user = await prisma.user.create({
      data: {
        name: params.name,
        divisionId: params.divisionId,
        account: {
          create: {
            email: params.email,
            passwordHash,
          },
        },
      },
    });
  } catch (error) {}

  return redirect("/");
};

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
