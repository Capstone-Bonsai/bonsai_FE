import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarUser() {
  const menuItems = [
    { name: "Quản lý đặt hàng", path: "/manageOrder" },
    { name: "Profile", path: "/Profile" },
    { name: "Settings", path: "/settings" },
  ];
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <nav className="border w-[20%] ">
      <ul className=" w-full">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="p-4 text-start border text-black w-full hover:bg-[#3e9943] hover:text-[#ffffff] "
            onClick={() => handleNavigation(item.path)}
          >
            {item.name}
          </button>
        ))}
      </ul>
    </nav>
  );
}

export default NavbarUser;
