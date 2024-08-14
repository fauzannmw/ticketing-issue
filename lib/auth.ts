// @/lib/auth.ts
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
        console.log("Mulai masuk next-auth sign-in");

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        console.log("Berhasil mendapatkan User dari api", res);

        const user = await res.json();

        console.log("Selesai ubah raw response to json", user);

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
        // @ts-ignore
        token.userDivisionId = user.division;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        // @ts-ignore
        session.user.userId = token.userId;
        // @ts-ignore
        session.user.userDivisionId = token.userDivisionId;
      }
      return session;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
});
