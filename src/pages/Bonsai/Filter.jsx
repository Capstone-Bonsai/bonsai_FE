import { InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./style.css";
const { Option } = Select;

function Filter({ priceRange, setPriceRange }) {
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);
  const [namePrice, setNamePrice] = useState();

  const priceRangeSelect = [
    {
      name: "Dưới 1m",
      range: [0, 999999],
    },
    {
      name: "1m tới 5m",
      range: [1000000, 5000000],
    },
    {
      name: "5m tới 10m",
      range: [5000000, 10000000],
    },
    {
      name: "Trên 10m",
      range: [10000000, 99999999],
    },
  ];

  useEffect(() => {
    const selectedRange = priceRangeSelect.find(
      (prs) =>
        prs.range[0] === tempPriceRange[0] && prs.range[1] === tempPriceRange[1]
    );
    if (selectedRange) {
      setNamePrice(selectedRange.name);
    } else {
      setNamePrice("Tất cả");
    }
  }, [tempPriceRange]);

  const handleChangeSelectPriceRange = (value) => {
    const selectedRange = priceRangeSelect.find((prs) => prs.name === value);
    if (selectedRange) {
      setTempPriceRange(selectedRange.range);
      setPriceRange(selectedRange.range);
    }
  };

  return (
    <div>
      <div className="uppercase text-[#333] font-semibold text-[16px] my-5">
        Mức giá
      </div>
      <Select
        onChange={handleChangeSelectPriceRange}
        className="selectFilter w-full mb-5 h-[40px]"
        value={namePrice}
      >
        {priceRangeSelect.map((prs, index) => (
          <Option key={index} value={prs.name}>
            {prs.name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default Filter;
