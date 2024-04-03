import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Space,
  Tag,
  Table,
  Input,
  Modal,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
const { Search, TextArea } = Input;

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  const [pageSize, setPageSize] = useState(5);
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
        setOpenDelete(false);
        setConfirmLoadingDelete(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
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
      title: "Tên công việc",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Miêu tả",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              setSelectedBaseTask(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </button>
          <button
            onClick={() => {
              setSelectedUpdateBaseTask(record);
              showUpdateModal();
            }}
          >
            Chỉnh sửa
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold mb-6">Công việc</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showCreateModal}
                >
                  <PlusCircleOutlined /> Thêm công việc
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
          title="Xóa sản phẩm"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
        >
          <div>Bạn có muốn xóa sản phẩm này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default BaseTaskManage;
