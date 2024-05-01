import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Space, Table, Input, Modal, Select, Tooltip, Button, Tag } from "antd";
const { Search, TextArea } = Input;

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBonsaiPagination } from "../../../../redux/slice/bonsaiSlice";
import ModalCreateProduct from "./ModalCreateProduct";
import { Link } from "react-router-dom";
import ModalUpdateProduct from "./ModalUpdateProduct";
import Loading from "../../../../components/Loading";
import { allCategory } from "../../../../redux/slice/categorySlice";
import { allStyle } from "../../../../redux/slice/styleSlice";
import { deleteBonsai, disableBonsai } from "../../../../utils/bonsaiApi";

function ProductManage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.bonsai.loading);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDisable, setOpenDisable] = useState(false);
  const [openEnable, setOpenEnable] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [confirmLoadingDisable, setConfirmLoadingDisable] = useState(false);
  const [confirmLoadingEnable, setConfirmLoadingEnable] = useState(false);
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

  console.log(allBonsai);
  const allCategories = useSelector(
    (state) => state.category?.allCategoryDTO?.items
  );
  const allStyles = useSelector((state) => state.style?.allStyleDTO?.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paging = useSelector((state) => state.bonsai?.pagination);

  useEffect(() => {
    dispatch(
      fetchAllBonsaiPagination({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(allCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(allStyle());
  }, [dispatch]);

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

  const showModalDisable = () => {
    setOpenDisable(true);
    console.log(openDisable);
  };
  const showModalEnable = () => {
    setOpenEnable(true);
    console.log(openEnable);
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
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
      })
      .finally(() => {
        setOpenDelete(false);
        setConfirmLoadingDelete(false);
      });
  };

  const handleDisable = () => {
    setConfirmLoadingDisable(true);
    disableBonsai(selectedBonsai)
      .then((data) => {
        toast.success("Vô hiệu hóa thành công!");
        dispatch(
          fetchAllBonsaiPagination({
            pageIndex: currentPage - 1,
            pageSize: pageSize,
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
      })
      .finally(() => {
        setOpenDisable(false);
        setConfirmLoadingDisable(false);
      });
  };

  const handleEnable = () => {
    setConfirmLoadingEnable(true);
    disableBonsai(selectedBonsai)
      .then((data) => {
        toast.success("Hiệu hóa thành công!");
        dispatch(
          fetchAllBonsaiPagination({
            pageIndex: currentPage - 1,
            pageSize: pageSize,
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
      })
      .finally(() => {
        setOpenEnable(false);
        setConfirmLoadingEnable(false);
      });
  };

  const handleCancelCreate = () => {
    setOpenCreateModal(false);
  };

  const handleCancelUpdate = () => {
    setSelectedUpdateBonsai(undefined);
    setOpenUpdateModal(false);
  };

  const handleCancelDisable = () => {
    setSelectedBonsai(undefined);
    console.log("Clicked cancel button");
    setOpenDisable(false);
  };
  const handleCancelEnable = () => {
    setSelectedBonsai(undefined);
    console.log("Clicked cancel button");
    setOpenEnable(false);
  };

  const handleCancelDelete = () => {
    setSelectedBonsai(undefined);
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };

  const handleSearchInputChange = () => {
    console.log(filter);
    //e.preventDefault();
    dispatch(
      fetchAllBonsaiPagination({
        pageIndex: 0,
        pageSize: 10,
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
      title: "Tên bonsai",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã số",
      dataIndex: "code",
      key: "code",
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
      title: "Phân loại",
      dataIndex: "category",
      key: "category",
      render: (_, record) => (
        <>
          <p>{record?.category?.name}</p>
        </>
      ),
    },
    {
      title: "Kiểu dáng",
      dataIndex: "style",
      key: "style",
      render: (_, record) => (
        <>
          <p>{record?.style?.name}</p>
        </>
      ),
    },
    {
      title: "Kích cỡ",
      dataIndex: "deliverySize",
      key: "deliverySize",
      render: (_, record) => (
        <>
          <div>
            {record?.deliverySize == 1
              ? "Nhỏ"
              : record?.deliverySize == 2
              ? "Vừa"
              : "Lớn"}
          </div>
        </>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "isSold",
      key: "isSold",
      render: (_, record) => (
        <>
          <Tag color={record?.isSold === true ? "red" : "green"}>
            {record?.isSold === true ? "Đã bán" : "Có sẵn"}
          </Tag>
        </>
      ),
    },
    {
      title: "Hiệu lực",
      dataIndex: "isDisable",
      key: "isDisable",
      render: (_, record) => (
        <>
          <Tag color={record?.isDisable === true ? "red" : "green"}>
            {record?.isDisable === true ? "Vô hiệu hóa" : "Có hiệu lực"}
          </Tag>
        </>
      ),
    },
    {
      title: "Hinh ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <>
          <div className="h-[200px] w-[200px]">
            <img
              src={record.bonsaiImages[0]?.imageUrl}
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (_, record) => (
        <>
          {record?.isSold === false ? (
            <Space size="middle">
              <Tooltip title="Xem thông tin">
                <Button
                  type="text"
                  icon={<EditOutlined style={{ color: "orange" }} />}
                  onClick={() => {
                    setSelectedUpdateBonsai(record);
                    showUpdateModal();
                  }}
                />
              </Tooltip>
              {record.isDisable === false ? (
                <Tooltip title="Vô hiệu hóa">
                  <Button
                    type="text"
                    icon={<EyeInvisibleOutlined style={{ color: "red" }} />}
                    onClick={() => {
                      setSelectedBonsai(record.id);
                      showModalDisable();
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Hiệu hóa">
                  <Button
                    type="text"
                    icon={<EyeOutlined style={{ color: "green" }} />}
                    onClick={() => {
                      setSelectedBonsai(record.id);
                      showModalEnable();
                    }}
                  />
                </Tooltip>
              )}

              <Tooltip title="Xóa">
                <Button
                  type="text"
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                  onClick={() => {
                    setSelectedBonsai(record.id);
                    showModalDelete();
                  }}
                />
              </Tooltip>
            </Space>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-bold text-lg mb-6">Quản lý Bonsai</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-2 p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showCreateModal}
                >
                  <PlusCircleOutlined /> Thêm Bonsai
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
          title="Vô hiệu hóa bonsai"
          open={openDisable}
          onOk={handleDisable}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDisable}
          onCancel={handleCancelDisable}
          okText={
            confirmLoadingDisable ? "Đang vô hiệu hóa" : "Vô hiệu hóa bonsai"
          }
          cancelText="Hủy"
        >
          <div>Bạn có muốn vô hiệu hóa bonsai này không?</div>
        </Modal>
        <Modal
          title="Hiệu hóa bonsai"
          open={openEnable}
          onOk={handleEnable}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingEnable}
          onCancel={handleCancelEnable}
          okText={confirmLoadingEnable ? "Đang hiệu hóa" : "Hiệu hóa bonsai"}
          cancelText="Hủy"
        >
          <div>Bạn có muốn hiệu hóa bonsai này không?</div>
        </Modal>
        <Modal
          title="Xóa bonsai"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
          okText={confirmLoadingDelete ? "Đang xóa" : "Xóa bonsai"}
          cancelText="Hủy"
        >
          <div>Bạn có muốn xóa bonsai này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default ProductManage;
