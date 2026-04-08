"use client";

import NavBar from "@/components/NavBar";
import MapBox from "@/components/MapBox";
import SignInView from "@/components/views/SingInView";
import { useState } from "react";
import { FeatureCollection } from "geojson";
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
    <div className="min-h-full flex flex-col">
      <MapContext.Provider value={{ locationData, setLocationData }}>
        <div className="fixed inset-0 z-0">
          <MapBox data={locationData} />
        </div>
        <main className="relative z-10 h-full w-full pointer-events-none ">
          {children}
          {/* sign in component checks for changes to the URL, upon page refresh it mounts if reqAuth = true*/}
          <SignInView />
        </main>
        <NavBar />
      </MapContext.Provider>
    </div>
  );
}
