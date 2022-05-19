import "../styles/globals.scss";
import { ReactElement, ReactNode } from "react";
import Layout from "../components/laypout/layout";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { CartContextProvider } from "../store/CartContext";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <CartContextProvider>
        <Layout>{page}</Layout>
      </CartContextProvider>
    ));
  const page = getLayout(<Component {...pageProps} />);
  return <CartContextProvider>{page}</CartContextProvider>;
}

export default MyApp;
