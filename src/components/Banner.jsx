import React, { useEffect, useState } from "react";
import logo from "../assets/logoFinal.png";
import SPCus from "../assets/img-sp.webp";
import { Image, Input, Space, notification } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import {
  ShoppingCartOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBonsai, setCartFromCookie } from "../redux/slice/bonsaiSlice";
import { profileUser } from "../redux/slice/authSlice";
import {
  setAvatarUrlRedux,
  setFullNameRedux,
} from "../redux/slice/avatarSlice";
import "./Banner.css";
import { notificationUser } from "../redux/slice/userSlice";
import useWebSocket, { ReadyState } from "react-use-websocket";

function Banner() {
  const { Search } = Input;
  const navLinks = [
    { text: "Trang chủ", to: "/" },
    { text: "Bonsai", to: "/bonsai" },
    { text: "Dịch vụ chăm sóc", to: "/serviceOption" },
    { text: "Bảng giá giao hàng", to: "/delivery" },
    { text: "Liên hệ", to: "/contact" },
  ];
  const cookieExpires = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  const cookies = new Cookies(null, { expires: cookieExpires });
  const [countCart, setCountCart] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isSticky, setIsSticky] = useState(false);
  const avatarUrl = useSelector((state) => state.avatar.avatarUrlRedux);
  const fullNameRedux = useSelector((state) => state.avatar.fullName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = cookies.get("user");
  const [socketUrl, setSocketUrl] = useState(
    "wss://capstoneb.azurewebsites.net/notification-hub"
  );
  const authHeader = { Authorization: `Bearer ${userInfo?.token}` };

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    Authorization: authHeader,
  });
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
    }
  }, [readyState]);

  const idUser = userInfo?.id;
  const userProfile = useState(cookies.get("userData"));
  const handleLogout = () => {
    cookies.remove("user", { path: "/" });
    cookies.remove("userData", { path: "/" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [keyword, setKeyword] = useState("");
  const handleSearch = () => {
    navigate("/bonsai", { state: { keyword } });
  };

  useEffect(() => {
    if (userInfo) {
      profileUser()
        .then((data) => {
          cookies.set("userData", data);
          const newAvt = data?.avatarUrl;
          dispatch(setAvatarUrlRedux(newAvt));
          dispatch(setFullNameRedux(data?.fullname));
        })
        .catch((error) => {
          console.error("Error while fetching profile data:", error);
        });
    }
  }, [userInfo]);
  // let [countCartItems, setCountCartItems] = useState([]);
  // console.log(countCartItems.length);
  const fetchCartFromCookie = () => {
    if (userInfo != null) {
      const cartIdUser = `cartId ${idUser}`;
      const cartItems = cookies.get(cartIdUser) || [];
      const itemCount = cartItems.length;
      // setCountCartItems(cartItems);
      setCountCart(itemCount);
      dispatch(setCartFromCookie({ itemCount }));
    } else {
      const cartItems = cookies.get("cartItems") || [];
      const itemCount = cartItems.length;
      // setCountCartItems(cartItems);
      setCountCart(itemCount);
      dispatch(setCartFromCookie({ itemCount }));
    }
  };

  useEffect(() => {
    dispatch(notificationUser({ pageIndex, pageSize }));
  }, []);

  useEffect(() => {
    fetchCartFromCookie();
    // setCountCart()
  }, [userInfo]);
  const countItemsInCart = useSelector((state) => state?.bonsai?.itemCount);
  return (
    <div className={`banner ${isSticky ? "sticky" : ""}`}>
      <div className="bg-[#3a9943] bannerContainer py-5">
        <div className="w-[70%] h-[100%] m-auto">
          <div className="flex justify-between items-center border-b border-gray-200 border-opacity-50 pb-3">
            <div className=" w-[220px] followUs flex flex-col md:flex-row md:justify-between md:items-center text-[#ffffff] text-sm md:text-base">
              <div className="hidden md:block ">Theo dõi chúng tôi</div>
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
              <div
                className={`flex items-center bannerContent ${
                  isSticky ? "absolute top-[40%] right-[50%]" : ""
                }`}
              >
                <div className="dropdown">
                  <button className="bg-[#f2f2f2] hover:bg-gray-300 hover:text-[#fff] mx-3 relative rounded-full w-[30px] h-[30px] flex justify-center items-center">
                    <BellOutlined />
                    <div className="absolute top-[-10px] right-[-5px] bg-[red] w-[20px] h-[20px] text-[14px] text-[#fff] rounded-full">
                      0
                    </div>
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#f2f2f2] w-[40px] h-[40px] flex justify-center rounded-full drop-shadow-lg text-[30px]">
                  {avatarUrl != null ? (
                    <div>
                      <Image
                        src={avatarUrl}
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
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 text-[10px] md:text-base welcome"
                    >
                      <span className="normal-case font-semibold">
                        Xin chào
                      </span>
                      <span className="uppercase font-bold">
                        {fullNameRedux}
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
          <div className="flex items-center justify-between mt-5 flex-wrap gap-1">
            <img src={logo} width={100} height={100} />
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="relative searchBonsai">
                <input
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Nhập sản phẩm tại đây..."
                  className="border-none w-full md:w-[60vh] h-[50px] focus:outline-none active:border-none rounded-[5px] text-[#ffffff] text-sm md:text-base placeholder-[#ffffff] bg-[#61ad69] pl-[40px] pr-[10px]"
                />
                <button className="absolute inset-y-0 right-5 flex items-center pl-2 text-[#ffffff] text-sm md:text-[30px] hover:text-[#ffdd20]">
                  <SearchOutlined />
                </button>
              </div>
            </form>
            <div className="flex items-center contactUs">
              <img src={SPCus} alt="" />
              <div className="ml-3">
                <div className="text-[#ffffff]">Chăm sóc khách hàng</div>
                <div className="text-[#ffdd20]">0912345667</div>
              </div>
            </div>
            <Link
              to="/shoppingCart"
              className="cartItem text-[30px] w-[70px] h-[50px] text-[#ffffff] flex items-center border pl-2 rounded-[5px] 
          border-[#ffffff]-500 border-opacity-50 border-opacity-50 hover:bg-[#ffffff] hover:text-black"
            >
              <ShoppingCartOutlined />
              <div className="cartItemChildren w-[20px] h-[20px] bg-[#fff] text-black flex text-[15px] justify-center items-center rounded-full">
                {countItemsInCart}
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="drop-shadow-md bg-[#ffffff]">
        <div className="flex w-[70%] h-[50px] items-center font-medium m-auto uppercase ">
          {navLinks.map((link, index) => (
            <div
              key={index}
              className="pr-10 montserrat hover:text-[#54a65b] text-[10px] md:text-base"
            >
              <Link className="" to={link.to}>
                {link.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
