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
    { text: "Kiến thức cây cảnh", to: "/knowledge" },
    { text: "Bán sỉ & nhượng quyền", to: "/wholesale" },
    { text: "Tuyển dụng", to: "/recruitment" },
    { text: "Địa chỉ", to: "/address" },
  ];

  useEffect(() => {
    setDropdownOpen(location.pathname === "/");
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        location.pathname !== "/"
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef, location.pathname]);

  const toggleDropdown = () => {
    if (location.pathname !== "/") {
      setDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className="h-10 border-2">
      <div className="w-[70%] h-[100%] flex justify-between m-auto items-center">
        <div
          ref={dropdownRef}
          className={`relative dropdown ${
            isDropdownOpen ? "dropdown-open" : ""
          } shadow bg-[green] w-[15%] h-[100%]`}
          onClick={toggleDropdown}
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
            {categories.map((category, index) => (
              <li className="text-[18px] border-b " key={index}>
                <Link to={`/${category.replace(/\s+/g, "-").toLowerCase()}`}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {navLinks.map((link, index) => (
          <div key={index}>
            <Link to={link.to}>{link.text}</Link>
          </div>
        ))}
        <Link to="" className="flex justify-center items-center text-[#00B214]">
          Giỏ hàng{" "}
          <div className="border-solid border-[#00B214] ml-2 border-2 rounded-full w-7 h-7 flex justify-center items-center">
            <ShoppingCartOutlined />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
