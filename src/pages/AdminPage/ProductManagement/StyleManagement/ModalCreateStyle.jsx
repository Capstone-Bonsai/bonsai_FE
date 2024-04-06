import React, { useState, useEffect, useRef } from "react";
import { Tag, Input, Modal, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postStyle } from "../../../../utils/styleApi";
import { allStyle } from "../../../../redux/slice/styleSlice";

const ModalCreateStyle = (props) => {
  const [form] = Form.useForm();
  const { show, setShow } = props;
  const handleClose = () => {
    setFormData({
      name: "",
    });
    form.resetFields();
    setShow(false);
  };
  const [formData, setFormData] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const [confirmLoadingCreateStyle, setConfirmLoadingCreateStyle] =
    useState(false);

  const formRef = useRef(null);

  const onSubmit = (i) => {
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setConfirmLoadingCreateStyle(true);
        handleCreateStyle();
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
    postStyle(formData)
      .then((data) => {
        toast.success("Thêm kiểu mẫu thành công!");
        dispatch(allStyle());
      })
      .catch((err) => {
        console.log(err.response.statusText);
        toast.error(err.response.statusText);
      })
      .finally(() => {
        setConfirmLoadingCreateStyle(false);
        handleClose();
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