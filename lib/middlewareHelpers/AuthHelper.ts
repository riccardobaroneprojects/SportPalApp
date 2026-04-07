import { NextRequest, NextResponse } from "next/server";

export function AuthHelper(request: NextRequest) {
   // 🔒 dummy auth logic for now
  const isLoggedIn = false;

  if (isLoggedIn) return null; // this means user is logged in

  const url = new URL("/", request.url); // redirect to home page in user is not logged in

  // save intended destination for after login
  url.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(url);
}