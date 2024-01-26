import { useState } from "react";
import Router from "./router/Router";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Banner />
      <div className="min-h-screen">
      <Router />
      </div>
      <Footer />
    </>
  );
}

export default App;
