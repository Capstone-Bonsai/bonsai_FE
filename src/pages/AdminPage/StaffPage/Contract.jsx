import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Space, Tag, Table, Input, Modal, Badge } from "antd";
const { Search } = Input;

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { allContract } from "../../../redux/slice/contractSlice";

function Contract() {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.contract?.allContractDTO?.loading
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState();

  const allContracts = useSelector(
    (state) => state.contract?.allContractDTO?.contracts?.items
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paging = useSelector((state) => state.contract?.pagination);

  useEffect(() => {
    dispatch(
      allContract({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, []);

  const handleDelete = () => {
    setConfirmLoadingDelete(true);
    deleteContract(selectedContract)
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
    const index = Number(pagination.current) - 1;
    dispatch(
      allContract({
        pageIndex: index,
        pageSize: pageSize,
      })
    );
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
      title: "Giá tiêu chuẩn",
      dataIndex: "standardPrice",
      key: "standardPrice",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record?.standardPrice)}
          </p>
        </>
      ),
    },
    {
      title: "SurchargePrice là gì :v",
      dataIndex: "surchargePrice",
      key: "surchargePrice",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record?.surchargePrice)}
          </p>
        </>
      ),
    },
    {
      title: "Phí dịch vụ",
      dataIndex: "servicePrice",
      key: "servicePrice",
      render: (_, record) => (
        <>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(record?.servicePrice)}
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
      title: "Trạng thái",
      dataIndex: "contractStatus",
      key: "contractStatus",
      render: (_, record) => (
        <>
          <Tag
            color={getColor(record.contractStatus).color}
            icon={getColor(record.contractStatus).icon}
          >
            {record.contractStatus}
          </Tag>
        </>
      ),
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (_, record) => (
        <>
          <Tag>{record?.serviceType}</Tag>
        </>
      ),
    },{
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
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              setSelectedContract(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </button>
          {/* <button
            onClick={() => {
              setSelectedUpdateOrder(record);
              showUpdateModal();
            }}
          >
            Chỉnh sửa
          </button> */}
        </Space>
      ),
    },
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
        </div>
        <Modal
          title="Xóa hợp đồng"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
        >
          <div>Bạn có muốn xóa hợp đồng này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default Contract;
