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
import Loading from "../../../components/Loading";
import { fetchAllService } from "../../../redux/slice/serviceSlice";
import { deleteService } from "../../../utils/serviceApi";
import ModalCreateService from "./ModalCreateService";
import ModalUpdateService from "./ModalUpdateService";

function ServiceManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.service?.listService?.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedService, setSelectedService] = useState();
  const [selectedUpdateService, setSelectedUpdateService] = useState();

  const allService = useSelector(
    (state) => state.service?.listService?.services?.items
  );
  console.log(allService);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paging = useSelector((state) => state.service?.pagination);

  useEffect(() => {
    dispatch(
      fetchAllService({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, []);

  const showCreateModal = () => {
    console.log("1111");
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
    deleteService(selectedService)
      .then((data) => {
        toast.success("Xóa thành công!");
        dispatch(
          fetchAllService({
            pageIndex: currentPage - 1,
            pageSize: pageSize,
          })
        );
        setOpenDelete(false);
        setConfirmLoadingDelete(false);
      })
      .catch((err) => {
        console.log(err.response.statusText);
        toast.error(err.response.statusText);
        setOpenDelete(false);
        setConfirmLoadingDelete(false);
      });
  };

  const handleCancelCreate = () => {
    setOpenCreateModal(false);
  };

  const handleCancelUpdate = () => {
    setSelectedUpdateService(undefined);
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
      fetchAllService({
        pageIndex: index,
        pageSize: pageSize,
      })
    );
  };

  const [expended, setExpended] = useState();

  const expend = (i) => {
    if (expended === i) setExpended(undefined);
    else setExpended(i);
  };

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Tên nhiệm vụ",
        key: "bonsai",
        render: (record) => <div>{record.baseTask?.name}</div>,
      },
      {
        title: "Chi tiết",
        key: "detail",
        render: (record) => <div>{record.baseTask?.detail}</div>,
      },
      {
        title: "Ngày tạo",
        key: "creationDate",
        render: (_, record) => (
          <>
            <p>{new Date(record?.creationDate).toLocaleDateString()}</p>
          </>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        rowKey="id"
        dataSource={record?.serviceBaseTasks}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "catserviceTypeegory",
      key: "serviceType",
      render: (_, record) => (
        <>
          <p>{record.serviceType?.typeName}</p>
        </>
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
      title: "Xem nhiệm vụ",
      key: "orderDetails",
      render: (_, record) => {
        return (
          <>
            {record?.serviceType?.typeEnum == 2 ? (
              <a onClick={() => expend(record.id)}>
                {record.id === expended ? "Đóng" : "Xem chi tiết"}
              </a>
            ) : (
              <></>
            )}
          </>
        );
      },
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
                setSelectedUpdateService(record);
                showUpdateModal();
              }}
            />
          </Tooltip>
          {record?.serviceType?.typeEnum == 2 ? (
            <Tooltip title="Xóa">
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: "red" }} />}
                onClick={() => {
                  setSelectedService(record.id);
                  showModalDelete();
                }}  
              />
            </Tooltip>
          ) : (
            <></>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold mb-6">Dịch vụ</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showCreateModal}
                >
                  <PlusCircleOutlined /> Thêm Dịch vụ
                </button>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-3"></div>
            </div>
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allService}
                columns={columns}
                scroll={{ x: true }}
                pagination={paging}
                onChange={handleTableChange}
                rowKey="id"
                loading={{
                  indicator: <Loading loading={loading} />,
                  spinning: loading,
                }}
                expandable={{
                  expandedRowRender,
                  expandedRowKeys: [expended],
                  expandIcon: () => <></>,
                }}
              />
            </div>
          </div>
        </div>
        <ModalCreateService
          show={openCreateModal}
          setShow={handleCancelCreate}
        />
        <ModalUpdateService
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          service={selectedUpdateService}
        />
        <Modal
          title="Xóa dịch vụ"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
          okText={confirmLoadingDelete ? "Đang xóa" : "Xóa dịch vụ"}
          cancelText="Hủy"
        >
          <div>Bạn có muốn xóa dịch vụ này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default ServiceManage;
