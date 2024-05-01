import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Space,
  Table,
  Input,
  Modal,
  Select,
  Tooltip,
  Button,
  Tag,
  Divider,
} from "antd";
const { Search, TextArea } = Input;

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";

function TabTaskInformation({ serviceOrderDetail, listTaskDTO }) {
  const dispatch = useDispatch();

  const columnsListGardenerGardener = [
    {
      title: "Ảnh đại diện",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (_, record) => (
        <>
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src={
                  record.avatarUrl || record.avatarUrl == "(null)"
                    ? record.avatarUrl
                    : "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="Avatar"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <>
          <p>{record?.email}</p>
        </>
      ),
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
      render: (_, record) => (
        <>
          <p>{record?.userName}</p>
        </>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, record) => (
        <>
          <p>{record?.fullname}</p>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, record) => (
        <>
          <p>{record?.phoneNumber}</p>
        </>
      ),
    },
  ];

  const columnsListTaskDTO = [
    {
      title: "Tên nhiệm vụ",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <>
          <p>{record?.name}</p>
        </>
      ),
    },
    {
      title: "Thời gian hoàn thành",
      dataIndex: "completedTime",
      key: "completedTime",
      render: (_, record) => (
        <>
          {record?.completedTime ? (
            <p>{new Date(record?.completedTime).toLocaleDateString()}</p>
          ) : (
            <>
              {serviceOrderDetail.serviceOrderStatus === 4 ? (
                <Tag color="red">Chưa hoàn thành</Tag>
              ) : (
                <Tag color="red">Đang xử lí khiếu nại</Tag>
              )}
            </>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <div className="p-6 ">
        <div className="p-4 w-[100%]"></div>
        <div className="font-medium text-lg">1. Thông tin người làm vườn:</div>
        <div className="p-4 mb-6">
          <Table
            dataSource={serviceOrderDetail?.gardenersOfServiceOrder}
            columns={columnsListGardenerGardener}
            scroll={{ x: true }}
            rowKey={(record) => record.id}
            loading={{
              indicator: <Loading loading={serviceOrderDetail?.loading} />,
              spinning: serviceOrderDetail?.loading,
            }}
            pagination={false}
          />
        </div>

        <div className="font-medium text-lg">2. Tiến độ công việc:</div>
        <div className="p-4 mb-6">
          <Table
            dataSource={listTaskDTO?.taskOfServiceOrders}
            columns={columnsListTaskDTO}
            scroll={{ x: true }}
            rowKey={(record) => record.id}
            loading={{
              indicator: <Loading loading={listTaskDTO?.loading} />,
              spinning: listTaskDTO?.loading,
            }}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
}

export default TabTaskInformation;
