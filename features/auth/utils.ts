"use client";

import { signInWithEmail, signInWithGoogle, signInWithOTP } from "./actions";
import { toast } from "sonner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Private helper to extract targets and build the callback URL
const buildRedirectUrl = (searchParams: URLSearchParams): string => {
  if (typeof window === "undefined") return "";
  const nextTarget = searchParams.get("next") || "/";
  return `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextTarget)}`;
};

interface GoogleSignInArgs {
  searchParams: URLSearchParams;
  setLoading: (loading: boolean) => void;
}

export const executeGoogleSignIn = async ({
  searchParams,
  setLoading,
}: GoogleSignInArgs) => {
  setLoading(true);
  try {
    const redirectToUrl = buildRedirectUrl(searchParams);
    await signInWithGoogle(redirectToUrl);
  } catch (err: any) {
    // NextJS uses internal redirect exceptions under the hood; ignore them safely
    if (err?.message?.includes("NEXT_REDIRECT")) return;

    console.error(err);
    toast.error("Authentication Failed", {
      description: err.message || "Failed to initialize Google sign in",
    });
    setLoading(false);
  }
};

interface EmailSignInArgs {
  email: string;
  searchParams: URLSearchParams;
  setLoading: (loading: boolean) => void;
}

export const executeEmailSignIn = async ({
  email,
  searchParams,
  setLoading,
}: EmailSignInArgs) => {
  if (!email) return;

  setLoading(true);
  try {
    const redirectToUrl = buildRedirectUrl(searchParams);
    await signInWithEmail(email, redirectToUrl);
    
    toast.success("Magic Link Sent!", {
      description: "Go check your local inbox at http://localhost:54324", 
    });
    return true
  } catch (err: any) {
    console.error(err);
    toast.error("Authentication Failed", {
      description: err.message || "Something went wrong sending the link",
    });
    return false
  } finally {
    setLoading(false);
  }
};

interface VerifyOtpArgs {
  email: string;
  otpCode: string;
  searchParams: URLSearchParams;
  setVerifyingOtp: (loading: boolean) => void;
}

// 3. Export the execution utility
export const executeVerifyOtp = async ({
  email,
  otpCode,
  searchParams,
  setVerifyingOtp,
}: Omit<VerifyOtpArgs, 'router'>) => {
  if (!otpCode || !email) return;

  setVerifyingOtp(true);
  try {
    const nextTarget = searchParams.get("next") || "/";
    
    const result = await signInWithOTP(email, otpCode, nextTarget);
    
    // Catch the returned failure cleanly right here
    if (result?.success === false) {
      toast.error("Invalid Code", {
        description: result.error || "The code you entered is incorrect or has expired.",
      });
      setVerifyingOtp(false);
      return;
    }

  } catch (err: any) {
    // This catch block now ONLY handles the NEXT_REDIRECT signal!
    const errorMessage = err?.message || "";
    const isNextRedirect = 
      errorMessage.includes("NEXT_REDIRECT") || 
      err?.digest?.includes("NEXT_REDIRECT");

    if (isNextRedirect) return;

    setVerifyingOtp(false);
  }
};