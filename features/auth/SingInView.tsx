"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SignInView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // this check trigger on remount (every time a new url is pushed)
  const isOpen = searchParams.get("reqAuth") === "true";

  const handleBack = () => {
    // Navigate back or just remove the query param
    router.push(pathname, { scroll: false });
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-150 flex items-center justify-center p-6 transition-opacity duration-300 ease-in-out",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      {/* 1. Backdrop */}
      <div
        onClick={handleBack}
        className="absolute inset-0 bg-background/20 backdrop-blur-sm cursor-pointer"
      />

      {/* 2. The Card */}
      <div
        className={cn(
          "relative w-full max-w-sm rounded-[2.5rem] border bg-background  border-border p-8 shadow-2xl transition-all duration-300 ease-out ",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0",
        )}
      >
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <span className="text-3xl font-bold italic">A</span>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to sync progress
            </p>
          </div>

          <div className="grid w-full gap-5">
            <div className="grid gap-3">
              <Input
                placeholder="name@example.com"
                className="h-12 rounded-xl border-border bg-card px-4"
              />
              <Button className="h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground shadow-md active:scale-95 transition-transform">
                <Mail className="mr-2 h-4 w-4" /> Continue with Email
              </Button>
            </div>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                <span className="bg-background px-3 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="h-12 w-full rounded-xl border-border bg-card font-semibold active:bg-secondary transition-all"
            >
              <FcGoogle style={{ minWidth: 20, minHeight: 20 }} /> Sign in with
              Google
            </Button>
          </div>

          <button
            onClick={handleBack}
            className="mt-8 text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
