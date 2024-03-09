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

        {/* <div className="w-[70%] m-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 "> */}
        <div class="min-h-[300px] w-[90%] m-auto drop-shadow-lg border-2 hover:border-gray-950 grid grid-cols-8 lg:grid-cols-8 gap-4 ">
          <div className="col-span-2"></div>
          <div className="col-span-4">
            <div className="text-2xl py-6 font-normal">
              Gói theo ngày
            </div>
            <div className="py-8 text-lg font-light">
              <ul className="">
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
              </ul>
            </div>
          </div>
          <div className="col-span-2 border-l-2 border-slate-200 p-12">
            <div className=""></div>
            <div className="p-6">
              <div className="text-4xl font-extrabold uppercase">100.000 <span className="text-sm">vnd/ngày</span></div>
              <div className="pt-4"></div>
            </div>
            <div className="text-center">
              <Link
                className="text-[20px] w-[100%] h-[56px] flex justify-center items-center rounded
          border-2 border-slate-950 hover:bg-slate-200"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default ServiceListPage;
