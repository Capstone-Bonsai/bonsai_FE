import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { DatePicker, Modal, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./modalServiceRegister.css";
import { serviceOrder } from "../../../redux/slice/serviceOrderSlice";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;
function StepThree(propsStepThree) {
  const {
    serviceIdSelected,
    selectedGardenId,
    setStepList,
    gardenDetail,
    servicePackageDetail,
  } = propsStepThree;
  const handleBackStep = () => {
    setStepList(2);
  };
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const location = useLocation();
  const typeEnum = new URLSearchParams(location.search).get("typeEnum");
  const [dateRange, setDateRange] = useState([]);
  console.log(dateRange);
  const [errorDateRange, setErrorDateRange] = useState("");
  const handleDateChange = (dates, dateStrings) => {
    console.log("Formatted Selected Range: ", dateStrings);
    setDateRange(dateStrings);
    setErrorDateRange("");
  };
  const disabledStartDate = (current) => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);
    return current && current < nextWeek.setHours(0, 0, 0, 0);
  };
  const dateVilidate = () => {
    if (dateRange?.length < 2) {
      setErrorDateRange("Vui lòng chọn ngày phù hợp!!");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
  };
  const handleServiceOrder = async () => {
    // let isValid = true;
    // if (dateRange.length < 2) {
    //   setErrorDateRange("Vui lòng chọn ngày phù hợp!!");
    //   isValid = false;
    // }
    // if (!isValid) {
    //   return;
    // }
    const payload = {
      serviceId: serviceIdSelected,
      startDate: dateRange[0],
      endDate: dateRange[1],
    };
    if (typeEnum == 1) {
      payload.customerBonsaiId = "";
    }
    if (typeEnum == 2) {
      payload.customerGardenId = selectedGardenId;
    }
    try {
      const res = await serviceOrder(payload);
      setIsModalOpen(false);
      toast.success("Gửi đơn thành công");
      navigate("/ManageContractUser");
      console.log(res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <button
          onClick={() => handleBackStep()}
          className="hover:bg-[#3a9943] hover:text-[#fff] w-[30px] h-[30px] rounded-full"
        >
          <ArrowLeftOutlined />
        </button>
      </div>
      <div className="w-full">
        <div className="text-center font-bold text-[20px]">Đăng ký dịch vụ</div>
        <div className="border flex p-5 gap-3">
          <div className="w-[300px] h-[200px]">
            <img
              className="w-full h-full object-cover rounded-[8px]"
              src={
                gardenDetail?.customerGardenImages?.length > 0
                  ? gardenDetail?.customerGardenImages[0]?.image
                  : ""
              }
              alt=""
            />
          </div>
          <div>
            <div className="font-bold text-[25px]">
              {gardenDetail?.customer?.applicationUser?.fullname}
            </div>
            <div>
              <span className="text-[20px]">Địa chỉ:</span>{" "}
              {gardenDetail?.address}
            </div>
            <div>
              Diện tích: {gardenDetail?.square}m<sup>2</sup>
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-5 border">
          <div className="w-[300px] h-[200px]">
            <img
              className="w-full h-full object-cover rounded-[8px]"
              src={
                servicePackageDetail?.image ? servicePackageDetail?.image : ""
              }
              alt=""
            />
          </div>
          <div>
            <div>
              <span className="text-[20px] font-bold">Loại dịch vụ: </span>{" "}
              {servicePackageDetail?.name}
            </div>
            <div className="text-[20px]">Nhiệm vụ:</div>
            <div>
              {servicePackageDetail?.serviceBaseTasks?.length > 0
                ? servicePackageDetail?.serviceBaseTasks?.map((task) => (
                    <div key={task.id}>_ {task?.baseTask?.name}</div>
                  ))
                : ""}{" "}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between my-2">
          <div className="">
            <RangePicker
              size="large"
              className={`border ${
                errorDateRange != "" ? "border-[red]" : "border-black"
              }`}
              onChange={handleDateChange}
              allowClear={false}
              placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              disabledDate={disabledStartDate}
            />
            {errorDateRange != "" ? (
              <div className="text-[red]">{errorDateRange}</div>
            ) : (
              ""
            )}
          </div>
          <button
            className="bg-gray-300 p-2 rounded-[10px] hover:text-[#fff] hover:bg-[#3a9943]"
            onClick={dateRange?.length > 1 ? showModal : dateVilidate}
          >
            Đăng ký
          </button>
        </div>
      </div>
      <Modal
        title="Bạn có chắc muốn đăng ký dịch vụ này không?"
        className="modal_text"
        open={isModalOpen}
        onOk={handleServiceOrder}
        cancelText="Hủy bỏ"
        okText="Đồng ý"
        onCancel={handleCancel}
      >
        <div>{serviceIdSelected}</div>
      </Modal>
    </div>
  );
}

export default StepThree;
