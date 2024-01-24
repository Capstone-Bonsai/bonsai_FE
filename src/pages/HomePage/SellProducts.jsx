import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTopProducts, setBonsaiOffice } from "../../redux/productSlice";
import { topProducts, bonsaiOffice } from "../../data/TopProducts";
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
      <div>
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
              className="mt-5 w-[270px] drop-shadow-lg bg-[#ffffff] h-[355px] "
              key={office.id}
            >
              <img src={office.image} alt="" />
              <div className="text-center my-5">
                <div className="text-[#1E7100]">{office.name}</div>
                <div className="text-[#E04C78]">{office.price}</div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      <div>
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
              className="mt-5 w-[270px] drop-shadow-lg bg-[#ffffff] h-[355px] "
              key={office.id}
            >
              <img src={office.image} alt="" />
              <div className="text-center my-5">
                <div className="text-[#1E7100]">{office.name}</div>
                <div className="text-[#E04C78]">{office.price}</div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default SellProducts;
