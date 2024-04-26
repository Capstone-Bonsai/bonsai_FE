import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../redux/slice/authSlice";
import { Form, Input, Button } from "antd";
import Loading from "../../components/Loading";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const res = await register(values);
      toast.success(res);
    } catch (error) {
      console.log(error);
      const errorMessage = Array.isArray(error.response.data)
        ? error.response.data.join(", ")
        : error.response.data;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = (_, value) => {
    const hasNumber = /\d/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (value.length < 6) {
      return Promise.reject("Mật khẩu phải có ít nhất 6 ký tự!");
    }
    if (value.length > 50) {
      return Promise.reject("Mật khẩu không được quá 50 ký tự!");
    }
    if (!hasNumber) {
      return Promise.reject("Mật khẩu phải chứa ít nhất 1 chữ số!");
    }
    if (!hasLowerCase) {
      return Promise.reject("Mật khẩu phải chứa ít nhất 1 chữ cái thường!");
    }
    if (!hasUpperCase) {
      return Promise.reject("Mật khẩu phải chứa ít nhất 1 chữ cái hoa!");
    }
    if (!hasSpecialChar) {
      return Promise.reject("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!");
    }

    return Promise.resolve();
  };

  const validatePhoneNumber = (_, value) => {
    if (/^\d+$/.test(value)) {
      if (value.length === 10) {
        if (/^(03|05|07|08|09)/.test(value)) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            "Số điện thoại phải bắt đầu bằng 03, 05, 07, 08, 09"
          );
        }
      } else {
        return Promise.reject("Số điện thoại phải có độ dài là 10 số");
      }
    } else {
      return Promise.reject("Vui lòng chỉ nhập số trong trường này");
    }
  };

  const validateUserName = (_, value) => {
    if (/^[a-zA-Z0-9]+$/.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject("Tên đăng nhập chỉ được chứa chữ cái và số");
    }
  };

  return (
    <div className="w-full h-full flex justify-center my-10 relative">
      <div className="bg-[#ffffff] w-[30%] drop-shadow-lg">
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="w-[90%] m-auto h-full mb-5"
        >
          <h2 className="underline text-[20px] font-bold">Đăng ký</h2>
          <Form.Item
            label="Họ và Tên"
            name="fullName"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên!" },
              {
                max: 50,
                message: "Họ và tên không được vượt quá 50 ký tự!",
              },
            ]}
          >
            <Input className="w-full border py-[10px] px-[20px] rounded-none" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
            ]}
          >
            <Input className="w-full border py-[10px] px-[20px] rounded-none" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { validator: validatePhoneNumber },
            ]}
          >
            <Input
              type="number"
              className="w-full border py-[10px] px-[20px] rounded-none"
            />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập"
            name="userName"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              { validator: validateUserName },
            ]}
          >
            <Input className="w-full border py-[10px] px-[20px] rounded-none" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { validator: validatePassword },
            ]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="w-full border py-[10px] px-[20px] rounded-none"
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="w-full border py-[10px] px-[20px] rounded-none"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="uppercase bg-black rounded-[3px] text-[#ffffff] w-[140px] h-[36px]"
              style={{
                backgroundColor: "#3a9943",
                color: "#ffffff",
                outline: "none",
              }}
            >
              Đăng ký
            </Button>
            <Link to="/login" className="hover:text-[#3a9943] ml-3">
              Đã có tài khoản?
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
