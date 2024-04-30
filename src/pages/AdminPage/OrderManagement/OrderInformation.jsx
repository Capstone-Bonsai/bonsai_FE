import React, { useState, useEffect, useRef } from "react";
import {
  PlusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Input, Modal, Form, Upload, Tag, Table } from "antd";
import { getOrderStatusText } from "../../../components/status/orderStatus";
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

  const getColor = (orderStatus) => {
    switch (orderStatus) {
      case "Paid":
        return { color: "success", icon: <CheckCircleOutlined /> };
      case "Delivered":
        return { color: "success", icon: <CheckCircleOutlined /> };
      case "Waiting":
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case "Preparing":
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case "Delivering":
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case "Failed":
        return { color: "error", icon: <CloseCircleOutlined /> };
      case "DeliveryFailed":
        return { color: "error", icon: <CloseCircleOutlined /> };
      default:
        return "defaultColor";
    }
  };
  return (
    <>
      <Form
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
      >
        <div className="font-medium pl-12">1.Thông tin khách hàng</div>
        <div className="pl-12">
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="font-semibold flex justify-start">Email: </div>
            <div className="flex justify-start col-span-2">
              {order?.customer?.applicationUser?.email}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="font-semibold flex justify-start">Họ tên: </div>
            <div className="flex justify-start col-span-2">
              {order?.customer?.applicationUser?.fullname}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="font-semibold flex justify-start">
              Tên đăng nhập:{" "}
            </div>
            <div className="flex justify-start col-span-2">
              {order?.customer?.applicationUser?.userName}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="font-semibold flex justify-start">
              Số điện thoại:{" "}
            </div>
            <div className="flex justify-start col-span-2">
              {order?.customer?.applicationUser?.phoneNumber}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="font-semibold flex justify-start">Địa chỉ: </div>
            <div className="flex justify-start col-span-2">
              {order?.address}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 m-4">
            <div className="font-semibold flex justify-start">Trạng thái: </div>
            <div className="flex justify-start col-span-2">
              <Tag
                color={getColor(order.orderStatus).color}
                icon={getColor(order.orderStatus).icon}
              >
                {getOrderStatusText(order.orderStatus)}
              </Tag>
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
      <div>
        <div className="font-medium pl-12">3.Thông tin người làm vườn</div>
        {order?.gardenerId ? (
          <div>
            <div className="pl-12">
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="font-semibold flex justify-start">
                  Email người làm vườn:
                </div>
                <div className="flex justify-start col-span-2">
                  {order?.gardener?.applicationUser?.email}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="font-semibold flex justify-start">
                  Họ và tên:
                </div>
                <div className="flex justify-start col-span-2">
                  {order?.gardener?.applicationUser?.fullname}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="font-semibold flex justify-start">
                  Số điện thoại:
                </div>
                <div className="flex justify-start col-span-2">
                  {order?.gardener?.applicationUser?.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="pl-12">
              <div className="font-semibold text-[red]">Hiện không có người làm vườn</div>
            </div>
          </>
        )}
      </div>
      {order?.orderStatus == "Delivered" ? (
        <>
          <div>
            <div className="font-medium mt-6 pl-12">
              4.Hình ảnh giao hàng thành công
            </div>
          </div>
          <div className="font-medium pl-12">
            <div className="grid grid-cols-8 gap-4 m-4">
              {order?.deliveryImages?.map((image, index) => (
                <div key={index} className="h-[100px] w-[100px]">
                  <img
                    src={image.image}
                    style={{ width: "100px  ", height: "100px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderInformation;
