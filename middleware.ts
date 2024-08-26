// @/middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { auth } from "@/lib/auth";

// const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const role = req.auth?.user.role;

  const { nextUrl } = req;
  const { pathname } = req.nextUrl;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // Cek jika pengguna tidak terautentikasi dan mencoba mengakses rute yang tidak publik
  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }

  // Cek jika pengguna sudah terautentikasi dan mencoba mengakses rute publik
  if (isAuthenticated && isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl)); // Arahkan ke halaman utama
  }

  if (
    pathname === "/ticket-progress" &&
    role !== "admin" &&
    pathname === "/ticket-progress" &&
    role !== "moderator"
  ) {
    return Response.redirect(new URL("/", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export const ROOT = "/sign-in";
export const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
