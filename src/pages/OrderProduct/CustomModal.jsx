import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";

function CustomModal({ orderId, onClose, orderById }) {
  const orderDetails = orderById?.orderDetails;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#ffffff] bg-opacity-75">
      <div className="bg-[#ffffff] drop-shadow-lg w-[60%] border rounded-lg">
        <button
          onClick={onClose}
          className="opacity-90 text-white w-full flex justify-end pt-2 pr-2"
        >
          <CloseCircleOutlined className="text-black text-[20px] " />
        </button>
        <div className=" p-5 rounded-lg">
          <div className="text-lg">
            Phí vận chuyển:{" "}
            <span className="text-[#3e9943]">{orderById.deliveryPrice} ₫ </span>{" "}
          </div>
          {orderDetails?.map((orderDetail) => (
            <>
              <div
                className="border-y p-5 flex items-center"
                key={orderDetail.id}
              >
                <div className="">
                  <Image
                    src={orderDetail.product?.productImages[0]?.imageUrl}
                    width="80px"
                    height="80px"
                  />
                </div>
                <div className="w-[80%] pl-5">
                  <div className="text-[18px]">{orderDetail.product.name}</div>
                  <div className="opacity-50">
                    {orderDetail.product.treeShape}
                  </div>
                  <div>x{orderDetail.quantity}</div>
                </div>
                <div className="text-[#3e9943]">{orderDetail.unitPrice}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
