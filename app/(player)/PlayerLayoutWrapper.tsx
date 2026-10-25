// this layoutWrapper is need so that we can use "use client" while the default layout remains SSR

"use client";

import NavBar from "@/app/(player)/components/NavBar/NavBar";
import { useState } from "react";
import { FeatureCollection } from "geojson";
import MapContext from "@/app/(player)/context/MapContext";
import dynamic from "next/dynamic";

const MapBox = dynamic(
  () => import("@/app/(player)/components/MapBox/MapBox"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-muted-foreground font-medium">
            Initializing map...
          </p>
        </div>
      </div>
    ),
  },
);

/* this wrapper orchestrates the entire palyer-side app, used becasue we can levearage state lifting through "use client" */

type Props = {
  children: React.ReactNode;
  initialCenter?: { lat: number; lon: number } | null;
};

export default function PlayerLayoutWrapper({
  children,
  initialCenter,
}: Props) {
  const [locationData, setLocationData] = useState<FeatureCollection | null>(
    null,
  );
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <MapContext.Provider
        value={{ locationData, setLocationData, mapCenter, setMapCenter }}
      >
        {/* LAYER 0: The Map (Fixed in background) */}
        <div className="fixed inset-0 z-0 h-screen w-screen">
          <MapBox
            data={locationData}
            initialCenter={initialCenter}
            center={mapCenter}
          />
        </div>

        {/* LAYER 1: The Content (Scrolls over the map) */}
        <main className="relative z-10 overflow-y-auto min-h-0 pointer-events-none">
          {children}
        </main>

        {/* LAYER 2: The Navigation (Always on top) */}
        <NavBar />
      </MapContext.Provider>
    </div>
  );
}
