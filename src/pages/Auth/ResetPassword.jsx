import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const location = useLocation();
  const email = location.state?.email;
  const codeOTP = location.state?.codeOTP;
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  console.log(email);
  console.log(codeOTP);
  console.log(passwordError);
  const validatePassword = (password) => {
    // Biểu thức chính quy kiểm tra mật khẩu:
    // Ít nhất 1 ký tự đặc biệt, 1 số, 1 chữ hoa và có ít nhất 8 ký tự
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z])$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = () => {
    let isValid = true;
    if (newPassword != newPasswordConfirm) {
      setPasswordError("2 mật khẩu không trùng khớp!!");
      isValid = false;
    }
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Mật khẩu mới phải chứa ít nhất một ký tự đặc biệt, một số và một chữ hoa, và ít nhất 8 ký tự!!"
      );
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    payload = {
      email: email,
      code: codeOTP,
      newPassword: newPassword,
      confirmPassword: newPasswordConfirm,
    };
  };
  return (
    <div className=" w-full h-full flex justify-center items-center my-10">
      <div className="bg-[#ffffff] w-[30%] drop-shadow-lg py-5 flex flex-col">
        <div className="w-[90%] m-auto h-full text-center">
          <h2 className="underline text-[20px] font-bold">Đặt lại mật khẩu</h2>
        </div>
        <div className="">
          <div className=" flex justify-center items-center my-2 gap-2">
            <div className="w-[150px] text-end">Mật khẩu</div>
            <div>
              <input
                type="password"
                name=""
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className=" h-10 border outline-none border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="flex justify-center items-center my-2 gap-2">
            <div className="w-[150px] text-end">Nhập lại mật khẩu</div>
            <div>
              <input
                type="password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                name=""
                className={`h-10 border outline-none ${
                  passwordError != "" ? "border-[#ff4d4f]" : "border-gray-300"
                } rounded-md p-2`}
              />
            </div>
          </div>
          {passwordError != "" ? (
            <div className="text-[#ff4d4f] text-center">{passwordError}</div>
          ) : (
            ""
          )}
          <div className="flex justify-center">
            <button
              onClick={handleResetPassword}
              className="flex bg-[#3a9943] p-2 rounded-[5px] text-[#fff] hover:bg-gray-500"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
