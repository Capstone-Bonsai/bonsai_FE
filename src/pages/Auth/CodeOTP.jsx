import React, { useEffect, useRef, useState } from "react";
import { OtpHandler } from "../../redux/slice/authSlice";
import { useLocation } from "react-router-dom";
import {  toast } from "react-toastify";

function CodeOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [codeOTP, setCodeOTP] = useState("");
  const inputRefs = useRef([]);
  console.log(otp);
  console.log(codeOTP);
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] == "") {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleClick = (index) => {
    let firstEmptyIndex = null;
    for (let i = 0; i < index; i++) {
      if (otp[i] === "") {
        firstEmptyIndex = i;
        break;
      }
    }
    if (firstEmptyIndex !== null) {
      inputRefs.current[firstEmptyIndex].focus();
    }
  };
  const handleCodeOTP = async () => {
    try {
      const response = await OtpHandler(email, codeOTP);
      console.log(response);
      toast.success(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const allFilled = otp.every((digit) => digit !== "");
    if (allFilled) {
      setCodeOTP(otp.join(""));
    } else {
      setCodeOTP("");
    }
  }, [otp]);
  return (
    <div className=" w-full h-full flex justify-center items-center my-10">
      <div className="bg-[#ffffff] w-[30%] drop-shadow-lg py-5 flex flex-col">
        <div className="w-[90%] m-auto h-full text-center">
          <h2 className="underline text-[20px] font-bold">Nhập OTP</h2>
        </div>
        <div className="flex justify-center my-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onClick={() => handleClick(index)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              className="w-10 h-10 text-center border outline-none border-gray-300 rounded-md mx-1"
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            disabled={codeOTP === ""}
            onClick={handleCodeOTP}
            className={`${
              codeOTP === "" ? "hover:cursor-not-allowed" : ""
            } hover:bg-[#3a9943] py-2 px-5 text-[#fff] rounded-[10px] bg-black`}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeOTP;
