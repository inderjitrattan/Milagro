import Head from "next/head";
import Preloader from "@/src/layouts/Preloader";
import "@/styles/globals.css";
import { Fragment } from "react";
const App = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Milagro - Cafe &amp; Restaurant React NextJS Template</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Preloader />
      <Component {...pageProps} />
    </Fragment>
  );
};
export default App;
