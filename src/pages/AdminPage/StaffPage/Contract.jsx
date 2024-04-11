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

function Contract() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userInfo = cookies?.get("user");
  const loading = useSelector(
    (state) => state.contract?.listContractDTO?.loading
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [selectedContractDetail, setSelectedContractDetail] = useState();
  const allContracts = useSelector(
    (state) => state.contract?.listContractDTO?.items
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paging = useSelector((state) => state.contract?.pagination);
  const showModalDelete = () => {
    setOpenDelete(true);
  };
  const showModalInfo = () => {
    setOpenInfo(true);
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
          <p>{record.distance}</p>
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
          <p>{record?.gardenSquare} m2</p>
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
      render: (_, record) => <>{record.contractStatus}</>,
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
                setSelectedContractDetail(record);
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
          <div className="font-semibold mb-6">Hợp đồng</div>
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
                  className="w-[300px]"
                  allowClear
                />
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
        <ModalContractDetail
          show={openInfo}
          setShow={handleCancelInfo}
          contractDetail={selectedContractDetail}
        />
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
