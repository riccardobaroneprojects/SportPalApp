
import { NextRequest, NextResponse } from "next/server";

/**
 * SERVER GUARD: Used inside root middleware.ts to protect server routes.
 * Returns a redirect response if the user is anonymous, otherwise returns null.
 */
export function serverAuthGuard(request: NextRequest) {
  const isLoggedIn = false; // dummy auth logic

  if (isLoggedIn) return null;

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
 * CLIENT GUARD: Used inside your UI components (like NavBar or Map actions).
 * Intercepts unauthenticated clicks, forces the Auth Modal to open via URL params,
 * and remembers where the user wanted to go.
 */
export function clientAuthGuard(
  router: any, 
  currentPathname: string,
  targetHref: string
): boolean {
  // 🔒 dummy auth logic for now (set to true to test logged-in behavior!)
  const isLoggedIn = false;

  // If they ARE logged in, let them pass! Return true so the component carries on
  if (isLoggedIn) {
    router.push(targetHref);
    return true;
  }

  // 🛑 If they are NOT logged in, halt them and open the modal overlay
  router.push(`${currentPathname}?reqAuth=true&next=${targetHref}`, { scroll: false });
  
  return false;
}