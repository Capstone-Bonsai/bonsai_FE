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
import ModalUpdateComplaint from "../ModalUpdateComplaint";

function TabComplaintManagement({ serviceOrderDetail, serviceOrderId }) {
  const dispatch = useDispatch();

  const [selectedComplaint, setSelectedComplaint] = useState();
  const [openUpdateModal, setOpenUpdateModal] = useState();

  const columnsComplaints = [
    {
      title: "Mô tả khiếu nại",
      dataIndex: "detail",
      key: "detail",
      render: (_, record) => (
        <>
          <p>{record?.detail}</p>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "complaintStatus",
      key: "complaintStatus",
      render: (_, record) => (
        <>
          <div
            className={`${
              record?.complaintStatus == 3 ? "text-[red]" : "text-[#3a9943]"
            }`}
          >
            {getComplaintStatusText(record?.complaintStatus)}
          </div>
        </>
      ),
    },
    {
      title: "Lý do bị từ chối",
      dataIndex: "cancelReason",
      key: "cancelReason",
      render: (_, record) => (
        <>
          <p>{record?.cancelReason}</p>
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (_, record) => (
        <>
          {record?.complaintStatus === 1 || record?.complaintStatus === 2 ? (
            <Space size="middle">
              <button
                onClick={() => {
                  setSelectedComplaint(record);
                  showUpdateModal();
                }}
              >
                Chỉnh sửa
              </button>
            </Space>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCancelUpdate = () => {
    setSelectedComplaint(undefined);
    setOpenUpdateModal(false);
  };
  return (
    <>
      <div className="p-4 mb-6">
        <Table
          dataSource={serviceOrderDetail?.complaints}
          columns={columnsComplaints}
          scroll={{ x: true }}
          rowKey={(record) => record.id}
          loading={{
            indicator: <Loading loading={serviceOrderDetail?.loading} />,
            spinning: serviceOrderDetail?.loading,
          }}
          pagination={false}
        />
      </div>
      <ModalUpdateComplaint
        show={openUpdateModal}
        setShow={handleCancelUpdate}
        complaint={selectedComplaint}
        serviceOrderId={serviceOrderId}
      />
    </>
  );
}

export default TabComplaintManagement;
