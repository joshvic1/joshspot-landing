import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("admin_token")?.value;

  // Allow API routes to pass
  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow login page
  if (req.nextUrl.pathname.startsWith("/bs-admin")) {
    return NextResponse.next();
  }

  // Protect editor route
  if (req.nextUrl.pathname.startsWith("/bs-admin/editor") && !token) {
    return NextResponse.redirect(new URL("/bs-admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bs-admin/editor/:path*", "/api/:path*", "/bs-admin/:path*"],
};
