import React, { useEffect, useRef, useState } from "react";
import MinHeight from "../../components/MinHeight";
import Cookies from "universal-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { destination } from "../../redux/slice/orderSlice";
import { addBonsaiToCart, orderBonsai } from "../../redux/slice/bonsaiSlice";
import BarLoaderLoading from "../../components/BarLoaderLoading";
import { useDispatch, useSelector } from "react-redux";
import { getDistrict, getProvince, getWard } from "../../redux/slice/address";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import CompletedAddress from "./CompletedAddress";
import { addDays } from "date-fns";
import { getStatusDeliverySize } from "../../components/status/deliverySize";
import Loading from "../../components/Loading";
import { OrderConfirmOTP, OrderOTP } from "../../redux/slice/authSlice";
import noImage from "../../assets/unImage.png";
function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmAddress, setConfirmAddress] = useState("");
  const cookies = new Cookies();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resultCode = searchParams.get("resultCode");
  const userInfo = cookies.get("user");
  const userProfile = cookies.get("userData");
  const idUser = userInfo?.id;
  const [isBarLoader, setBarLoader] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    if (userInfo != null) {
      const cartIdUser = `cartId ${idUser}`;
      return cookies.get(cartIdUser) || [];
    } else {
      return cookies.get("cartItems") || [];
    }
  });
  // const bonsaiIdOrder = cartItems.map((item) => item.bonsaiId);
  const [address, setAddress] = useState("");
  const [emailNotLogin, setEmailNotLogin] = useState("");
  const [note, setNote] = useState("");
  const [otpOrder, setOtpOrder] = useState("");
  const [haveOTP, setHaveOTP] = useState(false);
  const [userConfirm, setUserConfirm] = useState(false);
  const [confirmNote, setConfirmNote] = useState("");
  const [fullNameNoneLogin, setFullNameNoneLogin] = useState("");
  const [phoneNumberNoneLogin, setPhoneNumberNoneLogin] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [deliveryFeeInfo, setDeliveryFeeInfo] = useState({});

  //validate
  const [addressError, setAddressError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleOtpChange = (e) => {
    const otpValue = e.target.value;
    setOtpOrder(otpValue);
    if (otpValue.length !== 6) {
      setOtpError("OTP phải có độ dài 6 ký tự");
    } else {
      setOtpError("");
    }
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };

  const validateFullName = (fullName) => {
    const regex = /^[^\d`~!@#$%^&*()_\-+=|\\[\]{};:'",.<>/?]*$/;
    return regex.test(fullName);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmailNotLogin(emailValue);
    if (!validateEmail(emailValue)) {
      setEmailError("Email không hợp lệ");
    } else {
      setEmailError("");
    }
  };
  const handleFullNameChange = (e) => {
    const fullNameValue = e.target.value;
    setFullNameNoneLogin(fullNameValue);
    if (!validateFullName(fullNameValue)) {
      setFullNameError("Họ và Tên không được chứa ký tự đặc biệt hoặc số");
    } else {
      setFullNameError("");
    }
  };
  const handlePhoneNumberChange = (e) => {
    const phoneNumberValue = e.target.value;
    setPhoneNumberNoneLogin(phoneNumberValue);

    if (phoneNumberValue.length !== 10) {
      setPhoneNumberError("Số Điện Thoại phải có đúng 10 số");
    } else if (!/^(03|05|07|08|09)/.test(phoneNumberValue)) {
      setPhoneNumberError(
        "Số Điện Thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09"
      );
    } else {
      setPhoneNumberError("");
    }
  };

  console.log(deliveryFeeInfo);
  const bonsais = useSelector((state) => state.bonsai?.bonsaiInCart);
  useEffect(() => {
    if (resultCode === "0") {
      cookies.remove(userInfo ? `cartId ${idUser}` : "cartItems");
      toast.success("Thanh toán thành công");
      navigate("/ManageOrder");
    } else {
      const userTemp = cookies?.get("userTemp");
      if (userTemp) {
        setEmailNotLogin(userTemp.email);
        setFullNameNoneLogin(userTemp.fullName);
        setPhoneNumberNoneLogin(userTemp.phoneNumber);
      }
    }
  }, [resultCode]);
  useEffect(() => {
    dispatch(addBonsaiToCart(cartItems));
  }, [cartItems]);
  useEffect(() => {
    const fetchDeliveryFee = async () => {
      try {
        handleDeliveryFee(address);
      } catch (error) {}
    };
    fetchDeliveryFee();
  }, [address]);

  const handleOrder = async (e) => {
    e.preventDefault();
    const dataOrder = {
      orderInfo: {
        fullname: userProfile ? userProfile.fullname : fullNameNoneLogin,
        email: userProfile ? userProfile?.email : emailNotLogin,
        phoneNumber: userProfile
          ? userProfile.phoneNumber
          : phoneNumberNoneLogin,
      },
      address: address,
      note: note,
      listBonsai: cartItems,
    };
    if (!userInfo) {
      dataOrder.otpCode = otpOrder;
    }
    if (address.trim() === "") {
      setAddressError("Vui lòng nhập địa chỉ.");
      return;
    }
    try {
      cookies.set("userTemp", {
        email: emailNotLogin,
        fullName: fullNameNoneLogin,
        phoneNumber: phoneNumberNoneLogin,
      });
      setBarLoader(true);
      const res = await orderBonsai(dataOrder);
      setBarLoader(false);
      console.log(cartItems);
      toast.success("Đang đến trang thanh toán");
      console.log(res);
      window.location.href = res;
    } catch (error) {
      setBarLoader(false);

      console.log(error);
      console.log(Array.isArray(error.data));
      if (Array.isArray(error.data)) {
        toast.error(error.data[0], error);
      } else {
        toast.error(error.data, error);
      }
    }
  };

  const subTotal = () => {
    let totalPrice = 0;
    bonsais.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };
  const handleDeliveryFee = async (addressConfirm) => {
    setAddress(addressConfirm);
    const payload = {
      destination: addressConfirm,
      listBonsaiId: cartItems,
    };
    const res = await destination(payload);
    const fee = res?.deliveryFee;
    setDeliveryFee(fee);
    setFinalPrice(res?.finalPrice);
    setDeliveryFeeInfo(res);
  };
  const handleGetOTP = async () => {
    let isValid = true;
    if (!fullNameNoneLogin.trim()) {
      setFullNameError("Vui lòng nhập họ và tên!!");
      isValid = false;
    }
    if (!phoneNumberNoneLogin.trim()) {
      setPhoneNumberError("Vui lòng nhập số điện thoại!!");
      isValid = false;
    }
    if (!emailNotLogin.trim()) {
      setEmailError("Vui lòng nhập email!!");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    const formData = new FormData();
    formData.append("Fullname", fullNameNoneLogin);
    formData.append("Email", emailNotLogin);
    formData.append("PhoneNumber", phoneNumberNoneLogin);
    try {
      setBarLoader(true);
      const res = await OrderOTP(formData);
      setBarLoader(false);
      setHaveOTP(true);
      toast.success(res);
    } catch (error) {
      setBarLoader(false);
      toast.error(error.response.data);
    }
  };

  const handleConfirmOTP = async () => {
    try {
      const res = await OrderConfirmOTP({
        email: emailNotLogin,
        otp: otpOrder,
      });
      toast.success(res);
      setUserConfirm(true);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <MinHeight>
        {isBarLoader ? (
          <Loading loading={isBarLoader} />
        ) : (
          <div className="m-auto w-[70%]">
            <div className=" mt-10 drop-shadow-lg bg-[#ffffff]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-[#f2f2f2] h-[50px]">
                    <th className="uppercase">Hình Ảnh</th>
                    <th className="uppercase">Sản phẩm</th>
                    <th className="uppercase">Kích thước vận chuyển</th>
                    <th className="uppercase">Giá</th>
                    <th>
                      <div hidden>a</div>
                    </th>
                    <th>
                      <div hidden>a</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bonsais?.map((item) => (
                    <tr
                      key={item.id}
                      className={`${
                        item?.isDisable ? "opacity-30" : ""
                      } ml-5 text-center h-[70px] `}
                    >
                      <td className="flex justify-center items-center h-[70px]">
                        <div>
                          <img
                            src={
                              item?.bonsaiImages?.length > 0
                                ? item?.bonsaiImages[0]?.imageUrl
                                : noImage
                            }
                            alt=""
                            className="w-[50px] h-[50px] object-cover"
                          />
                        </div>
                      </td>
                      <td className="">
                        <div className={`text-[16px] font-medium `}>
                          {item.name}
                        </div>
                      </td>
                      <td className="">
                        <div className={`text-[16px] font-medium `}>
                          {getStatusDeliverySize(item?.deliverySize)}
                        </div>
                      </td>
                      <td className="font-medium">{formatPrice(item.price)}</td>
                      <td className="text-[20px] pr-5"></td>
                      <td className="text-[20px] pr-5"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex my-5 justify-between">
              <div className=" w-full p-5 border border-t-[2px] border-t-[#3e9943] rounded-b-[10px]">
                {userInfo == null && !userConfirm ? (
                  <div className="mb-5">
                    <div className="text-[20px] leading-6 font-bold  text-[#3e9943]">
                      <span className="underline">Bạn chưa có tài khoản? </span>
                      <span className="text-[14px]">
                        {" "}
                        (Vui lòng xác thực trước khi đặt hàng)
                      </span>
                    </div>
                    <div className="my-5">
                      <div>Email</div>
                      <div>
                        <input
                          value={emailNotLogin}
                          className={`h-[36px] w-full outline-none p-5 border ${
                            emailError != "" ? "border-[red]" : "border-black"
                          }  rounded-[10px]`}
                          onChange={handleEmailChange}
                        />
                        {emailError && (
                          <div className="text-[red] text-[14px]">
                            {emailError}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex w-[100%] justify-between gap-x-5">
                      <div className="w-[50%]">
                        <div>Họ và tên</div>
                        <div>
                          <input
                            value={fullNameNoneLogin}
                            className={`h-[36px] w-full outline-none p-5 border ${
                              fullNameError != ""
                                ? "border-[red]"
                                : "border-black"
                            }  rounded-[10px]`}
                            onChange={handleFullNameChange}
                          />
                          {fullNameError && (
                            <div className="text-[red] text-[14px]">
                              {fullNameError}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-[50%]">
                        <div>Số điện thoại</div>
                        <div>
                          <input
                            type="number"
                            value={phoneNumberNoneLogin}
                            className={`h-[36px] w-full outline-none p-5 border ${
                              phoneNumberError != ""
                                ? "border-[red]"
                                : "border-black"
                            }  rounded-[10px]`}
                            onChange={handlePhoneNumberChange}
                          />
                          {phoneNumberError && (
                            <div className="text-[red] text-[14px]">
                              {phoneNumberError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        onClick={handleGetOTP}
                        className={`bg-[#3a9943] ${
                          haveOTP ? "opacity-70" : ""
                        } border hover:border-[green] rounded-[8px] p-3 text-[#fff] my-3`}
                      >
                        Xác thực thông tin
                      </button>
                    </div>
                    {haveOTP && (
                      <div className="flex items-center gap-5">
                        <div>
                          <input
                            type="number"
                            className="border border-black rounded-[8px] outline-none p-3"
                            onChange={handleOtpChange}
                            name=""
                            id=""
                          />
                          {otpError != "" ? (
                            <div className="text-red-500 text-[14px]">
                              {otpError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <button
                          onClick={handleConfirmOTP}
                          className="bg-[#3a9943] rounded-[8px] border hover:border-[green] p-3 text-[#fff] my-3"
                        >
                          Xác thực mã otp
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                {(userInfo == null && userConfirm) || userInfo ? (
                  <>
                    <div>
                      <div className="text-[24px] font-bold text-[#3e9943]">
                        Địa chỉ
                      </div>
                      <div
                        className={`border ${
                          addressError != "" ? "border-[red]" : "border-black"
                        } py-2 rounded-[10px]`}
                      >
                        <CompletedAddress setAddress={setAddress} />
                      </div>
                      {addressError != "" ? <div className="text-[red] text-[14px]">{addressError}</div> : ""}
                    </div>
                    <div className="mt-5">
                      <div className="text-[24px] font-bold  text-[#3e9943]">
                        Lời nhắn
                      </div>
                      <input
                        className="border w-full px-5 h-[50px] rounded-[10px] border-black outline-none"
                        placeholder="Lời nhắn chú ý"
                        onChange={(e) => setNote(e.target.value)}
                        onBlur={() => {
                          setConfirmNote(note);
                        }}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            {(userInfo == null && userConfirm) || userInfo ? (
              <>
                <div className=" drop-shadow-lg bg-[#ffffff] my-5 border border-t-[2px] border-t-[#3e9943] pb-5">
                  <div className="pl-5 pt-5 font-bold text-[25px] text-[#3e9943] underline">
                    Thông tin người nhận
                  </div>
                  <div className="flex justify-between p-5">
                    <div className="font-bold">
                      <div className="w-[300px]">
                        Email:{" "}
                        <span className="font-normal">
                          {userProfile ? userProfile?.email : emailNotLogin}
                        </span>
                      </div>
                      <div className="w-[300px]">
                        Họ và tên:{" "}
                        <span className="font-normal">
                          {userProfile
                            ? userProfile?.fullname
                            : fullNameNoneLogin}
                        </span>
                      </div>
                      <div className=" w-[300px]">
                        Số điện thoại:{" "}
                        <span className="font-normal">
                          {userProfile
                            ? userProfile?.phoneNumber
                            : phoneNumberNoneLogin}
                        </span>
                      </div>
                    </div>
                    <div className=" w-[40%] text-[16px] flex">
                      <div className="font-bold">Địa chỉ:</div>
                      <div className="pl-2 w-[85%]">{address}</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex pl-5 w-[60%]">
                      <div className="font-bold">Lời nhắn: </div>
                      <div className="pl-5  w-[90%]">{confirmNote}</div>
                    </div>
                    <div className=" w-[40%] text-[16px]">
                      {deliveryFeeInfo?.distance ? (
                        <>
                          <div className="">
                            <span className="font-bold">Khoảng cách: </span>
                            <span>{deliveryFeeInfo?.distance}km</span>
                          </div>
                          <div className="">
                            <span className="font-bold">
                              Thời gian giao hàng dự kiến:{" "}
                            </span>
                            <span>
                              {new Date(
                                deliveryFeeInfo?.expectedDeliveryDate
                              ).toLocaleDateString()}
                              -
                              {new Date(
                                addDays(
                                  new Date(
                                    deliveryFeeInfo?.expectedDeliveryDate
                                  ),
                                  2
                                )
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mb-5">
                  <div className=" w-[30%]">
                    <div className="w-full bg-[#f2f2f2] h-[254px] flex justify-center items-center">
                      <div className="w-[70%] h-[70%]">
                        <div className="text-[20px] underline capitalize leading-6 font-bold mb-[30px]">
                          Tổng Giỏ Hàng
                        </div>
                        <div className="flex justify-between mb-4">
                          <div>Tổng giá trị</div>
                          <div>{formatPrice(subTotal())}</div>
                        </div>
                        <div className="flex justify-between mb-4">
                          <div>Phí vận chuyển</div>
                          <div>{formatPrice(deliveryFee)}</div>
                        </div>
                        <div className="flex justify-between border-t border-t-1 border-black font-bold text-[18px] pt-[9px]">
                          <div className="">Tổng</div>
                          <div>{formatPrice(finalPrice)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end ">
                  <button
                    className="uppercase bg-[#3a9943] p-2 rounded-[3px] text-[#fff] mb-5 hover:opacity-[0.9]"
                    onClick={handleOrder}
                  >
                    Đặt hàng
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </MinHeight>
    </>
  );
}

export default Order;
