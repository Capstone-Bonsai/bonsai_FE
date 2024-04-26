import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Form, Upload, Tag, Table } from "antd";
const { TextArea } = Input;

const OrderInformation = ({ order }) => {
  const columns = [
    {
      title: "Bonsai",
      key: "bonsai",
      render: (record) => <div>{record.bonsai?.name}</div>,
    },
    {
      title: "Code",
      key: "bonsai",
      render: (record) => <div>{record.bonsai?.code}</div>,
    },
    {
      title: "Mô tả",
      key: "bonsai",
      render: (record) => <div>{record.bonsai?.description}</div>,
    },
    {
      title: "Giá tiền",
      key: "price",
      render: (record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record.price)}
          </p>
        </>
      ),
    },
    {
      title: "Hinh ảnh",
      dataIndex: "bonsaiImages",
      key: "bonsaiImages",
      render: (_, record) => (
        <>
          <div className="h-[100px] w-[100px]">
            <img
              src={record.bonsai?.bonsaiImages[0]?.imageUrl}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        </>
      ),
    },
    {
      title: "Ngày tạo",
      key: "creationDate",
      render: (_, record) => (
        <>
          <p>{new Date(record.creationDate).toLocaleDateString()}</p>
        </>
      ),
    },
  ];
  return (
    <>
      <Form
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
      >
        <div className="font-medium pl-12">1.Thông tin khách hàng</div>
        <div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="flex justify-end">Email: </div>
            <div className="flex justify-start col-span-2">
              {order?.customer?.applicationUser?.email}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="flex justify-end">Họ tên: </div>
            <div className="flex justify-start col-span-2">
              {order?.customer?.applicationUser?.fullname}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="flex justify-end">Tên đăng nhập: </div>
            <div className="flex justify-start col-span-2">
              {order?.customer?.applicationUser?.userName}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="flex justify-end">Số điện thoại: </div>
            <div className="flex justify-start col-span-2">
              {order?.customer?.applicationUser?.phoneNumber}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="flex justify-end">Địa chỉ: </div>
            <div className="flex justify-start col-span-2">
              {order?.address}
            </div>
          </div>
        </div>
      </Form>
      <div className="font-medium pl-12">2.Thông tin bonsai</div>
      <div className="font-medium pl-12">
        <Table
          columns={columns}
          rowKey="id"
          dataSource={order?.orderDetails}
          pagination={false}
        />
      </div>
    </>
  );
};

export default OrderInformation;
