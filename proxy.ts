// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createProxySupabaseClient from "@/supabase/createClients/proxyClient";
import { proxyAuthGuard } from "@/features/auth/Guards"; 
import { onboardingCheck } from "./features/auth/utils/checkOnboarding";


export async function proxy(request: NextRequest) {

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createProxySupabaseClient(request, response);
  const guardResponse = await proxyAuthGuard({ request, supabase, response });

  if (guardResponse.status === 307 || guardResponse.status === 308) {
    return guardResponse;
  }

  const onboardingResponse = await onboardingCheck({ request, supabase, response });
  if (onboardingResponse !== response) {
    return onboardingResponse; // Exits early if onboarding check forces a redirect
  }

  return response
}


// Next.js will ONLY run the middleware function above for these URLs.
export const config = {
  matcher: [
  "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};