import React, { useState, useEffect, useRef } from "react";
import {
  Tag,
  Input,
  Modal,
  Form,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postCategory } from "../../../utils/categoryApi";
import { allCategory } from "../../../redux/slice/categorySlice";

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
  const [openCreateCategory, setOpenCreateCategory] = useState(false);

  const formRef = useRef(null);

  const onSubmit = (i) => {
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        handleCreateCategory();
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

  const handleCreateCategory = () => {
    setConfirmLoadingCreateCategory(true);
    postCategory(formData)
      .then((data) => {
        console.log(data);
        setOpenCreateCategory(false);
        setConfirmLoadingCreateCategory(false);
        dispatch(allCategory());
      })
      .catch((err) => {
        console.log(err.response.statusText);
        toast.error(err.response.statusText);
        setOpenCreateCategory(false);
        setConfirmLoadingCreateCategory(false);
      });
  };

  return (
    <>
      <Modal
        title="Thêm phân loại"
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
          >
            <Form.Item
              label="Tên Phân loại"
              name="name"
              rules={[
                { required: true, message: "Phân loại không được để trống!" },
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

export default ModalCreateCategory;
