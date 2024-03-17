import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Banner from "../../assets/banner.png";
import BannerMuaBan from "../../assets/mua-ban.png";
import BannerDichVu from "../../assets/dich-vu.png";
import { PhoneOutlined } from "@ant-design/icons";
import SellProducts from "./SellProducts";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { profileUser } from "../../redux/slice/authSlice";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { bonsaiOffice } from "../../data/TopProducts";

import { setBonsaiOffice } from "../../redux/slice/productSlice";
import { fetchAllBonsaiPagination } from "../../redux/slice/bonsaiSlice";
import Loading from "../../components/Loading";
import { fetchStyleCount } from "../../redux/slice/styleSlice";
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
  const dispatch = useDispatch();
  const { topProductDTO } = useSelector((state) => state.product);
  const { allBonsaiPaginationDTO } = useSelector((state) => state.bonsai);
  const { styleCount } = useSelector((state) => state.style);
  const loading = useSelector((state) => state.bonsai.loading);
  useEffect(() => {
    dispatch(fetchStyleCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllBonsaiPagination({
        pageIndex: 0,
        pageSize: 8,
        keyword: "",
      })
    );
  }, [dispatch]);
  const navigate = useNavigate();
  const handleFilterStyle = (styleId) => {
    console.log(styleId);
    navigate("/bonsai", { state: { styleId } });
  };
  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="">
          <div className="">
            <div className="flex items-center"></div>
          </div>

          <div className="w-[70%] m-auto flex justify-center">
            <img src={Banner} alt="" className="w-[100%]" />
          </div>

          <div className="w-[70%] m-auto mt-6 flex justify-between gap-5">
            <Link
              className="min-h-[220px] w-[50%]  hover:opacity-50 bg-cover bg-no-repeat relative "
              to="/bonsai"
            >
              <img src={BannerMuaBan} alt="" className="w-full h-full " />
              <div className="text-2xl pl-6 font-semibold uppercase absolute top-[30%]">
                Mua sắm
              </div>
            </Link>
            <Link
              className="min-h-[220px]  w-[50%]  hover:opacity-50 bg-cover bg-no-repeat relative"
              to="/service"
            >
              <img src={BannerDichVu} alt="" className="w-full h-full " />
              <div className="text-2xl pl-6 font-semibold uppercase absolute top-[30%]">
                Dịch vụ chăm sóc
              </div>
            </Link>
          </div>

          <SellProducts
            topProductDTO={topProductDTO}
            allBonsaiPaginationDTO={allBonsaiPaginationDTO}
            styleCount={styleCount}
            handleFilterStyle={handleFilterStyle}
          />
        </div>
      )}
    </>
  );
}

export default Home;
