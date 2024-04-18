import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../redux/slice/authSlice";
import { Form, Input, Button } from "antd";
import Loading from "../../components/Loading";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    setErrorMessage("");
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

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
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
                className=""
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
                label="Tên đăng nhập"
                name="userName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                ]}
              >
                <Input className="w-full border py-[10px] px-[20px] rounded-none" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                  className="w-full border py-[10px] px-[20px] rounded-none"
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input className="w-full border py-[10px] px-[20px] rounded-none" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input className="w-full border py-[10px] px-[20px] rounded-none" />
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
            {/* {errorMessage && (
              <div className="absolute right-[10rem] w-[500px]">
                <div className="text-red-500 text-[20px]">Thông báo lỗi:</div>
                <div className="text-[12px]">- {errorMessage}</div>
              </div>
            )} */}
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
