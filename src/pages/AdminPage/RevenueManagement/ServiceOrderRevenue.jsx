import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UsergroupAddOutlined,
  PlusSquareOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Space, Tag, Table, Input, Modal, Badge, Tooltip, Button } from "antd";
const { Search } = Input;
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import {
  getStatusText,
  getStatusColor,
} from "../../../components/status/contractStatus";
import { allRevenueServiceOrder } from "../../../redux/slice/dashboardSlice";

function ServiceOrderRevenue() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userInfo = cookies?.get("user");
  const allServiceOrders = useSelector(
    (state) => state.dashboard?.allRevenueServiceOrderDTO
  );
  console.log(allServiceOrders);
  useEffect(() => {
    dispatch(allRevenueServiceOrder());
  }, []);

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      render: (_, record) => (
        <>
          <p>{record?.customerName}</p>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      render: (_, record) => (
        <>
          <p>{record?.customerPhoneNumber}</p>
        </>
      ),
    },
    {
      title: "Khoảng cách",
      dataIndex: "distance",
      key: "distance",
      render: (_, record) => (
        <>
          <p>
            {(record?.distance / 1000).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            km
          </p>
        </>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (_, record) => (
        <>
          <p>{new Date(record?.startDate).toLocaleDateString()}</p>
        </>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (_, record) => (
        <>
          <p>{new Date(record?.endDate).toLocaleDateString()}</p>
        </>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (_, record) => (
        <>
          <p>{record?.address}</p>
        </>
      ),
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "address",
      key: "address",
      render: (_, record) => (
        <>
          <p>{record?.service?.name}</p>
        </>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "temporaryTotalPrice",
      key: "temporaryTotalPrice",
      render: (_, record) => (
        <>
          {record?.totalPrice === 0 ? (
            <>
              <p>Chưa có giá</p>
            </>
          ) : (
            <>
              <p>{formatPrice(record?.totalPrice)}</p>
            </>
          )}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "serviceOrderStatus",
      key: "serviceOrderStatus",
      render: (_, record) => (
        <Tag color={getStatusColor(record?.serviceOrderStatus)}>
          {getStatusText(record?.serviceOrderStatus)}
        </Tag>
      ),
    },
    // {
    //   title: "Tên dịch vụ",
    //   dataIndex: "serviceId",
    //   key: "serviceId",
    //   render: (_, record) => {
    //     if (record.serviceType === 1) {
    //       return <>Dịch vụ chăm cây</>;
    //     } else if (record.serviceType === 2) {
    //       return <>Dịch vụ chăm vườn</>;
    //     }
    //   },
    // },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          {/* <div className="font-semibold text-lg mb-6">
            Quản lý đơn hàng dịch vụ
          </div> */}
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allServiceOrders?.data}
                columns={columns}
                scroll={{ x: true }}
                rowKey={(record) => record.id}
                loading={{
                  indicator: <Loading loading={allServiceOrders?.loading} />,
                  spinning: allServiceOrders?.loading,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceOrderRevenue;
