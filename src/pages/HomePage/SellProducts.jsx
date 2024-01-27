import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTopProducts, setBonsaiOffice } from "../../redux/productSlice";
import { topProducts, bonsaiOffice } from "../../data/TopProducts";
import { categoryList } from "../../data/AllCategory";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function SellProducts() {
  const dispatch = useDispatch();
  const { topProductDTO } = useSelector((state) => state.product);
  const { bonsaiOfficeDTO } = useSelector((state) => state.product);

  useEffect(() => {
    // Dispatch action để cập nhật state trong Redux
    dispatch(setTopProducts(topProducts));
    dispatch(setBonsaiOffice(bonsaiOffice));
  }, [dispatch]);

  return (
    <div className="m-auto w-[70%] mt-10">
      <div className="text-[#00B214] text-center text-2xl font-bold">
        SẢN PHẨM BÁN CHẠY
      </div>
      <div className="flex flex-wrap justify-between mt-4 gap-4">
        {topProductDTO.map((product) => (
          <a
            href=""
            key={product.id}
            className="flex items-center bg-[#ffffff] drop-shadow-lg w-[400px]"
          >
            <img src={product.image} width={145} height={145} alt="" />
            <div className="ml-2">
              <div className="text-[#1E7100]">{product.name}</div>
              <div className="text-[#E04C78]">{product.price}</div>
            </div>
          </a>
        ))}
      </div>
      <div className="mb-6">
        <div className="flex justify-between mt-5 border-b-2 pb-1">
          <div className="text-[#00B214] font-bold text-2xl">
            CÂY CẢNH VĂN PHÒNG
          </div>
          <div className="bg-[#8CCA46] h-[30px] flex items-center text-[#ffffff] px-2 rounded-[4px]">
            + Xem tất cả
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          {bonsaiOfficeDTO.map((office) => (
            <div
              className="mt-5 w-[270px] drop-shadow-lg bg-[#ffffff] h-[370px] "
              key={office.id}
            >
              <img src={office.image} alt="" />
              <div className="pt-3 px-3">
                <div className="mb-3">
                  <Link className="text-[#1E7100] text-lg hover:text-[#333333]">{office.name}</Link>
                </div>
                <div className="grid grid-cols-3">
                  <div class="flex items-center">
                    <div className="text-[#E04C78] text-xl font-semibold">{office.price}</div>
                  </div>
                  <div class="col-end-4 flex justify-end">
                    <Link
                      className="text-[20px] w-[40px] h-[40px] bg-[#f2f2f2] flex items-center border pl-2 rounded-[100%] 
          border-[#ffffff]-500 border-opacity-50 border-opacity-50 hover:bg-[#3A994A] hover:text-[#ffffff]"
                    >
                      <ShoppingCartOutlined />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between mt-5 border-b-2 pb-1">
          <div className="text-[#00B214] font-bold text-2xl">
            CÂY CẢNH VĂN PHÒNG
          </div>
          <div className="bg-[#8CCA46] h-[30px] flex items-center text-[#ffffff] px-2 rounded-[4px]">
            + Xem tất cả
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          {bonsaiOfficeDTO.map((office) => (
            <div
              className="mt-5 w-[270px] drop-shadow-lg bg-[#ffffff] h-[370px] "
              key={office.id}
            >
              <img src={office.image} alt="" />
              <div className="pt-3 px-3">
                <div className="mb-3">
                  <Link className="text-[#1E7100] text-lg hover:text-[#333333]">{office.name}</Link>
                </div>
                <div className="grid grid-cols-3">
                  <div class="flex items-center">
                    <div className="text-[#E04C78] text-xl font-semibold">{office.price}</div>
                  </div>
                  <div class="col-end-4 flex justify-end">
                    <Link
                      className="text-[20px] w-[40px] h-[40px] bg-[#f2f2f2] flex items-center border pl-2 rounded-[100%] 
          border-[#ffffff]-500 border-opacity-50 border-opacity-50 hover:bg-[#3A994A] hover:text-[#ffffff]"
                    >
                      <ShoppingCartOutlined />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mt-5 border-b-2 pb-1">
          <div className="text-[#00B214] font-bold text-2xl">
            DANH MỤC NỔI BẬT
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          {categoryList.map((office) => (
            <Link
              className="mt-5 w-[270px] drop-shadow-lg bg-[#ffffff] h-[355px] bg-local bg-no-repeat bg-cover hover:opacity-50"
              style={{ backgroundImage: `url(${office.image})` }}
              key={office.id}
            >
              <div className="text-center flex flex-col-reverse h-[100%] py-4">
                <div className="font-normal">{office.amount} sản phẩm</div>
                <div className="text-lg font-semibold uppercase">
                  {office.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellProducts;
