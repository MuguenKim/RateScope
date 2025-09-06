import { NextResponse, type NextRequest } from "next/server";

export function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = req.cookies.get("auth-token");

  const loginPath = "/auth/v1/login";
  const registerPath = "/auth/v1/register";

  // Protect dashboard routes
  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  // If already logged in, avoid login/register pages
  if (isLoggedIn && (pathname === loginPath || pathname === registerPath)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
