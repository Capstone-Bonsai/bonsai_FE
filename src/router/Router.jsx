import { useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Home from "../pages/HomePage/Home";
import ShoppingCart from "../pages/Bonsai/ShoppingCart";
import ServiceListPage from "../pages/ServicePage/ServiceListPage";
import ProductManage from "../pages/AdminPage/ProductManagement/BonsaiManagement/ProductManage";
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
import ServiceManage from "../pages/AdminPage/ServiceManagement/ServiceManage";
import ServiceDetailPage from "../pages/ServicePage/ServiceDetailPage";
import CustomerGarden from "../pages/Garden/CustomerGarden";
import Contact from "../pages/Contact/Contact";
import CustomerPrivateRoute from "./CustomerPrivateRoute";
import CustomerGardenManage from "../pages/AdminPage/CustomerGardenManagement/CustomerGardenManage";
import BaseTaskManage from "../pages/AdminPage/BaseTaskManagement/BaseTaskManage";
import ProductLayout from "../pages/AdminPage/ProductManagement/Layout";
import ManageService from "../pages/ServicePage/ManageService";
import Contract from "../pages/AdminPage/StaffPage/Contract";
import ServiceGardenChecking from "../pages/AdminPage/StaffPage/ServiceGardenChecking";
import ContractUser from "../pages/ManageContractForUser/ContractUser";
import ContractUserDetail from "../pages/ManageContractForUser/ContractUserDetail";
import Cookies from "universal-cookie";
import {
  ContractNavigate,
  HomeNavigate,
  LoginNavigate,
  ProductManagetNavigate,
} from "../pages/NotFoundPage/NotFound";
import DeliveryFeeTable from "../pages/DeliveryFee/DeliveryFeeTable";
function Router() {
  const cookies = new Cookies();
  const userInfo = cookies.get("user");
  console.log(userInfo);

  const element = useRoutes([
    {
      element: <CustomerRoute />,
      children: [
        ...(!userInfo
          ? [
              {
                path: "/Login",
                element: <Login />,
              },
              {
                path: "/Register",
                element: <Register />,
              },
              {
                path: "/api/Auth/ConfirmEmail",
                element: <Login />,
              },
              {
                path: "*",
                element: <LoginNavigate />,
              },
            ]
          : []),
        ...(userInfo?.role == "Customer"
          ? [
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
                path: "*",
                element: <HomeNavigate />,
              },
            ]
          : []),
        ...(!userInfo || userInfo?.role == "Customer"
          ? [
              {
                path: "/",
                element: <Home />,
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
                path: "/Contact",
                element: <Contact />,
              },
              {
                path: "/delivery",
                element: <DeliveryFeeTable />,
              },
            ]
          : []),
      ],
    },
    {
      element: <CustomerPrivateRoute />,
      children: [
        ...(userInfo?.role == "Customer"
          ? [
              {
                path: "/Profile",
                element: <ProfileUser />,
              },
              {
                path: "/CustomerGarden",
                element: <CustomerGarden />,
              },
              {
                path: "/ManageOrder",
                element: <ManageOrder />,
              },
              {
                path: "/ManageService",
                element: <ManageService />,
              },
              {
                path: "/ManageContract",
                element: <ManageService />,
              },
              {
                path: "/ManageContractUser",
                element: <ContractUser />,
              },
              {
                path: "/ManageContractDetail",
                element: <ContractUserDetail />,
              },
            ]
          : []),
      ],
    },
    {
      element: <PrivateRoute />,
      children: [
        ...(userInfo?.role == "Manager"
          ? [
              {
                path: "/admin/user",
                element: <UserManage />,
              },
              {
                path: "/admin/product",
                element: <ProductLayout />,
              },
              {
                path: "/admin/order",
                element: <OrderManage />,
              },
              {
                path: "/admin/service",
                element: <ServiceManage />,
              },
              {
                path: "/admin/customerGarden",
                element: <CustomerGardenManage />,
              },
              {
                path: "/admin/baseTask",
                element: <BaseTaskManage />,
              },
              {
                path: "*",
                element: <ProductManagetNavigate />,
              },
            ]
          : []),
        ...(userInfo?.role == "Manager" || userInfo?.role == "Staff"
          ? [
              {
                path: "/admin/contract",
                element: <Contract />,
              },
              {
                path: "/admin/serviceGardenChecking",
                element: <ServiceGardenChecking />,
              },
            ]
          : []),
        ...(userInfo?.role == "Staff"
          ? [
              {
                path: "*",
                element: <ContractNavigate />,
              },
            ]
          : []),
      ],
    },
  ]);
  console.log(element);
  if (!element) return null;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {element}
    </AnimatePresence>
  );
}

export default Router;
