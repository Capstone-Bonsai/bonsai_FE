import React, { useState } from "react";
import NavBar from "../HomePage/NavBar";
import HomeSearch from "../HomePage/HomeSearch";
import TestProduct from "../../assets/testProduct.png";
import { CloseCircleOutlined } from "@ant-design/icons";
import {  InputNumber, Space } from "antd";
function ShoppingCart() {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <div>
      <HomeSearch />
      <NavBar />
      <div className="m-auto w-[70%] mt-10">
        <div className="font-bold text-[25px]">Giỏ Hàng</div>
        <div className="w-[65%] border-b">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b ">
                <th className="uppercase ">Sản phẩm</th>
                <th className="uppercase ">Giá</th>
                <th className="uppercase">Số lượng</th>
                <th className="uppercase ">Tổng</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b ml-5 text-center">
                <td className="">
                  <Space>
                    <CloseCircleOutlined />
                    <img src={TestProduct} alt="" width={73} height={73} />
                    <div>Cây Mộc Hương</div>
                  </Space>
                </td>
                <td className="">850.000 ₫</td>
                <td>
                      <InputNumber
                        min={1}
                        max={20}
                        style={{ margin: "0", fontSize: "20px" }}
                        value={inputValue}
                        onChange={onChange}
                      />
                </td>
                <td>1.700.000 ₫</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
