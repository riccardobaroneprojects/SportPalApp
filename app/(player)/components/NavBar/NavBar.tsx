"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { clientAuthGuard } from "@/Features/auth/Guards";
import { NavItem, BottomNavProps, NAV_ITEMS } from "./NavBarData";

export default function NavBar({ onTabChange }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // blocks navBar while signin request is active
  const isAuthOpen = searchParams.get("reqAuth") === "true";

  {
    /*navigation tab synced using path instead of useState 
    because useState would reset to default upon page refresh */
  }
  const activeTabId =
    [...NAV_ITEMS]
      .sort((a, b) => b.href.length - a.href.length)
      .find((item) => {
        if (item.href === "/") return pathname === "/";
        return pathname.startsWith(item.href);
      })?.id || "map";

  const handleTabClick = (item: NavItem) => {
    onTabChange?.(item.id);

    // if not signed in blocks the redirect
    if (item.requiresAuth) {
      const userIsSignedIn = clientAuthGuard(router, pathname, item.href);
      if (!userIsSignedIn) return;
    }

    router.push(item.href);
  };

  return (
    <nav className=" fixed bottom-0 left-0 right-0 z-50 w-full bg-card/95 backdrop-blur-md border-t border-border pb-safe">
      <div className="flex items-center h-20 justify-around px-2 pt-2 md:py-3 max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTabId === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => !isAuthOpen && handleTabClick(item)}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div className="absolute -top-1 inset-x-0 flex justify-center h-2">
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="size-1.5 rounded-full bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 1,
                    }}
                  />
                )}
              </div>

              <Icon className="size-5 md:size-6" />
              <span className="text-[10px] md:text-xs font-medium">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
