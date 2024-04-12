import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Space, Tag, Table, Modal } from "antd";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../../redux/slice/orderSlice";
import { deleteProduct } from "../../../utils/productApi";
import Loading from "../../../components/Loading";
import ModalUpdateOrder from "./ModalUpdateOrder";

function OrderManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order?.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedUpdateOrder, setSelectedUpdateOrder] = useState();

  const allOrder = useSelector((state) => state.order?.listOrder?.items);
  console.log(allOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paging = useSelector((state) => state.order?.pagination);

  const [expended, setExpended] = useState();

  useEffect(() => {
    dispatch(
      fetchAllOrders({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, []);

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const showModalDelete = () => {
    setOpenDelete(true);
  };

  const handleDelete = () => {
    setConfirmLoadingDelete(true);
    deleteProduct(selectedOrder)
      .then((data) => {
        toast.success(data);
      })
      .catch((err) => {
        console.log(err.response.statusText);
        toast.error(err.response.statusText);
      })
      .finally(() => {
        setOpenDelete(false);
        setConfirmLoadingDelete(false);
      });
  };

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };

  const handleCancelUpdate = () => {
    setSelectedUpdateOrder(undefined);
    setOpenUpdateModal(false);
  };

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

  const getStatusText = (status) => {
    switch (status) {
      case "Waiting":
        return "Đang chờ";
      case "Paid":
        return "Đã thanh toán";
      case "Preparing":
        return "Đang thực hiện";
      case "Failed":
        return "Thất bại";
      case "Canceled":
        return "Đã hủy";
      case "Delivered":
        return "Đã giao";
      default:
        return "Trạng thái không xác định";
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

  const expend = (i) => {
    if (expended === i) setExpended(undefined);
    else setExpended(i);
  };

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Bonsai",
        key: "bonsai",
        render: (record) => <div>{record.bonsai?.name}</div>,
      },
      {
        title: "Giá tiền",
        key: "price",
        render: (record) => (
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
        title: "Ngày tạo",
        key: "creationDate",
        render: (_, record) => (
          <>
            <p>{new Date(record.creationDate).toLocaleDateString()}</p>
          </>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        rowKey="id"
        dataSource={record.orderDetails}
        pagination
      />
    );
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.email}</p>
        </>
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.fullname}</p>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.phoneNumber}</p>
        </>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Loại giao",
      dataIndex: "orderType",
      key: "orderType",
      render: (_, record) => (
        <>
          <Tag>{record.deliveryType}</Tag>
        </>
      ),
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
      title: "Xem đơn hàng",
      key: "orderDetails",
      render: (_, record) => {
        return (
          <a onClick={() => expend(record.id)}>
            {record.id === expended ? "Đóng" : "Thêm chi tiết"}
          </a>
        );
      },
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
            {getStatusText(record.orderStatus)}
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
              setSelectedOrder(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </button>
          <button
            onClick={() => {
              setSelectedUpdateOrder(record);
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
          <div className="font-semibold mb-6">Đơn hàng</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allOrder}
                columns={columns}
                scroll={{ x: true }}
                pagination={paging}
                onChange={handleTableChange}
                rowKey={(record) => record.id}
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
        <ModalUpdateOrder
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          order={selectedUpdateOrder}
        />
        <Modal
          title="Xóa đơn hàng"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
        >
          <div>Bạn có muốn xóa đơn hàng này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default OrderManage;
