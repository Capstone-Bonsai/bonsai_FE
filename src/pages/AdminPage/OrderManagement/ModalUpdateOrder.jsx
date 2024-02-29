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
import { putOrder } from "../../../utils/orderApi";
import { fetchAllOrders } from "../../../redux/slice/orderSlice";

const ModalUpdateOrder = (props) => {
  const [form1] = Form.useForm();
  const { show, setShow, order } = props;
  const handleClose = () => {
    setFormData({
      orderId: "",
      orderStatus: 0,
    });
    form1.resetFields();
    setShow(false);
  };
  const [formData, setFormData] = useState({
    orderId: "",
    orderStatus: 0,
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const formRef = useRef(null);

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
    form1.setFieldsValue(formData);
  }, [form1, formData]);

  const updateOrder = (data) => {
    try {
      console.log(data);
      putOrder(order.id, order.orderStatus)
        .then((data) => {
          setConfirmLoading(false);
          toast.success(data.data);
          dispatch(fetchAllOrders(0, 5));
          handleClose();
        })
        .catch((err) => {
          toast.error(err.response.statusText);
        });
    } catch (err) {
      toast.error(err.response.statusText);
    }
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
            form={form1}
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
            onValuesChange={handleFormChange}
            initialValues={formData}
          >
            <Form.Item label="Trạng thái đơn hàng"
              name="address">
              <p>{order?.address}</p>
            </Form.Item>
            <Form.Item
              label="Trạng thái đơn hàng"
              name="orderStatus"
              rules={[
                { required: true, message: "Trạng thái đơn hàng không được để trống!" },
              ]}
            >
              <Select>
                {/* {listSubCategory?.map((subCategory, index) => (
                  <Select.Option value={subCategory.id} key={index}>
                    {subCategory.name}
                  </Select.Option>
                ))} */}
              </Select>
            </Form.Item>
            <Form.Item
              label="Đơn vị"
              name="Unit"
              rules={[
                { required: true, message: "Đơn vị không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá tiền"
              name="UnitPrice"
              rules={[
                { required: true, message: "Giá tiền không được để trống!" },
                {
                  type: "number",
                  min: 0,
                  max: 100000000,
                  message:
                    "Giá tiền phải có ít nhất 0 Vnd và nhiều nhất 100,000,000 Vnd!",
                },
              ]}
            >
              <InputNumber
                min={0}
                step={1000}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                prefix="₫"
                className="w-[100%]"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    
    </>
  );
};

export default ModalUpdateOrder;
