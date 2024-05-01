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

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import ModalUpdateComplaint from "../ModalUpdateComplaint";
import { getComplaintStatusText } from "../../../../components/status/complaintStatus";

function TabComplaintManagement({ serviceOrderDetail, serviceOrderId }) {
  const dispatch = useDispatch();

  const [selectedComplaint, setSelectedComplaint] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
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
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <>
          <div className="h-[150px] w-[150px]">
            <img
              src={record.complaintImages[0]?.image}
              style={{ width: "150px", height: "150px" }}
            />
          </div>
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
              <Tooltip title="Xác nhận khiếu nại">
                <Button
                  type="text"
                  icon={<CheckCircleOutlined style={{ color: "green" }} />}
                  onClick={() => {
                    setSelectedComplaint(record);
                    setSelectedStatus(2);
                    showUpdateModal();
                  }}
                />
              </Tooltip>
              <Tooltip title="Từ chối khiếu nại">
                <Button
                  type="text"
                  icon={<CloseCircleOutlined style={{ color: "red" }} />}
                  onClick={() => {
                    setSelectedComplaint(record);
                    setSelectedStatus(3);
                    showUpdateModal();
                  }}
                />
              </Tooltip>
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
        selectedStatus={selectedStatus}
      />
    </>
  );
}

export default TabComplaintManagement;
