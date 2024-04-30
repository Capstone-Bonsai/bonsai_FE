import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Image, message, Upload } from "antd";
import { toast } from "react-toastify";
import { profileUser, updateProfileUser } from "../../../redux/slice/authSlice";
import {
  setAvatarUrlRedux,
  setFullNameRedux,
} from "../../../redux/slice/avatarSlice";
import { useDispatch } from "react-redux";
import ChangePassword from "./ChangePassword";
import Loading from "../../../components/Loading";
import NavbarUser from "../../Auth/NavbarUser";
import MinHeight from "../../../components/MinHeight";
function ProfileAdmin() {
  const cookies = new Cookies();
  const [pageChangePassword, setPageChangePassword] = useState(false);
  const userInfo = cookies?.get("userData");
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(userInfo?.userName);
  const [fullName, setFullName] = useState(userInfo?.fullname);
  const [imageAvt, setImageAvt] = useState(userInfo?.avatarUrl);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber);
  const [userNameError, setUserNameError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  console.log(userNameError);
  const [file, setFile] = useState(imageAvt);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    let isValid = true;
    if (!userName.trim()) {
      setUserNameError("Không được bỏ trống tên tài khoản!");
      isValid = false;
    }
    if (!fullName.trim()) {
      setFullNameError("Không được bỏ trống họ tên!");
      isValid = false;
    }
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Không được bỏ trống số điện thoại!");
      isValid = false;
    } else if (phoneNumber.length != 10) {
      setPhoneNumberError("Số điện thoại phải đủ 10 số");
    }
    if (!isValid) {
      return;
    }
    const formData = new FormData();
    formData.append("Username", userName);
    formData.append("Fullname", fullName);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Avatar", file);
    setIsLoading(true);
    try {
      const res = await updateProfileUser(formData);
      console.log(res);
      cookies.remove("userData");
      profileUser()
        .then((data) => {
          cookies.set("userData", data);
          dispatch(setAvatarUrlRedux(data?.avatarUrl));
          dispatch(setFullNameRedux(data?.fullname));
          setIsLoading(false);
          toast.success(res);
        })
        .catch((error) => {
          console.error(error.response.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error.response.data);
      toast.error(
        Array.isArray(error?.response?.data)
          ? error.response.data.join(", ")
          : error?.response?.data
      );
      setUserName(userInfo?.userName);
      setFullName(userInfo?.fullname);
      setPhoneNumber(userInfo?.phoneNumber);
      setIsLoading(false);
    }
  };
  const props = {
    setPageChangePassword,
    setIsLoading,
  };
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} isRelative={true} />
      ) : (
        <MinHeight>
          <div className="m-auto w-[70%] flex mt-10 justify-center bg-[#ffffff] mb-5">
            <div className="text-center border w-[75%] flex flex-col items-center p-4">
              {!pageChangePassword ? (
                <>
                  <div className="flex justify-center items-center">
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
                    <div className="w-[200px] text-end">Tài khoản</div>
                    <div>
                      <input
                        className={`border ${
                          userNameError != "" ? "border-[#ff4d4f]" : ""
                        }  py-2 w-[300px] rounded-xl pl-5 ml-2 outline-none`}
                        value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value), setUserNameError("");
                        }}
                      />
                      {userNameError != "" ? (
                        <div className="text-[#ff4d4f] text-[14px] text-start">
                          {userNameError}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex items-center my-5">
                    <div className=" w-[200px] text-end">Họ và Tên</div>
                    <div>
                      <input
                        className={`border ${
                          fullNameError != "" ? "border-[#ff4d4f]" : ""
                        }  py-2 w-[300px] rounded-xl pl-5 ml-2 outline-none`}
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value), setFullNameError("");
                        }}
                      />
                      {fullNameError != "" ? (
                        <div className="text-[#ff4d4f] text-[14px] text-start">
                          {fullNameError}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className=" w-[200px] text-end">Số điện thoại</div>
                    <div>
                      <input
                        className={`border ${
                          phoneNumberError != "" ? "border-[#ff4d4f]" : ""
                        }  py-2 w-[300px] rounded-xl pl-5 ml-2 outline-none`}
                        value={phoneNumber}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          setPhoneNumber(value);
                          const phoneRegex = /^(03|05|07|08|09)/;
                          if (!value.match(phoneRegex)) {
                            setPhoneNumberError(
                              "Số điện thoại phải bắt đầu từ 03, 05, 07, 08, 09"
                            );
                          } else {
                            setPhoneNumberError("");
                          }
                        }}
                      />
                      {phoneNumberError != "" ? (
                        <div className="text-[#ff4d4f] text-[14px] text-start">
                          {phoneNumberError}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleUpdate()}
                    className="bg-[green] py-2 px-2 my-5 rounded-lg text-[#ffffff] border hover:"
                  >
                    Thay đổi
                  </button>
                  <button onClick={() => setPageChangePassword(true)}>
                    Đổi mật khẩu
                  </button>
                </>
              ) : (
                <div className="w-full">
                  <ChangePassword {...props} />
                </div>
              )}
            </div>
          </div>
        </MinHeight>
      )}
    </>
  );
}

export default ProfileAdmin;
