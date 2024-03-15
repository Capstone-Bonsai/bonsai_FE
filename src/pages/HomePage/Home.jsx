import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Banner from "../../assets/banner.png";
import BannerMuaBan from "../../assets/mua-ban.png";
import BannerDichVu from "../../assets/dich-vu.png";
import { PhoneOutlined } from "@ant-design/icons";
import SellProducts from "./SellProducts";
import { Link, useLocation, useParams } from "react-router-dom";
import { profileUser } from "../../redux/slice/authSlice";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
function Home() {
  const cookies = new Cookies();
  const userInfo = cookies?.get("user");
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const code = searchParams.get("code");
  useEffect(() => {
    console.log("User ID:", userId);
    console.log("Code:", code);
  }, [userId, code]);
  return (
    <>
      <div className="">
        <div className="">
          <div className="flex items-center"></div>
        </div>

        <div className="w-[70%] m-auto flex justify-center">
          <img src={Banner} alt="" className="w-[100%]" />
        </div>

        <div className="w-[70%] m-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Link
            className="min-h-[220px] col hover:opacity-50 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${BannerMuaBan})` }}
            to="/bonsai"
          >
            <div className="h-[70%] flex items-center">
              <div className="text-2xl pl-6 font-semibold uppercase">
                Mua sắm
              </div>
            </div>
          </Link>
          <Link
            className="min-h-[220px] col hover:opacity-50 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${BannerDichVu})` }}
            to="/service"
          >
            <div className="w-[50%] h-[70%] flex items-center">
              <div className="text-2xl pl-6 font-semibold uppercase">
                Dịch vụ chăm sóc
              </div>
            </div>
          </Link>
        </div>

        <SellProducts />
      </div>
    </>
  );
}

export default Home;
