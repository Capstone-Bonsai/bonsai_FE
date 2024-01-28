import React, { useState } from "react";
import TestProduct from "../../assets/testProduct.png";
import { CloseCircleOutlined } from "@ant-design/icons";
import { InputNumber, Space } from "antd";
function ShoppingCart() {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
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
              <th className="uppercase ">Hình Ảnh</th>
              <th className="uppercase ">Sản phẩm</th>
              <th className="uppercase ">Giá</th>
              <th className="uppercase">Số lượng</th>
              <th className="uppercase ">Tổng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b ml-5 text-center h-[170px]">
              <td className="flex justify-center items-center h-[170px]">
                <div>
                  <img src={TestProduct} alt="" width={120} height={120} />
                </div>
              </td>
              <td className="">
                <div className="text-[16px] font-medium">Cây Mộc Hương</div>
              </td>
              <td className="font-medium">850.000 ₫</td>
              <td>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ margin: "0", fontSize: "20px" }}
                  value={inputValue}
                  onChange={onChange}
                />
              </td>
              <td className="font-medium">1.700.000 ₫</td>
              <td className="text-[20px] pr-5">
                <button>
                <CloseCircleOutlined />
                </button>
              </td>
            </tr>
            <tr className="border-b ml-5 text-center h-[170px]">
              <td className="flex justify-center items-center h-[170px]">
                <div>
                  <img src={TestProduct} alt="" width={120} height={120} />
                </div>
              </td>
              <td className="">
                <div className="text-[16px] font-medium">Cây Mộc Hương</div>
              </td>
              <td className="font-medium">850.000 ₫</td>
              <td>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ margin: "0", fontSize: "20px" }}
                  value={inputValue}
                  onChange={onChange}
                />
              </td>
              <td className="font-medium">1.700.000 ₫</td>
              <td className="text-[20px] pr-5">
                <button>
                <CloseCircleOutlined />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoppingCart;
