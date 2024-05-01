import React, { useEffect, useState } from "react";
import { LeftOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Modal, Space, Table, Tabs, Tag } from "antd";
import Loading from "../../../../components/Loading";
import ModalUpdateComplaint from "../ModalUpdateComplaint";
import { toast } from "react-toastify";
import { getStatusText } from "../../../../components/status/contractStatus";
import {
  listTask,
  serviceOrderById,
} from "../../../../redux/slice/serviceOrderSlice";
import { putServiceOrderStatus } from "../../../../utils/serviceOrderApi";
import dayjs from "dayjs";
import { getComplaintStatusText } from "../../../../components/status/complaintStatus";
import TabServiceOrderInformation from "./TabServiceOrderInformation";
import TabTaskInformation from "./TabTaskInformation";
import TabComplaintManagement from "./TabComplaintManagement";
import TabTransactionInfomation from "./TabTransactionInfomation";

function ServiceOrderDetail(props) {
  const dispatch = useDispatch();
  const [openStatus, setOpenStatus] = useState(false);
  const [confirmLoadingStatus, setConfirmLoadingStatus] = useState(false);
  const [isTrueDate, setIsTrueDate] = useState(false);

  const { serviceOrderDetail, listTaskDTO } = useSelector(
    (state) => state.serviceOrder
  );
  console.log(serviceOrderDetail);

  console.log(isTrueDate);

  useEffect(() => {
    dispatch(serviceOrderById(props.selectedServiceOrderDetail?.id));
  }, [props.selectedServiceOrderDetail?.id, dispatch]);

  useEffect(() => {
    dispatch(listTask(props.selectedServiceOrderDetail?.id));
  }, [props.selectedServiceOrderDetail?.id, dispatch]);

  useEffect(() => {
    const endDate = dayjs(serviceOrderDetail.endDate);
    const endDatePlusFour = endDate.add(3, "day");
    const today = dayjs();
    setIsTrueDate(today.isAfter(endDatePlusFour));
  }, [serviceOrderDetail]);

  const showModalStatus = () => {
    setOpenStatus(true);
    console.log(openStatus);
  };

  const handleCancelStatus = () => {
    setOpenStatus(false);
  };

  const handleCancel = () => {
    console.log;
    setIsTrueDate(false);
    props.setSelectedDetail(false);
    props.setSelectedServiceOrderDetail(undefined);
  };

  const handleUpdateStatus = () => {
    setConfirmLoadingStatus(true);
    putServiceOrderStatus(props.selectedServiceOrderDetail.id)
      .then((data) => {
        toast.success("Cập nhật thành công!");
        dispatch(serviceOrderById(props.selectedServiceOrderDetail.id));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      })
      .finally(() => {
        setOpenStatus(false);
        setConfirmLoadingStatus(false);
      });
  };
  return (
    <>
      <button onClick={handleCancel}>
        <LeftOutlined className="text-[15px]" /> Quay lại
      </button>
      {(serviceOrderDetail?.serviceOrderStatus === 7 ||
        serviceOrderDetail?.serviceOrderStatus === 11) &&
      isTrueDate == true ? (
        <div className="flex justify-end">
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
      <div className="font-semibold text-center text-lg">Đơn hàng dịch vụ</div>
      <div>
        <Tabs
          defaultActiveKey="1"
          type="card"
          destroyInactiveTabPane
          items={[
            {
              key: "1",
              label: `Đơn đặt hàng dịch vụ`,
              children: (
                <TabServiceOrderInformation
                  serviceOrderDetail={serviceOrderDetail}
                />
              ),
            },
            {
              key: "2",
              label: `Tiến độ công việc`,
              children: (
                <TabTaskInformation
                  serviceOrderDetail={serviceOrderDetail}
                  listTaskDTO={listTaskDTO}
                />
              ),
            },
            {
              key: "3",
              label: `Quản lý khiếu nại`,
              children: (
                <TabComplaintManagement
                  serviceOrderDetail={serviceOrderDetail}
                  serviceOrderId={props.selectedServiceOrderDetail.id}
                />
              ),
            },
            {
              key: "4",
              label: `Quản lý giao dịch`,
              children: (
                <TabTransactionInfomation
                  serviceOrderDetail={serviceOrderDetail}
                />
              ),
            },
          ]}
        />
      </div>

      <Modal
        title="Cập nhật trạng thái hợp đồng"
        open={openStatus}
        onOk={handleUpdateStatus}
        okButtonProps={{ type: "default" }}
        cancelText="Hủy"
        okText={confirmLoadingStatus ? "Đang cập nhật" : "Cập nhật"}
        confirmLoading={confirmLoadingStatus}
        onCancel={handleCancelStatus}
      >
        <div>Bạn có muốn cập nhật trạng thái hợp đồng này không?</div>
      </Modal>
    </>
  );
}

export default ServiceOrderDetail;
