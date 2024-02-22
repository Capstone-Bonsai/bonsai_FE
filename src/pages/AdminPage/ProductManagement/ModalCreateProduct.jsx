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
import { postProduct } from "../../../utils/productApi";
import {
  fetchAllProduct,
  fetchAllProductNoPagination,
  fetchAllProductPagination,
} from "../../../redux/slice/productSlice";

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

const ModalCreateProduct = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, listSubCategory, listTag } = props;
  const handleClose = () => {
    setFormData({
      SubCategoryId: "",
      Name: "",
      Description: "",
      TreeShape: "",
      AgeRange: 0,
      Height: 0,
      Unit: "",
      Quantity: 0,
      UnitPrice: 0,
      Image: "",
      TagId: [],
    });
    form.resetFields();
    setListImage([]);
    setSelectedTags([]);
    setShow(false);
  };
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    SubCategoryId: "",
    Name: "",
    Description: "",
    TreeShape: "",
    AgeRange: 0,
    Height: 0,
    Unit: "",
    Quantity: 0,
    UnitPrice: 0,
    Image: "",
    TagId: [],
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [listImage, setListImage] = useState([]);
  const formRef = useRef(null);

  const handleChangeTagList = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
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
  const createProduct = (product) => {
    try {
      console.log(product);
      postProduct(product)
        .then((data) => {
          setConfirmLoading(false);
          toast.success(data.data);
          dispatch(fetchAllProductPagination(0, 5));
          handleClose();
        })
        .catch((err) => {
          toast.error(err.response.statusText);
        });
    } catch (error) {
      toast.error(error.response.statusText);
    }
  };
  const onSubmit = (i) => {
    formData.Image = listImage;
    formData.TagId = selectedTags;
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setConfirmLoading(true);
        createProduct(formData);
        setConfirmLoading(false);
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
        title="Thêm sản phẩm"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoading}
        onCancel={handleClose}
        maskClosable={false}
      >
        <div className="">
          <Form
            form={form}
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            onValuesChange={handleFormChange}
          >
            <Form.Item
              label="Phân loại"
              name="SubCategoryId"
              rules={[
                { required: true, message: "Phân loại không được để trống!" },
              ]}
            >
              <Select>
                {listSubCategory?.map((subCategory, index) => (
                  <Select.Option value={subCategory.id} key={index}>
                    {subCategory.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
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
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Dáng cây"
              name="TreeShape"
              rules={[
                { required: true, message: "Dáng cây không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số tuổi"
              name="AgeRange"
              rules={[
                { required: true, message: "Số tuổi không được để trống!" },
                {
                  type: "number",
                  message: "Tuổi cây phải là một số!",
                },
              ]}
            >
              <InputNumber min={0} className="w-[100%]" />
            </Form.Item>
            <Form.Item
              label="Chiều cao"
              name="Height"
              rules={[
                { required: true, message: "Chiều cao không được để trống!" },
                {
                  type: "number",
                  message: "Chiều cao phải là một số!",
                },
              ]}
            >
              <InputNumber
                min={0}
                step={0.1}
                prefix="(m)"
                className="w-[100%]"
              />
            </Form.Item>
            <Form.Item
              label="Đơn vị"
              name="Unit"
              rules={[
                { required: true, message: "Đơn vị không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Kho sẵn"
              name="Quantity"
              rules={[
                { required: true, message: "Kho sẵn không được để trống!" },
                {
                  type: "number",
                  min: 1,
                  max: 999,
                  message:
                    "Kho sẵn phải có ít nhất 1 sản phẩm và nhiều nhất 1000 sản phẩm!",
                },
              ]}
            >
              <InputNumber min={0} className="w-[100%]" />
            </Form.Item>
            <Form.Item
              label="Giá tiền"
              name="UnitPrice"
              rules={[
                { required: true, message: "Giá tiền không được để trống!" },
                {
                  type: "number",
                  min: 0,
                  max: 10000000,
                  message:
                    "Giá tiền phải có ít nhất 0 Vnd và nhiều nhất 10000000 Vnd!",
                },
              ]}
            >
              <InputNumber
                min={0}
                step={1000}
                prefix="(Vnd)"
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
                {uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item label="Tag" valuePropName="text">
              <Space size={[0, 8]} wrap>
                {listTag?.items?.map((tag, index) => (
                  <CheckableTag
                    key={index}
                    checked={selectedTags.includes(tag.id)}
                    onChange={(checked) => {
                      handleChangeTagList(tag.id, checked);
                    }}
                  >
                    {tag.name}
                  </CheckableTag>
                ))}
              </Space>
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
    </>
  );
};

export default ModalCreateProduct;
