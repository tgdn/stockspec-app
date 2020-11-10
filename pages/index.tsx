import React from "react";

import { authRoute } from "providers/auth.provider";
import Layout from "components/ui/layout";
import Navbar from "components/ui/navbar";
import Dashboard from "components/dashboard";

function Home() {
  return (
    <Layout bgColor="#36353A">
      <Navbar />
      <Dashboard />
    </Layout>
  );
}

export default authRoute(Home, { redirectTo: "/auth/login" });
