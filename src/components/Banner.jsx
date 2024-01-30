import React, { useEffect, useState } from "react";
import logo from "../assets/logo_footer_final.png";
import SPCus from "../assets/img-sp.webp";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
function Banner() {
  const { Search } = Input;
  const navLinks = [
    { text: "Trang chủ", to: "/" },
    { text: "Sản phẩm", to: "/product" },
    { text: "Chăm sóc cây cảnh", to: "/knowledge" },
    { text: "Địa chỉ", to: "/address" },
  ];

  const cookies = new Cookies();
  const [cartItemCount, setCartItemCount] =  useState(cookies.get("cartItems")?.length);


  // useEffect(() => {
  //   if (storedCartItems) {
  //     setCartItemCount(storedCartItems?.length);
  //   }
  // }, []);

  // const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <>
      <div className="bg-[#3a9943] py-5">
        <div className="w-[70%] h-[100%] m-auto">
          <div className="flex justify-between items-center border-b border-gray-200 border-opacity-50 pb-3">
            <div className="text-[#ffffff]">Theo dõi chúng tôi</div>
            <div className="flex items-center justify-center">
              <a href="" className="text-white no-underline pr-2">
                Đăng nhập
              </a>
              <a
                href=""
                className="pl-2 pr-2 text-white no-underline border-l-2 border-white"
              >
                Đăng ký
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <img src={logo} width={200} height={200} />
            <div className="relative">
              <input
                placeholder="Nhập sản phẩm tại đây..."
                className="border-none w-[60vh] h-[50px] focus:outline-none active:border-none rounded-[5px] text-[#ffffff] text-[18px] placeholder-[#ffffff] bg-[#61ad69] pl-[40px] pr-[10px]"
              />
              <Link className="absolute inset-y-0 right-5 flex items-center pl-2 text-[#ffffff] text-[30px] hover:text-[#ffdd20]">
                <SearchOutlined />
              </Link>
            </div>
            <div className="flex items-center">
              <img src={SPCus} alt="" />
              <div className="ml-3">
                <div className="text-[#ffffff]">Chăm sóc khách hàng</div>
                <div className="text-[#ffdd20]">0912345667</div>
              </div>
            </div>
            <Link
              to="/shoppingCart"
              className="text-[30px] w-[70px] h-[50px] text-[#ffffff] flex items-center border pl-2 rounded-[5px] 
          border-[#ffffff]-500 border-opacity-50 border-opacity-50 hover:bg-[#ffffff] hover:text-black"
            >
              <ShoppingCartOutlined />
              <div className="w-[20px] h-[20px] bg-[red] flex text-[15px] justify-center items-center rounded-full">
                {cartItemCount}
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="drop-shadow-md bg-[#ffffff]">
        <div className="flex w-[70%] h-[50px] items-center font-medium m-auto uppercase ">
          {navLinks.map((link, index) => (
            <div key={index} className="pr-10 montserrat hover:text-[#54a65b]">
              <Link className="" to={link.to}>
                {link.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Banner;
