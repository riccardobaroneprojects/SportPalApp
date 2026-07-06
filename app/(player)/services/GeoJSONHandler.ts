/* This handler formats the database results into GeoJson objects. 
MapBox requires a strict data structure to generate pins on the map,
so every data that need to be displayed must be parsed through this handler */ 

import { MapEntity } from "@player/components/SearchBar/SearchBarData";

export const GeoJSONHandler = (data: MapEntity[]) => {
  return {
    type: "FeatureCollection",
    features: data.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.longitude, item.latitude],
      },
      properties: {
        id: item.id,
        type: item.type,
      },
    })),
  };
};