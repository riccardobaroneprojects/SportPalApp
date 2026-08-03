"use client";

import { useSearchParams } from "next/navigation";
import { BlankModal } from "./onboardingView";

export function OnboardingListener() {
  const searchParams = useSearchParams();

  const showOnboardingView = searchParams.get("reqOnboarding") === "true";

  if (!showOnboardingView) return null;

  return <BlankModal isOpen={true} />;
}
