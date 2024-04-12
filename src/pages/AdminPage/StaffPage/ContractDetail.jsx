import React, { useEffect, useState } from "react";
import {
  contractDetailById,
  listTask,
} from "../../../redux/slice/contractSlice";
import { LeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Tag } from "antd";
import Loading from "../../../components/Loading";
import ModalUpdateComplaint from "./ModalUpdateComplaint";

function ContractDetail(props) {
  const dispatch = useDispatch();
  const [selectedComplaint, setSelectedComplaint] = useState();
  const [openUpdateModal, setOpenUpdateModal] = useState();
  const contractId = props.selectedContractDetail.id;

  const { contractDetail, listTaskDTO } = useSelector(
    (state) => state.contract
  );

  console.log(listTaskDTO?.taskOfContracts, listTaskDTO?.loading);
  console.log(contractDetail);
  useEffect(() => {
    dispatch(contractDetailById(contractId));
  }, [contractId]);

  useEffect(() => {
    dispatch(listTask(contractId));
  }, [contractId]);

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCancelUpdate = () => {
    setSelectedComplaint(undefined);
    setOpenUpdateModal(false);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Yêu cầu";
      case 2:
        return "Đang thực hiện";
      case 3:
        return "Đã hủy";
      case 4:
        return "Hoàn thành";
      default:
        return "Trạng thái không xác định";
    }
  };

  const columnsListTaskDTO = [
    {
      title: "Tên nhiệm vụ",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <>
          <p>{record?.name}</p>
        </>
      ),
    },
    {
      title: "Thời gian hoàn thành",
      dataIndex: "completedTime",
      key: "completedTime",
      render: (_, record) => (
        <>
          {record?.completedTime ? (
            <p>{new Date(record?.completedTime).toLocaleDateString()}</p>
          ) : (
            <Tag>Chưa hoàn thành</Tag>
          )}
        </>
      ),
    },
  ];

  const columnsComplaints = [
    {
      title: "Mô tả khiếu nại",
      dataIndex: "detail",
      key: "detail",
      render: (_, record) => (
        <>
          <p>{record?.detail}</p>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "complaintStatus",
      key: "complaintStatus",
      render: (_, record) => (
        <>
          <div
            className={`${
              record?.complaintStatus == 3 ? "text-[red]" : "text-[#3a9943]"
            }`}
          >
            {getStatusText(record?.complaintStatus)}
          </div>
        </>
      ),
    },
    {
      title: "Lý do bị từ chối",
      dataIndex: "cancelReason",
      key: "cancelReason",
      render: (_, record) => (
        <>
          <p>{record?.cancelReason}</p>
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
              setSelectedComplaint(record);
              showUpdateModal();
            }}
          >
            Chỉnh sửa
          </button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <button onClick={() => props.setSelectedDetail(false)}>
        <LeftOutlined className="text-[15px]" /> Quay lại
      </button>
      <div className="font-semibold text-center">Hợp đồng</div>
      <div className="font-semibold mb-6 text-center">{contractId}</div>
      <div className="bg-[#ffffff] drop-shadow-2xl">
        <div className="p-6 ">
          <div className="font-medium">1. Thông tin hợp đồng</div>
          <div className="flex justify-center w-[50%]">
            <div className="p-4 mb-6 w-[60%]">
              <div className="font-medium grid grid-cols-2">
                <div>Tên khách hàng:</div>{" "}
                <div>{contractDetail?.customerName}</div>
              </div>
              <div className="font-medium grid grid-cols-2">
                <div>Số điện thoại:</div>
                <div>{contractDetail?.customerPhoneNumber}</div>
              </div>
              <div className="font-medium grid grid-cols-2">
                <div>Khoảng cách:</div>
                <div>
                  {contractDetail?.distance?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{" "}
                  km
                </div>
              </div>
              <div className="font-medium grid grid-cols-2">
                <div>Ngày bắt đầu:</div>
                <div>
                  {new Date(contractDetail?.startDate).toLocaleDateString()}
                </div>
              </div>
              <div className="font-medium grid grid-cols-2">
                <div>Ngày hết hạn:</div>
                <div>
                  {new Date(contractDetail?.endDate).toLocaleDateString()}
                </div>
              </div>
              <div className="font-medium grid grid-cols-2">
                <div>Diện tích sân vườn:</div>
                <div>{contractDetail?.gardenSquare} m2</div>
              </div>
              <div className="font-medium grid grid-cols-2">
                <div>Số lượng người làm vườn:</div>
                <div>{contractDetail?.numberOfGardener} người</div>
              </div>
              <div className="font-medium grid grid-cols-2">
                <div>Giá tiêu chuẩn:</div>
                <div>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                  }).format(contractDetail?.standardPrice)}
                </div>
              </div>
              <div className="font-medium grid grid-cols-2">
                <div>Phụ phí:</div>
                <div>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                  }).format(contractDetail?.surchargePrice)}
                </div>
              </div>
              <div className="font-medium grid grid-cols-2">
                <div>Tổng chi phí:</div>
                <div>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                  }).format(contractDetail?.totalPrice)}
                </div>
              </div>
            </div>
          </div>

          <div className="font-medium">2. Tiến độ công việc</div>
          <div className="p-4 mb-6">
            <Table
              dataSource={listTaskDTO?.taskOfContracts}
              columns={columnsListTaskDTO}
              scroll={{ x: true }}
              rowKey={(record) => record.id}
              loading={{
                indicator: <Loading loading={listTaskDTO?.loading} />,
                spinning: listTaskDTO?.loading,
              }}
              pagination={false}
            />
          </div>
          <div className="font-medium">3. Khiếu nại</div>
          <div className="p-4 mb-6">
            <Table
              dataSource={contractDetail?.complaints}
              columns={columnsComplaints}
              scroll={{ x: true }}
              rowKey={(record) => record.id}
              loading={{
                indicator: <Loading loading={contractDetail?.loading} />,
                spinning: contractDetail?.loading,
              }}
              pagination={false}
            />
          </div>
        </div>
      </div>
      <ModalUpdateComplaint
        show={openUpdateModal}
        setShow={handleCancelUpdate}
        complaint={selectedComplaint}
      />
    </>
  );
}

export default ContractDetail;
