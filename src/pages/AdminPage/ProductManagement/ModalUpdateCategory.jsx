import React, { useState, useEffect, useRef } from "react";
import { Tag, Input, Modal, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putCategory } from "../../../../utils/categoryApi";
import { allCategory } from "../../../../redux/slice/categorySlice";

const ModalUpdateCategory = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, category } = props;
  const handleClose = () => {
    setFormData({
      name: "",
    });
    form.resetFields();
    setConfirmLoadingUpdateCategory(false);
    setShow(false);
  };
  const [formData, setFormData] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const [confirmLoadingUpdateCategory, setConfirmLoadingUpdateCategory] =
    useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (category != undefined) {
      console.log(category);
      setFormData({
        name: category.name,
      });
    }
  }, [category]);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const onSubmit = (i) => {
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setConfirmLoadingUpdateCategory(true);
        handleUpdateCategory();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleUpdateCategory = () => {
    putCategory(category.id, formData)
      .then((data) => {
        toast.success("Cập nhật loại cây thành công!");
        dispatch(allCategory());
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.statusText);
      })
      .finally(() => {
        setConfirmLoadingUpdateCategory(false);
        handleClose();
      });
  };

  return (
    <>
      <Modal
        title="Cập nhật kiểu mẫu"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoadingUpdateCategory}
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
              label="Tên loại cây"
              name="name"
              rules={[
                { required: true, message: "Tên không được để trống!" },
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

export default ModalUpdateCategory;
