import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Image, message, Upload } from "antd";
import { toast } from "react-toastify";
import { updateProfileUser } from "../../redux/slice/authSlice";
function ProfileUser() {
  const cookies = new Cookies();
  const userInfo = cookies?.get("userData");
  const [userName, setUserName] = useState(userInfo?.userName);
  const [fullName, setFullName] = useState(userInfo?.fullname);
  const [imageAvt, setImageAvt] = useState(userInfo?.avatarUrl);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber);
  const [file, setFile] = useState(imageAvt);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
  };
  const handleUploadClick = () => {
    document.getElementById("upload-input").click();
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("Username", userName);
    formData.append("Fullname", fullName);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Avatar", file);
    try {
      await updateProfileUser(formData);
      toast.success("Update thành Công");
      const newData = {
        ...userInfo,
        userName: userName,
        fullname: fullName,
        avatarUrl: file,
        phoneNumber: phoneNumber,
      };
      cookies.set("userData", newData);
    } catch (error) {
      toast.error("Update không thành công", error);
    }
  };
  return (
    <div className="m-auto w-[70%] mt-10 drop-shadow-lg bg-[#ffffff]">
      <div className="text-center flex flex-col items-center">
        <div className=" items-center">
          <div className=" flex flex-col items-center justify-center">
            {imageAvt != null || file != imageAvt ? (
              <div className="w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <Image
                  src={previewImage || file || imageAvt}
                  className="rounded-full bg-cover"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              <div className="bg-[#f2f2f2] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <UserOutlined />
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="upload-input"
              />
              <button
                onClick={handleUploadClick}
                className="border p-1 rounded-lg my-5"
              >
                <UploadOutlined />
                Tải hình ảnh
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[200px]  text-end">Tài khoản</div>
          <input
            className="border border-black py-2 w-[300px] rounded-xl pl-5 ml-2 border-opacity-30 outline-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex items-center my-5">
          <div className=" w-[200px] text-end">Họ và Tên</div>
          <input
            className="border border-black py-2 w-[300px] rounded-xl pl-5 ml-2 border-opacity-30 outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <div className=" w-[200px] text-end">Số điện thoại</div>
          <input
            className="border border-black py-2 w-[300px] rounded-xl pl-5 ml-2 border-opacity-30 outline-none"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-[green] py-2 px-2 my-5 rounded-lg text-[#ffffff]"
        >
          Thay đổi
        </button>
      </div>
    </div>
  );
}

export default ProfileUser;
