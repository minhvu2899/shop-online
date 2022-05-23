import Head from "next/head";
import React, { useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Footer from "../footer";
import FormEmail from "../footer/form";
import Header from "../header";
import Notification from "../ui/notification";
import Slider from "./slider";
import Loading from "./../loading/index";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const notificationCtx = useContext(NotificationContext);
  return (
    <div className="container">
      <Head>
        <title>Shop online</title>
        <meta name="description" content="Shop online" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {notificationCtx.notification && (
        <Notification
          message={notificationCtx.notification.message}
          status={notificationCtx.notification.status}
        />
      )}

      <Header />
      <Slider />
      <main className="main">{children}</main>
      <FormEmail />
      <Footer />
    </div>
  );
};

export default Layout;
