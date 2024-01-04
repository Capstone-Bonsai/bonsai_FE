import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
function Navigation() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Navigation;
