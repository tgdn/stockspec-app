import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "styles/styles.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>stockspec</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
