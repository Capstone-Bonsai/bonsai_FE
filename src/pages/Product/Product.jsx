import React from "react";
import Navbar from "../HomePage/NavBar";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import CayTung from "../../assets/cay-tung.png";
function Product() {
  return (
    <div>
      <Navbar />
      <div className="m-auto w-[70%] mt-10">
        <div>
          <div className="flex items-center justify-between">
            <div className="text-[#0A0A0A] font-bold text-[24px]">
              Tất cả sản phẩm
            </div>
            <div className="flex items-center">
              <div className="mr-5">Showing 1-20 of 614 results</div>
              <div className="border p-2">Thứ tự theo giá: cao xuống thấp</div>
            </div>
          </div>
          <div className="flex">
            <Link className="pr-2 text-[#666666] opacity-50  hover:opacity-100">
              Trang chủ
            </Link>
            <div>/ Sản phẩm</div>
          </div>
        </div>
        <div className="w-[195px] text-center drop-shadow-lg bg-[#ffffff]">
          <div>
            <img className="m-auto" src={CayTung} alt="" />
          </div>
          <div className="text-[18px] text-[#1E7100] mt-5">
            Cây Tùng Xương Cá
          </div>
          <div className="text-[#E04C78] py-5">1.200.000 ₫</div>
        </div>
      </div>
      <div className="text-center">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}

export default Product;
