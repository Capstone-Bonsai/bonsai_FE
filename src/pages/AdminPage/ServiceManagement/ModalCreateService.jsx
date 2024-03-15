import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Tag, Input, Modal, Form, InputNumber, Select, Upload } from "antd";
const { Search, TextArea } = Input;

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postService } from "../../../utils/serviceApi";
import { fetchAllService } from "../../../redux/slice/serviceSlice";

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

const ModalCreateService = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, listServiceType, listBaseTask } = props;
  console.log(listServiceType);
  const handleClose = () => {
    setFormData({
      Name: "",
      Description: "",
      StandardPrice: 0,
      ServiceType: 0,
      Image: "",
      ServiceBaseTaskId: "",
    });
    form.resetFields();
    setListImage([]);
    setShow(false);
  };
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    StandardPrice: 0,
    ServiceType: 0,
    Image: "",
    ServiceBaseTaskId: "",
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openCreateStyle, setOpenCreateStyle] = useState(false);

  const [listImage, setListImage] = useState([]);
  const formRef = useRef(null);
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

  const handleChange = (i) => setListImage(i);

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
  const createService = (service) => {
    try {
      console.log(service);
      postService(service)
        .then((data) => {
          toast.success("Thêm dịch vụ thành công!");
          dispatch(
            fetchAllService({
              pageIndex: 0,
              pageSize: 5,
            })
          );
          handleClose();
        })
        .catch((err) => {
          toast.error(err.response.data);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const onSubmit = (i) => {
    // formData.Image = listImage?.map((image) => image.originFileObj);
    // const postData = new FormData();
    // postData.append("CategoryId", formData.CategoryId);
    // postData.append("StyleId", formData.StyleId);
    // postData.append("Name", formData.Name);
    // postData.append("Description", formData.Description);
    // postData.append("YearOfPlanting", formData.YearOfPlanting);
    // postData.append("TrunkDimenter", formData.TrunkDimenter);
    // postData.append("Height", formData.Height);
    // postData.append("NumberOfTrunk", formData.NumberOfTrunk);
    // postData.append("Price", formData.Price);
    // formData.Image?.map((image) => postData.append("Image", image));
    console.log(formData);

    formRef.current
      .validateFields()
      .then(() => {
        setConfirmLoading(true);
        createService(postData);
      })
      .catch((errorInfo) => {
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
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
      <Modal
        width={800}
        title="Thêm dịch vụ"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        okText={confirmLoading ? "Đang tạo" : "Tạo mới"}
        cancelText="Hủy"
        confirmLoading={confirmLoading}
        onCancel={handleClose}
        maskClosable={false}
      >
        <div className="mt-12">
          <Form
            form={form}
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            onValuesChange={handleFormChange}
          >
            <Form.Item
              label="Loại dịch vụ"
              name="CategoryId"
              rules={[
                {
                  required: true,
                  message: "Loại dịch vụ không được để trống!",
                },
              ]}
            >
              <Select>
                {listServiceType?.map((serviceType, index) => (
                  <Select.Option value={serviceType.value} key={index}>
                    {serviceType.display}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
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
            <Form.Item
              label="Tên sản phẩm"
              name="Name"
              rules={[
                { required: true, message: "Phân loại không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="Description"
              rules={[
                { required: true, message: "Mô tả không được để trống!" },
              ]}
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
          </Form>
        </div>
      </Modal>
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
      {/* <ModalCreateCategory
        show={openCreateCategory}
        setShow={handleCancelCreateCategory}
      />

      <ModalCreateStyle
        show={openCreateStyle}
        setShow={handleCancelCreateStyle}
      /> */}
    </>
  );
};

export default ModalCreateService;
