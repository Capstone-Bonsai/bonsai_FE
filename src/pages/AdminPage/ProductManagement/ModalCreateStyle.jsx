import React, { useState, useEffect, useRef } from "react";
import {
  Tag,
  Input,
  Modal,
  Form,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postStyle } from "../../../utils/styleApi";
import { allStyle } from "../../../redux/slice/styleSlice";

const ModalCreateStyle = (props) => {
  const [form] = Form.useForm();
  const { show, setShow } = props;
  const handleClose = () => {
    setFormData({
      name: "",
    });
    form.resetFields();
    setConfirmLoadingCreateStyle(false);
    setShow(false);
  };
  const [formData, setFormData] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const [confirmLoadingCreateStyle, setConfirmLoadingCreateStyle] =
    useState(false);
  const [openCreateStyle, setOpenCreateStyle] = useState(false);

  const formRef = useRef(null);

  const onSubmit = (i) => {
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        handleCreateStyle();
        handleClose();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleCreateStyle = () => {
    setConfirmLoadingCreateStyle(true);
    postStyle(formData)
      .then((data) => {
        console.log(data);
        setOpenCreateStyle(false);
        setConfirmLoadingCreateStyle(false);
        dispatch(allStyle());
      })
      .catch((err) => {
        console.log(err.response.statusText);
        toast.error(err.response.statusText);
        setOpenCreateStyle(false);
        setConfirmLoadingCreateStyle(false);
      });
  };

  return (
    <>
      <Modal
        title="Thêm kiểu mẫu"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoadingCreateStyle}
        onCancel={handleClose}
        maskClosable={false}
      >
        <div className="mt-12">
          <Form
            form={form}
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 17 }}
            onValuesChange={handleFormChange}
          >
            <Form.Item
              label="Tên kiểu mẫu"
              name="name"
              rules={[
                { required: true, message: "Kiểu mẫu không được để trống!" },
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

export default ModalCreateStyle;
