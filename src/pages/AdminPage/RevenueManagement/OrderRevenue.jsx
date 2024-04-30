import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Space, Tag, Table, Modal, Tooltip, Button } from "antd";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import Cookies from "universal-cookie";
import {
  getOrderStatusNumber,
  getOrderStatusText,
} from "../../../components/status/orderStatus";
import { allRevenueOrder } from "../../../redux/slice/dashboardSlice";

function OrderRevenue() {
  const cookies = new Cookies();
  const userInfo = cookies.get("user");
  const dispatch = useDispatch();

  const allOrder = useSelector((state) => state.dashboard?.allRevenueOrderDTO);

  console.log(allOrder);
  useEffect(() => {
    dispatch(allRevenueOrder());
  }, []);

  const getColor = (orderStatus) => {
    switch (orderStatus) {
      case 2:
        return { color: "success", icon: <CheckCircleOutlined /> };
      case 5:
        return { color: "success", icon: <CheckCircleOutlined /> };
      case 1:
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case 3:
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case 4:
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case 6:
        return { color: "error", icon: <CloseCircleOutlined /> };
      case 7:
        return { color: "error", icon: <CloseCircleOutlined /> };
      default:
        return "defaultColor";
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.email}</p>
        </>
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.fullname}</p>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.phoneNumber}</p>
        </>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày tạo đơn hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (_, record) => (
        <>
          <p>{new Date(record?.creationDate).toLocaleDateString()}</p>
        </>
      ),
    },
    {
      title: "Ngày dự kiến giao hàng giao",
      dataIndex: "expectedDeliveryDate",
      key: "expectedDeliveryDate",
      render: (_, record) => (
        <>
          <p>{new Date(record.expectedDeliveryDate).toLocaleDateString()}</p>
        </>
      ),
    },
    {
      title: "Giá hàng",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
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
      title: "Phí giao hàng",
      dataIndex: "deliveryPrice",
      key: "deliveryPrice",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record.deliveryPrice)}
          </p>
        </>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record.totalPrice)}
          </p>
        </>
      ),
    },
    // {
    //   title: "Xem đơn hàng",
    //   key: "orderDetails",
    //   render: (_, record) => {
    //     return (
    //       <a onClick={() => expend(record.id)}>
    //         {record.id === expended ? "Đóng" : "Xem chi tiết"}
    //       </a>
    //     );
    //   },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_, record) => (
        <>
          <Tag
            color={getColor(record.orderStatus).color}
            icon={getColor(record.orderStatus).icon}
          >
            {getOrderStatusNumber(record.orderStatus)}
          </Tag>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          {/* <div className="font-semibold text-lg mb-6">
            Quản lý đơn hàng bonsai
          </div> */}
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allOrder?.data}
                columns={columns}
                scroll={{ x: true }}
                rowKey={(record) => record.id}
                loading={{
                  indicator: <Loading loading={allOrder?.loading} />,
                  spinning: allOrder?.loading,
                }}
                // expandable={{
                //   expandedRowRender,
                //   expandedRowKeys: [expended],
                //   expandIcon: () => <></>,
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderRevenue;
