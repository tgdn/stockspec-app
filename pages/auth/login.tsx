import React from "react";

import { authRoute } from "providers/auth.provider";
import AuthLayout from "components/auth/layout";
import Login from "components/auth/login";

function Auth() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}

export default authRoute(Auth, { redirectIfFound: "/" });
