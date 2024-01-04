import { useState } from "react";
import Router from "./router/Router";
import Banner from "./components/Banner";

function App() {
  return (
    <>
      <Banner />
        <Router />
    </>
  );
}

export default App;
