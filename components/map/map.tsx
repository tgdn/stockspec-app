import React, { useEffect, useContext } from "react";
import MapGL from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { IMapContext, MapContext } from "providers/map.provider";

const MAPBOX_KEY = process.env.MAPBOX_KEY;

export default function MapComponent() {
  const {
    viewport,
    currentStyle,
    actions: { setViewport, acquireLocation },
  }: IMapContext = useContext(MapContext);

  useEffect(() => {
    acquireLocation();
  }, []);

  return (
    <>
      <MapGL
        {...viewport}
        style={{ flex: 1, width: "100%" }}
        width="100%"
        height="500px"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_KEY}
        mapStyle={`mapbox://styles/mapbox/${currentStyle}`}
        minZoom={11.5}
      />
    </>
  );
}
