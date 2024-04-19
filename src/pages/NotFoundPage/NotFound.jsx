import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

function HomeNavigate() {
  return <Navigate to={{ pathname: "/" }} />;
}

function LoginNavigate() {
  return <Navigate to={{ pathname: "/login" }} />;
}

function ProductManagetNavigate() {
  return <Navigate to={{ pathname: "/admin/bonsai" }} />;
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
