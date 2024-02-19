import { useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Home from "../pages/HomePage/Home";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import ShoppingCart from "../pages/Product/ShoppingCart";
import ServiceListPage from "../pages/ServicePage/ServiceListPage";
import ProductManage from "../pages/AdminPage/ProductManagement/ProductManage";
import OrderManage from "../pages/AdminPage/OrderManage";
import CustomerRoute from "./CustomerRoute";
import Login from "../pages/AdminPage/Login";
import UserManage from "../pages/AdminPage/UserManagement/UserManage";
import ProductDetailManage from "../pages/AdminPage/ProductManagement/ProductDetailManage";
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
    {
      path: "/service",
      element: <ServiceListPage />,
    },
    //test
    {
      path: "/admin/product",
      element: <ProductManage />,
    },
    {
      path: "/admin/productDetail/:productId",
      element: <ProductDetailManage />,
    },
    {
      path: "/admin/order",
      element: <OrderManage />,
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
