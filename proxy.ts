// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { serverAuthGuard } from "@/features/auth/Guards"; 

export function proxy(request: NextRequest) {
  // If Next.js runs this function, we ALREADY know it matched a protected route
  const redirectResponse = serverAuthGuard(request);
  
  if (redirectResponse) {
    return redirectResponse; // Bounce them to home page with ?next= parameter
  }

  return NextResponse.next(); // User logged in! Proceed seamlessly
}


// Next.js will ONLY run the middleware function above for these URLs.
export const config = {
  matcher: [
    "/profile/:path*", 
    "/mygames/:path*",
    "/onboarding/:path*",
  ],
};