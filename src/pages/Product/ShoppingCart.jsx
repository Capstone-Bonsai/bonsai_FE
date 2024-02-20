import React, { useEffect, useState } from "react";
import TestProduct from "../../assets/testProduct.png";
import { CloseCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { InputNumber, Space } from "antd";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setCartFromCookie } from "../../redux/slice/productSlice";
import MinHeight from "../../components/MinHeight";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const cookies = new Cookies();

  const dispatch = useDispatch();
  const userInfo = cookies.get("user");
  const idUser = userInfo?.id;
  const [cartItems, setCartItems] = useState(() => {
    if (userInfo != null) {
      const cartIdUser = `cartId ${idUser}`;
      return cookies.get(cartIdUser) || [];
    } else {
      return cookies.get("cartItems") || [];
    }
  });
  const updateCartItems = (newCartItems) => {
    if (userInfo != null) {
      setCartItems(newCartItems);
      cookies.set(`cartId ${idUser}`, JSON.stringify(newCartItems), {
        path: "/",
      });
    } else {
      setCartItems(newCartItems);
      cookies.set("cartItems", JSON.stringify(newCartItems), { path: "/" });
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCartItems(updatedCartItems);
  };

  const handleRemoveItem = async (product) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== product.productId
    );
    await updateCartItems(updatedCartItems);
    const itemCount = updatedCartItems.length;
    dispatch(setCartFromCookie({ updatedCartItems, itemCount }));
  };
  const subTotal = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    <MinHeight>
      {cartItems.length === 0 ? (
        <div className="m-auto w-[70%] mt-10 drop-shadow-lg bg-[#ffffff]">
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
                <th className="uppercase">Số lượng</th>
                <th className="uppercase">Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.productId}
                  className="border-b ml-5 text-center h-[170px]"
                >
                  <td className="flex justify-center items-center h-[170px]">
                    <div>
                      <img src={TestProduct} alt="" width={120} height={120} />
                    </div>
                  </td>
                  <td className="">
                    <div className="text-[16px] font-medium">{item.name}</div>
                  </td>
                  <td className="font-medium">{item.price} ₫</td>
                  <td>
                    <InputNumber
                      min={1}
                      max={20}
                      style={{ margin: "0", fontSize: "20px" }}
                      value={item.quantity}
                      onChange={(newValue) =>
                        handleQuantityChange(item.productId, newValue)
                      }
                    />
                  </td>
                  <td className="font-medium">
                    {item.price * item.quantity} ₫
                  </td>
                  <td className="text-[20px] pr-5">
                    <button onClick={() => handleRemoveItem(item)}>
                      <CloseCircleOutlined />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="m-auto w-[70%] mt-10">
        <div className="flex w-full">
          <div className=" w-[70%]">
            {userInfo == null ? (
              <>
                <div className="text-[20px] leading-6 font-bold mb-[30px] underline">
                  Thông tin người nhận
                </div>
                <div className="flex w-[60%] justify-between ">
                  <div>
                    <div>Họ và tên</div>
                    <input className=" h-[36px] outline-none p-5 border border-black" />
                  </div>
                  <div>
                    <div>Số điện thoại</div>
                    <input className=" h-[36px] outline-none p-5 border border-black" />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-end w-[30%]">
            <div className="w-full bg-[#f2f2f2] h-[254px] flex justify-center items-center">
              <div className="w-[70%] h-[70%]">
                <div className="text-[20px] underline capitalize leading-6 font-bold mb-[30px]">
                  Tổng Giỏ Hàng
                </div>
                <div className="flex justify-between mb-4">
                  <div>Tổng giá trị:</div>
                  <div>{subTotal()} ₫</div>
                </div>
                {/* <div className="flex justify-between border-t border-t-1 border-black font-bold text-[18px] pt-[9px]">
                  <div className="">Grand Total</div>
                  <div>{subTotal()} ₫</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          <Link to="/Order" className="uppercase bg-black p-2 rounded-[3px] text-[#fff] my-5 hover:bg-[#3a9943]">
            Checkout
          </Link>
        </div>
      </div>
    </MinHeight>
  );
}

export default ShoppingCart;
