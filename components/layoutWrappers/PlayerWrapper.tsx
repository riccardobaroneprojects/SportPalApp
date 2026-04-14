"use client";

import NavBar from "@/components/NavBar";
import MapBox from "@/components/MapBox";
import SignInView from "@/components/views/SingInView";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { FeatureCollection } from "geojson";
import { AnimatePresence, motion } from "framer-motion";
import MapContext from "@/context/MapContext";

// this is needed to animate the page navigation so that it feels like a native app rather than a website
const pageOrder: Record<string, number> = {
  "/myGames": 0,
  "/newGame": 1,
  "/map": 2,
  "/profile": 3,
};

/* this wrapper orchestrates the entire palyer-side app, used becasue we can levearage state lifting through "use client" */

export default function PlayerWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locationData, setLocationData] = useState<FeatureCollection | null>(
    null,
  );
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  const currentIndex = pageOrder[pathname] ?? 0;
  const prevIndex = pageOrder[prevPathname.current] ?? 0;
  const direction = currentIndex >= prevIndex ? "right" : "left";

  prevPathname.current = pathname;
  return (
    <div className="h-dvh flex flex-col">
      {/* map contxt set up so that componenets can access locationData when they need to provide the map with locations to render */}
      <MapContext.Provider value={{ locationData, setLocationData }}>
        <div className="fixed inset-0 z-0">
          <MapBox data={locationData} />
        </div>
        <main className="relative z-10 felx1 pointer-events-none">
          <div className="h-full flex flex-col  ">{children}</div>
          {/* sign in component checks for changes to the URL, upon page refresh it mounts if reqAuth = true*/}
          <SignInView />
        </main>
        <NavBar />
      </MapContext.Provider>
    </div>
  );
}
