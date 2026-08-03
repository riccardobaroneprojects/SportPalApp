
import { NextRequest, NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";
import createBrowserSupabaseClient from "@/supabase/createClients/browserClient";
import createProxySupabaseClient from "@/supabase/createClients/proxyClient"


interface GuardArgs {
  request: NextRequest;
  supabase: SupabaseClient;
  response: NextResponse
}
/**
 *  * PROXY GUARD: Used inside root proxy.ts to protect server routes.
 * Returns a redirect response if the user is anonymous, otherwise returns null.
 */
export async function proxyAuthGuard({ request, supabase, response }: GuardArgs) {

  const currentPath = request.nextUrl.pathname;

//Define pages that REQUIRE authentication
  const protectedRoutes = ["/profile", "/mygames", "/onboarding", "/testPage"];
  const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

  if (!isProtectedRoute) {
    return response;
  }

  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;
  if (isLoggedIn) return response;
  const referer = request.headers.get("referer");
  let redirectTarget = "/";
  if (referer) {
    const refererUrl = new URL(referer);
    if (refererUrl.pathname === "/map") {
      redirectTarget = "/map";
    }
  }

  // 4. Build the smart redirect URL
  const url = new URL(redirectTarget, request.url);
  url.searchParams.set("reqAuth", "true");
  url.searchParams.set("next", currentPath); // Remembers if they wanted /profile or /business/dashboard

  return NextResponse.redirect(url);
}

/**
 * CLIENT GUARD: Used inside UI components (like NavBar or Map actions).
 * Intercepts unauthenticated clicks, forces the Auth Modal to open via URL params,
 * and remembers where the user wanted to go.
 */
export async function clientAuthGuard(
  router: any, 
  currentPathname: string,
  targetHref: string
): Promise<boolean> {
  
  const supabase = createBrowserSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  const isLoggedIn = !!session;

  if (isLoggedIn) {
    router.push(targetHref);
    return true;
  }

  router.push(`${currentPathname}?reqAuth=true&next=${targetHref}`, { scroll: false });
  return false;
}