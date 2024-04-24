import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function NavbarUser() {
  const menuItems = [
    { name: "Hồ sơ người dùng", path: "/Profile" },
    { name: "Quản lý đặt hàng", path: "/ManageOrder" },
    { name: "Vườn của bạn", path: "/CustomerGarden" },
    { name: "Bonsai của bạn", path: "/CustomerBonsai" },
    { name: "Quản lý hợp đồng", path: "/ManageContractUser" },
  ];
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(
    menuItems.find((item) => item.path === location.pathname)
  );
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedItem(menuItems.find((item) => item.path === location.pathname));
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    if (selectedItem?.path !== path) {
      setSelectedItem(menuItems.find((item) => item.path === path));
    }
  };

  return (
    <nav className="border w-[20%] h-[400px]">
      <ul className=" w-full">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`p-4 text-start border text-black w-full hover:bg-[#3e9943] hover:text-[#ffffff] ${
              selectedItem?.path === item.path ? "bg-[#3e9943] text-white" : ""
            }`}
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
