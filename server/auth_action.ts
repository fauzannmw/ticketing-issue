"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";

import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email required!" })
    .email({ message: "Invalid email!" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password required!" })
    .min(8, { message: "Password must have at least 8 characters!" }),
});

export async function loginByCredential(prevState: any, formData: FormData) {
  const defaultValues = {
    email: "",
    password: "",
  };

  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const validatedFields = loginSchema.safeParse({
      email: email,
      password: password,
    });

    if (!validatedFields.success) {
      return {
        message: "validation error",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    await signIn("credentials", formData);

    return {
      message: "success",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "credentials error",
            errors: {
              ...defaultValues,
              credentials: "incorrect email or password",
            },
          };
        default:
          return {
            message: "unknown error",
            errors: {
              ...defaultValues,
              unknown: "unknown error",
            },
          };
      }
    }
    throw error;
  }
}

export async function logoutSession() {
  await signOut();
}
