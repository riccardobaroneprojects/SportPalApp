/* this listenr allows "use client"  while keeping the layout on the server
 this is needed to enable useSearchParams to listen for reqAuth changes in the url*/

"use client";

import { useSearchParams } from "next/navigation";
import SignInView from "./SingInView";

export function AuthListener() {
  const searchParams = useSearchParams();
  const showAuthView = searchParams.get("reqAuth") === "true";

  // This component renders absolutely nothing unless the URL flag is present!
  if (!showAuthView) return null;

  return <SignInView />;
}
