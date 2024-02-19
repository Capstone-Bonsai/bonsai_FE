import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
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

import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../redux/productSlice";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const normInput = (e) => {
  console.log(e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function ProductManage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);

  const {
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

  const allProduct = useSelector((state) => state.product.allProductDTO.items);
  console.log(allProduct);

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const showModalDelete = () => {
    setOpenDelete(true);
  };

  const handleDelete = () => {
    setConfirmLoadingDelete(true);
    setTimeout(() => {
      setOpenDelete(false);
      setConfirmLoadingDelete(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };

  const onSubmit = (input) => {
    console.log(input);
  };
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kho sẵn",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá tiền",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Chiều cao",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Hình dáng",
      dataIndex: "treeShape",
      key: "treeShape",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Trạng thái",
      dataIndex: "isDisable",
      key: "isDisable",
      render: (_, record) => (
        <>
          <Tag color={record.isDisable == false ? "geekblue" : "red"}>
            {record.isDisabled == false ? "no" : "yes"}
          </Tag>
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={showModalDelete}>Xóa</button>
          <a>Xem thông tin</a>
        </Space>
      ),
    },
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <div className="flex justify-center mt-12">
        <div className="w-[70%]">
          <div className="font-semibold mb-6">Sản phẩm</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showModal}
                >
                  <PlusCircleOutlined /> Thêm sản phẩm
                </button>
              </div>
              <div className="pr-0">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  className="w-[300px]"
                  allowClear
                />
              </div>
            </div>
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allProduct}
                columns={columns}
              />
            </div>
          </div>
        </div>
        <Modal
          title="Thêm sản phẩm"
          open={open}
          okText={uploading ? 'Uploading' : 'Start Upload'}
          okButtonProps={{ type: "default" }}
          confirmLoading={uploading}
          onCancel={handleCancel}
          onOk={handleSubmit(onSubmit)}
        >
          <div className="">
            <Form
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
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>
              <Form.Item label="Tên sản phẩm">
                <Controller
                  name="Name"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Mô tả">
                <Controller
                  name="Description"
                  control={control}
                  render={({ field }) => <TextArea {...field} rows={4} />}
                />
              </Form.Item>
              <Form.Item label="Dáng cây">
                <Controller
                  name="TreeShape"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Số tuổi">
                <InputNumber {...register("AgeRange")} />
              </Form.Item>
              <Form.Item label="Chiều cao">
                <InputNumber {...register("Height")} />
              </Form.Item>
              <Form.Item label="Đơn vị">
                <InputNumber {...register("Unit")} />
              </Form.Item>
              <Form.Item label="Kho sẵn">
                <InputNumber {...register("Quantity")} />
              </Form.Item>
              <Form.Item label="Giá tiền">
                <InputNumber {...register("UnitPrice")} />
              </Form.Item>
              <Form.Item
                label="Upload ảnh"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload {...register("Image")} listType="picture-card">
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
              </Form.Item>
              {/* <Form.Item
                label="Tag"
                valuePropName="text"
                getValueFromEvent={normInput}
              >
                <Input action="" listType="text" />
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                </button>
              </Form.Item> */}
            </Form>
          </div>
        </Modal>
        <Modal
          title="Xóa sản phẩm"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
        >
          <div>Bạn có muốn xóa sản phẩm này không?</div>
        </Modal>
      </div>
    </>
  );
}

export default ProductManage;
