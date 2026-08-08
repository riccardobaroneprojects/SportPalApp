import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessOnboardingFormProps {
  isVisible: boolean;
  onBackToRole: () => void;
  onSubmitSuccess: () => void;
}

export default function BusinessOnboardingForm({
  isVisible,
  onBackToRole,
  onSubmitSuccess,
}: BusinessOnboardingFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess();
  };

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
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />

      {/* 2. Expanded Modal Card Shell */}
      <div
        className={cn(
          "relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-[2.5rem] border bg-background border-border/40 p-6 sm:p-8 shadow-2xl transition-all duration-300 ease-out",
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0",
        )}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/40 shrink-0">
          <button
            onClick={onBackToRole}
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-primary-foreground  hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Change Role</span>
          </button>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-secondary px-3 py-1 rounded-full">
            Business Profile
          </span>
        </div>

        {/* Scrollable Form Shell */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="overflow-y-auto pr-1 space-y-6 flex-1">
            {/* Title & Subtitle */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Business Registration
              </h2>
              <p className="mt-1 text-xs text-muted-foreground font-medium">
                Register your business details below.
              </p>
            </div>

            {/* EMPTY FORM PLACEHOLDER */}
            <div className="py-8 border-2 border-dashed border-border/60 rounded-2xl flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-medium">
                [ Business Form Inputs Will Go Here ]
              </span>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-4 border-t border-border/40 shrink-0 mt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 px-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] shadow-md shadow-primary/20"
            >
              <Check className="h-4 w-4" />
              <span>Register Business</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
