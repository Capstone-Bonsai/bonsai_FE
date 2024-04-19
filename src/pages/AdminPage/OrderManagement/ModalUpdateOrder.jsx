import React, { useState, useEffect, useRef } from "react";
import { Tag, Modal, Form, Select, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getOrderStatus, putOrder } from "../../../utils/orderApi";
import { fetchAllOrders } from "../../../redux/slice/orderSlice";

const ModalUpdateOrder = (props) => {
  const { show, setShow, order } = props;
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const [confirmLoadingUpdateStatus, setConfirmLoadingUpdateStatus] =
    useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [listOrderStatus, setListOrderStatus] = useState();

  useEffect(() => {
    fetchListOrderStatus();
  }, []);

  const updateOrder = (data) => {
    try {
      console.log(data);
      putOrder(order.id, getStatusNumber(order.orderStatus))
        .then((data) => {
          toast.success(data.data);
          dispatch(fetchAllOrders({ pageIndex: 0, pageSize: 10 }));
        })
        .catch((err) => {
          toast.error(err.response.data);
        })
        .finally(() => {
          setConfirmLoadingUpdateStatus(false);
          handleCancelUpdateStatus();
        });
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const fetchListOrderStatus = () => {
    getOrderStatus()
      .then((data) => {
        setListOrderStatus(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.value
        ) {
          toast.error(err.response.data.value);
        } else {
          toast.error("Đã xảy ra lỗi!");
        }
      });
  };

  const onSubmit = (i) => {
    setConfirmLoadingUpdateStatus(true);
    updateOrder();
  };

  const getStatusNumber = (status) => {
    switch (status) {
      case "Waiting":
        return 1;
      case "Paid":
        return 2;
      case "Preparing":
        return 3;
      case "Delivering":
        return 4;
      case "Delivered":
        return 5;
      case "Failed":
        return 6;
      case "DeliveryFailed":
        return 7;
      default:
        return 0;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Waiting":
        return "Đang chờ";
      case "Paid":
        return "Đã thanh toán";
      case "Preparing":
        return "Đang thực hiện";
      case "Delivering":
        return "Đang giao";
      case "Failed":
        return "Thất bại";
      case "DeliveryFailed ":
        return "Giao hàng thất bại";
      case "Delivered":
        return "Đã giao";
      default:
        return "Trạng thái không xác định";
    }
  };

  const showModalUpdateStatus = () => {
    setOpenUpdateStatus(true);
  };

  const handleCancelUpdateStatus = () => {
    console.log("Clicked cancel button");
    setOpenUpdateStatus(false);
  };

  return (
    <>
      <Modal
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
        <div className="">
          <Form
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
          >
            <Form.Item label="Khách hàng">
              <p>{order?.customer?.applicationUser?.email}</p>
            </Form.Item>
            <Form.Item label="Tên bonsai">
              <p>{order?.orderDetails[0]?.bonsai?.name}</p>
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <p>{order?.address}</p>
            </Form.Item>
            <Form.Item label="Ngày đặt">
              <p>{new Date(order?.orderDate).toLocaleDateString()}</p>
            </Form.Item>
            {/* <Form.Item label="Ngày giao">
              <p>
                {new Date(order?.expectedDeliveryDate).toLocaleDateString()}
              </p>
            </Form.Item> */}
            <Form.Item label="Giá hàng">
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(order?.price)}
              </p>
            </Form.Item>
            <Form.Item label="Phí giao hàng">
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(order?.deliveryPrice)}
              </p>
            </Form.Item>
            <Form.Item label="Tổng cộng">
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(order?.totalPrice)}
              </p>
            </Form.Item>
            <Form.Item label="Trạng thái đơn hàng:" name="orderStatus">
              {/* <div className="grid grid-cols-2">
                <p></p>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px- w-[100px]"
                  onClick={showModalUpdateStatus}
                >
                  Cập nhật
                </button>
              </div> */}
              <div className="flex items-center gap-2">
                <Tag>{getStatusText(order?.orderStatus)}</Tag>
                <div className="flex items-center">
                  <Button className="bg-none" onClick={showModalUpdateStatus}>
                    <EditOutlined /> Cập nhật
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="Cập nhật trạng thái"
        open={openUpdateStatus}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoadingUpdateStatus}
        onCancel={handleCancelUpdateStatus}
      >
        <div>Bạn có muốn cập nhật trạng thái của đơn hàng này không?</div>
      </Modal>
    </>
  );
};

export default ModalUpdateOrder;
