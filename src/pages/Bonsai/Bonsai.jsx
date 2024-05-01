import React, { useEffect, useState } from "react";
import "../HomePage/styleHome.css";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  FileSearchOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { Image, Pagination } from "antd";
import Filter from "./Filter";
import { toast } from "react-toastify";
import { fetchAllBonsai } from "../../redux/slice/bonsaiSlice";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import { allCategory } from "../../redux/slice/categorySlice";
import { allStyle } from "../../redux/slice/styleSlice";
import { addToCart } from "./AddToCart";
import { motion, useScroll } from "framer-motion";
import noImage from "../../assets/unImage.png";
function Bonsai({ countCartItems }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [selectedCategories, setSelectedCategories] = useState();
  const styleId = location.state?.styleId;

  const [selectStyle, setSelectStyle] = useState(styleId || undefined);

  const allBonsai = useSelector((state) => state.bonsai.allBonsaiDTO?.items);
  const countPageBonsai = useSelector(
    (state) => state.bonsai.allBonsaiDTO.totalItemsCount
  );
  const categories = useSelector(
    (state) => state.category.allCategoryDTO?.items
  );
  const styles = useSelector((state) => state.style.allStyleDTO.items);
  const loading = useSelector((state) => state.bonsai.loading);
  const keyword = location.state?.keyword;
  useEffect(() => {
    if (!categories?.items) {
      dispatch(allCategory());
    }
    if (!styles) {
      dispatch(allStyle());
    }
  }, []);

  useEffect(() => {
    const payload = {
      pageIndex: pageIndex - 1,
      pageSize,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      category: selectedCategories,
      style: selectStyle,
      keyword,
    };
    dispatch(fetchAllBonsai(payload));
  }, [
    dispatch,
    pageIndex,
    pageSize,
    priceRange,
    selectedCategories,
    selectStyle,
    keyword,
  ]);

  const handleResetFilter = () => {
    setSelectedCategories();
    setSelectStyle();
    setPageIndex(1);
    setPageSize(6);
    setPriceRange([]);
  };

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  return (
    <div className="my-5 m-auto w-[70%]">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="mt-2 flex">
          <div className="bg-[#f8f8f8] pt-5 w-[25%] mt-2 px-5">
            <div className="border-b pb-5">
              <div className="flex justify-between">
                <div className="uppercase text-[#333] font-semibold text-[16px]">
                  Phân loại
                </div>
                <button onClick={handleResetFilter}>
                  Tắt bộ lọc <RedoOutlined className="pl-2" />
                </button>
              </div>
              {categories?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategories(category.id)}
                  className={`p-2 flex justify-center w-full border my-1 border-b-[#3a9943] w-full mt-1 ${
                    selectedCategories?.includes(category.id)
                      ? "bg-[#3a9943] text-[#fff]"
                      : "bg-[#f8f8f8]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <Filter priceRange={priceRange} setPriceRange={setPriceRange} />
            <div className=" border-t py-5">
              <div className="uppercase text-[#333] font-semibold text-[16px]">
                Dáng cây
              </div>
              <div className="h-[200px] overflow-y-auto">
                <div className="flex flex-wrap gap-2 ">
                  {styles?.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectStyle(style.id)}
                      className={`hover:text-[#3a9943] h-[50px] p-2 border hover:border-[#3a9943] ${
                        selectStyle === style.id
                          ? "text-[#3a9943] border-[#3a9943]"
                          : ""
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[75%] flex flex-wrap gap-5">
            {allBonsai?.length > 0 ? (
              allBonsai?.map((bonsai) => (
                <motion.div
                  key={bonsai.id}
                  className="w-[255px] h-[355px] border mt-2 mx-5"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    className="bg-cover bg-no-repeat w-full h-[250px]"
                    width="100%"
                    height="250px"
                    src={
                      (bonsai?.bonsaiImages).length > 0
                        ? bonsai.bonsaiImages[0]?.imageUrl
                        : noImage
                    }
                  />
                  <div className="flex justify-evenly">
                    <div className="py-2 text-[18px] w-[70%]">
                      <Link
                        className="text-[20px]
                      hover:text-[#3a9943] block overflow-hidden whitespace-nowrap overflow-ellipsis"
                        to={`/bonsaiDetail/${bonsai.id}`}
                      >
                        {bonsai.name}
                      </Link>
                      <div className="text-[12px] opacity-70">
                        Code:{" "}
                        {bonsai.code != "" ? bonsai.code : "đang cập nhật"}
                      </div>
                      <div className="text-[#3a9943] text-[16px]">
                        {formatPrice(bonsai.price)}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        {
                          addToCart(bonsai.id, dispatch);
                        }
                      }}
                      className="bg-[#f2f2f2] mt-5 w-[50px] h-[50px] flex justify-center items-center rounded-full hover:text-[#ffffff] hover:bg-[#3a9943]"
                    >
                      <ShoppingCartOutlined />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="w-full flex flex-col justify-center items-center">
                <FileSearchOutlined className="text-[200px] opacity-30" />
                <div className="opacity-30">
                  Hix. Không có sản phẩm nào. Bạn thử tắt điều kiện lọc và tìm
                  lại nhé?
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {allBonsai?.length > 0 ? (
        <Pagination
          current={pageIndex}
          pageSize={pageSize}
          total={countPageBonsai}
          onChange={handlePageChange}
          className="text-center mt-5"
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Bonsai;
