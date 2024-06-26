import React, { useEffect, useState } from "react";

import { categoryList } from "../../data/AllCategory";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import dangHoanh from "../../assets/dangHoanh.jpg";
import dangHuyen from "../../assets/dangHuyen.jpg";
import dangTruc from "../../assets/dangTruc.jpg";
import dangXien from "../../assets/dangXien.jpg";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import { addToCart } from "../Bonsai/AddToCart";
import { useDispatch } from "react-redux";
import { motion, useScroll } from "framer-motion";
import { Image } from "antd";

function SellProducts({
  bonsaiCayThong,
  styleCount,
  handleFilterStyle,
  bonsaiCayTrac,
}) {
  const imageMapping = {
    "27e666b4-4731-4d20-921a-08dc3f334824": dangXien,
    "1b3c4d1b-1100-43cc-faaa-08dc3f36382d": dangHuyen,
    "69d3d9f5-65b1-41b8-faab-08dc3f36382d": dangHoanh,
    "aa996d1c-ede4-4b66-faac-08dc3f36382d": dangTruc,
  };
  const dispatch = useDispatch();
  return (
    <>
      <div className="m-auto w-[70%] mt-10">
        <div className="text-[#00B214] text-center text-2xl font-bold">
          SẢN PHẨM ĐA DẠNG
        </div>

        <div className="mb-6">
          <div className="flex mt-5 border-b-2 pb-1">
            <div className="text-[#00B214] font-bold text-2xl">CÂY TRẮC</div>
          </div>
          <div className="m-auto flex flex-wrap gap-[60px] pl-5 pr-5">
            {bonsaiCayTrac?.items?.map((office) => (
              <motion.div
                className="mt-5 w-[270px] drop-shadow-lg bg-[#ffffff] h-[370px] "
                whileHover={{ scale: 1.1 }}
                key={office.id}
              >
                <Image
                  className="object-cover"
                  width="100%"
                  height="250px"
                  src={
                    office.bonsaiImages.length == 0
                      ? ""
                      : office.bonsaiImages[0]?.imageUrl
                  }
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src =
                      "https://i.ibb.co/8sQwx76/images-q-tbn-ANd9-Gc-TE3ogc-Suv-DVe-N1iwin1a-Tlbrk2-QXSKYv-Vz7t-Sn0-LV9k7h2-L-FPu-Pndu-Ow-HIE8jc3-L.png";
                  }}
                />
                <div className="pt-3 px-3">
                  <div className="">
                    <Link
                      to={`/bonsaiDetail/${office.id}`}
                      className="text-[#333333] block overflow-hidden whitespace-nowrap overflow-ellipsis text-2xl hover:text-[#1E7100]"
                    >
                      {office.name}
                    </Link>
                  </div>
                  <div>
                    Code: {office.code != "" ? office.code : "Đang cập nhật"}
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="flex items-center">
                      <div className="text-[#3A994A] text-xl font-semibold">
                        {formatPrice(office.price)}
                      </div>
                    </div>
                    <div className="col-end-4 flex justify-end">
                      <button
                        onClick={() => {
                          addToCart(office.id, dispatch);
                        }}
                        className="text-[20px] w-[40px] h-[40px] bg-[#f2f2f2] flex items-center border pl-2 rounded-[100%] 
          border-[#ffffff]-500 border-opacity-50 border-opacity-50 hover:bg-[#3A994A] hover:text-[#ffffff]"
                      >
                        <ShoppingCartOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between mt-5 border-b-2 pb-1">
            <div className="text-[#00B214] font-bold text-2xl">
              CÂY THÔNG ĐÀ LẠT
            </div>
          </div>
          <div className="m-auto flex flex-wrap gap-[60px] pl-5 pr-5">
            {bonsaiCayThong?.items?.map((office) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mt-5 w-[270px] drop-shadow-lg bg-[#ffffff] h-[370px] "
                key={office.id}
              >
                <Image
                  className="object-cover"
                  width="100%"
                  height="250px"
                  src={
                    office.bonsaiImages.length == 0
                      ? ""
                      : office.bonsaiImages[0]?.imageUrl
                  }
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src =
                      "https://i.ibb.co/8sQwx76/images-q-tbn-ANd9-Gc-TE3ogc-Suv-DVe-N1iwin1a-Tlbrk2-QXSKYv-Vz7t-Sn0-LV9k7h2-L-FPu-Pndu-Ow-HIE8jc3-L.png";
                  }}
                />
                <div className="pt-3 px-3">
                  <div className="">
                    <Link
                      to={`/bonsaiDetail/${office.id}`}
                      className="text-[#333333] block overflow-hidden whitespace-nowrap overflow-ellipsis text-2xl hover:text-[#1E7100]"
                    >
                      {office.name}
                    </Link>
                  </div>
                  <div>
                    Code: {office.code != "" ? office.code : "Đang cập nhật"}
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="flex items-center">
                      <div className="text-[#3A994A] text-xl font-semibold">
                        {formatPrice(office.price)}
                      </div>
                    </div>
                    <div className="col-end-4 flex justify-end">
                      <button
                        onClick={() => {
                          addToCart(office.id, dispatch);
                        }}
                        className="text-[20px] w-[40px] h-[40px] bg-[#f2f2f2] flex items-center border pl-2 rounded-[100%] 
          border-[#ffffff]-500 border-opacity-50 border-opacity-50 hover:bg-[#3A994A] hover:text-[#ffffff]"
                      >
                        <ShoppingCartOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mt-5 border-b-2 pb-1">
            <div className="text-[#00B214] font-bold text-2xl">
              DÁNG CÂY NỔI BẬT
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            {styleCount?.slice(0, 4)?.map((styleCountItem) => (
              <button
                className="mt-5 w-[270px] drop-shadow-lg bg-[#ffffff] h-[355px] bg-local bg-no-repeat bg-cover hover:opacity-50"
                onClick={() => handleFilterStyle(styleCountItem.id)}
                style={{
                  backgroundImage: `url(${imageMapping[styleCountItem.id]})`,
                  backgroundPosition: "center",
                }}
                key={styleCountItem.id}
              >
                <div className="text-center flex flex-col-reverse h-[100%] py-2">
                  <div className="font-normal">
                    {styleCountItem.count} sản phẩm
                  </div>
                  <div className="text-lg font-semibold uppercase">
                    {styleCountItem.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SellProducts;
