import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
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

import Loading from "../../../../components/Loading";
import { getComplaintStatusText } from "../../../../components/status/complaintStatus";

function TabTransactionInfomation({ serviceOrderDetail }) {
  const columnsTransaction = [
    {
      title: "Thông tin thanh toán",
      dataIndex: "information",
      key: "information",
      render: (_, record) => (
        <>
          <p>{record?.information}</p>
        </>
      ),
    },
    {
      title: "Tổng giá trị",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "VND",
          }).format(record?.amount)}
        </>
      ),
    },
    {
      title: "Partner code",
      dataIndex: "partnerCode",
      key: "partnerCode",
      render: (_, record) => (
        <>
          <p>{record?.partnerCode}</p>
        </>
      ),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (_, record) => (
        <>
          <p>{record?.paymentMethod}</p>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "transactionStatus",
      key: "transactionStatus",
      render: (_, record) => (
        <>
          <Tag color={record?.transactionStatus === 1 ? "green" : "red"}>
            {record?.transactionStatus === 1 ? "Thành công" : "Thất bại"}
          </Tag>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="p-4 mb-6">
        <Table
          dataSource={serviceOrderDetail?.contractTransactions}
          columns={columnsTransaction}
          scroll={{ x: true }}
          rowKey={(record) => record.id}
          loading={{
            indicator: <Loading loading={serviceOrderDetail?.loading} />,
            spinning: serviceOrderDetail?.loading,
          }}
          pagination={false}
        />
      </div>
    </>
  );
}

export default TabTransactionInfomation;
