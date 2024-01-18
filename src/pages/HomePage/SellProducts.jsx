import React from "react";
import testProduct from "../../assets/testProduct.png";
function SellProducts() {
  const products = [
    {
      id: 1,
      name: "Tiểu cảnh gốm vẽ 26",
      price: "100.000đ",
      image: testProduct,
    },
    {
      id: 2,
      name: "Tiểu cảnh gốm vẽ 26",
      price: "100.000đ",
      image: testProduct,
    },
    {
      id: 3,
      name: "Tiểu cảnh gốm vẽ 26",
      price: "100.000đ",
      image: testProduct,
    },
    {
      id: 4,
      name: "Tiểu cảnh gốm vẽ 26",
      price: "100.000đ",
      image: testProduct,
    },
  ];

  return (
    <div className="m-auto w-[70%] mt-10">
      <div className="text-[#00B214] text-center text-2xl font-bold">
        SẢN PHẨM BÁN CHẠY
      </div>
      <a href="" className="flex grid grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center bg-[#ffffff] drop-shadow-lg w-[370px]"
          >
            <img src={product.image} width={145} height={145} alt="" />
            <div className="ml-2">
              <div className="text-[#1E7100]">{product.name}</div>
              <div className="text-[#E04C78]">{product.price}</div>
            </div>
          </div>
        ))}
      </a>
    </div>
  );
}

export default SellProducts;
