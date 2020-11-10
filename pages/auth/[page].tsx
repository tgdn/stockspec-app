import React from "react";
import { useRouter } from "next/router";

import { authRoute } from "providers/auth.provider";
import AuthLayout from "components/auth/layout";
import Login from "components/auth/login";

function Auth() {
  const router = useRouter();
  const { page } = router.query;
  if (!["login", "signup"].includes(page as string)) {
    router.replace("/auth/login");
  }

  return (
    <AuthLayout>{page === "signup" ? <div>signup</div> : <Login />}</AuthLayout>
  );
}

export default authRoute(Auth, { redirectIfFound: "/" });
