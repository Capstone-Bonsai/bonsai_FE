import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
function CustomerPrivateRoute() {
  const cookies = new Cookies();
  const userInfo = cookies.get("user");
  return (
    <>
      {userInfo.role == "Customer" ? (
        <>
          <ToastContainer />
          <Banner />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}

export default CustomerPrivateRoute;
