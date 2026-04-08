"use client";

import { createContext, useContext } from "react";
import { FeatureCollection } from "geojson";

type MapContextType = {
  locationData: FeatureCollection | null;
  setLocationData: (data: FeatureCollection | null) => void;
};

const MapContext = createContext<MapContextType | null>(null);

// custom hook (clean usage)
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used inside MapProvider");
  }
  return context;
};

export default MapContext;
