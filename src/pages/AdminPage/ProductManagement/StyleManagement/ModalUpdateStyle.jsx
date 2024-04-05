import React, { useState, useEffect, useRef } from "react";
import { Tag, Input, Modal, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postStyle, putStyle } from "../../../../utils/styleApi";
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
  const [openUpdateStyle, setOpenUpdateStyle] = useState(false);

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
    form.setFieldsValue(formData);
  }, [form, formData]);

  const onSubmit = (i) => {
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
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
        toast.success("Cập nhật kiểu mẫu thành công!");
        dispatch(allStyle());
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.statusText);
      })
      .finally(() => {
        setConfirmLoadingUpdateStyle(false);
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

export default ModalUpdateStyle;
