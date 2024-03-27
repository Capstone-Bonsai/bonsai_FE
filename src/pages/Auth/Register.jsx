import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../redux/slice/authSlice";
import Loading from "../../components/Loading";
import Item from "antd/es/list/Item";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([] || "");
  const [showPassword, setShowPassword] = useState(false);
  console.log(errorMessage);
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Bạn cần phải điền đầy đủ thông tin!");
      return;
    }
    const registerData = {
      email: email,
      username: userName,
      fullname: fullName,
      phoneNumber: phoneNumber,
      password: password,
    };
    try {
      setIsLoading(true);
      await register(registerData);
      toast.success("Đăng ký thành công");
      setErrorMessage("")
    } catch (error) {
      setErrorMessage(error.response.data);
      toast.error("Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <>
          <div className=" top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center my-10 relative">
            <ToastContainer />
            <div className="bg-[#ffffff] w-[30%] drop-shadow-lg">
              <div className="w-[90%] m-auto h-full mb-5 ">
                <h2 className="underline text-[20px] font-bold">Đăng ký</h2>
                <div className="flex justify-between">
                  <div>
                    <label>Họ và Tên</label>
                    <div className="flex justify-center">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-[#999999] py-[10px] px-[20px] my-[15px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label>
                      Tên đăng nhập <span className="text-[red]">*</span>
                    </label>
                    <div className="flex justify-center">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-[#999999] py-[10px] px-[20px] my-[15px]"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label>
                    Mật khẩu <span className="text-[red]">*</span>
                  </label>
                  <div className="flex justify-center relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className=" w-full border border-[#999999] py-[10px] px-[20px] my-[15px]"
                    />
                    <button
                      className=" absolute right-3 top-0 bottom-0 "
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeInvisibleOutlined />
                      ) : (
                        <EyeOutlined />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label>
                      Email <span className="text-[red]">*</span>
                    </label>
                    <div className="flex justify-center">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className=" w-full border border-[#999999] py-[10px] px-[20px] my-[15px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label>Số điện thoại</label>
                    <div className="flex justify-center">
                      <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className=" w-full border border-[#999999] py-[10px] px-[20px] my-[15px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    className="uppercase bg-black rounded-[3px] text-[#ffffff] w-[140px] h-[36px]"
                    onClick={handleSubmitRegister}
                  >
                    Đăng ký
                  </button>
                  <Link to="/login" className="hover:text-[#3a9943]">
                    Đã có tài khoản?
                  </Link>
                </div>
              </div>
            </div>
            {errorMessage.length > 0 ? (
              <div className="absolute right-[23rem]">
                <div className="text-[red] text-[20px]">Thông báo lỗi:</div>
                {Array.isArray(errorMessage) && errorMessage.length > 0 ? (
                  errorMessage?.map((errorItem, index) => (
                    <div key={index}>
                      <div className="text-[12px]">- {errorItem}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-[12px]">- {errorMessage}</div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Register;
