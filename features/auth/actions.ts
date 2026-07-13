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

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email", 
  });

  // Return a standard result object instead of throwing a hard crash
  if (error) {
    return { success: false, error: error.message };
  }
  
  redirect(nextTarget);
}