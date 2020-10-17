import React, { useEffect, useState } from "react";
import Head from "next/head";

import { Map as LeafletMap, TileLayer, Circle } from "react-leaflet";

const MAPBOX_KEY = process.env.MAPBOX_KEY;

export default function MapComponent() {
  const [location, setLocation] = useState(null);
  const locationSuccess = (position) => {
    const { accuracy, latitude, longitude } = position.coords;
    setLocation({ accuracy, coordinates: [latitude, longitude] });
  };

  const locationFailure = () => {
    console.error("Could not get location");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        locationSuccess,
        locationFailure
      );
    }
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <LeafletMap
        style={{ flex: 1 }}
        center={location ? location.coordinates : [51.505, -0.09]}
        zoom={14}
        onLocationFound={console.log}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          id="streets-v11"
          accessToken={MAPBOX_KEY}
        />
        {location && (
          <Circle center={location.coordinates} radius={location.accuracy} />
        )}
      </LeafletMap>
    </>
  );
}
