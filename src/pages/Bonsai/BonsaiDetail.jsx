import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCartOutlined,
  FileSearchOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
import noImage from "../../assets/unImage.png";
import {
  bonsaiSameCategory,
  fetchBonsaiById,
} from "../../redux/slice/bonsaiSlice";
import MinHeight from "../../components/MinHeight";
import logo from "../../assets/logoFinal.png";
import carShip from "../../assets/ship.png";
import { addToCart } from "./AddToCart";
import { motion, useScroll, useTransform } from "framer-motion";
import { formatPrice } from "../../components/formatPrice/FormatPrice";

function BonsaiDetail() {
  const dispatch = useDispatch();
  const { bonsaiId } = useParams();

  useEffect(() => {
    dispatch(fetchBonsaiById(bonsaiId));
  }, [bonsaiId]);

  const bonsaiDetail = useSelector((state) => state.bonsai?.bonsaiById);
  const bonsaiCategory = useSelector(
    (state) => state.bonsai?.bonsaiById?.categoryId
  );

  console.log(bonsaiCategory);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          pageIndex: 0,
          pageSize: 4,
          category: bonsaiCategory,
        };
        await dispatch(bonsaiSameCategory(payload));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [bonsaiDetail]);
  const bonsaiListSameCategory = useSelector((state) =>
    state?.bonsai?.bonsaiSameCategory?.items?.filter(
      (item) => item.id !== bonsaiId
    )
  );
  const loading = useSelector((state) => state.bonsai.loading);

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (bonsaiDetail.bonsaiImages) {
      setCurrentImage(bonsaiDetail.bonsaiImages[0]?.id);
    }
  }, [bonsaiDetail.bonsaiImages]);

  const handleImageClick = (newImageId) => {
    setCurrentImage(newImageId);
  };

  const cookies = new Cookies();
  const userInfo = cookies.get("user");
  const idUser = userInfo?.id;

  const { scrollYProgress } = useScroll();
  const progressBarHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );
  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <MinHeight>
          <div className="m-auto max-w-5xl flex flex-col lg:flex-row justify-between my-10">
            <div className="w-full lg:w-1/2">
              <div className="flex">
                <div className="w-full h-[450px] lg:w-[450px] drop-shadow-lg">
                  <Image
                    src={
                      bonsaiDetail.bonsaiImages?.find(
                        (image) => image.id === currentImage
                      )?.imageUrl || ""
                    }
                    alt=""
                    width="100%"
                    height="100%"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex mt-5 space-x-2">
                {bonsaiDetail.bonsaiImages?.map((imageDetail) => (
                  <img
                    key={imageDetail.id}
                    src={imageDetail.imageUrl}
                    alt=""
                    onClick={() => handleImageClick(imageDetail.id)}
                    style={{
                      cursor: "pointer",
                      opacity: currentImage === imageDetail.id ? 1 : 0.5,
                      border:
                        currentImage === imageDetail.id
                          ? "5px solid #3a9943"
                          : "none",
                    }}
                    className="object-cover w-[103px] h-[103px]"
                  />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 border p-5 mt-5 lg:mt-0 rounded-[10px]">
              <div className="border-b pb-10">
                <div className="text-sm text-gray-700 flex items-center mb-3">
                  <span className="text-[20px] pr-2">
                    <TagsOutlined />{" "}
                  </span>{" "}
                  Dáng cây:
                  <div className="pl-2 opacity-70 text-[#3a9943] italic ">
                    {bonsaiDetail.style?.name}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-3xl uppercase text-gray-900 font-semibold">
                    {bonsaiDetail.name}
                  </div>
                  <div className="text-[#3a9943] text-2xl font-bold mt-2">
                    {formatPrice(bonsaiDetail.price)}
                  </div>
                </div>
                <div className="opacity-70 text-[15px]">
                  <div>
                    <span className="">Hoành cây: </span>{" "}
                    {bonsaiDetail.trunkDimenter}cm
                  </div>
                  <div>
                    Chiều cao:{" "}
                    {bonsaiDetail.height != null ? (
                      <> {bonsaiDetail.height}m</>
                    ) : (
                      "Không có thông tin"
                    )}
                  </div>
                  <div>
                    Trồng năm:{" "}
                    {bonsaiDetail.yearOfPlanting != null
                      ? bonsaiDetail.yearOfPlanting
                      : "Không có thông tin"}
                  </div>
                  <div>
                    Code:{" "}
                    {bonsaiDetail.code != ""
                      ? bonsaiDetail.code
                      : "Đang cập nhật"}
                  </div>
                </div>
              </div>
              <div className="py-5 border-b">{bonsaiDetail.description}</div>
              <div className="border-b py-5 flex items-center justify-between">
                <div className="flex items-center text-[#3a9943]">
                  <ShoppingCartOutlined className="text-2xl" />
                  <span className="ml-2">Còn hàng</span>
                </div>
                <button
                  className="bg-[#f2f2f2] text-black px-6 py-3 rounded-md text-lg hover:bg-[#3a9943] hover:text-[#fff] transition duration-300"
                  onClick={() => {
                    addToCart(bonsaiDetail.id, dispatch);
                  }}
                >
                  + Thêm vào Giỏ Hàng
                </button>
              </div>
              <div className="flex justify-between py-5 gap-5">
                <div className="flex flex-col items-center">
                  <img src={carShip} className="w-[100px] " alt="" />
                  <div className="text-[15px]">0909.045.444</div>
                </div>
                <div>
                  <div className="font-bold">
                    372 Quốc lộ 20, Liên Nghĩa, Đức Trọng, Lâm Đồng
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center my-5">
            <div className="text-start w-[75%] font-bold text-[25px]">
              Các cây khác cùng loại:{" "}
            </div>
            <div className="w-[70%] flex flex-wrap gap-5">
              {
                bonsaiListSameCategory?.length > 0
                  ? bonsaiListSameCategory?.map((bonsai) => (
                      <motion.div
                        key={bonsai.id}
                        className="w-[255px] h-[355px] border mt-2 mx-5"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Image
                          className="bg-cover bg-no-repeat w-full h-[250px]"
                          width="100%"
                          height="250px"
                          src={
                            (bonsai?.bonsaiImages).length > 0
                              ? bonsai.bonsaiImages[0]?.imageUrl
                              : noImage
                          }
                        />
                        <div className="flex justify-evenly">
                          <div className="py-2 text-[18px] w-[70%]">
                            <Link
                              className="text-[20px]
                      hover:text-[#3a9943] block overflow-hidden whitespace-nowrap overflow-ellipsis"
                              to={`/bonsaiDetail/${bonsai.id}`}
                            >
                              {bonsai.name}
                            </Link>
                            <div className="text-[12px] opacity-70">
                              Code:{" "}
                              {bonsai.code != ""
                                ? bonsai.code
                                : "đang cập nhật"}
                            </div>
                            <div className="text-[#3a9943] text-[16px]">
                              {formatPrice(bonsai.price)}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              {
                                addToCart(bonsai.id, dispatch);
                              }
                            }}
                            className="bg-[#f2f2f2] mt-5 w-[50px] h-[50px] flex justify-center items-center rounded-full hover:text-[#ffffff] hover:bg-[#3a9943]"
                          >
                            <ShoppingCartOutlined />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  : ""
                // (
                //   <div className="w-full flex flex-col justify-center items-center">
                //     <FileSearchOutlined className="text-[200px] opacity-30" />
                //     <div className="opacity-30">
                //       Hix. Không có sản phẩm nào. Bạn thử tắt điều kiện lọc và tìm
                //       lại nhé?
                //     </div>
                //   </div>
                // )
              }
            </div>
          </div>
        </MinHeight>
      )}
    </>
  );
}

export default BonsaiDetail;
