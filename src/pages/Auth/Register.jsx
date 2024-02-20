import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../redux/slice/authSlice";
import Loading from "../../components/Loading";

function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Bạn cần phải điền đầy đủ thông tin!");
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
    } catch (error) {
      console.error("Error during registration:", error);
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
        <div className=" fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center">
          <ToastContainer />
          <div className="bg-[#ffffff] w-[30%] drop-shadow-lg">
            <div className="w-[90%] m-auto h-full mb-5 ">
              <h2 className="underline text-[20px] font-bold">Register</h2>
              <div className="flex justify-between">
                <div>
                  <label>Full Name</label>
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
                  <label>User Name</label>
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
                <label>Password:</label>
                <div className="flex justify-center">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" w-full border border-[#999999] py-[10px] px-[20px] my-[15px]"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label>Email</label>
                  <div className="flex justify-center">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className=" w-full border border-[#999999] py-[10px] px-[20px] my-[15px]"
                    />
                  </div>
                </div>
                <div>
                  <label>Phone</label>
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
                  Register
                </button>
                <Link to="/login" className="hover:text-[#3a9943]">
                  Đã có tài khoản?
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
