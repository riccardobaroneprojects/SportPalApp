"use client";

import NavBar from "@/components/NavBar";
import MapBox from "@/components/MapBox";
import SignInView from "@/components/views/SingInView";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { FeatureCollection } from "geojson";
import { AnimatePresence, motion } from "framer-motion";
import MapContext from "@/context/MapContext";

/* this wrapper orchestrates the entire palyer-side app, used becasue we can levearage state lifting through "use client" */

export default function PlayerWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locationData, setLocationData] = useState<FeatureCollection | null>(
    null,
  );
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <MapContext.Provider value={{ locationData, setLocationData }}>
        {/* LAYER 0: The Map (Fixed in background) */}
        <div className="fixed inset-0 z-0 h-screen w-screen">
          <MapBox data={locationData} />
        </div>

        {/* LAYER 1: The Content (Scrolls over the map) */}
        <main className="relative z-10 overflow-y-auto min-h-0 pointer-events-none">
          {children}
          <SignInView />
        </main>

        {/* LAYER 2: The Navigation (Always on top) */}
        <NavBar />
      </MapContext.Provider>
    </div>
  );
}
