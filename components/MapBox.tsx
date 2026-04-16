"use client";

import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection } from "geojson";

type Props = {
  data: FeatureCollection | null;
};

export default function MapBox({ data }: Props) {
  return (
    <div className="w-full h-full overflow-hidden">
      <Map
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
            if (err || !image) return;

            if (!map.hasImage("stadium")) {
              map.addImage("stadium", image);
            }
          });
        }}
      >
        {/* 📍 Marker */}
        <Marker longitude={-0.1276} latitude={51.5072} />
      </Map>
    </div>
  );
}
