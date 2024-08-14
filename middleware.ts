import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // Cek jika pengguna sudah terautentikasi dan mencoba mengakses rute publik
  if (isAuthenticated && isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl)); // Arahkan ke halaman utama
  }

  // Cek jika pengguna tidak terautentikasi dan mencoba mengakses rute yang tidak publik
  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export const ROOT = "/sign-in";
export const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];