import React from "react";
import Carousel from "./Carousel";
import Banner from '../../assets/banner.png'
import { PhoneOutlined } from "@ant-design/icons";
import SellProducts from "./SellProducts";
function Home() {
  return (
    <>
      <div className="">
        <div className="">
          <div className="flex items-center">
            {/* <div className="bg-[#50b737] w-8 h-8 flex justify-center items-center rounded-full">
              <PhoneOutlined />
            </div>
            SĐT:  */}
          </div>
        </div>
        {/* <Carousel /> */}
        <div className="w-[70%] m-auto flex justify-end mt-5">
        <img src={Banner} alt="" />
        </div>
        <SellProducts />
      </div>
    </>
  );
}

export default Home;
