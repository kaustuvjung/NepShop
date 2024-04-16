import React from "react";
import Fotter from "./footer/Fotter";
import Header from "./header/Header";


const Layout = ({ children }) => {
  return (
    <>
      <Header/>
      <div className="--pad" style={{ minHeight: "80vh" }}>
        {children}
      </div>
      <Fotter />
    </>
  );
};

export default Layout;