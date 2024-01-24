import React, { useState } from "react";
import { Input, Space } from "antd";
import logo from "../../assets/logo.png";
import "./styleHome.css";
const { Search } = Input;

function HomeSearch() {
  // const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="flex items-center justify-between w-[70%] m-auto">
      <img src={logo} width={200} height={200} />
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
