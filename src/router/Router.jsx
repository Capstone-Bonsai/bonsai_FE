import { useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Home from "../pages/HomePage/Home";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import ShoppingCart from "../pages/Product/ShoppingCart";
function Router() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product",
      element: <Product />,
    },
    {
      path: "/productDetail/:productId",
      element: <ProductDetail />,
    },
    {
      path: "/shoppingCart",
      element: <ShoppingCart />,
    },
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
