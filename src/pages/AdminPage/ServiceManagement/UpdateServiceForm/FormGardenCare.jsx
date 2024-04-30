import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Tag, Input, Modal, Form, InputNumber, Upload, List } from "antd";
const { TextArea } = Input;
import ModalSelectBaseTask from "../ModalSelectBaseTask";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return [e.file];
};
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
];

const FormGardenCare = ({
  onFormInstanceReady,
  onFormDataChange,
  onImageChange,
  service,
  onBaseTaskChange,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    Name: service.name,
    Description: service.description,
    ServiceType: "381e77b3-2cfa-4362-afae-fe588701616e",
  });
  console.log(formData);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [openSelectBaseTask, setOpenSelectBaseTask] = useState(false);

  const [listImage, setListImage] = useState([]);
  const [listSelectedBaseTask, setListSelectedBaseTask] = useState(
    service?.serviceBaseTasks?.map((baseTask) => baseTask.baseTask)
  );
  const formRef = useRef(null);
  useEffect(() => {
    fetchListImage();
  }, [service]);
  useEffect(() => {
    onFormInstanceReady(formRef);
  }, []);
  const handleCancelPreview = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = (i) => {
    setListImage(i);
    onImageChange(i);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Thêm ảnh
      </div>
    </button>
  );

  const fetchListImage = () => {
    const image = [
      {
        url: service?.image,
        uid: "",
      },
    ];
    setListImage(image);
    return image;
  };

  const handleFormChange = (changedValues, allValues) => {
    console.log(allValues);
    setFormData(allValues);
    onFormDataChange(allValues);
  };

  const beforeUpload = (file) => {
    const isFileSizeValid = file.size <= MAX_FILE_SIZE;
    const isFileTypeValid = ALLOWED_FILE_TYPES.includes(file.type);

    if (!isFileSizeValid) {
      message.error("Kích thước file quá lớn, vui lòng chọn file nhỏ hơn 10MB");
    }

    if (!isFileTypeValid) {
      message.error(
        "Định dạng file không hợp lệ, vui lòng chọn file ảnh (JPEG, PNG, GIF)"
      );
    }
    return false;
  };

  // modal select base task
  const showModalSelectBaseTask = () => {
    setOpenSelectBaseTask(true);
    console.log();
  };

  const handleCancelSelectBaseTask = () => {
    setOpenSelectBaseTask(false);
  };

  const handleSubmitForm = (input) => {
    setListSelectedBaseTask(input);
    onBaseTaskChange(input);
  };

  return (
    <>
      <Form
        form={form}
        ref={formRef}
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        onValuesChange={handleFormChange}
        initialValues={formData}
      >
        <Form.Item name="ServiceType" style={{ display: "none" }}>
          <Input type="hidden" value="381e77b3-2cfa-4362-afae-fe588701616e" />
        </Form.Item>
        <Form.Item
          label="Tên dịch vụ"
          name="Name"
          rules={[
            { required: true, message: "Tên dịch vụ không được để trống!" },
          ]}
        >
          <Input value={formData?.Name} />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="Description"
          rules={[{ required: true, message: "Mô tả không được để trống!" }]}
        >
          <TextArea rows={10} />
        </Form.Item>
        <Form.Item
          label="Đăng tải ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            fileList={listImage}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
            onChange={(e) => {
              handleChange(e.fileList);
            }}
          >
            {listImage.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Nhiệm vụ cơ bản"
          rules={[
            { required: true, message: "Nhiệm vụ cơ bản không được để trống!" },
          ]}
        >
          <div>
            <div className="mt-1">
              <Tag icon={<PlusOutlined />} onClick={showModalSelectBaseTask}>
                Chọn nhiệm vụ cơ bản
              </Tag>
            </div>

            <div
              className="mt-6"
              style={{
                height: 400,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={listSelectedBaseTask}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<div href="https://ant.design">{item.name}</div>}
                      description={item.detail}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Form.Item>
      </Form>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      <ModalSelectBaseTask
        show={openSelectBaseTask}
        setShow={handleCancelSelectBaseTask}
        onSubmitForm={handleSubmitForm}
        serviceBaseTask={service?.serviceBaseTasks
          ?.map((baseTask) => baseTask.baseTask)
          ?.map((SelectedBaseTask) => SelectedBaseTask.id)}
      />
    </>
  );
};

export default FormGardenCare;
