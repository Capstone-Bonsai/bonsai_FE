import React, { useEffect, useState } from "react";
import "../HomePage/styleHome.css";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  allCategory,
  fetchAllProduct,
  filterTag,
} from "../../redux/slice/productSlice";
import Loading from "../../components/Loading";
import { Image, InputNumber, Pagination, Select } from "antd";
import Filter from "./Filter";
import { toast } from "react-toastify";

function Product() {
  const [priceRange, setPriceRange] = useState([]);
  const allProduct = useSelector((state) => state.product.allProductDTO?.items);
  const loading = useSelector((state) => state.product.loading);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedSubCategories, setSelectedSubCategories] = useState("");
  console.log(selectedSubCategories);

  const countPageProduct = useSelector(
    (state) => state.product.allProductDTO.totalPagesCount
  );
  useEffect(() => {
    dispatch(allCategory());
    dispatch(filterTag());
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(pageIndex, pageSize);
    const payload = {
      pageIndex: pageIndex - 1,
      pageSize: pageSize,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };
    if (selectedSubCategories !== "") {
      payload.subCategory = selectedSubCategories;
    }

    dispatch(fetchAllProduct(payload));
  }, [
    pageIndex,
    pageSize,
    priceRange[0],
    priceRange[1],
    selectedSubCategories,
  ]);

  const handlePageChange = (page) => {
    setPageIndex(page);
  };
  const categories = useSelector(
    (state) => state.product.allCategoryDTO?.items
  );
  const tags = useSelector((state) => state.product.tagDTO.items);
  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="my-5 m-auto w-[70%]">
          <div className="mt-2 flex">
            <div className="bg-[#f8f8f8] pt-5 w-[25%] mt-2 px-5">
              <div className="border-b pb-5 ">
                <div className="uppercase text-[#333] font-semibold text-[16px]">
                  Phân loại
                </div>
                {categories?.map((category) => (
                  <div
                    key={category.id}
                    className="dropdown dropdown-right w-full border my-1 border-b-[#3a9943]"
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn border w-full rounded-none"
                    >
                      {category.name}
                    </div>
                    <div
                      tabIndex={0}
                      className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {category.subCategories.length > 0 ? (
                        category.subCategories.map((subCategory) => (
                          <button
                            key={subCategory.id}
                            onClick={() =>
                              setSelectedSubCategories(subCategory.id)
                            }
                            className={`p-2 flex justify-center w-full mt-1 ${
                              selectedSubCategories.includes(subCategory.id)
                                ? "bg-[#3a9943] text-[#fff]"
                                : "bg-[#f8f8f8]"
                            }`}
                          >
                            {subCategory.name}
                          </button>
                        ))
                      ) : (
                        <div>không có phân loại chi tiết</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Filter priceRange={priceRange} setPriceRange={setPriceRange} />
              <div className=" border-t py-5">
                <div className="uppercase text-[#333] font-semibold text-[16px]">
                  Từ khóa
                </div>
                {tags?.map((tag) => (
                  <div key={tag.id} className="border-b">{tag.name}</div>
                ))}
              </div>
            </div>

            <div className="w-[75%] pl-10 flex flex-wrap">
              {allProduct?.map((product) => (
                <div
                  key={product.id}
                  className="w-[255px] h-[355px] border mt-2 mx-5"
                >
                  <Image
                    className="bg-cover bg-no-repeat w-full h-[250px]"
                    width="100%"
                    height="250px"
                    src={product.productImages[0]?.imageUrl}
                  />
                  <Link
                    to={`/productDetail/${product.id}`}
                    className="flex items-center justify-evenly"
                  >
                    <div className="py-5 text-[18px] w-[70%] ">
                      <div className="w-full ">{product.name}</div>
                      <div className="text-[#3a9943]">
                        {formatPrice(product.unitPrice)}
                      </div>
                    </div>
                    <button className="bg-[#f2f2f2] w-[50px] h-[50px] flex justify-center items-center rounded-full hover:text-[#ffffff] hover:bg-[#3a9943]">
                      <ShoppingCartOutlined />
                    </button>
                    <div></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Pagination
            current={pageIndex}
            total={
              countPageProduct && pageSize ? countPageProduct * pageSize : 0
            }
            onChange={handlePageChange}
            className="text-center mt-5"
          />
        </div>
      )}
    </>
  );
}

export default Product;
