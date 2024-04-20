import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Space, Table, Modal, Tooltip, Button } from "antd";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { allBaseTaskPagination } from "../../../redux/slice/baseTaskSlice";
import { deleteBaseTask } from "../../../utils/baseTaskApi";
import ModalUpdateBaseTask from "./ModalUpdateBaseTask";
import ModalCreateBaseTask from "./ModalCreateBaseTask";

function BaseTaskManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.baseTask.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedBaseTask, setSelectedBaseTask] = useState();
  const [selectedUpdateBaseTask, setSelectedUpdateBaseTask] = useState();
  const allBaseTask = useSelector(
    (state) => state.baseTask?.allBaseTaskDTOPagination?.items
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paging = useSelector((state) => state.baseTask?.pagination);

  useEffect(() => {
    dispatch(
      allBaseTaskPagination({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
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
    deleteBaseTask(selectedBaseTask)
      .then((data) => {
        toast.success("Xóa thành công!");
        dispatch(
          allBaseTaskPagination({
            pageIndex: currentPage - 1,
            pageSize: pageSize,
          })
        );
      })
      .catch((err) => {
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
    setSelectedUpdateBaseTask(undefined);
    setOpenUpdateModal(false);
  };

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    const index = Number(pagination.current) - 1;
    dispatch(
      allBaseTaskPagination({
        pageIndex: index,
        pageSize: pageSize,
      })
    );
  };
  const columns = [
    {
      title: "Tên nhiệm vụ cơ bản",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "detail",
      key: "detail",
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
                setSelectedUpdateBaseTask(record);
                showUpdateModal();
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                setSelectedBaseTask(record.id);
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
        <div className="w-[100%]">
          <div className="font-semibold mb-6">nhiệm vụ cơ bản</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showCreateModal}
                >
                  <PlusCircleOutlined /> Thêm nhiệm vụ cơ bản
                </button>
              </div>
            </div>
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allBaseTask}
                columns={columns}
                scroll={{ x: true }}
                pagination={paging}
                onChange={handleTableChange}
                rowKey="id"
                loading={{
                  indicator: <Loading loading={loading} />,
                  spinning: loading,
                }}
              />
            </div>
          </div>
        </div>
        <ModalCreateBaseTask
          show={openCreateModal}
          setShow={handleCancelCreate}
        />
        <ModalUpdateBaseTask
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          baseTask={selectedUpdateBaseTask}
        />
        <Modal
          title="Xóa nhiệm vụ cơ bản"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
          okText={confirmLoadingDelete ? "Đang xóa" : "Xóa nhiệm vụ cơ bản"}
          cancelText="Hủy"
        >
          <div>Bạn có muốn xóa nhiệm vụ cơ bản này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default BaseTaskManage;
