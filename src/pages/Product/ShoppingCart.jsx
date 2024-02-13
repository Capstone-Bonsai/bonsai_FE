import React, { useEffect, useState } from "react";
import TestProduct from "../../assets/testProduct.png";
import { CloseCircleOutlined } from "@ant-design/icons";
import { InputNumber, Space } from "antd";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setCartFromCookie } from "../../redux/productSlice";
import MinHeight from "../../components/MinHeight";

function ShoppingCart() {
  const cookies = new Cookies();
  const [cartItems, setCartItems] = useState(
    () => cookies.get("cartItems") || []
  );
  const dispatch = useDispatch();

  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
    cookies.set("cartItems", JSON.stringify(newCartItems), { path: "/" });
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
    console.log(updatedCartItems);
    dispatch(setCartFromCookie({ updatedCartItems, itemCount }));
  };

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
                <td className="font-medium">{item.price * item.quantity} ₫</td>
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
    </MinHeight>
  );
}

export default ShoppingCart;
