import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  PlusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Tooltip,
  Space,
  Tag,
  Table,
  Input,
  Modal,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
const { Search, TextArea } = Input;

const { CheckableTag } = Tag;
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalUpdateCareStep = (props) => {
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

  const formRef = useRef(null);

  useEffect(() => {
    if (baseTask != undefined) {
      console.log(baseTask);
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
      console.log(data);
      putBaseTask(baseTask.id, data)
        .then((data) => {
          toast.success("Cập nhật thành công!");
          dispatch(
            allBaseTaskPagination({
              pageIndex: 0,
              pageSize: 5,
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
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const onSubmit = (i) => {
    formRef.current
      .validateFields()
      .then(() => {
        setConfirmLoading(true);
        updateBaseTask(formData);
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
        width={800}
        title="Sửa công việc"
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
          >
            <Form.Item
              label="Tên công việc"
              name="name"
              rules={[{ required: true, message: "Tên không được để trống!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Miêu tả"
              name="detail"
              rules={[
                { required: true, message: "Miêu tả không được để trống!" },
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

export default ModalUpdateCareStep;
