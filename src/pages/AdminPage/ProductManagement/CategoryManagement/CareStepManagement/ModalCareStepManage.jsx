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
import ModalUpdateCareStep from "./ModalUpdateCareStep";
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
    dispatch(
      allCareStep(category?.id)
    );
    console.log(allCareSteps)
  }, [category,dispatch]);

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
        dispatch(
          allCareStep(category.id)
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
          <button
            onClick={() => {
              setSelectedCareStep(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </button>
          <button
            onClick={() => {
              showCreateModal();
            }}
          >
            Chỉnh sửa
          </button>
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
              <div className="font-semibold mb-6">Bước chăm sóc</div>
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
        {/* <ModalUpdateCareStep
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          baseTask={selectedCareStep}
        /> */}
        <Modal
          title="Xóa bước chăm sóc"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
        >
          <div>Bạn có muốn xóa bước chăm sóc này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default ModalCareStepManage;
