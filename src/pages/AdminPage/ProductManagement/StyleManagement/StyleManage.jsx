import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Space, Table, Modal, Tooltip, Button } from "antd";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import { allStyle } from "../../../../redux/slice/styleSlice";
import { deleteStyle } from "../../../../utils/styleApi";
import ModalCreateStyle from "./ModalCreateStyle";
import ModalUpdateStyle from "./ModalUpdateStyle";

function StyleManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.style?.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState();
  const [selectedUpdateStyle, setSelectedUpdateStyle] = useState();
  const allStyles = useSelector((state) => state.style?.allStyleDTO?.items);

  useEffect(() => {
    dispatch(allStyle());
  }, []);

  const showCreateModal = () => {
    setOpenCreateModal(true);
  };

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const showModalDelete = () => {
    setOpenDelete(true);
    console.log(openDelete);
  };

  const handleDelete = () => {
    setConfirmLoadingDelete(true);
    deleteStyle(selectedStyle)
      .then((data) => {
        toast.success("Xóa thành công!");
        dispatch(allStyle());
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data);
      })
      .finally(() => {
        setOpenDelete(false);
        setConfirmLoadingDelete(false);
      });
  };

  const handleCancelCreate = () => {
    setOpenCreateModal(false);
  };

  const handleCancelUpdate = () => {
    setSelectedUpdateStyle(undefined);
    setOpenUpdateModal(false);
  };

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };
  const columns = [
    {
      title: "Tên kiểu mẫu",
      dataIndex: "name",
      key: "name",
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
                setSelectedUpdateStyle(record);
                showUpdateModal();
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                setSelectedStyle(record.id);
                showModalDelete();
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
        <div className="w-[80%]">
          <div className="font-semibold mb-6">Quản lý kiểu mẫu</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showCreateModal}
                >
                  <PlusCircleOutlined /> Thêm Kiểu mẫu
                </button>
              </div>
            </div>
            <div className="mb-12 flex justify-center">
              <Table
                className="w-[50%]"
                dataSource={allStyles}
                columns={columns}
                scroll={{ x: true }}
                rowKey="id"
                loading={{
                  indicator: <Loading loading={loading} />,
                  spinning: loading,
                }}
              />
            </div>
          </div>
        </div>
        <ModalCreateStyle show={openCreateModal} setShow={handleCancelCreate} />
        <ModalUpdateStyle
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          style={selectedUpdateStyle}
        />
        <Modal
          title="Xóa kiểu mẫu"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
          okText={confirmLoadingDelete ? "Đang xóa" : "Xóa kiểu mẫu"}
          cancelText="Hủy"
        >
          <div>Bạn có muốn xóa kiểu mẫu này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default StyleManage;
