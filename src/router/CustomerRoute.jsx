import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function CustomerRoute() {
  return (
    <>
      <ToastContainer />

      <Banner />
      <Outlet />
      <Footer />
    </>
  );
}

export default CustomerRoute;
