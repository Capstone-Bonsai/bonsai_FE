import React, { useState, useEffect } from "react";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Space,
  Table,
  Modal,
} from "antd";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { fetchAllService, allServiceType } from "../../../redux/slice/serviceSlice";
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

  const allService = useSelector((state) => state.service?.listService?.services?.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paging = useSelector((state) => state.service?.pagination);
  
  useEffect(() => {
    dispatch(
      fetchAllService({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(allServiceType());
  }, []);

  const showCreateModal = () => {
    console.log("1111")
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
    deleteService(selectedBonsai)
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
      title: "Giá tiêu chuẩn",
      dataIndex: "standardPrice",
      key: "standardPrice",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record.standardPrice)}
          </p>
        </>
      ),
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "catserviceTypeegory",
      key: "serviceType",
      render: (_, record) => (
        <>
          <p>{record.serviceType}</p>
        </>
      ),
    },
    {
      title: "Hinh ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <>
          <div>
            <img src={record.image} width={200} height={200} />
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
          <button
            onClick={() => {
              setSelectedService(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </button>
          <button
            onClick={() => {
              setSelectedUpdateService(record);
              showUpdateModal();
            }}
          >
            Chỉnh sửa
          </button>
          {/* <Link to={`/admin/productDetail/${record.id}`} key={record.id}>
            Xem thông tin
          </Link> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold mb-6">Sản phẩm</div>
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

export default ServiceManage;
