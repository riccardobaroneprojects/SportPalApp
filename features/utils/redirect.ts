// Private helper to extract targets and build the callback URL
export const buildRedirectUrl = (searchParams: URLSearchParams): string => {
  if (typeof window === "undefined") return "";
  const nextTarget = searchParams.get("next") || "/";
  console.log("Building redirect URL with target:", nextTarget)
  return `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextTarget)}&type=player`;
};