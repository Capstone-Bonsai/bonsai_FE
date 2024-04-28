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

function ServiceOrderDetail(props) {
  const dispatch = useDispatch();
  const [openStatus, setOpenStatus] = useState(false);
  const [confirmLoadingStatus, setConfirmLoadingStatus] = useState(false);
  const serviceOrderId = props.selectedServiceOrderDetail.id;

  const { serviceOrderDetail, listTaskDTO } = useSelector(
    (state) => state.serviceOrder
  );

  console.log(dayjs(serviceOrderDetail.endDate).format("DD/MM/YY"));
  console.log(serviceOrderDetail);

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

  const showModalStatus = () => {
    setOpenStatus(true);
    console.log(openStatus);
  };

  const handleCancelStatus = () => {
    console.log("Clicked cancel button");
    setOpenStatus(false);
  };

  // const getConplaintStatusText = (status) => {
  //   switch (status) {
  //     case 1:
  //       return "Yêu cầu";
  //     case 2:
  //       return "Đang thực hiện";
  //     case 3:
  //       return "Đã hủy";
  //     case 4:
  //       return "Hoàn thành";
  //     default:
  //       return "Trạng thái không xác định";
  //   }
  // };

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
      <div className="font-semibold text-center">Đơn hàng dịch vụ</div>
      <div className="font-semibold mb-6 text-center">{serviceOrderId}</div>
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
                  serviceOrderId={serviceOrderId}
                />
              ),
            },
          ]}
        />
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
