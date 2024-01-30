import React, { useEffect, useState } from "react";
import CayTung from "../../assets/cay-tung.png";
import { productDetailImage } from "../../data/TopProducts";
import { Link, useParams } from "react-router-dom";
import { Col, InputNumber, Row, Slider, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/productSlice";
import Cookies from "universal-cookie";

function ProductDetail() {
  const [currentImage, setCurrentImage] = useState(1);

  const dispatch = useDispatch();
  const { productId } = useParams();
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId]);
  const productDetail = useSelector((state) => state.product.productById);

  const imageDetail = productDetailImage.image.find(
    (img) => img.id === currentImage
  );
  const handleImageClick = (newImageId) => {
    setCurrentImage(newImageId);
  };

  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  const addToCart = () => {
    const cookies = new Cookies();
    const cartItems = cookies.get("cartItems") || [];
    console.log("Current cart items:", cartItems);
    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += inputValue;
    } else {
      cartItems.push({
        productId,
        name: productDetail.name,
        price: productDetail.price,
        image: productDetail.image,
        quantity: inputValue,
      });
    }

    cookies.set("cartItems", cartItems);
    console.log("Added to cart:", cartItems);
  };

  return (
    <div>
      <div className="border-b py-2">
        <div className="w-[70%] m-auto mt-2">Trang chủ &gt; Sản phẩm</div>
      </div>
      <div className="m-auto w-[70%] flex justify-between my-10">
        <div className=" w-[48%] ">
          <div className="flex">
            <div className="w-full h-full">
              <img
                src={imageDetail.image}
                alt=""
                className=" w-full h-full object-cover "
              />
            </div>
          </div>
          <a className="mt-5 flex w-full justify-between">
            {productDetailImage.image.map((imageDetail) => (
              <img
                key={imageDetail.id}
                src={imageDetail.image}
                alt=""
                width={130}
                height={130}
                onClick={() => handleImageClick(imageDetail.id)}
                style={{
                  cursor: "pointer",
                  opacity: currentImage === imageDetail.id ? 1 : 0.5,
                }}
                className="object-cover"
              />
            ))}
          </a>
        </div>
        <div className="w-[48%] border p-5">
          <div className="border-b">
            <div className="text-[14px] text-[#343434]">
              Tags: <Link>Cây, Hạt ,...</Link>
            </div>
            <div className="text-[24px] text-[#333333]">
              {productDetail.name}
            </div>
            <div className="text-[#3a9943] text-[32px] font-bold">150.000đ</div>
          </div>
          <div className="py-5 border-b">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            consectetur inventore voluptatem dignissimos nemo repellendus est,
            harum maiores veritatis quidem.
          </div>
          <div className="flex items-center py-5 border-b">
            <p>Số lượng</p>
            <div className="px-5">
              <InputNumber
                min={1}
                max={20}
                style={{ margin: "0", fontSize: "20px" }}
                value={inputValue}
                onChange={onChange}
              />
            </div>
            <button
              className="bg-[#3a9943] w-[200px] h-[45px] rounded-[10px] text-[#ffffff] text-[16px]"
              onClick={addToCart}
            >
              + Thêm vào Giỏ Hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
