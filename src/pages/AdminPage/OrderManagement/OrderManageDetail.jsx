import React, { useState, useEffect, useRef } from "react";
import { Tag, Modal, Form, Select, Button, Tabs } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addGardenerToOrder, getOrderStatus } from "../../../utils/orderApi";
import { fetchAllOrders } from "../../../redux/slice/orderSlice";
import { allGardener } from "../../../redux/slice/gardener";
import Loading from "../../../components/Loading";
import { getOrderStatusText } from "../../../components/status/orderStatus";
import OrderInformation from "./OrderInformation";
import OrderTransaction from "./OrderTransaction";

const OrderManageDetail = (props) => {
  const { show, setShow, order } = props;
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        width={1000}
        
        title="Thông tin đơn hàng"
        open={show}
        maskClosable={false}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Trở lại
          </Button>,
        ]}
      >
        <div className="mt-12">
          <Tabs
            defaultActiveKey="1"
            type="card"
            destroyInactiveTabPane
            items={[
              {
                key: "1",
                label: `Thông tin đơn hàng`,
                children: <OrderInformation order={order} />,
              },
              {
                key: "2",
                label: `Thông tin thanh toán`,
                children: (
                  <OrderTransaction transaction={order?.orderTransaction} />
                ),
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default OrderManageDetail;
