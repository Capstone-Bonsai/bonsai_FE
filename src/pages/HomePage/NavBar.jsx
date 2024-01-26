import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
function NavBar() {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    "Cây Trồng Trong Nhà",
    "Cây Cảnh Văn Phòng",
    "Tiểu cảnh Terrarium",
    "Chậu Cây Cảnh",
    "Sen Đá",
    "Xương Rồng",
    "Phụ Kiện Terrarium",
  ];

  const navLinks = [
    { text: "Trang chủ", to: "/" },
    { text: "Sản phẩm", to: "/product" },
    { text: "Chăm sóc cây cảnh", to: "/knowledge" },
    { text: "Địa chỉ", to: "/address" },
  ];

  return (
    <div className="h-10">
      {/* <div className="w-[70%] h-[100%] flex justify-between m-auto items-center">
        <div
          ref={dropdownRef}
        >
          <div
            tabIndex={0}
            role="button"
            className="flex items-center justify-center pt-1 text-white"
          >
            Danh mục sản phẩm
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 mt-4 shadow bg-base-100 w-[300px]"
          >

          </ul>
        </div>
        {navLinks.map((link, index) => (
          <div key={index}>
            <Link to={link.to}>{link.text}</Link>
          </div>
        ))}
        <Link to="/shoppingCart" className="flex justify-center items-center text-[#00B214]">
          Giỏ hàng{" "}
          <div className="border-solid border-[#00B214] ml-2 border-2 rounded-full w-7 h-7 flex justify-center items-center">
            <ShoppingCartOutlined />
          </div>
        </Link>
      </div> */}
    </div>
  );
}

export default NavBar;
