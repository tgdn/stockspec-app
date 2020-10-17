import React from "react";
import dynamic from "next/dynamic";

import Layout from "components/layout";
import Navbar from "components/navbar";
const Map = dynamic(() => import("components/map"), { ssr: false });

export default function Home() {
  return (
    <Layout bgColor="#F9FAFF">
      <Navbar />
      <Map />
    </Layout>
  );
}
