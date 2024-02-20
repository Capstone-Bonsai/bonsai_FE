import { useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Home from "../pages/HomePage/Home";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import ShoppingCart from "../pages/Product/ShoppingCart";
import ServiceListPage from "../pages/ServicePage/ServiceListPage";
import ProductManage from "../pages/AdminPage/ProductManagement/ProductManage";
import CustomerRoute from "./CustomerRoute";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UserManage from "../pages/AdminPage/UserManagement/UserManage";
import ProductDetailManage from "../pages/AdminPage/ProductManagement/ProductDetailManage";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Order from "../pages/OrderProduct/Order";
function Router() {
  const element = useRoutes([
    //test
    {
      path: "/admin/product",
      element: <ProductManage />,
    },

    {
      element: <CustomerRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/Register",
          element: <Register />,
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
          path: "/Order",
          element: <Order />,
        },
        {
          path: "/service",
          element: <ServiceListPage />,
        },
        {
          path: "/ForgotPassword",
          element: <ForgotPassword />,
        },
      ],
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
