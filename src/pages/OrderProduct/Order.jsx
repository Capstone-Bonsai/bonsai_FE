import React, { useEffect, useRef, useState } from "react";
import MinHeight from "../../components/MinHeight";
import Cookies from "universal-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { destination } from "../../redux/slice/orderSlice";
import { orderBonsai } from "../../redux/slice/bonsaiSlice";
import BarLoaderLoading from "../../components/BarLoaderLoading";
import { useDispatch } from "react-redux";
import { getDistrict, getProvince, getWard } from "../../redux/slice/address";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import CompletedAddress from "./CompletedAddress";
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
  const bonsaiIdOrder = cartItems.map((item) => item.bonsaiId);
  const [address, setAddress] = useState("");
  const [emailNotLogin, setEmailNotLogin] = useState("");
  const [note, setNote] = useState("");
  const [confirmNote, setConfirmNote] = useState("");
  const [fullNameNoneLogin, setFullNameNoneLogin] = useState("");
  const [phoneNumberNoneLogin, setPhoneNumberNoneLogin] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    if (resultCode === "0") {
      cookies.remove(userInfo ? `cartId ${idUser}` : "cartItems");
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
    const fetchDeliveryFee = async () => {
      try {
        handleDeliveryFee(address);
      } catch (error) {
        // console.error("Error fetching province data:", error);
      }
    };
    fetchDeliveryFee();
  }, [address]);

  const handleOrder = async () => {
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
      listBonsai: bonsaiIdOrder,
    };
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
      if (address.trim() === "") {
        toast.error("Vui lòng nhập địa chỉ.");
        return;
      } else if (expectedDeliveryDate.trim() === "") {
        toast.error("Vui lòng nhập địa chỉ.");
      }
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
    cartItems.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };
  const handleDeliveryFee = async (addressConfirm) => {
    setAddress(addressConfirm);
    const payload = {
      destination: addressConfirm,
      listBonsaiId: bonsaiIdOrder,
    };
    const res = await destination(payload);
    const fee = res?.finalPrice;
    setDeliveryFee(fee);
  };
  const handleTotalOrder = () => {
    let totalPriceOrder = 0;
    totalPriceOrder = subTotal() + deliveryFee;
    return totalPriceOrder;
  };

  return (
    <>
      <MinHeight>
        {isBarLoader ? <BarLoaderLoading loading={isBarLoader} /> : ""}
        <div className="m-auto w-[70%]">
          <div className=" mt-10 drop-shadow-lg bg-[#ffffff]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-[#f2f2f2] h-[50px]">
                  <th className="uppercase">Hình Ảnh</th>
                  <th className="uppercase">Sản phẩm</th>
                  <th className="uppercase"></th>
                  <th className="uppercase">Giá</th>
                  <th className="uppercase">Tổng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.bonsaiId} className="ml-5 text-center h-[70px]">
                    <td className="flex justify-center items-center h-[70px]">
                      <div>
                        <img
                          src={item?.image}
                          alt=""
                          className="w-[50px] h-[50px] object-cover"
                        />
                      </div>
                    </td>
                    <td className="">
                      <div className="text-[16px] font-medium">{item.name}</div>
                    </td>
                    <td className="">
                      <div className="text-[16px] font-medium">
                        {item.subCategory}
                      </div>
                    </td>
                    <td className="font-medium">{formatPrice(item.price)}</td>
                    <td className="font-medium">{formatPrice(item.price)}</td>
                    <td className="text-[20px] pr-5"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex my-5 justify-between">
            <div className=" w-full p-5 border border-t-[2px] border-t-[#3e9943] rounded-b-[10px]">
              {userInfo == null ? (
                <div className="mb-5">
                  <div className="text-[20px] leading-6 font-bold underline text-[#3e9943]">
                    Không cần đăng nhập
                  </div>
                  <div className="my-5">
                    <div>Email</div>
                    <input
                      value={emailNotLogin}
                      className="h-[36px] w-full outline-none p-5 border border-black rounded-[10px]"
                      onChange={(e) => setEmailNotLogin(e.target.value)}
                    />
                  </div>
                  <div className="flex w-[100%] justify-between gap-x-5">
                    <div className="w-[50%]">
                      <div>Họ và tên</div>
                      <input
                        value={fullNameNoneLogin}
                        className="h-[36px] w-full outline-none p-5 border border-black rounded-[10px]"
                        onChange={(e) => setFullNameNoneLogin(e.target.value)}
                      />
                    </div>
                    <div className="w-[50%]">
                      <div>Số điện thoại</div>
                      <input
                        value={phoneNumberNoneLogin}
                        className=" h-[36px] w-full outline-none p-5 border border-black rounded-[10px]"
                        onChange={(e) =>
                          setPhoneNumberNoneLogin(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div>
                <div className="text-[24px] font-bold text-[#3e9943]">
                  Địa chỉ
                </div>
                <CompletedAddress setAddress={setAddress} />
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
            </div>
          </div>

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
                    {userProfile ? userProfile?.fullname : fullNameNoneLogin}
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
              {/* <div className=" w-[20%] text-[16px]">
              <span className="font-bold">Ngày dự kiến:</span>
              <span>{expectedDeliveryDate}</span>
            </div> */}
            </div>
            <div className="flex pl-5 w-full">
              <div className="font-bold">Lời nhắn</div>
              <div className="pl-5  w-[90%]">{confirmNote}</div>
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
                    <div>{formatPrice(handleTotalOrder())}</div>
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
        </div>
      </MinHeight>
    </>
  );
}

export default Order;
