import React from "react";
import Carousel from "./Carousel";
import Banner from "../../assets/banner.png";
import BannerMuaBan from "../../assets/mua-ban.png";
import BannerDichVu from "../../assets/dich-vu.png";
import { PhoneOutlined } from "@ant-design/icons";
import SellProducts from "./SellProducts";
import { Link } from "react-router-dom";
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
        <div className="w-[70%] m-auto flex justify-center">
          <img src={Banner} alt="" className="w-[100%]" />
        </div>

        <div className="w-[70%] m-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Link
            class="min-h-[220px] col hover:opacity-50 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${BannerMuaBan})` }}
          >
            <div className="h-[70%] flex items-center">
              <div className="text-2xl pl-6 font-semibold uppercase">Mua sắm</div>
            </div>
          </Link>
          <Link
            class="min-h-[220px] col hover:opacity-50 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${BannerDichVu})` }}
          >
            <div className="w-[50%] h-[70%] flex items-center">
              <div className="text-2xl pl-6 font-semibold uppercase">Dịch vụ chăm sóc cây</div>
            </div>
          </Link>
        </div>
        
        <SellProducts />
      </div>
    </>
  );
}

export default Home;
