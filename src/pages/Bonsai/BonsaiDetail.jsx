import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Image, InputNumber, Row, Slider, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
import {
  fetchBonsaiById,
  setCartFromCookie,
} from "../../redux/slice/bonsaiSlice";
import MinHeight from "../../components/MinHeight";

function BonsaiDetail() {
  const dispatch = useDispatch();
  const { bonsaiId } = useParams();
  useEffect(() => {
    dispatch(fetchBonsaiById(bonsaiId));
  }, [bonsaiId]);

  const bonsaiDetail = useSelector((state) => state.bonsai.bonsaiById);
  const loading = useSelector((state) => state.bonsai.loading);

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (bonsaiDetail.bonsaiImages) {
      setCurrentImage(bonsaiDetail.bonsaiImages[0]?.id);
    }
  }, [bonsaiDetail.bonsaiImages]);

  const imageDetail = bonsaiDetail.bonsaiImages?.find(
    (img) => img.id == currentImage
  );
  const handleImageClick = (newImageId) => {
    setCurrentImage(newImageId);
  };

  const cookies = new Cookies();
  const userInfo = cookies.get("user");
  const idUser = userInfo?.id;

  const addToCart = async () => {
    let cartItems =
      userInfo != null
        ? cookies.get(`cartId ${idUser}`) || []
        : cookies.get("cartItems") || [];

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    const isProductExist = cartItems.some((item) => item.bonsaiId === bonsaiId);
    if (isProductExist) {
      toast.info("Sản phẩm đã có trong giỏ hàng!");
      return;
    }

    cartItems.push({
      bonsaiId,
      name: bonsaiDetail.name,
      price: bonsaiDetail.price,
      image: bonsaiDetail.bonsaiImages[0]?.imageUrl,
      subCategory: bonsaiDetail.subCategory,
    });
    toast.success("Đã thêm sản phẩm vào giỏ hàng!");

    const cartId = userInfo != null ? `cartId ${idUser}` : "cartItems";

    await cookies.set(cartId, cartItems, { path: "/" });

    const itemCount = cartItems.length;
    dispatch(setCartFromCookie({ cartItems, itemCount }));
  };

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <MinHeight>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="">
          {/* <div className="border-b py-2">
            <div className="w-[70%] m-auto mt-2">Trang chủ &gt; Sản phẩm</div>
          </div> */}
          <div className="m-auto w-[60%] flex justify-between my-10">
            <div className=" w-[450px] ">
              <div className="flex">
                <div className="w-full h-[450px] drop-shadow-lg">
                  <Image
                    src={imageDetail?.imageUrl}
                    alt=""
                    width="100%"
                    height="100%"
                    className=" w-full h-full object-cover"
                  />
                </div>
              </div>
              <a className="mt-5 flex w-full h-[103px] justify-evenly">
                {bonsaiDetail.bonsaiImages?.map((imageDetail) => (
                  <img
                    key={imageDetail.id}
                    src={imageDetail?.imageUrl}
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
                    className="object-cover w-[103px] "
                  />
                ))}
              </a>
            </div>
            <div className="w-[48%] border p-5">
              <div className="border-b pb-10">
                <div className="text-[14px] text-[#343434] flex text-[#343434] font-[300] ">
                  Dáng cây:{" "}
                  <div className="pl-2 opacity-50">
                    {bonsaiDetail?.style?.name}
                  </div>
                </div>
                <div className="text-[24px] text-[#333333] montserrat">
                  {bonsaiDetail.name}
                </div>
                <div className="text-[#3a9943] text-[32px] font-bold">
                  {formatPrice(bonsaiDetail.price)}
                </div>
                <div className="text-[13px] font-[300] text-[#666]">
                  Năm tuổi:{" "}
                </div>
                <div className="text-[13px] font-[300] text-[#666] ">
                  Hoành cây:{" "}
                </div>
                <div className="text-[13px] font-[300] text-[#666]">
                  Chiều cao:{" "}
                </div>
              </div>
              <div className="py-5 border-b">{bonsaiDetail?.description}</div>
              <div className="border-b">
                <div className="flex items-center py-5 justify-end">
                  <button
                    className="bg-[#3a9943] h-[45px] px-[70px] rounded-[10px] text-[#ffffff] font-bold text-[16px] transition-colors duration-300 hover:bg-black"
                    onClick={addToCart}
                  >
                    + Thêm vào Giỏ Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MinHeight>
  );
}

export default BonsaiDetail;
