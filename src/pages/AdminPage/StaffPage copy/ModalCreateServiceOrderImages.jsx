import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Tag,
  Input,
  Modal,
  Form,
  InputNumber,
  Select,
  Upload,
  Button,
} from "antd";
const { Search, TextArea } = Input;

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listAllContract } from "../../../redux/slice/contractSlice";
import { postContractImages } from "../../../utils/contractApi";
import { postServieOrderImages } from "../../../utils/serviceOrderApi";
import { allServiceOrder } from "../../../redux/slice/serviceOrderSlice";

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

const ModalCreateServiceOrderImages = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, serviceOrderImages, serviceOrderDetail } = props;
  const handleClose = () => {
    setFormData({
      image: "",
    });
    form.resetFields();
    setListImage([]);
    setShow(false);
  };
  const [formData, setFormData] = useState({
    image: "",
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [listImage, setListImage] = useState([]);
  const formRef = useRef(null);

  // useEffect(() => {
  //   if (contractImages != undefined) {
  //     console.log(contractImages);
  //     setFormData({
  //       Image: fetchListImage(),
  //     });
  //   }
  // }, [contractImages]);

  useEffect(() => {
    if (show === true) {
      form.setFieldsValue(formData);
    }
  }, [form, formData]);
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

  const uploadButton = <Button className="w-[100%]" icon={<UploadOutlined />}>Tải file</Button>;

  // const fetchListImage = () => {
  //   const image = bonsai?.bonsaiImages?.map((data) => ({
  //     url: data.imageUrl,
  //     uid: "",
  //   }));
  //   setListImage(image);
  //   return image;
  // };
  const updateListImage = (data) => {
    try {
      console.log(data);
      console.log(serviceOrderDetail);
      postServieOrderImages(serviceOrderDetail.id, data)
        .then((data) => {
          toast.success("Cập nhật thành công!");
          dispatch(
            allServiceOrder({
              pageIndex: 0,
              pageSize: 10,
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
    formData.image = listImage[0] ? listImage[0].originFileObj : null;
    const postData = new FormData();
    postData.append("Contract", formData.image);
    console.log(formData);
    formRef.current
      .validateFields()
      .then(() => {
        setConfirmLoading(true);
        updateListImage(postData);
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
    return false;
  };

  return (
    <>
      <Modal
        width={500}
        title="Thêm file hợp đồng"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        okText={confirmLoading ? "Đang tải" : "Thêm file hợp đồng"}
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
            initialValues={formData}
          >
            <Form.Item
              label="Đăng tải file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                accept="application/pdf"
                fileList={listImage}
                //onPreview={handlePreview}
                beforeUpload={beforeUpload}
                onChange={(e) => {
                  console.log(e.fileList);
                  handleChange(e.fileList);
                }}
              >
                {listImage.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default ModalCreateServiceOrderImages;
