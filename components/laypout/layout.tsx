import React from "react";
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
      <Header />
      <Slider />
      <main className="main">{children}</main>
      <FormEmail />
      <Footer />
    </div>
  );
};

export default Layout;
