import React, { useEffect, useState } from "react";
import { LeftOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Modal, Space, Table, Tag } from "antd";
import Loading from "../../../components/Loading";
import ModalUpdateComplaint from "./ModalUpdateComplaint";
import { toast } from "react-toastify";
import { getStatusText } from "../../../components/status/contractStatus";
import {
  listTask,
  serviceOrderById,
} from "../../../redux/slice/serviceOrderSlice";
import { putServiceOrderStatus } from "../../../utils/serviceOrderApi";
import dayjs from "dayjs";

function ServiceOrderDetail(props) {
  const dispatch = useDispatch();
  const [selectedComplaint, setSelectedComplaint] = useState();
  const [openUpdateModal, setOpenUpdateModal] = useState();
  const [openStatus, setOpenStatus] = useState(false);
  const [confirmLoadingStatus, setConfirmLoadingStatus] = useState(false);
  const serviceOrderId = props.selectedServiceOrderDetail.id;

  const { serviceOrderDetail, listTaskDTO } = useSelector(
    (state) => state.serviceOrder
  );

  console.log(dayjs(serviceOrderDetail.endDate).format("DD/MM/YY"));
  console.log(listTaskDTO);

  const [isTodayEndDatePlusFourDays, setIsTodayEndDatePlusFourDays] =
    useState(false);

  useEffect(() => {
    if (
      props.selectedServiceOrderDetail &&
      props.selectedServiceOrderDetail.endDate
    ) {
      // Sử dụng dayjs để tính toán ngày cách endDate 4 ngày
      const endDate = dayjs(serviceOrderDetail.endDate);

      const endDatePlusFour = endDate.add(4, "day");

      // Lấy ngày hôm nay
      const today = dayjs().format("YYYY-MM-DD");

      // So sánh với endDatePlusFourDays
      setIsTodayEndDatePlusFourDays(
        today === endDatePlusFour.format("YYYY-MM-DD")
      );
    }
  }, [props.selectedServiceOrderDetail]);

  useEffect(() => {
    dispatch(serviceOrderById(serviceOrderId));
  }, [serviceOrderId]);

  useEffect(() => {
    dispatch(listTask(serviceOrderId));
  }, [serviceOrderId]);

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const showModalStatus = () => {
    setOpenStatus(true);
    console.log(openStatus);
  };

  const handleCancelUpdate = () => {
    setSelectedComplaint(undefined);
    setOpenUpdateModal(false);
  };

  const handleCancelStatus = () => {
    console.log("Clicked cancel button");
    setOpenStatus(false);
  };

  const getConplaintStatusText = (status) => {
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
            {getConplaintStatusText(record?.complaintStatus)}
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
        <>
          {record?.complaintStatus === 1 || record?.complaintStatus === 2 ? (
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
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  const handleUpdateStatus = () => {
    setConfirmLoadingStatus(true);
    putServiceOrderStatus(serviceOrderId)
      .then((data) => {
        toast.success("Cập nhật thành công!");
        dispatch(serviceOrderById(serviceOrderId));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.statusText);
      })
      .finally(() => {
        setOpenStatus(false);
        setConfirmLoadingStatus(false);
      });
  };
  return (
    <>
      <button onClick={() => props.setSelectedDetail(false)}>
        <LeftOutlined className="text-[15px]" /> Quay lại
      </button>
      <div className="font-semibold text-center">Hợp đồng</div>
      <div className="font-semibold mb-6 text-center">{serviceOrderId}</div>
      <div className="bg-[#ffffff] drop-shadow-2xl">
        {serviceOrderDetail?.loading === true ? (
          <Loading loading={serviceOrderDetail?.loading} />
        ) : (
          <div className="p-6 ">
            <div className="font-bold">1. Thông tin hợp đồng</div>
            <div className="flex justify-center w-[100%]">
              <div className="p-4 mb-6 w-[100%]">
                <div className="font-medium">- Thông tin khách hàng:</div>
                <div className="grid grid-cols-2 w-[100%] p-6">
                  <div>
                    <div className="font-medium grid grid-cols-2">
                      <div>Tên khách hàng:</div>{" "}
                      <div>{serviceOrderDetail?.customerName}</div>
                    </div>
                    <div className="font-medium grid grid-cols-2">
                      <div>Số điện thoại:</div>
                      <div>{serviceOrderDetail?.customerPhoneNumber}</div>
                    </div>
                    <div className="font-medium grid grid-cols-2">
                      <div>Trạng thái:</div>{" "}
                      <div
                        className={`${
                          serviceOrderDetail?.serviceOrderStatus == 1 ||
                          serviceOrderDetail?.serviceOrderStatus == 4 ||
                          serviceOrderDetail?.serviceOrderStatus == 5
                            ? "text-[red]"
                            : "text-[#3a9943]"
                        }`}
                      >
                        {getStatusText(serviceOrderDetail?.serviceOrderStatus)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium grid grid-cols-2">
                      <div>Tổng chi phí:</div>
                      <div>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "VND",
                        }).format(serviceOrderDetail?.totalPrice)}
                      </div>
                    </div>
                    <div className="font-medium grid grid-cols-2">
                      <div>Ngày bắt đầu:</div>
                      <div>
                        {new Date(
                          serviceOrderDetail?.startDate
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="font-medium grid grid-cols-2">
                      <div>Ngày hết hạn:</div>
                      <div>
                        {new Date(
                          serviceOrderDetail?.endDate
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <Divider type="vertical" />
                <div className="font-medium">- Thông tin dịch vụ:</div>
                <div className=" w-[100%] py-6 px-12">
                  <div className="font-medium grid grid-cols-3 m-4">
                    <div>Loại dịch vụ:</div>
                    <div className="col-span-2">
                      <Tag
                        color={
                          serviceOrderDetail?.service?.serviceType?.typeEnum ===
                          2
                            ? "green"
                            : "blue"
                        }
                      >
                        {serviceOrderDetail?.service?.serviceType?.typeName}
                      </Tag>
                    </div>
                  </div>
                  <div className="font-medium grid grid-cols-3 m-4">
                    <div>Mô tả:</div>
                    <div className="col-span-2">
                      {serviceOrderDetail?.service?.serviceType?.description}
                    </div>
                  </div>
                </div>
                <div className="font-medium">- Thông tin sân vườn/bonsai:</div>
                <div className=" w-[100%] py-6 px-12">
                  {serviceOrderDetail?.service?.serviceType?.typeEnum === 2 ? (
                    <>
                      <div className="font-medium grid grid-cols-3 m-4">
                        <div>Địa chỉ sân vườn:</div>
                        <div className="col-span-2">
                          {serviceOrderDetail?.customerGarden?.address}
                        </div>
                      </div>
                      <div className="font-medium grid grid-cols-3 m-4">
                        <div>Khoảng cách</div>
                        <div className="col-span-2">
                          {(serviceOrderDetail?.distance / 1000).toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 2,
                            }
                          )}{" "}
                          km
                        </div>
                      </div>
                      <div className="font-medium grid grid-cols-3 m-4">
                        <div>Diện tích sân vườn:</div>
                        <div className="col-span-2">
                          {serviceOrderDetail?.customerGarden?.square} m
                          <sup>2</sup>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="font-medium grid grid-cols-3 m-4">
                      <div>Bonsai của khách hàng:</div>
                      <div>
                        <Tag
                          color={
                            serviceOrderDetail?.service?.serviceType
                              ?.typeEnum === 2
                              ? "red"
                              : "blue"
                          }
                        >
                          {serviceOrderDetail?.service?.serviceType?.typeName}
                        </Tag>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="font-medium">2. Tiến độ công việc</div>
            <div className="p-4 mb-6">
              <Table
                dataSource={listTaskDTO?.taskOfServiceOrders}
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
                dataSource={serviceOrderDetail?.complaints}
                columns={columnsComplaints}
                scroll={{ x: true }}
                rowKey={(record) => record.id}
                loading={{
                  indicator: <Loading loading={serviceOrderDetail?.loading} />,
                  spinning: serviceOrderDetail?.loading,
                }}
                pagination={false}
              />
            </div>
          </div>
        )}
        {(serviceOrderDetail?.serviceOrderStatus === 7 ||
          serviceOrderDetail?.serviceOrderStatus === 11) &&
        isTodayEndDatePlusFourDays === false ? (
          <div className="p-8 flex justify-end">
            <button
              className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
              onClick={showModalStatus}
            >
              <FileDoneOutlined /> Hoàn thành hợp đồng
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <ModalUpdateComplaint
        show={openUpdateModal}
        setShow={handleCancelUpdate}
        complaint={selectedComplaint}
        serviceOrderId={serviceOrderId}
      />
      <Modal
        title="Cập nhật trạng thái hợp đồng"
        open={openStatus}
        onOk={handleUpdateStatus}
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoadingStatus}
        onCancel={handleCancelStatus}
      >
        <div>Bạn có muốn cập nhật trạng thái hợp đồng này không?</div>
      </Modal>
    </>
  );
}

export default ServiceOrderDetail;
