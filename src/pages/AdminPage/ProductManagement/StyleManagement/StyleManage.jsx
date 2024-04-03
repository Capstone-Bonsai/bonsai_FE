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
        setOpenDelete(false);
        setConfirmLoadingDelete(false);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.statusText);
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
          <button
            onClick={() => {
              setSelectedStyle(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </button>
          <button
            onClick={() => {
              setSelectedUpdateStyle(record);
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
        <ModalCreateStyle
          show={openCreateModal}
          setShow={handleCancelCreate}
        />
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
        >
          <div>Bạn có muốn xóa kiểu mẫu này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default StyleManage;
