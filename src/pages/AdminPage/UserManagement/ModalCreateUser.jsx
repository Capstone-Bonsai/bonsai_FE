import React, { useState, useEffect, useRef } from "react";
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
const { Search } = Input;
import { useDispatch, useSelector } from "react-redux";
import { getListRole } from "../../../utils/apiService";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../utils/apiService";
import { fetchAllUsers } from "../../../redux/slice/userSlice";
import { getUserRole } from "../../../components/status/userRole";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
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
const ModalCreateUser = (props) => {
  const [form] = Form.useForm();
  const { show, setShow } = props;
  const handleClose = () => {
    setError([]);
    setFormData({
      role: "",
      fullname: "",
      email: "",
      phone: "",
      userName: "",
      avatar: [],
    });
    form.resetFields();
    setConfirmLoading(false);
    setFileList([]);
    setFormDisabled(false);
    setShow(false);
  };
  const [listRole, setListRole] = useState([]);
  const [formData, setFormData] = useState({
    role: "",
    fullname: "",
    email: "",
    phone: "",
    userName: "",
    avatar: [],
  });
  const dispatch = useDispatch();
  const [error, setError] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const formRef = useRef(null);
  useEffect(() => {
    fetchListRole();
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
  const handleChange = (i) => setFileList(i);
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
  const fetchListRole = () => {
    getListRole()
      .then((data) => {
        setListRole(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.value
        ) {
          toast.error(err.response.data.value);
        } else {
          toast.error("Đã xảy ra lỗi!");
        }
      });
  };
  const createUser = () => {
    try {
      const postData = new FormData();
      postData.append("Role", formData.role);
      postData.append("Fullname", formData.fullname);
      postData.append("UserName", formData.userName);
      postData.append("Email", formData.email);
      postData.append("PhoneNumber", formData.phone);
      postData.append(
        "Avatar",
        formData.avatar[0] ? formData.avatar[0].originFileObj : null
      );
      console.log(formData);
      postCreateNewUser(postData)
        .then((data) => {
          toast.success(data.data);
          dispatch(fetchAllUsers({ pageIndex: 0, pageSize: 10 }));
          handleClose();
        })
        .catch((err) => {
          toast.error(err.response.data);
        })
        .finally(() => {
          setConfirmLoading(false);
          setFormDisabled(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOk = () => {
    formRef.current
      .validateFields()
      .then(() => {
        setFormDisabled(true);
        setConfirmLoading(true);
        createUser();
      })
      .catch((errorInfo) => {
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };
  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  const validatePhoneNumber = (_, value) => {
    if (!value || /^\d{10}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Số điện thoại phải có đúng 10 chữ số."));
  };
  const validatePhoneNumberStartWith = (_, value) => {
    if (!value || /^(03|05|07|08|09)/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09.")
    );
  };

  const validateUserName = (_, value) => {
    if (!value || /^[a-zA-Z0-9]{1,50}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Tên đăng nhập chỉ được chứa chữ hoặc số.")
    );
  };

  const validateImage = (_, value) => {
    const isFileSizeValid = value[0]?.size
      ? value[0]?.size <= MAX_FILE_SIZE
      : true;

    const isFileTypeValid = value[0]?.type
      ? ALLOWED_FILE_TYPES.includes(value[0]?.type)
      : true;

    if (!isFileSizeValid) {
      // message.error("Kích thước file quá lớn, vui lòng chọn file nhỏ hơn 10MB");
      return Promise.reject(
        new Error("Kích thước file quá lớn, vui lòng chọn file nhỏ hơn 10MB")
      );
    }

    if (!isFileTypeValid) {
      // message.error(
      //   "Định dạng file không hợp lệ, vui lòng chọn file ảnh (JPEG, PNG, GIF)"
      // );
      return Promise.reject(
        new Error(
          "Định dạng file không hợp lệ, vui lòng chọn file ảnh (JPEG, PNG, GIF)"
        )
      );
    }
    return Promise.resolve();
  };

  const beforeUpload = () => {
    // const isFileSizeValid = file.size <= MAX_FILE_SIZE;
    // const isFileTypeValid = ALLOWED_FILE_TYPES.includes(file.type);

    // if (!isFileSizeValid) {
    //   message.error("Kích thước file quá lớn, vui lòng chọn file nhỏ hơn 10MB");
    // }

    // if (!isFileTypeValid) {
    //   message.error(
    //     "Định dạng file không hợp lệ, vui lòng chọn file ảnh (JPEG, PNG, GIF)"
    //   );
    // }
    return false;
  };

  return (
    <>
      <Modal
        title="Thêm người dùng mới"
        open={show}
        onOk={handleOk}
        okButtonProps={{ type: "default" }}
        okText={confirmLoading ? "Đang tạo" : "Tạo mới"}
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!" },
                { type: "email", message: "Email không hợp lệ!" },
                { max: 50, message: "Email không quá 50 ký tự!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên đăng nhập"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Tên đăng nhập không được để trống!",
                },
                { validator: validateUserName },
                { max: 50, message: "Tên đăng nhập không quá 50 ký tự!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống!",
                },
                {
                  min: 10,
                  max: 10,
                  message: "Số điện thoại phải có đúng 10 chữ số!",
                },
                {
                  pattern: /^\d+$/,
                  message: "Số điện thoại chỉ được chứa các chữ số!",
                },
                { validator: validatePhoneNumberStartWith },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Họ tên"
              name="fullname"
              rules={[
                { required: true, message: "Họ tên không được để trống!" },
                { max: 50, message: "Họ tên không quá 50 ký tự!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Vai trò"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Vai trò của tài khoản không được để trống!",
                },
              ]}
            >
              <Select>
                {listRole?.map((role, index) => (
                  <Select.Option key={index} value={role}>
                    {getUserRole(role)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="avatar"
              label="Ảnh đại diện"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  validator: validateImage,
                },
              ]}
            >
              <Upload
                listType="picture-circle"
                onPreview={handlePreview}
                beforeUpload={beforeUpload}
              >
                {formData.avatar?.length >= 1 ? null : uploadButton}
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
    </>
  );
};
export default ModalCreateUser;
