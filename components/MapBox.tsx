"use client";

import { useEffect, useRef } from "react";
import Map, { Marker, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection } from "geojson";

type Props = {
  data: FeatureCollection | null;
  center?: { lat: number; lon: number } | null;
};

export default function MapBox({ data, center }: Props) {
  const mapRef = useRef<MapRef>(null);

  // Smoothly move the camera when the center coordinate changes
  useEffect(() => {
    if (center && mapRef.current) {
      mapRef.current.flyTo({
        center: [center.lon, center.lat],
        zoom: 14,
        duration: 2000,
        essential: true,
      });
    }
  }, [center]);

  return (
    <div className="w-full h-full overflow-hidden">
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -0.1276,
          latitude: 51.5072,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
        onLoad={(e) => {
          const map = e.target;
          map.loadImage("/icons/stadium.png", (err, image) => {
            if (!err && image && !map.hasImage("stadium")) {
              map.addImage("stadium", image);
            }
          });
        }}
      >
        {/* Only render the marker if we have a searched center */}
        {center && (
          <Marker
            longitude={center.lon}
            latitude={center.lat}
            color="#ef4444"
          />
        )}
      </Map>
    </div>
  );
}
