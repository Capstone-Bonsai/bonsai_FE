import React, { useState, useEffect, useRef } from "react";
import { Input, Modal, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allBaseTaskPagination } from "../../../redux/slice/baseTaskSlice";
import { putBaseTask } from "../../../utils/baseTaskApi";

const ModalUpdateBaseTask = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, baseTask } = props;
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

  useEffect(() => {
    if (baseTask != undefined) {
      setFormData({
        name: baseTask.name,
        detail: baseTask.detail,
      });
    }
  }, [baseTask]);

  useEffect(() => {
    if (show === true) {
      form.setFieldsValue(formData);
    }
  }, [form, formData]);

  const updateBaseTask = (data) => {
    try {
      putBaseTask(baseTask.id, data)
        .then((data) => {
          toast.success("Cập nhật thành công!");
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
    formRef.current
      .validateFields()
      .then(() => {
        setFormDisabled(true);
        setConfirmLoading(true);
        updateBaseTask(formData);
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
        title="Sửa nhiệm vụ cơ bản"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        okText={confirmLoading ? "Đang cập nhật" : "Cập nhật"}
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
            initialValues={formData}
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
                { max: 200, message: "Mô tả không quá 2000 ký tự!" },
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

export default ModalUpdateBaseTask;
