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
import { fetchAllBonsaiPagination } from "../../../redux/slice/bonsaiSlice";
import ModalCreateProduct from "../ProductManagement/ModalCreateProduct";
import { Link } from "react-router-dom";
import ModalUpdateProduct from "./ModalUpdateProduct";
import Loading from "../../../components/Loading";
import { allCategory } from "../../../redux/slice/categorySlice";
import { allStyle } from "../../../redux/slice/styleSlice";
import { deleteBonsai } from "../../../utils/bonsaiApi";

function ProductManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.bonsai.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedBonsai, setSelectedBonsai] = useState();
  const [selectedUpdateBonsai, setSelectedUpdateBonsai] = useState();
  const [filter, setFilter] = useState({
    keyword: "",
    category: "",
    style: "",
  });

  const [listCategory, setListCategory] = useState();
  const [listStyle, setListStyle] = useState();
  const allBonsai = useSelector(
    (state) => state.bonsai?.allBonsaiPaginationDTO?.items
  );
  const allCategories = useSelector(
    (state) => state.category?.allCategoryDTO?.items
  );
  const allStyles = useSelector((state) => state.style?.allStyleDTO?.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paging = useSelector((state) => state.bonsai?.pagination);

  useEffect(() => {
    dispatch(
      fetchAllBonsaiPagination({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(allCategory());
  }, []);

  useEffect(() => {
    dispatch(allStyle());
  }, []);

  useEffect(() => {
    handleSearchInputChange();
  }, [filter]);

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
    deleteBonsai(selectedBonsai)
      .then((data) => {
        toast.success("Xóa thành công!");
        dispatch(
          fetchAllBonsaiPagination({
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
    setSelectedUpdateBonsai(undefined);
    setOpenUpdateModal(false);
  };

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };

  const handleSearchInputChange = () => {
    console.log(filter);
    //e.preventDefault();
    dispatch(
      fetchAllBonsaiPagination({
        pageIndex: 0,
        pageSize: 5,
        keyword: filter.keyword,
        category: filter.category,
        style: filter.style,
      })
    );
  };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    const index = Number(pagination.current) - 1;
    dispatch(
      fetchAllBonsaiPagination({
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
      title: "Mã số",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Năm trồng",
      dataIndex: "yearOfPlanting",
      key: "yearOfPlanting",
    },
    {
      title: "Hoành cây",
      dataIndex: "trunkDimenter",
      key: "trunkDimenter",
    },
    {
      title: "Chiều cao ",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Số thân",
      dataIndex: "numberOfTrunk",
      key: "numberOfTrunk",
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
    },
    {
      title: "Loại cây",
      dataIndex: "category",
      key: "category",
      render: (_, record) => (
        <>
          <p>{record?.category?.name}</p>
        </>
      ),
    },
    {
      title: "Kiểu mẫu",
      dataIndex: "style",
      key: "style",
      render: (_, record) => (
        <>
          <p>{record?.style?.name}</p>
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
              setSelectedBonsai(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </button>
          <button
            onClick={() => {
              setSelectedUpdateBonsai(record);
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
              <div className="grid grid-cols-3 lg:grid-cols-3">
                <div>
                  <Select
                    defaultValue={""}
                    style={{ width: "80%" }}
                    onChange={(e) => setFilter({ ...filter, category: e })}
                  >
                    <Select.Option value={""}>Tất cả</Select.Option>
                    {allCategories?.map((category, index) => (
                      <Select.Option value={category.id} key={index}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select
                    defaultValue={""}
                    style={{ width: "80%" }}
                    onChange={(e) => setFilter({ ...filter, style: e })}
                  >
                    <Select.Option value={""}>Tất cả</Select.Option>
                    {allStyles?.map((style, index) => (
                      <Select.Option value={style.id} key={index}>
                        {style.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="w-[100%]">
                  <Search
                    placeholder="Nhập từ khóa để tìm kiếm"
                    onSearch={onSearch}
                    onChange={(e) =>
                      setFilter({ ...filter, keyword: e.target.value })
                    }
                    className="w-[300px]"
                    allowClear
                  />
                </div>
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
        <ModalCreateProduct
          show={openCreateModal}
          setShow={handleCancelCreate}
          listCategory={allCategories}
          listStyle={allStyles}
        />
        <ModalUpdateProduct
          show={openUpdateModal}
          setShow={handleCancelUpdate}
          bonsai={selectedUpdateBonsai}
          listCategory={allCategories}
          listStyle={allStyles}
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
