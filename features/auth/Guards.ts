
import { NextRequest, NextResponse } from "next/server";
import createBrowserSupabaseClient from "@/supabase/createCLients/browserClient";
import createProxySupabaseClient from "@/supabase/createCLients/proxyClient"

/**
 *  * PROXY GUARD: Used inside root proxy.ts to protect server routes.
 * Returns a redirect response if the user is anonymous, otherwise returns null.
 */
export async function proxyAuthGuard(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  
  const supabase = createProxySupabaseClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  if (isLoggedIn) return response;

  // 1. Grab the URL the user was looking at right BEFORE this request
  const referer = request.headers.get("referer");
  const currentPath = request.nextUrl.pathname;

  // 2. Default landing destination (Your Home Page)
  let redirectTarget = "/";

  // 3. Contextual Check: If they were already navigating on the map, keep them there!
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