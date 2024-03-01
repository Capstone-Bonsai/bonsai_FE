import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

function CustomModal({ orderId, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#ffffff] bg-opacity-75">
      <div className="bg-[#ffffff] drop-shadow-lg border rounded-lg">
        <button
          onClick={onClose}
          className="opacity-90 text-white w-full flex justify-end pt-2 pr-2"
        >
          <CloseCircleOutlined className="text-black text-[20px] " />
        </button>
        <div className=" p-5 rounded-lg">
          <div className="text-lg">ID đơn hàng: {orderId}</div>
          <div>sdfsdfdf</div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
