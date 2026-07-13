import { NextResponse, type NextRequest } from "next/server";
import createServerSupabaseClient from "@/supabase/createClients/serverClient"; // Verify your actual path here

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";

  // 1. Compute the dynamic base origin right away so all redirect blocks can use it
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = request.nextUrl.protocol; // "http:" or "https:"
  
  const cleanOrigin = `${protocol}//${host}`.replace(/\/$/, "");

  console.log("➡️ Hit /auth/callback route. Found code:", !!code, "Next target:", next);

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      const cleanNext = next.replace(/^\//, "");
      const absoluteUrl = `${cleanOrigin}/${cleanNext}`;
      console.log(" Redirecting the user to absolute URL:", absoluteUrl);
      return NextResponse.redirect(absoluteUrl);
    }
    
    // --- ERROR POSITION 1: Code exchange failed (Expired or used link) ---
    console.error(" Supabase Auth Session Exchange Error:", error);

    let errorType = "exchange_failed";
    if (error?.message?.includes("expired") || error?.message?.includes("already used")) {
      errorType = "link_expired";
    }

    const errorUrl = new URL(cleanOrigin);
    errorUrl.searchParams.set("reqAuth", "true");
    errorUrl.searchParams.set("authError", errorType);
    errorUrl.searchParams.set("next", next); // Save where they wanted to go

    return NextResponse.redirect(errorUrl.toString());

  } else {
    // --- ERROR POSITION 2: No code present at all ---
    console.warn(" No auth code present in the URL params.");
    
    const noCodeUrl = new URL(cleanOrigin);
    noCodeUrl.searchParams.set("reqAuth", "true");
    noCodeUrl.searchParams.set("authError", "missing_code");
    
    return NextResponse.redirect(noCodeUrl.toString());
  }
}