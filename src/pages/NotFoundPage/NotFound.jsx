import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function HomeNavigate() {
  return <Navigate to={{ pathname: "/" }} />;
}

function LoginNavigate() {
  useEffect(() => {
    toast.warning("Bạn cần đăng nhập để truy cập trang này.");
  }, []);

  return <Navigate to={{ pathname: "/login" }} />;
}

function ProductManagetNavigate() {
  return <Navigate to={{ pathname: "/admin/dashboard" }} />;
}
function ContractNavigate() {
  return <Navigate to={{ pathname: "/admin/serviceOrder" }} />;
}

export {
  HomeNavigate,
  LoginNavigate,
  ProductManagetNavigate,
  ContractNavigate,
};
