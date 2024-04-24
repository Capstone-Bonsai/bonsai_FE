import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UsergroupAddOutlined,
  PlusSquareOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Space, Tag, Table, Input, Modal, Badge, Tooltip, Button } from "antd";
const { Search } = Input;
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import { getStatusText } from "../../../components/status/contractStatus";
import { allServiceOrder } from "../../../redux/slice/serviceOrderSlice";
import ModalCreateServiceOrderImages from "./ModalCreateServiceOrderImages";
import ModalUpateServiceOrderPrice from "./ModalUpateServiceOrderPrice";
import ModalAddGardener from "./ModalAddGardener";
import ServiceOrderDetail from "./ServiceOrderDetail";
import { distance } from "framer-motion";

function ServiceOrder() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userInfo = cookies?.get("user");
  const loading = useSelector(
    (state) => state.serviceOrder?.allServiceOrderDTO?.loading
  );
  // const [openDelete, setOpenDelete] = useState(false);
  // const [openInfo, setOpenInfo] = useState(false);
  const [openGardener, setOpenGardener] = useState(false);
  const [openUpdateServiceOrderPrice, setOpenUpdateServiceOrderPrice] =
    useState(false);
  const [
    openModalCreateServiceOrderImages,
    setOpenModalCreateServiceOrderImages,
  ] = useState(false);
  // const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [selectedServiceOrderDetail, setSelectedServiceOrderDetail] =
    useState();
  const [selectedDetail, setSelectedDetail] = useState(false);
  const [selectedServiceOrderImages, setSelectedServiceOrderImages] =
    useState();
  const allServiceOrders = useSelector(
    (state) => state.serviceOrder?.allServiceOrderDTO?.items
  );
  console.log(allServiceOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paging = useSelector(
    (state) => state.serviceOrder?.allServiceOrderDTO?.pagination
  );
  console.log(allServiceOrders);
  // const showModalDelete = () => {
  //   setOpenDelete(true);
  // };
  const showModalGardener = () => {
    setOpenGardener(true);
  };
  const showModalInfo = () => {
    setOpenInfo(true);
  };
  const showModalUpdateServiceOrderPrice = () => {
    setOpenUpdateServiceOrderPrice(true);
  };
  const showModalCreateServiceOrderImages = () => {
    setOpenModalCreateServiceOrderImages(true);
  };
  useEffect(() => {
    dispatch(
      allServiceOrder({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, [currentPage]);

  // const handleCancelDelete = () => {
  //   console.log("Clicked cancel button");
  //   setOpenDelete(false);
  // };
  // const handleCancelInfo = () => {
  //   setOpenInfo(false);
  // };
  const handleCancelGardener = () => {
    setOpenGardener(false);
  };

  const handleCancelUpdateServiceOrderPrice = () => {
    setSelectedServiceOrderDetail(undefined);
    setOpenUpdateServiceOrderPrice(false);
  };

  const handleCancelModalCreateServiceOrderImages = () => {
    setOpenModalCreateServiceOrderImages(false);
    setSelectedServiceOrderImages(undefined);
  };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    const index = Number(pagination.current);
    setCurrentPage(index);
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      render: (_, record) => (
        <>
          <p>{record?.customerName}</p>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      render: (_, record) => (
        <>
          <p>{record?.customerPhoneNumber}</p>
        </>
      ),
    },
    {
      title: "Khoảng cách",
      dataIndex: "distance",
      key: "distance",
      render: (_, record) => (
        <>
          <p>
            {(record?.distance / 1000).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            km
          </p>
        </>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (_, record) => (
        <>
          <p>{new Date(record?.startDate).toLocaleDateString()}</p>
        </>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (_, record) => (
        <>
          <p>{new Date(record?.endDate).toLocaleDateString()}</p>
        </>
      ),
    },
    {
      title: "Diện tích sân",
      dataIndex: "gardenSquare",
      key: "gardenSquare",
      render: (_, record) => (
        <>
          <p>
            {record?.gardenSquare.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            m<sup>2</sup>
          </p>
        </>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (_, record) => (
        <>
          <p>{record?.address}</p>
        </>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "temporaryTotalPrice",
      key: "temporaryTotalPrice",
      render: (_, record) => (
        <>
          <p>{formatPrice(record?.totalPrice)}</p>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "serviceOrderStatus",
      key: "serviceOrderStatus",
      render: (_, record) => (
        <Tag
          className={`${
            record?.serviceOrderStatus == 1 ||
            record?.serviceOrderStatus == 2 ||
            record?.serviceOrderStatus == 4 ||
            record?.serviceOrderStatus == 5 ||
            record?.serviceOrderStatus == 6 ||
            record?.serviceOrderStatus == 9 ||
            record?.serviceOrderStatus == 10
              ? "text-[red]"
              : "text-[#3a9943]"
          }`}
        >
          {getStatusText(record?.serviceOrderStatus)}
        </Tag>
      ),
    },
    // {
    //   title: "Tên dịch vụ",
    //   dataIndex: "serviceId",
    //   key: "serviceId",
    //   render: (_, record) => {
    //     if (record.serviceType === 1) {
    //       return <>Dịch vụ chăm cây</>;
    //     } else if (record.serviceType === 2) {
    //       return <>Dịch vụ chăm vườn</>;
    //     }
    //   },
    // },
    {
      title: "Số lượng gardener",
      dataIndex: "numberOfGardener",
      key: "numberOfGardener",
      render: (_, record) => (
        <>
          <p>{record?.serviceOrderGardener?.length} người</p>
        </>
      ),
    },
    userInfo.role == "Staff" ? (
      {
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
        render: (_, record) => (
          <Space size="middle">
            {record.serviceOrderStatus === 3 ? (
              <Tooltip title="Thêm hình ảnh">
                <Button
                  type="text"
                  icon={<PlusSquareOutlined style={{ color: "black" }} />}
                  onClick={() => {
                    setSelectedServiceOrderImages(record?.contractImages);
                    setSelectedServiceOrderDetail(record);
                    showModalCreateServiceOrderImages();
                  }}
                />
              </Tooltip>
            ) : (
              <></>
            )}
          </Space>
        ),
      }
    ) : (
      <></>
    ),
    userInfo.role == "Staff" ? (
      {
        title: "Hành động",
        dataIndex: "hanhdong",
        key: "hanhdong",
        render: (_, record) => (
          <Space size="middle">
            {record.serviceOrderStatus === 1 ? (
              <Tooltip title="Xem thời gian thực hiện và giá cả">
                <Button
                  type="text"
                  icon={<EditOutlined style={{ color: "orange" }} />}
                  onClick={() => {
                    setSelectedServiceOrderDetail(record);
                    showModalUpdateServiceOrderPrice();
                  }}
                />
              </Tooltip>
            ) : (
              <></>
            )}
            {record.serviceOrderStatus === 3 ? (
              <Tooltip title="Thêm người làm vườn">
                <Button
                  type="text"
                  icon={<UsergroupAddOutlined style={{ color: "green" }} />}
                  onClick={() => {
                    setSelectedServiceOrderDetail(record);
                    showModalGardener();
                  }}
                />
              </Tooltip>
            ) : (
              <></>
            )}
            {record.serviceOrderStatus >= 4 ? (
              <Tooltip title="Xem thông tin">
                <Button
                  type="text"
                  icon={<EditOutlined style={{ color: "orange" }} />}
                  onClick={() => {
                    setSelectedDetail(true);
                    setSelectedServiceOrderDetail(record);
                  }}
                />
              </Tooltip>
            ) : (
              <></>
            )}
          </Space>
        ),
      }
    ) : (
      <></>
    ),
  ];

  const props = {
    selectedServiceOrderDetail,
    setSelectedDetail,
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          {selectedDetail ? (
            <ServiceOrderDetail {...props} />
          ) : (
            <>
              <div className="font-semibold mb-6">Đơn hàng dịch vụ</div>
              <div className="bg-[#ffffff] drop-shadow-2xl">
                <div className="mb-12">
                  <Table
                    className="w-[100%]"
                    dataSource={allServiceOrders}
                    columns={columns}
                    scroll={{ x: true }}
                    pagination={paging}
                    onChange={handleTableChange}
                    rowKey={(record) => record.id}
                    loading={{
                      indicator: <Loading loading={loading} />,
                      spinning: loading,
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {/* <Modal
          title="Xóa hợp đồng"
          open={openDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
        >
          <div>Bạn có muốn xóa hợp đồng này không?</div>
        </Modal> */}
        <ModalAddGardener
          show={openGardener}
          setShow={handleCancelGardener}
          serviceOrderDetail={selectedServiceOrderDetail}
        />
        <ModalCreateServiceOrderImages
          show={openModalCreateServiceOrderImages}
          setShow={handleCancelModalCreateServiceOrderImages}
          serviceOrderDetail={selectedServiceOrderDetail}
          serviceOrderImages={selectedServiceOrderImages}
        />
        {/* <ModalContractDetail
          show={openInfo}
          setShow={handleCancelInfo}
          contractDetail={selectedContractDetail}
        /> */}
        {/* <Modal
          title="Thông tin hợp đồng"
          open={openInfo}
          okButtonProps={{ type: "default" }}
          onCancel={handleCancelInfo}
        >
          <div>Thông tin hợp đồng</div>
        </Modal> */}
        <ModalUpateServiceOrderPrice
          show={openUpdateServiceOrderPrice}
          setShow={handleCancelUpdateServiceOrderPrice}
          serviceOrderDetail={selectedServiceOrderDetail}
        />
      </div>
    </>
  );
}

export default ServiceOrder;
