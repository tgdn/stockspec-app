import React from "react";
import dynamic from "next/dynamic";

import { MapProvider } from "providers/map.provider";
import Layout from "components/layout";
import Navbar from "components/navbar";
const Map = dynamic(() => import("components/map"), { ssr: false });

const MAP_BOUNDS = {
  lat: {
    max: 48.892,
    min: 48.8157,
  },
  lon: {
    max: 2.41,
    min: 2.22,
  },
};

export default function Home() {
  return (
    <MapProvider bounds={MAP_BOUNDS}>
      <Layout bgColor="#F9FAFF">
        <Navbar />
        <Map />
      </Layout>
    </MapProvider>
  );
}
