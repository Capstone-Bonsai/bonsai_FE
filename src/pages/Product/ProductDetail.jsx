import React, { useState } from "react";
import NavBar from "../HomePage/NavBar";
import CayTung from "../../assets/cay-tung.png";
import { productDetailImage } from "../../data/TopProducts";
import { Link } from "react-router-dom";
import { Col, InputNumber, Row, Slider, Space } from "antd";

function ProductDetail() {
  const [currentImage, setCurrentImage] = useState(1);
  const imageDetail = productDetailImage.image.find(
    (img) => img.id === currentImage
  );
  console.log(imageDetail);
  const handleImageClick = (newImageId) => {
    setCurrentImage(newImageId);
  };

  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <div>
      <NavBar />
      <div className="m-auto w-[70%] mt-10">
        <div className="drop-shadow-lg bg-[#ffffff] py-[50px] px-5">
          <div className="flex w-[100%] ">
            <div className="w-[40%]">
              <div className="w-[320px] h-[320px]">
                <img
                  src={imageDetail.image}
                  alt=""
                  className="object-cover w-full h-full "
                />
              </div>
              <a className="mt-5 flex w-[320px] justify-between">
                {productDetailImage.image.map((imageDetail) => (
                  <img
                    key={imageDetail.id}
                    src={imageDetail.image}
                    alt=""
                    width={65}
                    height={65}
                    onClick={() => handleImageClick(imageDetail.id)}
                    style={{
                      cursor: "pointer",
                      opacity: currentImage === imageDetail.id ? 1 : 0.5,
                    }}
                  />
                ))}
              </a>
            </div>
            <div className="w-[60%]">
              <div>
                <Link className=" opacity-50  hover:opacity-100">
                  Trang chủ
                </Link>{" "}
                /{" "}
                <Link className=" opacity-50  hover:opacity-100">
                  Cây Cảnh Văn Phòng
                </Link>{" "}
                /{" "}
                <Link className=" opacity-50  hover:opacity-100">
                  Cây Cảnh Phong Thủy
                </Link>
              </div>
              <div className="text-[#0A0A0A] font-bold text-[22px]">
                {productDetailImage.name}
              </div>
              <div className="text-[#E05757] text-[22px] font-medium">
                270.000 ₫
              </div>
              <div className="my-2 text-[#282828]">
                Cây Phát Tài được tìm thấy ở Zambia, Tanzania và Tây Phi. Loại
                cây này có lá màu xanh sẫm, tán lá xòe rộng và có đường gân vàng
                nổi bật, thường được trồng trong nhà giúp thanh lọc không khí
                hiệu quả…
              </div>
              <div className="text-[#222222] font-bold text-[15px]">
                Loại mẫu chậu
              </div>
              <div className="flex">
                <Row>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      max={20}
                      style={{ margin: "0", fontSize: "20px" }}
                      value={inputValue}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <Link className="bg-[#8cc63f] w-[125px] h-[40px] text-[#ffffff] uppercase flex justify-center items-center rounded-[10px] hover:bg-[#6e9b3d] ml-5">
                  Mua hàng
                </Link>
              </div>
              <div className="">
                Danh mục:{" "}
                <Link className="text-[#00B214] hover:text-black">
                  Cây Cảnh Lọc Không Khí, Cây Cảnh Phong Thủy, Cây Cảnh Văn
                  Phòng, Cây Cảnh Để Bàn, Cây Trồng Trong Nhà
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="drop-shadow-lg bg-[#ffffff] py-[50px] mt-10">
          <div className="text-[#00B214] font-medium text-[20px] border-b border-b-[2px] mx-5">Mô tả</div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
