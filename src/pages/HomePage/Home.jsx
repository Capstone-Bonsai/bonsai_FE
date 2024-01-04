import React from "react";
import logo from "../../assets/logo.jpg";
import Carousel from "./Carousel";
import HomeSearch from "./HomeSearch";
import { PhoneOutlined } from "@ant-design/icons";
import NavBar from "./NavBar";
function Home() {
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between w-[70%] m-auto">
          <img src={logo} width={100} />
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
      </div>
    </>
  );
}

export default Home;
