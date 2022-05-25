import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { AuthContextProvider } from "../store/auth-context";
import { CartContextProvider } from "../store/cart-context";
import { NotificationContextProvider } from "../store/notification-context";
import { ProductContextProvider } from "../store/product-context";
import "../styles/globals.scss";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  let page = getLayout(<Component {...pageProps} />);
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <ProductContextProvider>
          <CartContextProvider>{page}</CartContextProvider>
        </ProductContextProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
