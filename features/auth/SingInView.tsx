"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Key, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  executeEmailSignIn,
  executeGoogleSignIn,
  executeVerifyOtp,
} from "../utils/signInHandlers";

export default function SignInView({ isOpen = false }: { isOpen?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawNext = searchParams.get("next") || "/";
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState("");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // this check trigger on remount (every time a new url is pushed)
  const handleGoogleSignIn = () => {
    executeGoogleSignIn({ searchParams, setLoading });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await executeEmailSignIn({
      email,
      searchParams,
      setLoading,
    });
    if (success) {
      setStep("code");
    }
  };

  const handleVerifyOtp = (e?: React.SubmitEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    console.log("Verifying code:", code);

    if (!code || !email) return;

    executeVerifyOtp({
      email,
      otpCode: code,
      searchParams,
      setVerifyingOtp,
    });
  };

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
          "relative w-full max-w-sm rounded-[2.5rem] border bg-background border-border p-8 shadow-2xl transition-all duration-300 ease-out ",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0",
        )}
      >
        <div className="flex flex-col items-center">
          {/* Main Logo Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <span className="text-3xl font-bold italic">A</span>
          </div>

          {/* Dynamic Header Block */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome
            </h1>
            <p className="text-sm text-muted-foreground mt-1 min-h-[20px]">
              {step === "email" ? (
                "Sign in to sync progress"
              ) : (
                <>
                  Code sent to{" "}
                  <span className="font-semibold text-foreground">{email}</span>
                </>
              )}
            </p>
          </div>

          {/* Global Grid Container (Restored back to preserve correct vertical layout) */}
          <div className="grid w-full gap-5">
            {/* Form Motion Wrapper */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                {step === "email" ? (
                  <motion.form
                    key="email-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onSubmit={handleEmailSignIn}
                    className="grid gap-3 w-full"
                  >
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="h-12 rounded-xl border-border bg-card px-4"
                      disabled={loading}
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-12 w-full rounded-xl bg-primary font-bold"
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Mail className="mr-2 h-4 w-4" />
                      )}
                      Continue with Email
                    </Button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="code-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onSubmit={handleVerifyOtp}
                    className="grid gap-3 w-full"
                  >
                    <Input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter verification code"
                      className="h-12 rounded-xl border-border bg-card px-4 text-center tracking-widest font-mono text-lg"
                      disabled={loading}
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-12 w-full rounded-xl bg-primary font-bold"
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Key className="mr-2 h-4 w-4" />
                      )}
                      Sign In with Code
                    </Button>

                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      disabled={loading}
                      className="mt-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground mx-auto block"
                    >
                      Change email address
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* --- STATIC PERSISTENT BOTTOM HALF --- */}
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
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="h-12 w-full rounded-xl"
            >
              <FcGoogle style={{ minWidth: 20, minHeight: 20 }} /> Sign in with
              Google
            </Button>
          </div>

          {/* Persistent Cancel Button */}
          <button
            onClick={handleBack}
            className="mt-8 text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
