import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Tag,
  Input,
  Modal,
  Form,
  InputNumber,
  Select,
  Upload,
  List,
} from "antd";
const { Search, TextArea } = Input;

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postService } from "../../../../utils/serviceApi";
import { fetchAllService } from "../../../../redux/slice/serviceSlice";
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
  onBaseTaskChange,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    StandardPrice: 0,
    ServiceType: 0,
    Image: "",
    ServiceBaseTaskId: "",
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [openSelectBaseTask, setOpenSelectBaseTask] = useState(false);

  const [listImage, setListImage] = useState([]);
  const [listSelectedBaseTask, setListSelectedBaseTask] = useState([]);
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
        Tạo sản phẩm
      </div>
    </button>
  );

  const handleFormChange = (changedValues, allValues) => {
    console.log(allValues)
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

  // modal select style
  const showModalSelectBaseTask = () => {
    setOpenSelectBaseTask(true);
    
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
        initialValues={{ServiceType:2}}
      >
        {/* <Form.Item
              label="Kiểu dáng"
              rules={[
                { required: true, message: "Phân loại không được để trống!" },
              ]}
            >
              <div>
                <Tag icon={<PlusOutlined />} onClick={showModalCreateStyle}>
                  Thêm Kiểu mẫu
                </Tag>
                <Form.Item name="StyleId">
                  <Select>
                    {listStyle?.map((style, index) => (
                      <Select.Option value={style.id} key={index}>
                        {style.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Form.Item> */}
        <Form.Item name="ServiceType" style={{ display: 'none' }}>
          <Input type="hidden" value="2" />
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
          label="Giá tiêu chuẩn"
          name="StandardPrice"
          rules={[
            {
              required: true,
              message: "Giá tiêu chuẩn không được để trống!",
            },
            {
              type: "number",
              min: 0,
              max: 100000000,
              message:
                "Giá tiêu chuẩn phải có ít nhất 0 Vnd và nhiều nhất 100,000,000 Vnd!",
            },
          ]}
        >
          <InputNumber
            min={0}
            step={1000}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            prefix="₫"
            className="w-[100%]"
          />
        </Form.Item>
        <Form.Item
          label="Upload ảnh"
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
          label="Kiểu dáng"
          rules={[
            { required: true, message: "Phân loại không được để trống!" },
          ]}
        >
          <div>
            <div className="mt-1">
              <Tag icon={<PlusOutlined />} onClick={showModalSelectBaseTask}>
                Chọn task
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
      />

      {/* <ModalCreateStyle
        show={openCreateStyle}
        setShow={handleCancelCreateStyle}
      /> */}
    </>
  );
};

export default FormGardenCare;
