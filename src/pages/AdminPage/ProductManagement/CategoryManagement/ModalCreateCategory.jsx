import React, { useState, useEffect, useRef } from "react";
import { Input, Modal, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postCategory } from "../../../../utils/categoryApi";
import { allCategory } from "../../../../redux/slice/categorySlice";

const ModalCreateCategory = (props) => {
  const [form] = Form.useForm();
  const { show, setShow } = props;
  const handleClose = () => {
    setFormData({
      name: "",
    });
    form.resetFields();
    setConfirmLoadingCreateCategory(false);
    setShow(false);
  };
  const [formData, setFormData] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const [confirmLoadingCreateCategory, setConfirmLoadingCreateCategory] =
    useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const formRef = useRef(null);

  const onSubmit = (i) => {
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setFormDisabled(true);
        setConfirmLoadingCreateCategory(true);
        handleCreateCategory();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleCreateCategory = () => {
    postCategory(formData)
      .then((data) => {
        toast.success("Thêm loại cây thành công!");
        dispatch(allCategory());
        handleClose();
      })
      .catch((err) => {
        console.log(err.response.statusText);
        toast.error(err.response.statusText);
      })
      .finally(() => {
        setConfirmLoadingCreateCategory(false);
        setFormDisabled(false);
      });
  };

  return (
    <>
      <Modal
        title="Thêm loại cây"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoadingCreateCategory}
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
            disabled={formDisabled}
          >
            <Form.Item
              label="Tên loại cây"
              name="name"
              rules={[{ required: true, message: "Tên không được để trống!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateCategory;
