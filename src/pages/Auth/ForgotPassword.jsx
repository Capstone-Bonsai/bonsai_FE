import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/slice/authSlice";
import { Form, Input, Button } from "antd";

function ForgotPassword() {
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async (values) => {
    setEmailError(""); // Reset lỗi trước khi kiểm tra
    const { email } = values;
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email không được để trống!!");
      isValid = false;
    } else if (!isValidEmail(email.trim())) {
      setEmailError("Email không hợp lệ!!");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const res = await forgotPassword({ email });
      console.log(res);
      navigate("/CodeOTP", { state: { email: email } });
      toast.success(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.response);
    }
  };

  return (
    <div className="top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center my-10">
      <div className="bg-[#ffffff] w-[30%] drop-shadow-lg">
        <div className="w-[90%] m-auto h-full text-center">
          <h2 className="underline text-[20px] font-bold">Quên mật khẩu</h2>
          <Form
            name="forgotPasswordForm"
            initialValues={{ remember: true }}
            onFinish={handleForgotPassword}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input className="py-[10px]" placeholder="Email" />
            </Form.Item>

            <Form.Item>
              <Button
                style={{
                  backgroundColor: "#3a9943",
                  color: "#ffffff",
                  outline: "none",
                }}
                htmlType="submit"
              >
                Gửi
              </Button>
            </Form.Item>
          </Form>
          {emailError && <div className="text-[#ff4d4f]">{emailError}</div>}
        </div>
        <div className="w-full flex justify-end p-2 hover:text-[#3a9943]">
          <Link to="/Login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
