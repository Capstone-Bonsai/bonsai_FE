import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { DatePicker, Modal, Space } from "antd";
import { useLocation } from "react-router-dom";
import "./modalServiceRegister.css";
const { RangePicker } = DatePicker;
function StepThree(propsStepThree) {
  const { serviceIdSelected, selectedGardenId, setStepList } = propsStepThree;
  const handleBackStep = () => {
    setStepList(2);
  };
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
  const [errorDateRange, setErrorDateRange] = useState("");
  const handleDateChange = (dates, dateStrings) => {
    console.log("Formatted Selected Range: ", dateStrings);
    setDateRange(dateStrings);
  };
  const disabledStartDate = (current) => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);
    return current && current < nextWeek.setHours(0, 0, 0, 0);
  };
  const handleServiceOrder = () => {
    let isValid = true;
    if (dateRange.length < 2) {
      setErrorDateRange("Vui lòng chọn ngày phù hợp!!");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    const payload = {
      serviceId: serviceIdSelected,
      startDate: dateRange[0],
      endDate: dateRange[1],
    };
    if (typeEnum == 1) {
      payload.customerBonsaiId = "";
    }
    if (typeEnum == 2) {
      payload.customerGardenId = "";
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
      <div className="w-full bg-[#00B214]">
        <div className="text-center font-bold text-[20px]">Đăng ký dịch vụ</div>
        <div>
          <RangePicker
            className="border border-black"
            onChange={handleDateChange}
            allowClear={false}
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            disabledDate={disabledStartDate}
          />
        </div>
        <button
          className="bg-gray-300 p-2 rounded-[10px] hover:text-[#fff] hover:bg-[#3a9943]"
          onClick={showModal}
        >
          Đăng ký
        </button>
      </div>
      <Modal
        title="Bạn có chắc muốn đăng ký dịch vụ này không?"
        className="modal_text"
        open={isModalOpen}
        onOk={handleOk}
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
