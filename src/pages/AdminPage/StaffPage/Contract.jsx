import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Space, Tag, Table, Input, Modal, Badge } from "antd";
const { Search } = Input;
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import {
  listAllContract,
  serviceGardenByServiceId,
} from "../../../redux/slice/contractSlice";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import ModalContractDetail from "./ModalContractDetail";
import ModalAddGardener from "./ModalAddGardener";
import ContractDetail from "./ContractDetail";
import ModalCreateContractImages from "./ModalCreateContractImages";

function Contract() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userInfo = cookies?.get("user");
  const loading = useSelector(
    (state) => state.contract?.listContractDTO?.loading
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openGardener, setOpenGardener] = useState(false);
  const [openModalCreateContractImages, setOpenModalCreateContractImages] =
    useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [selectedContractDetail, setSelectedContractDetail] = useState();
  const [selectedDetail, setSelectedDetail] = useState(false);
  const [selectedContractImages, setSelectedContractImages] = useState();
  const allContracts = useSelector(
    (state) => state.contract?.listContractDTO?.items
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paging = useSelector((state) => state.contract?.pagination);
  const showModalDelete = () => {
    setOpenDelete(true);
  };
  const showModalGardener = () => {
    setOpenGardener(true);
  };
  const showModalInfo = () => {
    setOpenInfo(true);
  };
  const showModalCreateContractImages = () => {
    setOpenModalCreateContractImages(true);
  };
  const totalItemsCount = useSelector(
    (state) => state.contract?.listContractDTO?.totalItemsCount
  );
  useEffect(() => {
    dispatch(
      listAllContract({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, [currentPage]);

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };
  const handleCancelInfo = () => {
    setOpenInfo(false);
  };
  const handleCancelGardener = () => {
    setOpenGardener(false);
  };

  const handleCancelModalCreateContractImages = () => {
    setOpenModalCreateContractImages(false);
  };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    const index = Number(pagination.current);
    setCurrentPage(index);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Đang chờ";
      case 2:
        return "Đã thanh toán";
      case 3:
        return "Đang thực hiện";
      case 4:
        return "Thất bại";
      case 5:
        return "Đã hủy";
      case 6:
        return "Hoàn thành";
      case 7:
        return "Phản hồi";
      default:
        return "Trạng thái không xác định";
    }
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
            {record?.distance?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            m
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
      title: "Giá dịch vụ",
      dataIndex: "temporaryPrice",
      key: "temporaryPrice",
      render: (_, record) => (
        <>
          <p>{formatPrice(record?.standardPrice)}</p>
        </>
      ),
    },
    {
      title: "Phụ phí",
      dataIndex: "surchargePrice",
      key: "surchargePrice",
      render: (_, record) => (
        <>
          <p>{formatPrice(record?.surchargePrice)}</p>
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
      dataIndex: "contractStatus",
      key: "contractStatus",
      render: (_, record) => (
        <div
          className={`${
            record?.contractStatus == 1 ||
            record?.contractStatus == 4 ||
            record?.contractStatus == 5
              ? "text-[red]"
              : "text-[#3a9943]"
          }`}
        >
          {getStatusText(record?.contractStatus)}
        </div>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "enoughGardener",
      key: "enoughGardener",
      render: (_, record) => (
        <>
          {record.numberOfGardener == record.contractGardeners.length
            ? "Đủ người"
            : "Thiếu người"}
        </>
      ),
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (_, record) => {
        if (record.serviceType === 1) {
          return <>Dịch vụ chăm vườn</>;
        } else if (record.serviceType === 2) {
          return <>Dịch vụ chăm cây</>;
        }
      },
    },
    {
      title: "Số lượng gardener",
      dataIndex: "numberOfGardener",
      key: "numberOfGardener",
      render: (_, record) => (
        <>
          <p>{record?.numberOfGardener} người</p>
        </>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="outline-none"
            onClick={() => {
              console.log(record);
              setSelectedContractImages(record?.contractImages);
              setSelectedContractDetail(record);
              showModalCreateContractImages();
            }}
          >
            Thêm hình ảnh
          </button>
        </Space>
      ),
    },
    userInfo.role == "Staff" ? (
      {
        title: "Hành động",
        dataIndex: "hanhdong",
        key: "hanhdong",
        render: (_, record) => (
          <Space size="middle">
            <button
              className="outline-none"
              onClick={() => {
                showModalDelete();
              }}
            >
              Xóa
            </button>
            <button
              className="outline-none"
              onClick={() => {
                setSelectedDetail(true), setSelectedContractDetail(record);
              }}
            >
              Xem thông tin
            </button>
            <button
              className="outline-none"
              onClick={() => {
                setSelectedContractDetail(record);
                showModalGardener();
              }}
            >
              Thêm người làm vườn
            </button>
          </Space>
        ),
      }
    ) : (
      <></>
    ),
  ];

  const props = {
    selectedContractDetail,
    setSelectedDetail,
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          {selectedDetail ? (
            <ContractDetail {...props} />
          ) : (
            <>
              <div className="font-semibold mb-6">Hợp đồng</div>
              <div className="bg-[#ffffff] drop-shadow-2xl">
                <div className="flex justify-between p-6">
                  <div></div>
                  <div className="pr-0">
                    {/* <Search
                      placeholder="input search text"
                      className="w-[300px]"
                      allowClear
                    /> */}
                  </div>
                </div>
                <div className="mb-12">
                  <Table
                    className="w-[100%]"
                    dataSource={allContracts}
                    columns={columns}
                    scroll={{ x: true }}
                    pagination={{
                      total: totalItemsCount,
                      pageSize: pageSize,
                      current: currentPage,
                    }}
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
        <Modal
          title="Xóa hợp đồng"
          open={openDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
        >
          <div>Bạn có muốn xóa hợp đồng này không?</div>
        </Modal>
        <ModalAddGardener
          show={openGardener}
          setShow={handleCancelGardener}
          contractDetail={selectedContractDetail}
        />
        <ModalCreateContractImages
          show={openModalCreateContractImages}
          setShow={handleCancelModalCreateContractImages}
          contractDetail={selectedContractDetail}
          contractImages={selectedContractImages}
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
      </div>
    </>
  );
}

export default Contract;
