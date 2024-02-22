import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
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
import {
  fetchAllProduct,
  fetchAllProductNoPagination,
  fetchProductById,
} from "../../../redux/slice/productSlice";
import { setInitForm } from "../../../utils/setInitForm";
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
  const { show, setShow, product, listSubCategory, listTag } = props;
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   ...formValue
    // },
  });
  const handleClose = () => {
    setSelectedTags([]);
    setListImage([]);
    reset();
    setShow(false);
  };
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [listImage, setListImage] = useState([]);
  const formRef = useRef(null);
  useEffect(() => {
    if (product != undefined) {
      console.log(product);
      setValue("SubCategoryId", product.subCategoryId);
      setValue("Name", product.name);
      setValue("Description", product.description);
      setValue("TreeShape", product.treeShape);
      setValue("AgeRange", product.ageRange);
      setValue("Height", product.height);
      setValue("Unit", product.unit);
      setValue("Quantity", product.quantity);
      setValue("UnitPrice", product.unitPrice);
      setValue("Image", fetchListImage());
    }
  }, [product]);

  // let productDetail = useSelector((state) => state.product.productById);
  const handleChangeTagList = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
    setValue("TagId", nextSelectedTags);
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
    return product?.productImages.map((data) => ({
      url: data.imageUrl,
      uid: "",
    }));
  };

  const updateProduct = (data) => {
    try {
      putProduct(product.id, data)
        .then((data) => {
          setConfirmLoading(false);
          toast.success(data.data);
          dispatch(fetchAllProductNoPagination());
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
    console.log(i);
    formRef.current
      .validateFields()
      .then(() => {
        setConfirmLoading(true);
        updateProduct(i);
        setConfirmLoading(false);
      })
      .catch((errorInfo) => {
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
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
        title="Cập nhật sản phẩm"
        open={show}
        okText={confirmLoading ? "Đang cập nhật" : "Cập nhật"}
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoading}
        onCancel={handleClose}
        onOk={handleSubmit(onSubmit)}
        maskClosable={false}
      >
        <div className="">
          <Form
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 10 }}
          >
            <Form.Item label="Phân loại">
              <Controller
                name="SubCategoryId"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Select
                    {...field}
                    value={value}
                    onChange={(e) => onChange(e)}
                  >
                    {listSubCategory?.map((subCategory, index) => (
                      <Select.Option value={subCategory.id} key={index}>
                        {subCategory.name}
                      </Select.Option>
                    ))}
                    <Select.Option value={1}>1</Select.Option>
                  </Select>
                )}
              />
            </Form.Item>
            <Form.Item label="Tên sản phẩm">
              <Controller
                name="Name"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    rows={4}
                    defaultValue={product?.name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Controller
                name="Description"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <TextArea
                    {...field}
                    rows={4}
                    defaultValue={product?.description}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Dáng cây">
              <Controller
                name="TreeShape"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    defaultValue={product?.treeShape}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Số tuổi">
              <Controller
                name="AgeRange"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <InputNumber
                    {...register("AgeRange")}
                    defaultValue={product?.ageRange}
                    value={value}
                    onChange={(e) => onChange(e)}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Chiều cao" name="Height">
              <Controller
                name="Height"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <InputNumber
                    {...register("Height")}
                    defaultValue={product?.height}
                    value={value}
                    onChange={(e) => onChange(e)}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Đơn vị">
              <Controller
                name="Unit"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    defaultValue={product?.unit}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Kho sẵn">
              <Controller
                name="Quantity"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <InputNumber
                    {...register("Quantity")}
                    defaultValue={product?.quantity}
                    value={value}
                    onChange={(e) => onChange(e)}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Giá tiền">
              <Controller
                name="UnitPrice"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <InputNumber
                    {...register("UnitPrice")}
                    defaultValue={product?.unitPrice}
                    value={value}
                    onChange={(e) => onChange(e)}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              label="Upload ảnh"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Controller
                name="Image"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Upload
                    {...field}
                    listType="picture-card"
                    onPreview={handlePreview}
                    beforeUpload={beforeUpload}
                    onChange={(e) => {
                      onChange(e.fileList);
                      handleChange(e.fileList);
                    }}
                    fileList={value}
                    defaultFileList={listImage}
                  >
                    {uploadButton}
                  </Upload>
                )}
              />
            </Form.Item>
            <Form.Item label="Tag" valuePropName="text">
              <Space size={[0, 8]} wrap>
                {listTag?.items?.map((tag, index) => (
                  <Controller
                    key={index}
                    render={({ field: { onChange, value } }) => (
                      <CheckableTag
                        value={value}
                        checked={selectedTags.includes(tag.name)}
                        onChange={(checked) => {
                          handleChangeTagList(tag.name, checked);
                        }}
                      >
                        {tag.name}
                      </CheckableTag>
                    )}
                    name={`TagId`}
                    control={control}
                  />
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

export default ModalUpdateProduct;
