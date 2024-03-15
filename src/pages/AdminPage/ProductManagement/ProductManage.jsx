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
  fetchAllProductPagination,
} from "../../../redux/slice/productSlice";
import { fetchAllBonsaiPagination } from "../../../redux/slice/bonsaiSlice";
import { deleteProduct } from "../../../utils/productApi";
import ModalCreateProduct from "../ProductManagement/ModalCreateProduct";
import { Link } from "react-router-dom";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { getListSubCategory } from "../../../utils/subCategoryApi";
import { getListTag } from "../../../utils/tagApi";
import Loading from "../../../components/Loading";
import { getListCategory } from "../../../utils/categoryApi";
import { getListSytle } from "../../../utils/styleApi";

function ProductManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.bonsai.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedUpdateProduct, setSelectedUpdateProduct] = useState();

  const [listCategory, setListCategory] = useState();
  const [listStyle, setListStyle] = useState();
  const allBonsai = useSelector(
    (state) => state.bonsai?.allBonsaiPaginationDTO?.items
  );
  console.log(allBonsai);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paging = useSelector((state) => state.bonsai?.pagination);

  useEffect(() => {
    dispatch(
      fetchAllBonsaiPagination({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
        keyword: "",
      })
    );
  }, []);

  useEffect(() => {
    fetchListCategory();
  }, []);

  useEffect(() => {
    fetchListStyle();
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

  const fetchListCategory = () => {
    getListCategory()
      .then((data) => {
        setListCategory(data.data);
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

  const fetchListStyle = () => {
    getListSytle()
      .then((data) => {
        setListStyle(data.data);
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
    e.preventDefault();
    dispatch(
      fetchAllBonsaiPagination({
        pageIndex: 0,
        pageSize: 5,
        keyword: e.target.value,
      })
    );
  };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    const index = Number(pagination.current) - 1;
    dispatch(
      fetchAllProductPagination({
        pageIndex: index,
        pageSize: pageSize,
        keyword: "",
        category: "",
        style: "",
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
      title: "Năm trồng",
      dataIndex: "yearOfPlanting",
      key: "yearOfPlanting",
    },
    {
      title: "Đường kính",
      dataIndex: "trunkDimenter",
      key: "trunkDimenter",
    },
    {
      title: "Chiều cao ",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Nhánh chính",
      dataIndex: "mainBranch",
      key: "mainBranch",
    },
    {
      title: "Giá tiền",
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
    },{
      title: "Loại cây",
      dataIndex: "category",
      key: "category",
      render: (_, record) => (
        <>
          <p>{record?.category?.name}
          </p>
        </>
      ),
    },{
      title: "Kiểu mẫu",
      dataIndex: "style",
      key: "style",
      render: (_, record) => (
        <>
          <p>
            {record?.style?.name}
          </p>
        </>
      ),
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
                  placeholder="Nhập từ khóa để tìm kiếm"
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
                dataSource={allBonsai}
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

export default ProductManage;
