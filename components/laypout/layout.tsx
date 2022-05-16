import React from "react";
import Footer from "../footer";
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
      <Footer />
    </div>
  );
};

export default Layout;
