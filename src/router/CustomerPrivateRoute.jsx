import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
function CustomerPrivateRoute() {
  return (
    <>
      <ToastContainer />
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
}

export default CustomerPrivateRoute;
