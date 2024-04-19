import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Space, Table, Modal, Tooltip, Button } from "antd";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import { allCategory } from "../../../../redux/slice/categorySlice";
import { deleteCategory } from "../../../../utils/categoryApi";
import ModalCreateCategory from "./ModalCreateCategory";
import ModalUpdateCategory from "./ModalUpdateCategory";
import ModalCareStepManage from "./CareStepManagement/ModalCareStepManage";

function CategoryManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.category?.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCareStepModal, setOpenCareStepModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCareStepCategory, setSelectedCareStepCategory] = useState();
  const [selectedUpdateCategory, setSelectedUpdateCategory] = useState();
  const allCategorys = useSelector(
    (state) => state.category?.allCategoryDTO?.items
  );

  useEffect(() => {
    dispatch(allCategory());
  }, []);

  const showCreateModal = () => {
    setOpenCreateModal(true);
  };

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };
  const showCareStepModal = () => {
    setOpenCareStepModal(true);
  };

  const showModalDelete = () => {
    setOpenDelete(true);
    console.log(openDelete);
  };

  const handleDelete = () => {
    setConfirmLoadingDelete(true);
    deleteCategory(selectedCategory)
      .then((data) => {
        toast.success("Xóa thành công!");
        dispatch(allCategory());
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
    setSelectedUpdateCategory(undefined);
    setOpenUpdateModal(false);
  };

  const handleCancelCareStep = () => {
    setSelectedCareStepCategory(undefined);
    setOpenCareStepModal(false);
  };

  const handleCancelDelete = () => {
    setSelectedCategory(undefined);
    setOpenDelete(false);
  };
  const columns = [
    {
      title: "Tên loại cây",
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
              icon={<EyeOutlined style={{ color: "blue" }} />}
              onClick={() => {
                setSelectedUpdateCategory(record);
                showUpdateModal();
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                setSelectedCategory(record.id);
                showModalDelete();
              }}
            />
          </Tooltip>
          <Tooltip title="Xem các bước chăm sóc">
            <Button
              type="text"
              icon={<UnorderedListOutlined />}
              onClick={() => {
                setSelectedCareStepCategory(record);
                showCareStepModal();
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
          <div className="font-semibold mb-6">Quản lý loại cây</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showCreateModal}
                >
                  <PlusCircleOutlined /> Thêm loại cây
                </button>
              </div>
            </div>
            <div className="mb-12 flex justify-center">
              <Table
                className="w-[50%]"
                dataSource={allCategorys}
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
        <ModalCreateCategory
          show={openCreateModal}
          setShow={handleCancelCreate}
        />
        <ModalUpdateCategory
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          category={selectedUpdateCategory}
        />
        <ModalCareStepManage
          show={openCareStepModal}
          setShow={handleCancelCareStep}
          category={selectedCareStepCategory}
        />
        <Modal
          title="Xóa loại cây"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
        >
          <div>Bạn có muốn xóa loại cây này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default CategoryManage;
