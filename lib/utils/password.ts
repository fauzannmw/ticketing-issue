import bcrypt from "bcrypt";

export async function saltAndHashPassword(password: string): Promise<string> {
  // Tentukan jumlah putaran salt (lebih tinggi lebih aman, tetapi juga lebih lambat)
  const saltRounds = 10;

  // Hasilkan salt
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash password dengan salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
