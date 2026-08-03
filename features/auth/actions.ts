"use server";

import createServerSupabaseClient  from "@/supabase/createClients/serverClient"; 
import { redirect } from "next/navigation";

export async function signInWithGoogle(redirectTo: string) {
  const supabase = await createServerSupabaseClient(); // Clean!

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo:redirectTo},
  });

  if (error) throw new Error(error.message);
  if (data.url) redirect(data.url);
}

export async function signInWithEmail(email: string, redirectTo: string) {
  const supabase = await createServerSupabaseClient(); // Clean!

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
    
  });

  if (error) throw new Error(error.message);
}

export async function signInWithOTP(email: string, token: string, nextTarget: string = "/") {
  const supabase = await createServerSupabaseClient(); 

  // 1. Verify OTP token
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email", 
  });

  if (error || !data.user) {
    return { success: false, error: error?.message || "Invalid code" };
  }
  
  {/* we need to check onboarding manually here instead of relying on proxy to trigger ocheckOnboarding
    because signin in with OTP doesn't trigger a full page refresh meaning the proxy won't retrigger
    signin in with email or google works fine becasue the user has to leave the webiste temporarly to sign in 
    meaning the proxy will trigger upon redirect back to webiste*/} 
  const { data: userProfile } = await supabase
    .from("Users")
    .select("account_type")
    .eq("id", data.user.id)
    .single();

 
  const targetUrl = new URL(nextTarget, "http://localhost:3000");

  if (!userProfile?.account_type) {
    targetUrl.searchParams.set("reqOnboarding", "true");
  }

  // 4. Redirect cleanly
  redirect(`${targetUrl.pathname}${targetUrl.search}`);
}