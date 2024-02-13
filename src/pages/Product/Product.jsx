import React, { useEffect, useState } from "react";
import { Pagination, Slider } from "antd";
import "../HomePage/styleHome.css";
import { Link } from "react-router-dom";
import CayTung from "../../assets/cay-tung.png";
import { productList } from "../../data/TopProducts";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../redux/productSlice";
import Loading from "../../components/Loading";

function Product() {
  const [priceRange, setPriceRange] = useState([20, 50]);
  const allProduct = useSelector((state) => state.product.allProductDTO.items);
  const loading = useSelector((state) => state.product.loading);

  const [pageIndex, setPageIndex] = useState(0);
  console.log(pageIndex);
  const countProduct = useSelector(
    (state) => state.product.allProductDTO.totalItemsCount
  );
  const handleSliderChange = (value) => {
    setPriceRange(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProduct(pageIndex));
  }, []);

  const handlePageChange = (pageIndex) => {
    setPageIndex(pageIndex);
    dispatch(fetchAllProduct(pageIndex - 1));
  };

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="my-5 m-auto w-[70%]">
          {/* <div className="border-b py-2">
        <div className="w-[70%] m-auto mt-2">Trang chủ &gt; Sản phẩm</div>
      </div> */}
          <div className="mt-2 flex">
            <div className="bg-[#f8f8f8] h-[500px] pt-5 pl-3 pr-3 w-[25%]">
              <div>
                <div className="uppercase text-[#333] font-semibold text-[16px]">
                  Loại cây
                </div>
                <div className="border-b">Bonsai</div>
              </div>
              <div>
                <div className="uppercase text-[#333] font-semibold text-[16px]">
                  Mức giá
                </div>
                <div>
                  <Slider
                    range
                    defaultValue={[20, 50]}
                    handl
                    className="rangeCostProduct"
                    value={priceRange}
                    onChange={handleSliderChange}
                  />
                </div>
                <div className="border-b">
                  <div>Giá từ: {priceRange[0]}</div>
                  <div>Giá đến: {priceRange[1]}</div>
                </div>
              </div>
              <div>
                <div className="uppercase text-[#333] font-semibold text-[16px]">
                  Chọn màu
                </div>
                <div>
                  <input type="checkbox" />
                </div>
              </div>
            </div>
            <div className="w-[75%] pl-10 flex flex-wrap">
              {allProduct?.map((product) => (
                <Link
                  to={`/productDetail/${product.id}`}
                  key={product.id}
                  className="w-[255px] h-[355px] border mt-5 mx-5"
                >
                  <img
                    className="bg-cover bg-no-repeat w-full h-[250px]"
                    src={product.productImages[0]?.imageUrl}
                  />
                  <div className="flex items-center justify-evenly">
                    <div className="py-5 text-[18px] w-[70%] ">
                      <div className="w-full ">{product.nameUnsign}</div>
                      <div className="text-[#3a9943]">{product.unitPrice}đ</div>
                    </div>
                    <button className="bg-[#f2f2f2] w-[50px] h-[50px] flex justify-center items-center rounded-full hover:text-[#ffffff] hover:bg-[#3a9943]">
                      <ShoppingCartOutlined />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Pagination
            current={pageIndex}
            total={countProduct + 6}
            className="flex justify-center mt-5"
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}

export default Product;
