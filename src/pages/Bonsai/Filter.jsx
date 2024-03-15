import { InputNumber } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Filter({ priceRange, setPriceRange }) {
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  const validatePriceRange = () => {
    if (tempPriceRange[0] >= tempPriceRange[1]) {
      toast.error("Vui lòng điền khoảng giá phù hợp");
      return false;
    } else {
      return true;
    }
  };

  const handleChangePriceRange = (value, index) => {
    const newPriceRange = [...tempPriceRange];
    newPriceRange[index] = value;
    setTempPriceRange(newPriceRange);
  };

  const handleApplyFilterClick = () => {
    if (validatePriceRange()) {
      setPriceRange(tempPriceRange);
    }
  };

  return (
    <div>
      <div className="uppercase text-[#333] font-semibold text-[16px] my-5">
        Mức giá
      </div>
      <div className=" w-full flex justify-between items-center">
        <InputNumber
          min={1}
          defaultValue={tempPriceRange[0]}
          onChange={(value) => handleChangePriceRange(value, 0)}
          className="w-[40%]"
        />
        <div>đến</div>
        <InputNumber
          min={1}
          defaultValue={tempPriceRange[1]}
          onChange={(value) => handleChangePriceRange(value, 1)}
          className="w-[40%]"
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-[#3a9943] w-[90%] rounded-lg my-5 text-[#fff] py-1"
          onClick={handleApplyFilterClick}
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
}

export default Filter;
