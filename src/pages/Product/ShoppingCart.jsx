import React, { useEffect, useState } from "react";
import TestProduct from "../../assets/testProduct.png";
import { CloseCircleOutlined } from "@ant-design/icons";
import { InputNumber, Space } from "antd";
import Cookies from "js-cookie";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Lấy danh sách sản phẩm từ cookie khi component mount
    const storedCartItems = JSON.parse(Cookies.get("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Cập nhật số lượng và lưu vào cookie
    const updatedCartItems = cartItems.map((item) =>
      item.productId === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    Cookies.set("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (product) => {
    const currentCartItems = JSON.parse(Cookies.get("cartItems")) || []; 
    const updatedCartItems = currentCartItems.filter((item) => item.productId !== product.productId);
    Cookies.set("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <div className="border-b py-2">
        <div className="w-[70%] m-auto mt-2">Trang chủ &gt; Sản phẩm</div>
      </div>
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
              <tr key={item.productId} className="border-b ml-5 text-center h-[170px]">
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
    </div>
  );
}

export default ShoppingCart;
