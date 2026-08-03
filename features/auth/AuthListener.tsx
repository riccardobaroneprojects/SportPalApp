"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import SignInView from "./SingInView";

export function AuthListener() {
  const searchParams = useSearchParams();

  const showAuthView = searchParams.get("reqAuth") === "true";
  const authError = searchParams.get("authError");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;
    const hash = window.location.hash;

    const isMissingCode =
      currentUrl.includes("authError=missing_code") ||
      authError === "missing_code";
    const isOtpExpired =
      hash.includes("otp_expired") || currentUrl.includes("otp_expired");
    const genericError = currentUrl.includes("authError=") && !isMissingCode;

    if (isMissingCode || isOtpExpired || genericError) {
      let message = "Authentication Failed";
      let description =
        "Something went wrong during sign in. Please try again.";

      if (isOtpExpired || isMissingCode) {
        message = "Link Expired or Used";
        description =
          "Magic links can only be used once. Please request a new link.";
      }

      // delay to give time to the toaster to mount on layout
      const timer = setTimeout(() => {
        toast.error(message, {
          description: description,
          id: "auth-error-toast-final",
          duration: 6000,
        });
      }, 150); // 150ms is the sweet spot for React DOM hydration layers

      return () => clearTimeout(timer);
    }
  }, [searchParams, authError]);

  if (!showAuthView) return null;

  return <SignInView isOpen={true} />;
}
