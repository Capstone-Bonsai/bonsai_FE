import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { useNavigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
function CustomerRoute() {
  const cookies = new Cookies();
  const userInfo = cookies.get("user");
  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo?.role === "Manager") navigate("/admin/")
  }, [userInfo]);

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
