import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/slice/authSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  console.log(emailError);
  console.log(email);
  const navigate = useNavigate();
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleForgotPassword = async () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email ko được để trống!!");
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
    <>
      <div className=" top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center my-10">
        <div className="bg-[#ffffff] w-[30%] drop-shadow-lg">
          <div className="w-[90%] m-auto h-full text-center">
            <h2 className="underline text-[20px] font-bold">Quên mật khẩu</h2>

            <label>Vui lòng nhập email</label>
            <div className="flex justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value), setEmailError("");
                }}
                placeholder="bonsai@gmail.com"
                className={`w-full border ${
                  emailError != "" ? "border-[#ff4d4f]" : "border-[#999999] "
                } py-[10px] px-[20px] my-[15px] outline-none`}
              />
              <button
                onClick={handleForgotPassword}
                className="hover:text-[#3a9943] ml-5 outline-none"
              >
                Gửi
              </button>
            </div>
            {emailError != "" ? (
              <div className="text-[#ff4d4f]">{emailError}</div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-full flex justify-end p-2 hover:text-[#3a9943]">
            <Link to="/Login">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
