import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Space, Table, Input, Modal, Tooltip, Button } from "antd";
const { Search, TextArea } = Input;

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ModalCreateCareStep from "./ModalCreateCareStep";
import Loading from "../../../../../components/Loading";
import { allCareStep } from "../../../../../redux/slice/careStepSlice";
import { deleteCareStep } from "../../../../../utils/careStepApi";

const ModalCareStepManage = (props) => {
  const { show, setShow, category } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.careStep?.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedCareStep, setSelectedCareStep] = useState();
  const [selectedUpdateCareStep, setSelectedUpdateCareStep] = useState();
  const allCareSteps = useSelector(
    (state) => state.careStep?.allCareStepDTO?.items
  );

  useEffect(() => {
    if (category != undefined) {
      dispatch(allCareStep(category?.id));
      console.log(allCareSteps);
    }
  }, [category, dispatch]);

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
    deleteCareStep(selectedCareStep)
      .then((data) => {
        toast.success("Xóa thành công!");
        dispatch(allCareStep(category.id));
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
    setSelectedUpdateCareStep(undefined);
    setOpenUpdateModal(false);
  };

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };

  const columns = [
    {
      title: "Thứ tự",
      dataIndex: "orderStep",
      key: "orderStep",
    },
    {
      title: "Tên bước chăm sóc",
      dataIndex: "step",
      key: "step",
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
                setSelectedUpdateCareStep(record);
                showUpdateModal();
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                setSelectedCareStep(record.id);
                showModalDelete();
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <Modal
          width={800}
          title={`Bước chăm sóc của ${category?.name}`}
          open={show}
          cancelText="Hủy"
          onCancel={handleClose}
          maskClosable={false}
        >
          <div className="mt-9">
            <div className="w-[100%]">
              <div className="bg-[#ffffff] drop-shadow-2xl">
                <div className="flex justify-between p-6">
                  <div>
                    <button
                      className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                      onClick={showCreateModal}
                    >
                      <PlusCircleOutlined /> Thêm bước chăm sóc
                    </button>
                  </div>
                </div>
                <div className="mb-12">
                  <Table
                    className="w-[100%]"
                    dataSource={allCareSteps}
                    columns={columns}
                    scroll={{ x: true }}
                    pagination={false}
                    rowKey="id"
                    loading={{
                      indicator: <Loading loading={loading} />,
                      spinning: loading,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <ModalCreateCareStep
          show={openCreateModal}
          setShow={handleCancelCreate}
          categoryId={category?.id}
        />
        <Modal
          title="Xóa bước chăm sóc"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
          okText={confirmLoadingDelete ? "Đang xóa" : "Xóa bước chăm sóc"}
          cancelText="Hủy"
        >
          <div>Bạn có muốn xóa bước chăm sóc này không?</div>
        </Modal>
      </div>
    </>
  );
};

export default ModalCareStepManage;
