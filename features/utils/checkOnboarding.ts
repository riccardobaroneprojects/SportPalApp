import { NextRequest, NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";

interface OnboardingArgs {
  request: NextRequest;
  supabase: SupabaseClient;
  response: NextResponse;
}

export async function onboardingCheck({ request, supabase, response }: OnboardingArgs) {
  const url = request.nextUrl.clone();
  
  // 1. Prevent infinite loops if query param is already active
  if (url.searchParams.has('reqOnboarding')) {
    console.log("Onboarding check skipped: URL already has reqOnboarding param");
    return response;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.log("Onboarding check passed: No user logged in");
    return response; 
  }
    const accountType = user.user_metadata?.account_type;

    const needsOnboarding = !accountType;

  if (needsOnboarding) {
    url.searchParams.set('reqOnboarding', 'true');
    console.log("Redirecting to appended onboarding URL:", url.toString());
    return NextResponse.redirect(url);
  }

  return response;
}