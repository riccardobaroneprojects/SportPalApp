import { Location } from "@/types/location";

export const GeoJSONHandler = (data: Location[]) => {
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