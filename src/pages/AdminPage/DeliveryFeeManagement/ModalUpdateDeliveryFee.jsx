import React, { useState, useEffect, useRef } from "react";
import { Tag, Modal, Form, Select, Button, Input, Upload } from "antd";
const { Search, TextArea } = Input;
import { EditOutlined, PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getListDeliveryFee,
  putListDeliveryFee,
} from "../../../utils/apiService";

const { Dragger } = Upload;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return [e.file];
};

const ModalUpdateDeliveryFee = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, fetchDeliveryFee } = props;
  const handleClose = () => {
    setFormData({
      file: "",
    });
    form.resetFields();
    setShow(false);
  };
  const [formData, setFormData] = useState({
    file: "",
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);
  const [listImage, setListImage] = useState([]);
  const formRef = useRef(null);
  const handleChange = (i) => {
    setListImage(i);
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

  const updateDeliveryFee = (data) => {
    try {
      putListDeliveryFee(data)
        .then((data) => {
          toast.success(data.data);
          fetchDeliveryFee();
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
    formData.file = listImage[0] ? listImage[0].originFileObj : null;
    const postData = new FormData();
    postData.append("file", formData.file);
    formRef.current
      .validateFields()
      .then(() => {
        setFormDisabled(true);
        setConfirmLoading(true);
        updateDeliveryFee(postData);
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
        title="Chỉnh sửa bảng giá"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        okText={confirmLoading ? "Đang sửa" : "Chỉnh sửa"}
        cancelText="Hủy"
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
            disabled={formDisabled}
          >
            <Form.Item
              label="Thêm File"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Dragger
                maxCount={1}
                accept="application/*"
                fileList={listImage}
                beforeUpload={beforeUpload}
                onChange={(e) => {
                  handleChange(e.fileList);
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Nhấp hoặc kéo tệp vào khu vực này để tải lên
                </p>
                <p className="ant-upload-hint">
                  Hỗ trợ tải lên một lần hoặc hàng loạt. Nghiêm cấm tải lên dữ
                  liệu công ty hoặc các tập tin bị cấm khác.
                </p>
              </Dragger>
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

export default ModalUpdateDeliveryFee;
