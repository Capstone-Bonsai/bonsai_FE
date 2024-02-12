import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
function CustomerRoute() {
  return (
    <>
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
}

export default CustomerRoute;
