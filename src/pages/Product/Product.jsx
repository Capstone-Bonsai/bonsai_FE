import React, { useEffect, useState } from "react";
import "../HomePage/styleHome.css";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../redux/slice/productSlice";
import Loading from "../../components/Loading";
import CustomPagination from "./Pagination";
import { InputNumber } from "antd";
import Filter from "./Filter";

function Product() {
  const [priceRange, setPriceRange] = useState([]);
  const allProduct = useSelector((state) => state.product.allProductDTO.items);
  const loading = useSelector((state) => state.product.loading);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const countPageProduct = useSelector(
    (state) => state.product.allProductDTO.totalPagesCount
  );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(pageIndex, pageSize);
    dispatch(
      fetchAllProduct({
        pageIndex,
        pageSize,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      })
    );
    console.log(priceRange[0]);
  }, [pageIndex, pageSize, priceRange[0], priceRange[1]]);

 

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="my-5 m-auto w-[70%]">
          <div className="mt-2 flex">
            <div className="bg-[#f8f8f8] h-[500px] pt-5 pl-3 pr-3 w-[25%]">
              <div>
                <div className="uppercase text-[#333] font-semibold text-[16px]">
                  Loại cây
                </div>
                <div className="border-b">Bonsai</div>
              </div>
              <Filter
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
              <div className="uppercase text-[#333] font-semibold text-[16px]  border-t">
                Dáng cây
              </div>
              <div className="border-b">Bonsai</div>
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
          <CustomPagination
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            countPageProduct={countPageProduct}
            setPageSize={setPageSize}
            fetchAllProduct={fetchAllProduct}
            pageSize={pageSize}
          />
        </div>
      )}
    </>
  );
}

export default Product;
