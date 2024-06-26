import React, { useState, useEffect, useRef } from "react";
import { Input, Modal, Form } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { putStyle } from "../../../../utils/styleApi";
import { allStyle } from "../../../../redux/slice/styleSlice";

const ModalUpdateStyle = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, style } = props;
  const handleClose = () => {
    setFormData({
      name: "",
    });
    form.resetFields();
    setConfirmLoadingUpdateStyle(false);
    setShow(false);
  };
  const [formData, setFormData] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const [confirmLoadingUpdateStyle, setConfirmLoadingUpdateStyle] =
    useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (style != undefined) {
      console.log(style);
      setFormData({
        name: style.name,
      });
    }
  }, [style]);

  useEffect(() => {
    if (show === true) {
      form.setFieldsValue(formData);
    }
  }, [form, formData]);

  const onSubmit = (i) => {
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setFormDisabled(true);
        setConfirmLoadingUpdateStyle(true);
        handleUpdateStyle();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleUpdateStyle = () => {
    putStyle(style.id, formData)
      .then((data) => {
        toast.success("Cập nhật kiểu dáng thành công!");
        dispatch(allStyle());
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data);
      })
      .finally(() => {
        setConfirmLoadingUpdateStyle(false);
        setFormDisabled(false);
      });
  };

  return (
    <>
      <Modal
        title="Cập nhật kiểu dáng"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoadingUpdateStyle}
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
              label="Tên kiểu dáng"
              name="name"
              rules={[
                { required: true, message: "Kiểu dáng không được để trống!" },
                { max: 100, message: "Kiểu dáng không quá 100 ký tự!" },
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

export default ModalUpdateStyle;
