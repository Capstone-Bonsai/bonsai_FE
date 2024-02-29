import React, { useEffect, useState } from "react";
import logo from "../assets/logo_footer_final.png";
import SPCus from "../assets/img-sp.webp";
import { Image, Input, Space } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import {
  ShoppingCartOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setCartFromCookie } from "../redux/slice/productSlice";
import { profileUser } from "../redux/slice/authSlice";
function Banner() {
  const { Search } = Input;
  const navLinks = [
    { text: "Trang chủ", to: "/" },
    { text: "Sản phẩm", to: "/product" },
    { text: "Chăm sóc cây cảnh", to: "/knowledge" },
    { text: "Địa chỉ", to: "/address" },
  ];
  const cookies = new Cookies();
  const countCart = useSelector((state) => state.product.itemCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = cookies.get("user");
  const token = userInfo?.token;
  const idUser = userInfo?.id;
  const handleLogout = () => {
    cookies.remove("user");
    cookies.remove("userData");
  };
  useEffect(() => {
    if (userInfo) {
      setImageAvt(userInfo?.avatar);
      profileUser()
        .then((data) => {
          cookies.set("userData", data);
        })
        .catch((error) => {
          console.error("Error while fetching profile data:", error);
        });
    }
  }, [userInfo]);
  const [imageAvt, setImageAvt] = useState(userInfo?.avatarUrl);
  const fetchCartFromCookie = () => {
    if (userInfo != null) {
      const cartIdUser = `cartId ${idUser}`;
      const cartItems = cookies.get(cartIdUser) || [];
      const itemCount = cartItems.length;
      console.log(itemCount);
      dispatch(setCartFromCookie({ cartItems, itemCount }));
    } else {
      const cartItems = cookies.get("cartItems") || [];
      const itemCount = cartItems.length;
      console.log(itemCount);
      dispatch(setCartFromCookie({ cartItems, itemCount }));
    }
  };

  useEffect(() => {
    fetchCartFromCookie();
  }, []);

  // const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <>
      <div className="bg-[#3a9943] py-5">
        <div className="w-[70%] h-[100%] m-auto">
          <div className="flex justify-between items-center border-b border-gray-200 border-opacity-50 pb-3">
            <div className=" w-[220px] flex justify-between items-center text-[#ffffff]">
              <div className="">Theo dõi chúng tôi</div>
              <Link className="hover:text-[#ffdd20] flex items-center">
                <FacebookOutlined className="hover:text-[#ffdd20]" />
              </Link>
              <Link className="hover:text-[#ffdd20] flex items-center">
                <InstagramOutlined />
              </Link>
              <Link className="hover:text-[#ffdd20] flex items-center">
                <TwitterOutlined />
              </Link>
            </div>
            {userInfo != null ? (
              <div className="flex items-center">
                <div className="bg-[#f2f2f2] w-[40px] h-[40px] flex justify-center rounded-full drop-shadow-lg text-[30px]">
                  {imageAvt != null ? (
                    <div>
                      <Image
                        src={imageAvt}
                        className=" rounded-full"
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                  ) : (
                    <UserOutlined />
                  )}
                </div>
                <div className="text-white pr-2">
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <span className="normal-case font-semibold">Hi</span>
                      <span className="uppercase font-bold">
                        {userInfo?.fullName}
                      </span>
                    </div>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <Link className="text-black" to="/Profile">
                          Hồ sơ cá nhân
                        </Link>
                      </li>
                      <li>
                        <Link className="text-black" to="/ManageOrder">
                          Đơn đã đặt
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/login"
                          className="text-black"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Link to="/Login" className="text-white no-underline pr-2">
                  Đăng nhập
                </Link>
                <Link
                  to="/Register"
                  className="pl-2 pr-2 text-white no-underline border-l-2 border-white"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <img src={logo} width={200} height={200} />
            <div className="relative">
              <input
                placeholder="Nhập sản phẩm tại đây..."
                className="border-none w-[60vh] h-[50px] focus:outline-none active:border-none rounded-[5px] text-[#ffffff] text-[18px] placeholder-[#ffffff] bg-[#61ad69] pl-[40px] pr-[10px]"
              />
              <Link className="absolute inset-y-0 right-5 flex items-center pl-2 text-[#ffffff] text-[30px] hover:text-[#ffdd20]">
                <SearchOutlined />
              </Link>
            </div>
            <div className="flex items-center">
              <img src={SPCus} alt="" />
              <div className="ml-3">
                <div className="text-[#ffffff]">Chăm sóc khách hàng</div>
                <div className="text-[#ffdd20]">0912345667</div>
              </div>
            </div>
            <Link
              to="/shoppingCart"
              className="text-[30px] w-[70px] h-[50px] text-[#ffffff] flex items-center border pl-2 rounded-[5px] 
          border-[#ffffff]-500 border-opacity-50 border-opacity-50 hover:bg-[#ffffff] hover:text-black"
            >
              <ShoppingCartOutlined />
              <div className="w-[20px] h-[20px] bg-[red] flex text-[15px] justify-center items-center rounded-full">
                {countCart}
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="drop-shadow-md bg-[#ffffff]">
        <div className="flex w-[70%] h-[50px] items-center font-medium m-auto uppercase ">
          {navLinks.map((link, index) => (
            <div key={index} className="pr-10 montserrat hover:text-[#54a65b]">
              <Link className="" to={link.to}>
                {link.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Banner;
