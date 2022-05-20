import "../styles/globals.scss";
import { ReactElement, ReactNode } from "react";
import Layout from "../components/laypout/layout";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { CartContextProvider } from "../store/cart-context";
import { NotificationContextProvider } from "../store/notification-context";
import { ProductContextProvider } from "../store/product-context";

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
      // <NotificationContextProvider>
      // <CartContextProvider>
      <Layout>{page}</Layout>
      // </CartContextProvider>
      // </NotificationContextProvider>
    ));
  let page = getLayout(<Component {...pageProps} />);
  return (
    <NotificationContextProvider>
      <ProductContextProvider>
        <CartContextProvider>{page}</CartContextProvider>
      </ProductContextProvider>
    </NotificationContextProvider>
  );
}

export default MyApp;
