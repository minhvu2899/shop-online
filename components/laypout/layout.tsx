import Head from "next/head";
import React from "react";
import { CartContextProvider } from "../../store/CartContext";
import Footer from "../footer";
import FormEmail from "../footer/form";
import Header from "../header";
import Slider from "./slider";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      <Head>
        <title>Shop online</title>
        <meta name="description" content="Shop online" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />
      <Slider />
      <main className="main">{children}</main>
      <FormEmail />
      <Footer />
    </div>
  );
};

export default Layout;
