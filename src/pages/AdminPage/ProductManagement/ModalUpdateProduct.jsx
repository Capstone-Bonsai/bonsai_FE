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
import { postProduct } from "../../../utils/productApi";
import { fetchAllProduct, fetchProductById } from "../../../redux/productSlice";
import { getListTag } from "../../../utils/tagApi";

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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Sub: "",
      Name: "",
      Description: "",
      TreeShape: "",
      AgeRange: "",
      Height: "",
      Unit: "",
      Quantity: "",
      UnitPrice: "",
    },
  });
  const handleClose = () => {
    setListImage([]);
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
      fetchListImage();
    }
  }, [product]);

  // let productDetail = useSelector((state) => state.product.productById);
  const handleChangeTagList = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
    setValue("Tag", nextSelectedTags);
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
    const image = product?.productImages.map((data) => ({
      url: data.imageUrl,
      uid: "",
    }));
    setListImage([...listImage, ...image]);
  };

  const updateProduct = () => {
    try {
      const postData = new FormData();
      postProduct(postData)
        .then((data) => {
          setConfirmLoading(false);
          toast.success(data.data);
          dispatch(fetchAllProduct());
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
        updateProduct();
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
        title="Thêm sản phẩm"
        open={show}
        okText={confirmLoading ? "Uploading" : "Start Upload"}
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
                name="Sub"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    {listSubCategory?.map((subCategory, index) => (
                      <Select.Option value={subCategory.categoryId} key = {index}>{subCategory.name}</Select.Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
            <Form.Item label="Tên sản phẩm">
              <Controller
                name="Name"
                control={control}
                render={({ field }) => (
                  <Input {...field} rows={4} value={product?.name} />
                )}
              />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Controller
                name="Description"
                control={control}
                render={({ field }) => (
                  <TextArea {...field} rows={4} value={product?.description} />
                )}
              />
            </Form.Item>
            <Form.Item label="Dáng cây">
              <Controller
                name="TreeShape"
                control={control}
                render={({ field }) => (
                  <Input {...field} value={product?.treeShape} />
                )}
              />
            </Form.Item>
            <Form.Item label="Số tuổi">
              <InputNumber
                {...register("AgeRange")}
                value={product?.ageRange}
              />
            </Form.Item>
            <Form.Item label="Chiều cao" name="Height">
              <InputNumber {...register("Height")} value={product?.height} />
            </Form.Item>
            <Form.Item label="Đơn vị">
              <Controller
                name="Unit"
                control={control}
                render={({ field }) => (
                  <Input {...field} value={product?.unit} />
                )}
              />
            </Form.Item>
            <Form.Item label="Kho sẵn">
              <InputNumber
                {...register("Quantity")}
                value={product?.quantity}
              />
            </Form.Item>
            <Form.Item label="Giá tiền">
              <InputNumber
                {...register("UnitPrice")}
                value={product?.unitPrice}
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
                render={({ field }) => (
                  <Upload
                    {...field}
                    listType="picture-card"
                    onPreview={handlePreview}
                    beforeUpload={beforeUpload}
                    fileList={listImage}
                  >
                    {uploadButton}
                  </Upload>
                )}
              />
            </Form.Item>
            <Form.Item label="Tag" valuePropName="text">
              <Space size={[0, 8]} wrap>
                {listTag?.map((tag, index) => (
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <CheckableTag
                        key={tag}
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={(checked) => {
                          handleChangeTagList(tag, checked);
                        }}
                      >
                        {tag}
                      </CheckableTag>
                    )}
                    name={`Tag[${index}]`}
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
