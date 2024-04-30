import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Input,
  Modal,
  Form,
  Upload,
} from "antd";
const { TextArea } = Input;

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

const FormBonsaiCare = ({
  onFormInstanceReady,
  onFormDataChange,
  onImageChange,
}) => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [listImage, setListImage] = useState([]);
  const formRef = useRef(null);
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

  const handleFormChange = (changedValues, allValues) => {
    console.log(allValues);
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

  return (
    <>
      <Form
        form={form}
        ref={formRef}
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        onValuesChange={handleFormChange}
        initialValues={{ ServiceType: "70f34b1c-1a2c-40ad-a9b6-ec374db61354" }}
      >
        <Form.Item name="ServiceType" style={{ display: "none" }}>
          <Input type="hidden" value="70f34b1c-1a2c-40ad-a9b6-ec374db61354" />
        </Form.Item>
        <Form.Item
          label="Tên dịch vụ"
          name="Name"
          rules={[
            { required: true, message: "Tên dịch vụ không được để trống!" },
          ]}
        >
          <Input />
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
    </>
  );
};

export default FormBonsaiCare;
