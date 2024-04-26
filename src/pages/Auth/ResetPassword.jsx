import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Input, Button } from "antd";

function ResetPassword() {
  const location = useLocation();
  const email = location.state?.email;
  const codeOTP = location.state?.codeOTP;
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    // Biểu thức chính quy kiểm tra mật khẩu:
    // Ít nhất 1 ký tự đặc biệt, 1 số, 1 chữ hoa và có ít nhất 8 ký tự
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z])\S{6,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = (values) => {
    const { newPassword, newPasswordConfirm } = values;
    let isValid = true;

    if (newPassword !== newPasswordConfirm) {
      setPasswordError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      isValid = false;
    } else if (!validatePassword(newPassword)) {
      setPasswordError(
        "Mật khẩu mới phải chứa ít nhất một ký tự đặc biệt, một số và một chữ hoa, và ít nhất 6 ký tự!"
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Tiến hành xử lý reset mật khẩu
    // payload = {
    //   email: email,
    //   code: codeOTP,
    //   newPassword: newPassword,
    //   confirmPassword: newPasswordConfirm,
    // };
  };

  return (
    <div className="w-full h-full flex justify-center items-center my-10">
      <div className="bg-[#ffffff] w-[30%] drop-shadow-lg py-5 flex flex-col">
        <div className="w-[90%] m-auto h-full text-center">
          <h2 className="underline text-[20px] font-bold">Đặt lại mật khẩu</h2>
        </div>
        <Form
          name="resetPasswordForm"
          onFinish={handleResetPassword}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          className="w-[90%] m-auto"
        >
          <Form.Item
            label="Mật khẩu"
            name="newPassword"
            className=""
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password className="py-[10px]" />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu"
            name="newPasswordConfirm"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu mới và xác nhận mật khẩu không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password className="py-[10px]" />
          </Form.Item>

          {passwordError && (
            <div className="text-red-500 text-center">{passwordError}</div>
          )}

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button
              style={{
                backgroundColor: "#3a9943",
                color: "#ffffff",
                outline: "none",
              }}
              htmlType="submit"
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
