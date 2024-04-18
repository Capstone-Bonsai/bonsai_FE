import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/slice/authSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  console.log(email);
  const navigate = useNavigate();
  const handleForgotPassword = async () => {
    try {
      await forgotPassword({ email });
      navigate("/CodeOTP", { state: { email: email } });
      toast.success("Đã gửi xác nhận qua mail");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
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
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="bonsai@gmail.com"
                className="w-full border border-[#999999] py-[10px] px-[20px] my-[15px] outline-none"
              />
              <button
                onClick={handleForgotPassword}
                className="hover:text-[#3a9943] ml-5 outline-none"
              >
                Gửi
              </button>
            </div>
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
