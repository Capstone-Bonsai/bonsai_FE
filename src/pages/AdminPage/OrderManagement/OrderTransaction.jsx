import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Form, Upload, Tag } from "antd";
const { TextArea } = Input;

const OrderTransaction = ({ transaction }) => {
  return (
    <>
      <Form
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
      >
        <div className="grid grid-cols-3 gap-4 m-4">
          <div className="flex justify-end">Thông tin thanh toán: </div>
          <div className="flex justify-start col-span-2">
            {transaction?.information}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 m-4">
          <div className="flex justify-end">Tổng giá trị: </div>
          <div className="flex justify-start col-span-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(transaction?.amount)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 m-4">
          <div className="flex justify-end">Partner Code: </div>
          <div className="flex justify-start col-span-2">
            {transaction?.partnerCode}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 m-4">
          <div className="flex justify-end">Phương thức thanh toán: </div>
          <div className="flex justify-start col-span-2">
            {transaction?.paymentMethod}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 m-4">
          <div className="flex justify-end">Trạng thái: </div>
          <div className="flex justify-start col-span-2">
            <Tag color={transaction?.transactionStatus === 1 ? "green" : "red"}>
              {transaction?.transactionStatus === 1 ? "Thành công" : "Thất bại"}
            </Tag>
          </div>
        </div>
      </Form>
    </>
  );
};

export default OrderTransaction;
