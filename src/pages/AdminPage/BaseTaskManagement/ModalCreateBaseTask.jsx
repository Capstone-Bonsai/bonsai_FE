import React, { useState, useEffect, useRef } from "react";
import { Input, Modal, Form } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postBaseTask } from "../../../utils/baseTaskApi";
import { allBaseTaskPagination } from "../../../redux/slice/baseTaskSlice";

const ModalCreateBaseTask = (props) => {
  const [form] = Form.useForm();
  const { show, setShow } = props;
  const handleClose = () => {
    setFormData({
      name: "",
      detail: "",
    });
    form.resetFields();
    setShow(false);
  };
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const formRef = useRef(null);

  const createBaseTask = (input) => {
    try {
      console.log(input);
      postBaseTask(input)
        .then((data) => {
          toast.success("Thêm nhiệm vụ cơ bản thành công!");
          dispatch(
            allBaseTaskPagination({
              pageIndex: 0,
              pageSize: 10,
            })
          );
          handleClose();
        })
        .catch((err) => {
          toast.error(err.response.data);
        })
        .finally(() => {
          setConfirmLoading(false);
          setFormDisabled(false);
        });
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const onSubmit = (i) => {
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setFormDisabled(true);
        setConfirmLoading(true);
        createBaseTask(formData);
      })
      .catch((errorInfo) => {
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <>
      <Modal
        width={800}
        title="Thêm nhiệm vụ cơ bản"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        okText={confirmLoading ? "Đang tạo" : "Tạo mới"}
        cancelText="Hủy"
        confirmLoading={confirmLoading}
        onCancel={handleClose}
        maskClosable={false}
      >
        <div className="mt-9">
          <Form
            form={form}
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            onValuesChange={handleFormChange}
            disabled={formDisabled}
          >
            <Form.Item
              label="Tên nhiệm vụ cơ bản"
              name="name"
              rules={[{ required: true, message: "Tên không được để trống!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="detail"
              rules={[
                { required: true, message: "Mô tả không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateBaseTask;
