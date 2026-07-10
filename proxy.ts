// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { proxyAuthGuard } from "@/features/auth/Guards"; 

export async function proxy(request: NextRequest) {
  // If Next.js runs this function, we ALREADY know it matched a protected route
  const guardResponse = await proxyAuthGuard(request);
  return guardResponse;
}


// Next.js will ONLY run the middleware function above for these URLs.
export const config = {
  matcher: [
    "/profile/:path*", 
    "/mygames/:path*",
    "/onboarding/:path*",
    "/testPage/:path*",
  ],
};