// this layoutWrapper is need so that we can use "use client" while the default layout remains SSR

"use client";

import NavBar from "@/app/(player)/components/NavBar/NavBar";
import MapBox from "@/app/(player)/components/MapBox/MapBox";
import { useState } from "react";
import { FeatureCollection } from "geojson";
import MapContext from "@/app/(player)/context/MapContext";

/* this wrapper orchestrates the entire palyer-side app, used becasue we can levearage state lifting through "use client" */

export default function PlayerLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <MapBox data={locationData} center={mapCenter} />
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
