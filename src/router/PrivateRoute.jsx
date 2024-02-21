import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function PrivateRoute() {
  return (
    <>
      <ToastContainer />
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
}

export default PrivateRoute;
