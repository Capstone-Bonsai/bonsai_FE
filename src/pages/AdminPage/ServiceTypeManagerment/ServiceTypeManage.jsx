import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Space, Tag, Table, Modal, Tooltip, Button } from "antd";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { allServiceType } from "../../../redux/slice/serviceSlice";
import ModalUpdateServiceType from "./ModalUpdateServiceType";

function ServiceTypeManage() {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.service?.allServiceTypeDTO?.loading
  );
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedUpdateServiceType, setSelectedUpdateServiceType] = useState();

  const allServiceTypes = useSelector(
    (state) => state.service?.allServiceTypeDTO?.items
  );

  useEffect(() => {
    dispatch(allServiceType());
  }, []);

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCancelUpdate = () => {
    setSelectedUpdateServiceType(undefined);
    setOpenUpdateModal(false);
  };

  const columns = [
    {
      title: "Tên loại dịch vụ",
      dataIndex: "typeName",
      key: "typeName",
      render: (_, record) => (
        <>
          <p>{record.typeName}</p>
        </>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <div className="w-[700px]">
          <div className="">{record.description}</div>
        </div>
      ),
    },
    {
      title: "Hinh ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <>
          <div className="h-[150px] w-[150px]">
            <img
              src={record.image}
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
        <Space size="middle">
          <Tooltip title="Xem thông tin">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "orange" }} />}
              onClick={() => {
                setSelectedUpdateServiceType(record);
                showUpdateModal();
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold mb-6">Loại dịch vụ</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allServiceTypes}
                columns={columns}
                scroll={{ x: true }}
                pagination={false}
                rowKey={(record) => record.id}
                loading={{
                  indicator: <Loading loading={loading} />,
                  spinning: loading,
                }}
              />
            </div>
          </div>
        </div>
        <ModalUpdateServiceType
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          serviceType={selectedUpdateServiceType}
        />
      </div>
    </>
  );
}

export default ServiceTypeManage;
