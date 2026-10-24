// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createProxySupabaseClient from "@/supabase/createClients/proxyClient";
import { proxyAuthGuard } from "@/features/auth/Guards"; 
import { ProxyOnboardingGuard } from "./features/utils/ProxyOnboardingGuard";
import { ProxyRedirectGuard } from "./proxyGuards/proxyRedirectGaurd";


export async function proxy(request: NextRequest) {

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createProxySupabaseClient(request, response);

  //check for requests who requires user to be signed in
  const authResponse = await proxyAuthGuard({ request, supabase, response });

  if (authResponse.status === 307 || authResponse.status === 308) {
    return authResponse;
  }

  // check if user needs to complete onboarding
  const onboardingResponse = await ProxyOnboardingGuard({ request, supabase, response });
  if (onboardingResponse !== response) {
    return onboardingResponse; // Exits early if onboarding check forces a redirect
  }

  const rootRedirect = await ProxyRedirectGuard({ request, supabase, response });
  if (rootRedirect) {
    return rootRedirect;
  }

  return response
}

  


// Next.js will ONLY run the middleware function above for these URLs.
export const config = {
  matcher: [
  "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};