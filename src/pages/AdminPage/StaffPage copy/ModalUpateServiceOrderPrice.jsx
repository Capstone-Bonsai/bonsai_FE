import React, { useEffect, useRef, useState } from "react";
import { Modal, InputNumber, Button, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { putServieOrderPrice } from "../../../utils/serviceOrderApi";
import { allServiceOrder } from "../../../redux/slice/serviceOrderSlice";
const { RangePicker } = DatePicker;
function ModalUpateServiceOrderPrice(props) {
  const [form] = Form.useForm();
  const { show, setShow, serviceOrderDetail } = props;
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const handleClose = () => {
    setFormData({
      dateTimePicker: [],
      totalPrice: 0,
    });
    setShow(false);
  };
  const [formData, setFormData] = useState({
    dateTimePicker: [],
    totalPrice: 0,
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (serviceOrderDetail != undefined) {
      console.log(serviceOrderDetail);
      setFormData({
        dateTimePicker: [
          dayjs(serviceOrderDetail?.startDate),
          dayjs(serviceOrderDetail?.endDate),
        ],
        totalPrice: serviceOrderDetail?.totalPrice,
      });
    }
  }, [serviceOrderDetail]);

  useEffect(() => {
    if (show === true) {
      form.setFieldsValue(formData);
    }
  }, [form, formData]);

  const handleOk = () => {
    try {
      putServieOrderPrice(serviceOrderDetail?.id, formData)
        .then((data) => {
          toast.success("Cập nhật đơn hàng dịch vụ thành công!");
          dispatch(
            allServiceOrder({
              pageIndex: 0,
              pageSize: 10,
            })
          );
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data);
        })
        .finally(() => {
          setConfirmLoading(false);
          setFormDisabled(false);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const onSubmit = () => {
    formRef.current
      .validateFields()
      .then(() => {
        setFormDisabled(true);
        setConfirmLoading(true);
        handleOk();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  return (
    <>
      <Modal
        width="50%"
        title="Thông tin đơn hàng dịch vụ"
        onCancel={handleClose}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        open={show}
        okText={confirmLoading ? "Đang cập nhật" : "Cập nhật"}
        cancelText="Hủy"
        confirmLoading={confirmLoading}
        maskClosable={false}
      >
        <div className="mt-9">
          <Form
            form={form}
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
            onValuesChange={handleFormChange}
            initialValues={formData}
            disabled={formDisabled}
          >
            <Form.Item label="Tên khách hàng:">
              <div>{serviceOrderDetail?.customerName}</div>
            </Form.Item>
            <Form.Item label="Số điện thoại:">
              <div>{serviceOrderDetail?.customerPhoneNumber}</div>
            </Form.Item>
            <Form.Item label="Địa chỉ:">
              <div>{serviceOrderDetail?.address}</div>
            </Form.Item>
            <Form.Item label="Diện tích vườn:">
              <div>
                {serviceOrderDetail?.gardenSquare?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                m<sup>2</sup>
              </div>
            </Form.Item>
            <Form.Item label="Khoảng cách:">
              <div>
                {(serviceOrderDetail?.distance / 1000).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )}{" "}
                km
              </div>
            </Form.Item>
            {/* <div className="my-2">
                  Tên dịch vụ: {serviceOrderDetail?.service?.name}
                </div> */}
            <Form.Item
              name="dateTimePicker"
              label="Thời gian làm việc:"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Vui lòng nhập ngày bắt đầu và kết thúc!",
                },
              ]}
            >
              <RangePicker
                // defaultValue={[
                //   dayjs(serviceOrderDetail?.startDate),
                //   dayjs(serviceOrderDetail?.endDate),
                // ]}
                className="border border-black"
              />
            </Form.Item>
            <Form.Item
              label="Giá tiền"
              name="totalPrice"
              rules={[
                {
                  required: true,
                  message: "Giá tiền không được để trống!",
                },
                {
                  type: "number",
                  min: 0,
                  max: 100000000000,
                  message:
                    "Giá tiền phải có ít nhất 0 Vnd và nhiều nhất 100,000,000,000 Vnd!",
                },
              ]}
            >
              <InputNumber
                className="w-[50%]"
                min={0}
                max={100000000000}
                step={1000}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                prefix="₫"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default ModalUpateServiceOrderPrice;
