import React, { useEffect, useState } from "react";
import { CloseCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { InputNumber, Modal, Space } from "antd";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  addBonsaiToCart,
  setCartFromCookie,
} from "../../redux/slice/bonsaiSlice";
import MinHeight from "../../components/MinHeight";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchAllBonsaiNoPagination } from "../../redux/slice/bonsaiSlice";
import noImage from "../../assets/unImage.png";
function ShoppingCart() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const location = useLocation();

  const dispatch = useDispatch();
  const userInfo = cookies.get("user");

  const idUser = userInfo?.id;
  const [cartItems, setCartItems] = useState(
    userInfo != null
      ? cookies.get(`cartId ${idUser}`) || []
      : cookies.get("cartItems") || []
  );
  useEffect(() => {
    dispatch(fetchAllBonsaiNoPagination());
    dispatch(addBonsaiToCart(cartItems));
  }, [cartItems]);
  const bonsais = useSelector((state) => state.bonsai?.bonsaiInCart);

  const [isDisabledItem, setIsDisabledItem] = useState(false);
  const updateCartItems = (newCartItems) => {
    const cartId = userInfo ? `cartId ${idUser}` : "cartItems";
    setCartItems(newCartItems);
    cookies.set(cartId, JSON.stringify(newCartItems), { path: "/" });
  };

  const handleRemoveItem = async (bonsaiIdToRemove) => {
    const updatedCartItems = cartItems.filter(
      (bonsaiId) => bonsaiId !== bonsaiIdToRemove
    );
    await updateCartItems(updatedCartItems);
    const itemCount = updatedCartItems.length;
    dispatch(setCartFromCookie({ itemCount }));
  };
  const subTotal = () => {
    let totalPrice = 0;
    bonsais.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const totalCountItems = cartItems.length;
  useEffect(() => {
    const disabledItemExists = bonsais.some((item) => item.isDisable);
    setIsDisabledItem(disabledItemExists);
  }, [bonsais]);
  const handleCheckout = () => {
    if (isDisabledItem) {
      Modal.error({
        title: "Có sản phẩm không khả dụng",
        content: "Vui lòng kiểm tra lại giỏ hàng của bạn.",
      });
    } else {
      navigate("/order");
    }
  };
  return (
    <MinHeight>
      {cartItems?.length === 0 ? (
        <div className="m-auto w-[70%] my-10 drop-shadow-lg bg-[#ffffff]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-[#f2f2f2] h-[50px]">
                <th className="uppercase">Hình Ảnh</th>
                <th className="uppercase">Sản phẩm</th>
                <th className="uppercase">Giá</th>
                <th className="uppercase">Số lượng</th>
                <th className="uppercase">Tổng</th>
                <th></th>
              </tr>
            </thead>
          </table>
          <div className="flex items-center justify-center h-[500px]">
            <div className="text-center">
              <ShoppingOutlined className="text-[100px]" />
              <div>Chưa có sản phẩm</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-auto w-[70%] mt-10 drop-shadow-lg bg-[#ffffff]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-[#f2f2f2] h-[50px]">
                <th className="uppercase">Hình Ảnh</th>
                <th className="uppercase">Sản phẩm</th>
                <th className="uppercase">Giá</th>
                <th className="uppercase">Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bonsais.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b ml-5 text-center relative h-[170px]`}
                >
                  <td className="flex justify-center items-center h-[170px]">
                    <div>
                      <img
                        src={item?.image ? item?.image : noImage}
                        alt=""
                        className={`w-[120px] h-[120px] object-cover  ${
                          item?.isDisable ? "opacity-30" : ""
                        }`}
                      />
                    </div>
                  </td>
                  <td className={` ${item?.isDisable ? "opacity-30" : ""}`}>
                    <div className={`text-[16px] font-medium`}>{item.name}</div>
                  </td>
                  <td
                    className={`font-medium  ${
                      item?.isDisable ? "opacity-30" : ""
                    }`}
                  >
                    {formatPrice(item.price)}
                  </td>

                  <td
                    className={`font-medium  ${
                      item?.isDisable ? "opacity-30" : ""
                    }`}
                  >
                    {formatPrice(item.price)}
                  </td>
                  <td className="text-[20px] pr-5">
                    <button onClick={() => handleRemoveItem(item.id)}>
                      <CloseCircleOutlined />
                    </button>
                  </td>
                  <div className="absolute bottom-0 right-5">
                    {item?.isDisable ? (
                      <div className="text-[red]">Sản phẩm đã được mua </div>
                    ) : (
                      ""
                    )}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {totalCountItems > 0 ? (
        <div className="m-auto w-[70%] my-10">
          <div className="flex w-full">
            <div className=" w-[70%]"></div>
            <div className="flex justify-end w-[30%]">
              <div className="w-full bg-[#f2f2f2] h-[100px] flex justify-center items-center">
                <div className="w-[70%] h-[70%]">
                  <div className="text-[20px] underline capitalize leading-6 font-bold mb-[30px]">
                    Giá trị sản phẩm
                  </div>
                  <div className="flex justify-between mb-4">
                    <div>Tổng giá trị:</div>
                    <div>{formatPrice(subTotal())} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCheckout}
              className="uppercase bg-black p-2 rounded-[3px] text-[#fff] my-5 hover:bg-[#3a9943]"
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </MinHeight>
  );
}

export default ShoppingCart;
