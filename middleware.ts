// @/middleware.ts
import { auth } from "@/lib/auth";

export default auth(async (req) => {
  const role = req.auth?.user.role;
  const verified = req.auth?.user.verified;

  const { nextUrl } = req;
  const { pathname } = req.nextUrl;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isSpecialRoute = SPECIAL_ROUTES.includes(nextUrl.pathname);

  // Cek jika pengguna tidak terautentikasi dan mencoba mengakses rute yang tidak publik
  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }

  // Cek jika pengguna sudah terautentikasi dan mencoba mengakses rute publik kecuali verify-email
  if (
    isAuthenticated &&
    isPublicRoute &&
    nextUrl.pathname !== "/verify-email"
  ) {
    return Response.redirect(new URL("/", nextUrl)); // Arahkan ke halaman utama
  }

  // Cek jika pengguna belum verifikasi email dan mencoba mengakses rute yang tidak publik
  if (isAuthenticated && !verified && !isPublicRoute) {
    return Response.redirect(new URL("/verify-email", nextUrl));
  }

  // Cek jika pengguna mencoba mengakses rute spesial
  if (isSpecialRoute && role !== "admin" && role !== "moderator") {
    return Response.redirect(new URL("/", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export const ROOT = "/sign-in";
export const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/verify-email"];
export const SPECIAL_ROUTES = ["/ticket-progress", "/user-management"];
