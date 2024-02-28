import React, { useState, useEffect } from "react";
import {
  Space,
  Tag,
  Table,
  Input,
  Modal,
} from "antd";
const { Search } = Input;

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../../redux/slice/orderSlice"
import { deleteProduct } from "../../../utils/productApi";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";

function OrderManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedUpdateProduct, setSelectedUpdateProduct] = useState();

  const allOrder = useSelector(
    (state) => state.order?.listOrder?.items
  );
  console.log(allOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paging = useSelector((state) => state.order?.pagination);

  useEffect(() => {
    dispatch(
      fetchAllOrders({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, []);

  const showModalDelete = () => {
    setOpenDelete(true);
    console.log(openDelete);
  };

  const handleDelete = () => {
    setConfirmLoadingDelete(true);
    deleteProduct(selectedProduct)
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
      title: "Sản phẩm",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Kho sẵn",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_, record) => (
        <>
          <Tag color={record.isDisable == 1 ? "geekblue" : "red"}>
            {record.isDisabled == 1 ? "no" : "yes"}
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
          <Link to={`/admin/productDetail/${record.id}`} key={record.id}>
            Xem thông tin
          </Link>
        </Space>
      ),
    },
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <div className="flex justify-center mt-12">
        <div className="w-[100%]">
          <div className="font-semibold mb-6">Sản phẩm</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                {/* <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showCreateModal}
                >
                  <PlusCircleOutlined /> Thêm sản phẩm
                </button> */}
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
                  loading={{indicator: <Loading loading={loading}/>, spinning: loading}}
                />
            </div>
          </div>
        </div>
        {/* <ModalCreateProduct
          show={openCreateModal}
          setShow={handleCancelCreate}
          listSubCategory={listSubCategory}
          listTag={listTag}
        />
        <ModalUpdateProduct
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          product={selectedUpdateProduct}
          listSubCategory={listSubCategory}
          listTag={listTag}
        /> */}
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

export default OrderManage;
