import React, { useState } from "react";
import MinHeight from "../../components/MinHeight";
import Cookies from "universal-cookie";
import TestProduct from "../../assets/testProduct.png";

function Order() {
    const cookies = new Cookies();
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
  return (
    <MinHeight>
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
                <td>{item.quantity}</td>
                <td className="font-medium">{item.price * item.quantity} ₫</td>
                <td className="text-[20px] pr-5"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="m-auto w-[70%] mt-10 drop-shadow-lg bg-[#ffffff]">sdfsdf</div>

    </MinHeight>
  );
}

export default Order;
