// @/lib/auth.ts

// @ts-nocheck
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/lib/auth.config";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (!res.ok) {
          console.error("Login error:", user.user);
          return null;
        }

        return user.user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.userId = user.id;
        token.userDivisionId = user.division;
        token.role =
          user?.email == "mentoree.ub@gmail.com" ? "admin" : user.role;
        token.verified = user.verified;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.userId = token.userId;
        session.user.userDivisionId = token.userDivisionId;
        session.user.role = token.role;
        session.user.verified = token.verified;
      }
      return session;
    },

    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
  },
  session: {
    maxAge: 300,
  },
});
