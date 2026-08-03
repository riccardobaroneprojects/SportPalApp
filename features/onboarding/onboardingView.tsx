"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BlankModalProps {
  isOpen: boolean;
  handleBack?: () => void;
}

export function BlankModal({ isOpen, handleBack }: BlankModalProps) {
  // Local state to delay the modal entry slightly after page mount
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 150ms delay gives the page time to load/render first
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
        "fixed inset-0 z-150 flex items-center justify-center p-6 transition-opacity duration-300 ease-in-out",
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

      {/* 2. The Card */}
      <div
        className={cn(
          "relative w-full max-w-sm rounded-[2.5rem] border bg-background border-border p-8 shadow-2xl transition-all duration-300 ease-out",
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0",
        )}
      >
        <div className="flex flex-col items-center">
          {/* Main Logo Icon Shell */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20" />

          {/* Dynamic Header Block Shell */}
          <div className="mb-8 text-center min-h-[20px]" />

          {/* Global Grid Container */}
          <div className="grid w-full gap-5">
            {/* Form Motion Wrapper */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="grid gap-3 w-full"
                />
              </AnimatePresence>
            </div>

            {/* Static Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                <span className="bg-background px-3 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
