"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Import your separate form components
import PlayerOnboardingForm from "./playerOnboardingForm";
import BusinessOnboardingForm from "./businessOnboardingForm";

export interface BlankModalProps {
  isOpen: boolean;
  handleBack?: () => void;
  onComplete?: () => void;
}

type Step = "role" | "player" | "business";

export function BlankModal({
  isOpen,
  handleBack,
  onComplete,
}: BlankModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<Step>("role");

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-150 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ease-in-out",
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      {/* 1. Backdrop */}
      <div
        onClick={handleBack}
        className="absolute inset-0 bg-background/20 backdrop-blur-sm cursor-pointer"
      />

      {/* 2. Conditionally Render Active Step */}
      <AnimatePresence mode="wait">
        {step === "role" && (
          <motion.div
            key="role-selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative w-full max-w-sm rounded-[2.5rem] border bg-background border-border/40 p-8 shadow-2xl transition-all duration-300 ease-out",
              isVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-95 opacity-0",
            )}
          >
            <div className="flex flex-col items-center">
              {/* Logo */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <span className="font-serif italic text-2xl font-bold">A</span>
              </div>

              {/* Header */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Welcome!
                </h2>
                <p className="mt-1 text-xs text-muted-foreground font-medium">
                  How do you plan to use the app?
                </p>
              </div>

              {/* Role Buttons */}
              <div className="grid gap-3 w-full">
                <Button
                  onClick={() => setStep("player")}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-primary py-6 px-4 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-md shadow-primary/20"
                >
                  <User className="h-4 w-4" />
                  <span>I'm a Player</span>
                </Button>

                <Button
                  onClick={() => setStep("business")}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-secondary/50 py-6 px-4 text-sm font-semibold text-secondary-foreground transition-all duration-200 hover:bg-secondary active:scale-[0.98]"
                >
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>I'm a Business</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "player" && (
          <PlayerOnboardingForm
            key="player-form"
            isVisible={true}
            onBackToRole={() => setStep("role")}
            onSubmitSuccess={() => onComplete?.()}
          />
        )}

        {step === "business" && (
          <BusinessOnboardingForm
            key="business-form"
            isVisible={true}
            onBackToRole={() => setStep("role")}
            onSubmitSuccess={() => onComplete?.()}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
