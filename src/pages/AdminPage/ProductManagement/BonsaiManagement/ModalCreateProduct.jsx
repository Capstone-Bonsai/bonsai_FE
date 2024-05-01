import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Tag, Input, Modal, Form, InputNumber, Select, Upload } from "antd";
const { Search, TextArea } = Input;

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllBonsaiPagination } from "../../../../redux/slice/bonsaiSlice";
import { postBonsai } from "../../../../utils/bonsaiApi";
import ModalCreateCategory from "../CategoryManagement/ModalCreateCategory";
import ModalCreateStyle from "../StyleManagement/ModalCreateStyle";
import { deliverySizeList } from "./deliverySize";

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
  const { show, setShow, listCategory, listStyle } = props;
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
      DeleverySize: 0,
      Image: "",
    });
    form.resetFields();
    setListImage([]);
    setShow(false);
  };
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
    DeliverySize: 0,
    Image: "",
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openCreateStyle, setOpenCreateStyle] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

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
        Thêm ảnh
      </div>
    </button>
  );
  const createBonsai = (product) => {
    try {
      console.log(product);
      postBonsai(product)
        .then((data) => {
          toast.success("Thêm bonsai thành công!");
          dispatch(
            fetchAllBonsaiPagination({
              pageIndex: 0,
              pageSize: 10,
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
          setFormDisabled(false);
        });
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const onSubmit = (i) => {
    console.log(formData);
    formData.Image = listImage?.map((image) => image.originFileObj);
    const postData = new FormData();
    postData.append("CategoryId", formData.CategoryId);
    postData.append("StyleId", formData.StyleId);
    postData.append("Name", formData.Name);
    postData.append("Description", formData.Description);
    formData.YearOfPlanting !== undefined
      ? postData.append("YearOfPlanting", formData.YearOfPlanting)
      : {};
    postData.append("TrunkDimenter", formData.TrunkDimenter);
    formData.Height !== undefined
      ? postData.append("Height", formData.Height)
      : {};
    postData.append("NumberOfTrunk", formData.NumberOfTrunk);
    postData.append("Price", formData.Price);
    postData.append("DeliverySize", formData.DeliverySize);
    formData.Image?.map((image) => postData.append("Image", image));

    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setFormDisabled(true);
        setConfirmLoading(true);
        createBonsai(postData);
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
        title="Thêm Bonsai"
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
            <Form.Item label="Phân loại">
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
                  <Form.Item
                    name="CategoryId"
                    rules={[
                      {
                        required: true,
                        message: "Phân loại không được để trống!",
                      },
                    ]}
                  >
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
            <Form.Item label="Kiểu dáng">
              <div>
                <div className="mt-1">
                  <Tag icon={<PlusOutlined />} onClick={showModalCreateStyle}>
                    Thêm Kiểu dáng
                  </Tag>
                </div>
                <div className="mt-3">
                  <Form.Item
                    name="StyleId"
                    rules={[
                      {
                        required: true,
                        message: "Kiểu dáng không được để trống!",
                      },
                    ]}
                  >
                    <Select>
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
              label="Tên bonsai"
              name="Name"
              rules={[
                { required: true, message: "Tên không được để trống!" },
                { max: 100, message: "Username không quá 100 ký tự!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="Description"
              rules={[
                { required: true, message: "Mô tả không được để trống!" },
                { max: 2000, message: "Mô tả không quá 2000 ký tự!" },
              ]}
            >
              <TextArea rows={10} />
            </Form.Item>
            <Form.Item
              label="Năm trồng"
              name="YearOfPlanting"
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Năm trồng phải là một số nguyên dương!",
                },
              ]}
            >
              <InputNumber min={0} className="w-[100%]" prefix="(năm)" />
            </Form.Item>
            <Form.Item
              label="Đường kính"
              name="TrunkDimenter"
              rules={[
                { required: true, message: "Đường kính không được để trống!" },
                {
                  type: "number",
                  min: 0,
                  message: "Đường kính phải là một số nguyên dương!",
                },
              ]}
            >
              <InputNumber min={0} className="w-[100%]" prefix="(cm)" />
            </Form.Item>
            <Form.Item
              label="Chiều cao"
              name="Height"
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Chiều cao phải là một số nguyên dương!",
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
                  min: 0,
                  message: "Số nhánh chính phải là một số nguyên dương!",
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
                  max: 100000000000,
                  message:
                    "Giá tiền phải có ít nhất 0 Vnd và nhiều nhất 100,000,000,000 Vnd!",
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
            <Form.Item label="Kích cỡ">
              <div className="mt-3">
                <Form.Item
                  name="DeliverySize"
                  rules={[
                    {
                      type: "number",
                      required: true,
                      message: "Kích cõ không được để trống!",
                    },
                  ]}
                >
                  <Select>
                    {deliverySizeList?.map((deleverySize, index) => (
                      <Select.Option value={deleverySize.value} key={index}>
                        {deleverySize.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
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

export default ModalCreateProduct;
