import { NextRequest, NextResponse } from "next/server";
import { AuthHelper } from "@/lib/middlewareHelpers/AuthHelper";

export function middleware (request: NextRequest) {
    const pathname = request.nextUrl.pathname

if (pathname.startsWith("/profile") || pathname.startsWith("/chat")) {
  const response = AuthHelper(request);
    if (response) return response; // if helper returned a reponse the middleware runs it
  }

  // if helper returned null (user is logged in)  proceed with original redirect
  return NextResponse.next();
}




export const config = {
  matcher: [
    "/profile/:path*", 
    "/mygames/:path*",
    
       // add more pages here
  ],
};