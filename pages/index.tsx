import React from "react";

import { authRoute } from "providers/auth.provider";
import Layout from "components/ui/layout";
import Navbar from "components/ui/navbar";
import Dashboard from "components/dashboard";
import { DashboardProvider } from "providers/dashboard.provider";

function Home() {
  return (
    <Layout bgColor="hsl(252 6% 19% / 1)">
      <Navbar />
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </Layout>
  );
}

export default authRoute(Home, { redirectTo: "/auth/login" });
