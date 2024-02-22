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
import PrivateRoute from "./PrivateRoute";
function Router() {
  const element = useRoutes([
    {
      path: "/Login",
      element: <Login />,
    },

    {
      element: <CustomerRoute />,
      children: [
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
      ],
    },
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/admin/user",
          element: <UserManage />,
        },
        {
          path: "/admin/product",
          element: <ProductManage />,
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
