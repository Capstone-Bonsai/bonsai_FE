import React from "react";
import logo from "../../assets/logo.png";
import Carousel from "./Carousel";
import HomeSearch from "./HomeSearch";
import { PhoneOutlined } from "@ant-design/icons";
import NavBar from "./NavBar";
import SellProducts from "./SellProducts";
function Home() {
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between w-[70%] m-auto">
          <img src={logo} width={200} height={200} />
          <HomeSearch />
          <div className="flex items-center">
            {/* <div className="bg-[#50b737] w-8 h-8 flex justify-center items-center rounded-full">
              <PhoneOutlined />
            </div>
            SĐT:  */}
          </div>
        </div>
        <NavBar />
        <Carousel />
        <SellProducts />
      </div>
    </>
  );
}

export default Home;
