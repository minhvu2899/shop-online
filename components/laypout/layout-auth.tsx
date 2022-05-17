import React from "react";
import Footer from "../footer";
import FormEmail from "../footer/form";
import Header from "../header";
import Slider from "./slider";
interface LayOutAuthProps {
  children: React.ReactNode;
}
const LayOutAuth = ({ children }: LayOutAuthProps) => {
  return (
    <div className="container">
      <Header />
      <main className="main">{children}</main>
      <FormEmail />
      <Footer />
    </div>
  );
};

export default LayOutAuth;
