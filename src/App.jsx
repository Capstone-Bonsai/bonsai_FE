import { useState } from "react";
import Router from "./router/Router";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Banner />
      <Router />
      <Footer />
    </>
  );
}

export default App;
