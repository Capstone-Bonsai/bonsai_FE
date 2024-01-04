import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
function NavBar() {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
            className="dropdown-content z-[1] menu p-2 mt-4 shadow bg-base-100 w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <Link to="/">Trang chủ</Link>
        <Link to="/product">Sản phẩm</Link>
        <Link to="">Kiến thức cây cảnh</Link>
        <Link to="">Bán sỉ & nhượng quyền</Link>
        <Link to="">Tuyển dụng</Link>
        <Link to="">Địa chỉ</Link>
        <Link to="">Giỏ hàng</Link>
      </div>
    </div>
  );
}

export default NavBar;
