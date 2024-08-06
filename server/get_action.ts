import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function loginByCredential(email: string, password: string) {
  // Cari user berdasarkan email
  const account = await prisma.account.findUnique({
    where: {
      email: email,
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
