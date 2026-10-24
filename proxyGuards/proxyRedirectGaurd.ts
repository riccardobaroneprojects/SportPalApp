// @/features/auth/rootRedirectCheck.ts (or wherever your checks live)
import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";

interface RootRedirectCheckProps {
  request: NextRequest;
  supabase: SupabaseClient;
  response: NextResponse;
}

export async function ProxyRedirectGuard({ request, supabase }: RootRedirectCheckProps) {
  const { pathname } = request.nextUrl;

  // Only run this check if the user is hitting the root home page
  if (pathname === "/") {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Get the account type from user_metadata 
      const userType = user.user_metadata?.account_type; 

      if (userType === "player") {
        return NextResponse.redirect(new URL("/map", request.url));
      }
    }
  }

  // If not on root, or user is not logged in, return null (no redirect)
  return null;
}