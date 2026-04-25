import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PUBLIC_ROUTES = [
  "/sign-in",
  "/sign-up",
  "/verify-account",
  "/forgot-password",
  "/reset-password",
];

const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const PROTECTED_ROUTES = [
  "/workspace", 
  "/settings", 
  "/profile",
  "/billing",
  "/dashboard",
  "/subscription",
  "/profile",
  "/cancelled",
  "/successful"
];

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const error = searchParams.get("error");

  // ─── Intercept any ?error=TOKEN_EXPIRED or ?error=INVALID_TOKEN ───
  if (error === "TOKEN_EXPIRED" || error === "INVALID_TOKEN") {
    const url = new URL("/verify-account", request.url);
    url.searchParams.set("error", error);
    // Preserve email if it's in the URL
    const email = searchParams.get("email");
    if (email) url.searchParams.set("email", email);
    return NextResponse.redirect(url);
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isProtectedRoute = PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r)
  );

  // Logged-in user visiting sign-in/sign-up → workspace
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  // Unauthenticated user visiting protected route → sign-in
  if (!session && isProtectedRoute) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Logged-in but email not verified → verify-account
  if (session && !session.user.emailVerified && isProtectedRoute) {
    return NextResponse.redirect(new URL("/verify-account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};