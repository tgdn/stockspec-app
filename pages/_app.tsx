import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

import fetcher from "lib/fetch";
import { AuthProvider } from "providers/auth.provider";

import "styles/styles.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Head>
        <title>stockspec</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SWRConfig>
  );
};

export default App;
