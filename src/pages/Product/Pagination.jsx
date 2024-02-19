import { Pagination, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

function CustomPagination({
  pageIndex,
  setPageIndex,
  countPageProduct,
  fetchAllProduct,
  pageSize,
  setPageSize,
}) {
  const dispatch = useDispatch();

  const handlePageChange = (number) => {
    const pageIndexFix = number - 1;
    setPageIndex(pageIndexFix);
    dispatch(fetchAllProduct({ pageIndex: pageIndexFix, pageSize }));
  };

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize);
    dispatch(fetchAllProduct({ pageIndex, pageSize }));
  };

  const pageOptions = [];
  for (let i = 1; i <= 10; i++) {
    pageOptions.push({
      value: i,
      label: `Page Size ${i}`,
    });
  }
  const pageNumbers = [];
  for (let i = 1; i <= countPageProduct; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center mt-5">
      <div>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              border : pageIndex === number - 1 ? "1px solid #1890ff" : "#fff",
              color: pageIndex === number - 1 ? "#1890ff" : "black",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {number}
          </button>
        ))}
      </div>
      <Select
        defaultValue={pageSize}
        style={{
          width: 120,
        }}
        placement="bottomRight"
        options={pageOptions}
        onChange={handlePageSizeChange}
      />
    </div>
  );
}

export default CustomPagination;