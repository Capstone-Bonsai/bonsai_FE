import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Input, Button, message } from "antd";
import { changePassword } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

function ChangePassword(props) {
  const { setPageChangePassword } = props;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmPasswordChange = async () => {
    let isValid = true;
    if (!oldPassword.trim()) {
      setErrorMessage("Vui lòng nhập mật khẩu cũ!!");
      isValid = false;
    }
    if (newPassword === oldPassword) {
      setErrorMessage("Mật khẩu mới phải khác mật khẩu cũ.");
      isValid = false;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp với mật khẩu mới.");
      isValid = false;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "Mật khẩu mới phải có ít nhất 6 ký tự, bao gồm ít nhất 1 ký tự viết thường, 1 ký tự viết hoa, 1 số, và 1 ký tự đặc biệt."
      );
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    try {
      const res = await changePassword(payload);
      toast.success(res);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="text-left">
      <button onClick={() => setPageChangePassword(false)}>
        <ArrowLeftOutlined />
      </button>
      <div className="font-bold text-2xl text-center my-4">Đổi mật khẩu</div>
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-2">
          <label htmlFor="oldPassword" className="w-[200px] text-right mr-2">
            Mật khẩu cũ:
          </label>
          <Input.Password
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border py-2 w-[300px] rounded-xl pl-5 outline-none"
          />
        </div>
        <div className="flex items-center mb-2">
          <label htmlFor="newPassword" className="w-[200px] text-right mr-2">
            Mật khẩu mới:
          </label>
          <Input.Password
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border py-2 w-[300px] rounded-xl pl-5 outline-none"
          />
        </div>
        <div className="flex items-center mb-2">
          <label
            htmlFor="confirmPassword"
            className="w-[200px] text-right mr-2"
          >
            Xác nhận mật khẩu mới:
          </label>
          <Input.Password
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border py-2 w-[300px] rounded-xl pl-5 outline-none"
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
        )}
        <div>
          <Button
            style={{
              backgroundColor: "#3a9943",
              color: "#ffffff",
              outline: "none",
            }}
            onClick={handleConfirmPasswordChange}
            className="py-2 px-4 rounded-lg border flex justify-center items-center"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
