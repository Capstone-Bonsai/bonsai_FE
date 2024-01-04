import React, { useState } from "react";
import { Input, Space } from "antd";
import "./styleHome.css";
const { Search } = Input;

function HomeSearch() {
  // const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="w-[70%] m-auto">
      <Search
        placeholder="Tìm kiếm danh mục, sản phẩm, ..."
        // onSearch={onSearch}
        style={{
          width: "80vh",
        }}
      />
    </div>
  );
}

export default HomeSearch;
