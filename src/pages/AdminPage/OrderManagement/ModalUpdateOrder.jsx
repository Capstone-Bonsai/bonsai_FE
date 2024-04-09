import React, { useState, useEffect, useRef } from "react";
import {
  PlusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Tag, Input, Modal, Form, InputNumber, Select, Upload } from "antd";
const { Search, TextArea } = Input;
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getOrderStatus, putOrder } from "../../../utils/orderApi";
import { fetchAllOrders } from "../../../redux/slice/orderSlice";

const ModalUpdateOrder = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, order } = props;
  const handleClose = () => {
    setFormData({
      orderId: "",
      orderStatus: 0,
    });
    form.resetFields();
    setShow(false);
  };
  const [formData, setFormData] = useState({
    orderId: "",
    orderStatus: 0,
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [listOrderStatus, setListOrderStatus] = useState();
  const formRef = useRef(null);

  useEffect(() => {
    fetchListOrderStatus();
  }, []);

  useEffect(() => {
    if (order != undefined) {
      console.log(order);
      setFormData({
        orderId: order.id,
        orderStatus: order.orderStatus,
      });
    }
  }, [order]);

  useEffect(() => {
    if (show === true) {
      form.setFieldsValue(formData);
    }
  }, [form, formData]);

  const updateOrder = (data) => {
    try {
      console.log(data);
      putOrder(order.id, formData.orderStatus)
        .then((data) => {
          setConfirmLoading(false);
          toast.success(data.data);
          dispatch(fetchAllOrders({ pageIndex: 0, pageSize: 10 }));
          handleClose();
        })
        .catch((err) => {
          toast.error(err.response.data);
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
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setConfirmLoading(true);
        updateOrder(formData);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <>
      <Modal
        title="Thông tin đơn hàng"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoading}
        onCancel={handleClose}
        maskClosable={false}
      >
        <div className="">
          <Form
            form={form}
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
            onValuesChange={handleFormChange}
            initialValues={formData}
          >
            <Form.Item label="Khách hàng">
              <p>{order?.customer.applicationUser?.email}</p>
            </Form.Item>
            <Form.Item label="Sản phẩm">
              <p>{order?.orderDetails[0]?.bonsai?.name}</p>
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <p>{order?.address}</p>
            </Form.Item>
            <Form.Item label="Khách hàng">
              <p>{order?.deliveryType}</p>
            </Form.Item>
            <Form.Item label="Ngày đặt">
              <p>{new Date(order?.orderDate).toLocaleDateString()}</p>
            </Form.Item>
            <Form.Item label="Ngày giao">
              <p>
                {new Date(order?.expectedDeliveryDate).toLocaleDateString()}
              </p>
            </Form.Item>
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
            <Form.Item label="Loại đơn hàng">
              <Tag>{order?.orderType}</Tag>
            </Form.Item>
            <Form.Item
              label="Trạng thái đơn hàng"
              name="orderStatus"
              rules={[
                {
                  required: true,
                  message: "Trạng thái đơn hàng không được để trống!",
                },
              ]}
            >
              <Select value={order?.orderStatus}>
                {listOrderStatus?.map((orderStatus, index) => (
                  <Select.Option value={orderStatus.value} key={index}>
                    {orderStatus.display}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdateOrder;
