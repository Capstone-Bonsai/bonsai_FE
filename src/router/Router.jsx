import { useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Home from "../pages/HomePage/Home";
import ShoppingCart from "../pages/Bonsai/ShoppingCart";
import ServiceListPage from "../pages/ServicePage/ServiceListPage";
import ProductManage from "../pages/AdminPage/ProductManagement/ProductManage";
import CustomerRoute from "./CustomerRoute";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UserManage from "../pages/AdminPage/UserManagement/UserManage";
import PrivateRoute from "./PrivateRoute";
import OrderManage from "../pages/AdminPage/OrderManagement/OrderManage";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Order from "../pages/OrderProduct/Order";
import ProfileUser from "../pages/Profile/ProfileUser";
import ManageOrder from "../pages/OrderProduct/ManageOrder";
import Bonsai from "../pages/Bonsai/Bonsai";
import BonsaiDetail from "../pages/Bonsai/BonsaiDetail";
import ServiceDetailPage from "../pages/ServicePage/ServiceDetailPage";
function Router() {
  const element = useRoutes([
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
          path: "/bonsai",
          element: <Bonsai />,
        },
        {
          path: "/bonsaiDetail/:bonsaiId",
          element: <BonsaiDetail />,
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
          path: "/ServiceDetail/:serviceId",
          element: <ServiceDetailPage />,
        },
        {
          path: "/service",
          element: <ServiceListPage />,
        },
        {
          path: "/ForgotPassword",
          element: <ForgotPassword />,
        },
        {
          path: "/Profile",
          element: <ProfileUser />,
        },

        {
          path: "/ManageOrder",
          element: <ManageOrder />,
        },
        {
          path: "/api/Auth/ConfirmEmail",
          element: <Login />,
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
        {
          path: "/admin/order",
          element: <OrderManage />,
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
        {
          path: "/admin/order",
          element: <OrderManage />,
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
