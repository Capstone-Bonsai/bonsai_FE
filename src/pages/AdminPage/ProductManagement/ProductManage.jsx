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
import {
  fetchAllProduct,
  fetchAllProductNoPagination,
  fetchAllProductPagination,
} from "../../../redux/slice/productSlice";
import { deleteProduct } from "../../../utils/productApi";
import ModalCreateProduct from "../ProductManagement/ModalCreateProduct";
import { Link } from "react-router-dom";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { getListSubCategory } from "../../../utils/subCategoryApi";
import { getListTag } from "../../../utils/tagApi";
import Loading from "../../../components/Loading";

function ProductManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedUpdateProduct, setSelectedUpdateProduct] = useState();

  const [listSubCategory, setListSubCategory] = useState();
  const [listTag, setListTag] = useState();
  const allProduct = useSelector(
    (state) => state.product?.allProductPaginationDTO?.items
  );
  console.log(allProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paging = useSelector((state) => state.product?.pagination);

  useEffect(() => {
    dispatch(
      fetchAllProductPagination({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
        keyword: "",
      })
    );
  }, []);

  useEffect(() => {
    fetchListTag();
  }, []);

  useEffect(() => {
    fetchListSubCategory();
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

  const handleCancelCreate = () => {
    setOpenCreateModal(false);
  };

  const handleCancelUpdate = () => {
    setSelectedUpdateProduct(undefined);
    setOpenUpdateModal(false);
  };

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };

  const fetchListSubCategory = () => {
    getListSubCategory()
      .then((data) => {
        setListSubCategory(data.data.items);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
        // if (
        //   err &&
        //   err.response &&
        //   err.response.data &&
        //   err.response.data.value
        // ) {
        //   toast.error(err.response.data.value);
        // } else {
        //   toast.error("Đã xảy ra lỗi!");
        // }
      });
  };

  const fetchListTag = () => {
    getListTag()
      .then((data) => {
        setListTag(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
        // if (
        //   err &&
        //   err.response &&
        //   err.response.data &&
        //   err.response.data.value
        // ) {
        //   toast.error(err.response.data.value);
        // } else {
        //   toast.error("Đã xảy ra lỗi!");
        // }
      });
  };

  const handleSearchInputChange = (e) => {
    e.preventDefault()
    dispatch(
      fetchAllProductPagination({
        pageIndex: 0,
        pageSize: 5,
        keyword: e.target.value,
      })
    );
  }

  const handleTableChange = (pagination) => {
    console.log(pagination);
    const index = Number(pagination.current) - 1;
    dispatch(
      fetchAllProductPagination({
        pageIndex: index,
        pageSize: pageSize,
        keyword: "",
      })
    );
  };
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kho sẵn",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá tiền",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record.unitPrice)}
          </p>
        </>
      ),
    },
    {
      title: "Chiều cao",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Hình dáng",
      dataIndex: "treeShape",
      key: "treeShape",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Trạng thái",
      dataIndex: "isDisable",
      key: "isDisable",
      render: (_, record) => (
        <>
          <Tag color={record.isDisable == false ? "geekblue" : "red"}>
            {record.isDisabled == false ? "no" : "yes"}
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
              setSelectedProduct(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </button>
          <button
            onClick={() => {
              setSelectedUpdateProduct(record);
              showUpdateModal();
            }}
          >
            Chỉnh sửa
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
                  <PlusCircleOutlined /> Thêm sản phẩm
                </button>
              </div>
              <div className="pr-0">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  onChange={(e) => handleSearchInputChange(e)}
                  className="w-[300px]"
                  allowClear
                />
              </div>
            </div>
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allProduct}
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
        <ModalCreateProduct
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

export default ProductManage;
