import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

import fetcher from "lib/fetch";
import { AuthProvider } from "providers/auth.provider";
import Gradients from "components/ui/gradients";

import "styles/styles.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Head>
        <title>stockspec</title>
      </Head>
      <Gradients />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SWRConfig>
  );
};

export default App;
