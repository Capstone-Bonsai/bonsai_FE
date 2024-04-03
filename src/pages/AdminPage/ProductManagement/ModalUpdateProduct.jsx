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
import { putProduct } from "../../../utils/productApi";
import { fetchAllProductPagination } from "../../../redux/slice/productSlice";
import { putBonsai } from "../../../utils/bonsaiApi";
import { fetchAllBonsaiPagination } from "../../../redux/slice/bonsaiSlice";
import ModalCreateCategory from "./ModalCreateCategory";
import ModalCreateStyle from "./ModalCreateStyle";

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

const ModalUpdateProduct = (props) => {
  const [form1] = Form.useForm();
  const { show, setShow, bonsai, listCategory, listStyle } = props;
  const handleClose = () => {
    setFormData({
      CategoryId: "",
      StyleId: "",
      Name: "",
      Description: "",
      YearOfPlanting: 0,
      TrunkDimenter: 0,
      Height: 0,
      NumberOfTrunk: 0,
      Price: 0,
      Image: "",
    });
    form1.resetFields();
    setListImage([]);
    // setSelectedTags([]);
    setShow(false);
  };
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    CategoryId: "",
    StyleId: "",
    Name: "",
    Description: "",
    YearOfPlanting: 0,
    TrunkDimenter: 0,
    Height: 0,
    NumberOfTrunk: 0,
    Price: 0,
    Image: "",
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [listImage, setListImage] = useState([]);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openCreateStyle, setOpenCreateStyle] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (bonsai != undefined) {
      console.log(bonsai);
      setFormData({
        CategoryId: bonsai.categoryId,
        StyleId: bonsai.styleId,
        Name: bonsai.name,
        Description: bonsai.description,
        YearOfPlanting: bonsai.yearOfPlanting,
        TrunkDimenter: bonsai.trunkDimenter,
        Height: bonsai.height,
        NumberOfTrunk: bonsai.numberOfTrunk,
        Price: bonsai.price,
        Image: fetchListImage(),
      });
    }
  }, [bonsai]);

  useEffect(() => {
    form1.setFieldsValue(formData);
  }, [form1, formData]);

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
        Cập nhật
      </div>
    </button>
  );

  const fetchListImage = () => {
    const image = bonsai?.bonsaiImages?.map((data) => ({
      url: data.imageUrl,
      uid: "",
    }));
    setListImage(image);
    return image;
  };
  const updateBonsai = (data) => {
    try {
      console.log(data);
      putBonsai(bonsai.id, data)
        .then((data) => {
          toast.success("Cập nhật thành công!");
          dispatch(
            fetchAllBonsaiPagination({
              pageIndex: 0,
              pageSize: 5,
              keyword: "",
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
    formData.Image = listImage?.map((image) => image);
    const postData = new FormData();
    postData.append("CategoryId", formData.CategoryId);
    postData.append("StyleId", formData.StyleId);
    postData.append("Name", formData.Name);
    postData.append("Description", formData.Description);
    postData.append("YearOfPlanting", formData.YearOfPlanting);
    postData.append("TrunkDimenter", formData.TrunkDimenter);
    postData.append("Height", formData.Height);
    postData.append("NumberOfTrunk", formData.NumberOfTrunk);
    postData.append("Price", formData.Price);
    formData.Image?.map((image) =>
      image.originFileObj
        ? postData.append("Image", image.originFileObj)
        : postData.append("OldImage", image.url)
    );
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setConfirmLoading(true);
        updateBonsai(postData);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
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

  //modal create category
  const showModalCreateCategory = () => {
    setOpenCreateCategory(true);
    console.log(openCreateCategory);
  };

  const handleCancelCreateCategory = () => {
    console.log("Clicked cancel button");
    setOpenCreateCategory(false);
  };

  // modal create style
  const showModalCreateStyle = () => {
    setOpenCreateStyle(true);
    console.log(openCreateStyle);
  };

  const handleCancelCreateStyle = () => {
    console.log("Clicked cancel button");
    setOpenCreateStyle(false);
  };

  return (
    <>
      <Modal
        width={800}
        title="Sửa sản phẩm"
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
            form={form1}
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            onValuesChange={handleFormChange}
            initialValues={formData}
          >
            <Form.Item
              label="Phân loại"
              rules={[
                { required: true, message: "Phân loại không được để trống!" },
              ]}
            >
              <div>
                <div className="mt-1">
                  <Tag
                    icon={<PlusOutlined />}
                    onClick={showModalCreateCategory}
                  >
                    Thêm Phân loại
                  </Tag>
                </div>
                <div className="mt-3">
                  <Form.Item name="CategoryId">
                    <Select>
                      {listCategory?.map((category, index) => (
                        <Select.Option value={category.id} key={index}>
                          {category.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </Form.Item>
            <Form.Item
              label="Kiểu dáng"
              rules={[
                { required: true, message: "Phân loại không được để trống!" },
              ]}
            >
              <div>
                <div className="mt-1">
                  <Tag icon={<PlusOutlined />} onClick={showModalCreateStyle}>
                    Thêm Kiểu mẫu
                  </Tag>
                </div>
                <div className="mt-3">
                  <Form.Item name="StyleId">
                    <Select value={bonsai?.styleId}>
                      {listStyle?.map((style, index) => (
                        <Select.Option value={style.id} key={index}>
                          {style.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
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
              <TextArea rows={10} />
            </Form.Item>
            <Form.Item
              label="Số năm trồng"
              name="YearOfPlanting"
              rules={[
                {
                  required: true,
                  message: "Số năm trồng không được để trống!",
                },
                {
                  type: "number",
                  message: "Số năm trồng phải là một số!",
                },
              ]}
            >
              <InputNumber min={0} className="w-[100%]" />
            </Form.Item>
            <Form.Item
              label="Đường kính"
              name="TrunkDimenter"
              rules={[
                { required: true, message: "Đường kính không được để trống!" },
                {
                  type: "number",
                  message: "Đường kính phải là một số!",
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
              label="Số nhánh chính"
              name="NumberOfTrunk"
              rules={[
                {
                  required: true,
                  message: "Số nhánh chính không được để trống!",
                },
                {
                  type: "number",
                  message: "Số nhánh chính phải là một số!",
                },
              ]}
            >
              <InputNumber min={0} className="w-[100%]" />
            </Form.Item>
            <Form.Item
              label="Giá tiền"
              name="Price"
              rules={[
                { required: true, message: "Giá tiền không được để trống!" },
                {
                  type: "number",
                  min: 0,
                  max: 100000000,
                  message:
                    "Giá tiền phải có ít nhất 0 Vnd và nhiều nhất 100,000,000 Vnd!",
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
                  console.log(e.fileList);
                  handleChange(e.fileList);
                }}
              >
                {uploadButton}
              </Upload>
            </Form.Item>
            {/* <Form.Item label="Tag" valuePropName="text">
              <>
                <Tag icon={<PlusOutlined />} onClick={() => {}}>
                  New Tag
                </Tag>
                <Form.Item name="TagId">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select tag"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={listTag?.items?.map((tag, index) => ({
                      key: index,
                      value: tag.id,
                      label: tag.name,
                    }))}
                  />
                </Form.Item>
              </>
            </Form.Item> */}
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
      <ModalCreateCategory
        show={openCreateCategory}
        setShow={handleCancelCreateCategory}
      />
      <ModalCreateStyle
        show={openCreateStyle}
        setShow={handleCancelCreateStyle}
      />
    </>
  );
};

export default ModalUpdateProduct;
