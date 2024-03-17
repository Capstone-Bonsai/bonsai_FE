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

function Bonsai() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [priceRange, setPriceRange] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedCategories, setSelectedCategories] = useState();
  const styleId = location.state?.styleId;

  const [selectStyle, setSelectStyle] = useState(styleId || undefined);

  const allBonsai = useSelector((state) => state.bonsai.allBonsaiDTO?.items);
  const countPageBonsai = useSelector(
    (state) => state.bonsai.allBonsaiDTO.totalPagesCount
  );
  const loading = useSelector((state) => state.bonsai.loading);
  const keyword = location.state?.keyword;
  useEffect(() => {
    dispatch(allCategory());
    dispatch(allStyle());
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

  const categories = useSelector(
    (state) => state.category.allCategoryDTO?.items
  );
  const styles = useSelector((state) => state.style.allStyleDTO.items);
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

          <div className="w-[75%] pl-10 flex flex-wrap">
            {allBonsai?.length > 0 ? (
              allBonsai?.map((bonsai) => (
                <div
                  key={bonsai.id}
                  className="w-[255px] h-[355px] border mt-2 mx-5"
                >
                  <Image
                    className="bg-cover bg-no-repeat w-full h-[250px]"
                    width="100%"
                    height="250px"
                    src={bonsai.bonsaiImages[0]?.imageUrl}
                  />
                  <Link
                    to={`/bonsaiDetail/${bonsai.id}`}
                    className="flex items-center justify-evenly"
                  >
                    <div className="py-5 text-[18px] w-[70%] ">
                      <div className="w-full ">{bonsai.name}</div>
                      <div className="text-[#3a9943]">
                        {formatPrice(bonsai.price)}
                      </div>
                    </div>
                    <button className="bg-[#f2f2f2] w-[50px] h-[50px] flex justify-center items-center rounded-full hover:text-[#ffffff] hover:bg-[#3a9943]">
                      <ShoppingCartOutlined />
                    </button>
                    <div></div>
                  </Link>
                </div>
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
      <Pagination
        current={pageIndex}
        total={countPageBonsai && pageSize ? countPageBonsai * pageSize : 0}
        onChange={handlePageChange}
        className="text-center mt-5"
      />
    </div>
  );
}

export default Bonsai;
