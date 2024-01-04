import { useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Home from "../pages/HomePage/Home";
import Product from "../pages/Product/Product";
function Router() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product",
      element: <Product />
    }
  ]);
  if (!element) return null;
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </>
  );
}

export default Router;
