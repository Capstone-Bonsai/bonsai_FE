import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table, Button, Input } from "antd";
const { Search } = Input;
function ProductManage() {
  const dataSource = [
    {
      key: "1",
      sanpham: "Mike",
      khosan: 32,
      giatien: 100.0,
    },
    {
      key: "2",
      sanpham: "John",
      khosan: 42,
      giatien: 100.0,
    },
  ];

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "sanpham",
      key: "sanpham",
    },
    {
      title: "Kho sẵn",
      dataIndex: "khosan",
      key: "khosan",
    },
    {
      title: "Giá tiền",
      dataIndex: "giatien",
      key: "giatien",
    },
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <div className="flex justify-center mt-12">
        <div className="w-[50%]">
          <div className="font-semibold mb-6">Sản phẩm</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={() => {}}
                >
                  <PlusCircleOutlined /> Thêm sản phẩm
                </button>
              </div>
              <div className="pr-0">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  className="w-[300px]"
                  allowClear
                />
              </div>
            </div>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductManage;
