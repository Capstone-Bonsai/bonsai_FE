import React from "react";
import Banner from "../../assets/banner.png";
import BannerMuaBan from "../../assets/mua-ban.png";
import BannerDichVu from "../../assets/dich-vu.png";
import { Link } from "react-router-dom";
function ServiceListPage() {
  return (
    <>
      <div className="mb-12 pb-12">
        <div className="">
          <div className="text-center text-3xl font-semibold my-12">
            Dịch vụ chăm sóc
          </div>
        </div>

        <div className="w-[70%] m-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          <div class="min-h-[500px] w-[70%] m-auto drop-shadow-lg text-center border-2 hover:border-gray-950">
            <div className="text-2xl py-12 font-semibold uppercase">
              Gói theo ngày
            </div>
            <div className="pb-4">chỉ</div>
            <div className="text-4xl font-extrabold uppercase">100.000</div>
            <div className="pt-4">vnd/ngày</div>
            <div className="py-8 text-lg font-semibold">
              <ul className="">
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Link
                className="text-[20px] w-[40%] h-[56px] flex justify-center items-center rounded
          border-2 border-slate-950 hover:bg-slate-200"
              >
                Mua ngay
              </Link>
            </div>
          </div>
          <div class="min-h-[500px] w-[70%] m-auto drop-shadow-lg text-center border-2 hover:border-gray-950">
            <div className="w-[100%] h-[32px] bg-gray-950 text-[#ffffff] flex justify-center items-center font-semibold">Đề cử</div>
            <div className="text-2xl pt-4 pb-12 font-semibold uppercase">
              Gói theo tháng
            </div>
            <div className="pb-4">chỉ</div>
            <div className="text-4xl font-extrabold uppercase">10.000.000</div>
            <div className="pt-4">vnd/tháng</div>
            <div className="py-8 text-lg font-semibold">
              <ul className="">
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Link
                className="text-[20px] w-[40%] h-[56px] flex justify-center items-center rounded-lg
                bg-red-600 hover:bg-red-500 text-[#ffffff]"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceListPage;
