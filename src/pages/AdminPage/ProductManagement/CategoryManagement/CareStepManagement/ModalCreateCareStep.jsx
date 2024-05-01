import React, { useState, useEffect, useRef } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Input, Modal, Form, Space, Button } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allCareStep } from "../../../../../redux/slice/careStepSlice";
import { postCareStep } from "../../../../../utils/careStepApi";

const ModalCreateCareStep = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, categoryId } = props;
  const handleClose = () => {
    setFormData({
      categoryId: "",
      careSteps: [],
    });
    form.resetFields();
    setShow(false);
  };
  const [formData, setFormData] = useState({
    categoryId: categoryId,
    careSteps: [],
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const formRef = useRef(null);

  const createCareStep = (input) => {
    try {
      console.log(input);
      postCareStep({ categoryId: categoryId, careSteps: input.careSteps })
        .then((data) => {
          toast.success("Thêm công việc thành công!");
          dispatch(allCareStep(categoryId));
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
        createCareStep(formData);
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
        title="Thêm bước chăm sóc"
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
            <Form.Item label="Tên bước chăm sóc">
              <Form.List name="careSteps">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 20,
                      flexDirection: "column",
                    }}
                  >
                    {fields?.map((field, index) => (
                      <Space key={index}>
                        <div>
                          <Form.Item name={[field.name]} noStyle>
                            <Input />
                          </Form.Item>
                        </div>
                        <div
                          onClick={() => {
                            remove(field.name);
                          }}
                        >
                          <CloseOutlined />
                        </div>
                      </Space>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                      + Thêm bước
                    </Button>
                  </div>
                )}
              </Form.List>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateCareStep;
