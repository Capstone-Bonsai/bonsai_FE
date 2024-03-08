import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Space, Tag, Table, Input, Modal } from "antd";
const { Search } = Input;

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTags } from "../../../redux/slice/tagSlice";
import { deleteProduct } from "../../../utils/productApi";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import ModalUpdateTag from "./ModalUpdateTag";

function TagManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.tag.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState();
  const [selectedUpdateTag, setSelectedUpdateTag] = useState();

  const allTag = useSelector((state) => state.tag?.listTag?.items);
  console.log(allTag);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paging = useSelector((state) => state.tag?.pagination);

  useEffect(() => {
    dispatch(
      fetchAllTags({
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
    deleteProduct(selectedOrder)
      .then((data) => {
        toast.success(data);
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

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };

  const handleCancelCreate = () => {
    setOpenCreateModal(false);
  };
  
  const handleCancelUpdate = () => {
    setSelectedUpdateOrder(undefined);
    setOpenUpdateModal(false);
  };

  // const fetchListSubCategory = () => {
  //   getListSubCategory()
  //     .then((data) => {
  //       setListSubCategory(data.data.items);
  //       console.log(data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // if (
  //       //   err &&
  //       //   err.response &&
  //       //   err.response.data &&
  //       //   err.response.data.value
  //       // ) {
  //       //   toast.error(err.response.data.value);
  //       // } else {
  //       //   toast.error("Đã xảy ra lỗi!");
  //       // }
  //     });
  // };

  // const fetchListTag = () => {
  //   getListTag()
  //     .then((data) => {
  //       setListTag(data.data);
  //       console.log(data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // if (
  //       //   err &&
  //       //   err.response &&
  //       //   err.response.data &&
  //       //   err.response.data.value
  //       // ) {
  //       //   toast.error(err.response.data.value);
  //       // } else {
  //       //   toast.error("Đã xảy ra lỗi!");
  //       // }
  //     });
  // };

  const getColor = (orderStatus) => {
    switch (orderStatus) {
      case "Paid":
        return { color: "success", icon: <CheckCircleOutlined /> };
      case "Waiting":
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case "Failed":
        return { color: "error", icon: <CloseCircleOutlined /> };
      default:
        return "defaultColor";
    }
  };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    const index = Number(pagination.current) - 1;
    dispatch(
      fetchAllOrders({
        pageIndex: index,
        pageSize: pageSize,
      })
    );
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (_, record) => (
        <>
          <p>{record.customer.applicationUser.email}</p>
        </>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (_, record) => (
        <>
          <p>{new Date(record.orderDate).toLocaleDateString()}</p>
        </>
      ),
    },
    {
      title: "Ngày giao",
      dataIndex: "expectedDeliveryDate",
      key: "expectedDeliveryDate",
      render: (_, record) => (
        <>
          <p>{new Date(record.expectedDeliveryDate).toLocaleDateString()}</p>
        </>
      ),
    },
    {
      title: "Giá hàng",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record.price)}
          </p>
        </>
      ),
    },
    {
      title: "Phí giao hàng",
      dataIndex: "deliveryPrice",
      key: "deliveryPrice",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record.deliveryPrice)}
          </p>
        </>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record.totalPrice)}
          </p>
        </>
      ),
    },
    {
      title: "Loại đơn hàng",
      dataIndex: "orderType",
      key: "orderType",
      render: (_, record) => (
        <>
          <Tag>{record.orderType}</Tag>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_, record) => (
        <>
          <Tag
            color={getColor(record.orderStatus).color}
            icon={getColor(record.orderStatus).icon}
          >
            {record.orderStatus}
          </Tag>
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
              setSelectedTag(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </button>
          <button
            onClick={() => {
              setSelectedUpdateTag(record);
              showUpdateModal();
            }}
          >
            Chỉnh sửa
          </button>
        </Space>
      ),
    },
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold mb-6">Đơn hàng</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showCreateModal}
                >
                  <PlusCircleOutlined /> Thêm sản phẩm
                </button>
              </div>
              <div className="pr-0">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  className="w-[300px]"
                  allowClear
                />
              </div>
            </div>
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allOrder}
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
        <ModalUpdateOrder
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          order={selectedUpdateOrder}
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

export default TagManage;
