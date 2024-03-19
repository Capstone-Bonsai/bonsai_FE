import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Image, message, Upload } from "antd";
import { toast } from "react-toastify";
import { profileUser, updateProfileUser } from "../../redux/slice/authSlice";
import { setAvatarUrlRedux } from "../../redux/slice/avatarSlice";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import NavbarUser from "../Auth/NavbarUser";
import MinHeight from "../../components/MinHeight";
function ProfileUser() {
  const cookies = new Cookies();
  const userInfo = cookies?.get("userData");
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(userInfo?.userName);
  const [fullName, setFullName] = useState(userInfo?.fullname);
  const [imageAvt, setImageAvt] = useState(userInfo?.avatarUrl);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber);
  const [file, setFile] = useState(imageAvt);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
console.log(file);
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
    setIsLoading(true);
    try {
      await updateProfileUser(formData);
      cookies.remove("userData");
      profileUser()
        .then((data) => {
          cookies.set("userData", data);
          dispatch(setAvatarUrlRedux(data.avatarUrl));
          setIsLoading(false);
          toast.success("Update thành Công");
        })
        .catch((error) => {
          console.error("Error while fetching profile data:", error);
        });
    } catch (error) {
      toast.error("Update không thành công", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <MinHeight>
          <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
            <NavbarUser />
            <div className="text-center border w-[75%] flex flex-col items-center p-4">
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
        </MinHeight>
      )}
    </>
  );
}

export default ProfileUser;
