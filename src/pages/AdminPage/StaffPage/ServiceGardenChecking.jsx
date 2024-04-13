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
  allServiceGarden,
  serviceGardenByServiceId,
} from "../../../redux/slice/contractSlice";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import ModalServiceGardenCheking from "./ModalServiceGardenCheking";

function ServiceGardenChecking() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userInfo = cookies?.get("user");
  const loading = useSelector(
    (state) => state.contract?.allServiceGardenDTO?.loading
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [selectedServiceGardenDetail, setSelectedServiceGardenDetail] =
    useState("");
  const allServiceGardens = useSelector(
    (state) => state.contract?.allServiceGardenDTO?.contracts?.items
  );
  console.log(allServiceGardens);
  const totalItemsCount = useSelector(
    (state) => state.contract?.allServiceGardenDTO?.contracts?.totalItemsCount
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paging = useSelector((state) => state.contract?.pagination);
  const showModalDelete = () => {
    setOpenDelete(true);
  };
  const showModalInfo = () => {
    setOpenInfo(true);
    // try {
    //   dispatch(serviceGardenByServiceId(serviceId));
    // } catch (error) {
    //   console.log("Lỗi r", error);
    // }
  };

  useEffect(() => {
    dispatch(
      allServiceGarden({
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
    console.log("Clicked cancel button");
    setOpenInfo(false);
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
      case 1:
        return "Chưa chấp nhận";
      case 2:
        return "Hủy";
      case 3:
        return "Đã chấp nhận";
      case 4:
        return "Đã được duyệt";
      case 5:
        return "Từ chối";
      case 6:
        return "Hoàn thành";
      default:
        return "Trạng thái không xác định";
    }
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
          <p>{record?.customerGarden?.customer.applicationUser.fullname}</p>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      render: (_, record) => (
        <>
          <p>{record?.customerGarden?.customer.applicationUser.phoneNumber}</p>
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
            {record?.customerGarden?.square} m<sup>2</sup>
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
          <p>{record?.customerGarden?.address}</p>
        </>
      ),
    },
    {
      title: "Giá tạm tính",
      dataIndex: "temporaryPrice",
      key: "temporaryPrice",
      render: (_, record) => (
        <>
          <p>{formatPrice(record?.temporaryPrice)}</p>
        </>
      ),
    },
    {
      title: "Phụ phí",
      dataIndex: "surchargePrice",
      key: "surchargePrice",
      render: (_, record) => (
        <>
          <p>{formatPrice(record?.temporarySurchargePrice)}</p>
        </>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "temporaryTotalPrice",
      key: "temporaryTotalPrice",
      render: (_, record) => (
        <>
          <p>{formatPrice(record.temporaryTotalPrice)}</p>
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
            record?.serviceGardenStatus == 1 ||
            record?.serviceGardenStatus == 4 ||
            record?.serviceGardenStatus == 5
              ? "text-[red]"
              : "text-[#3a9943]"
          }`}
        >
          {getStatusText(record?.serviceGardenStatus)}
        </div>
      ),
    },

    {
      title: "Số lượng gardener",
      dataIndex: "numberOfGardener",
      key: "numberOfGardener",
      render: (_, record) => (
        <>
          <p>{record?.temporaryGardener} người</p>
        </>
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
                setSelectedServiceGardenDetail(record);
                showModalInfo();
              }}
            >
              Xem thông tin
            </button>
          </Space>
        ),
      }
    ) : (
      <></>
    ),
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold mb-6">Đơn đợi duyệt</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allServiceGardens}
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
        <ModalServiceGardenCheking
          show={openInfo}
          setShow={handleCancelInfo}
          contractDetail={selectedServiceGardenDetail}
        />
      </div>
    </>
  );
}

export default ServiceGardenChecking;
