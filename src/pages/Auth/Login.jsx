import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { confirmEmail, loginUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import MinHeight from "../../components/MinHeight";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorTrims, setErrorTrims] = useState({
    username: false,
    password: false,
  });
  console.log(errorTrims);
  const cookieExpires = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

  const cookies = new Cookies(null, { expires: cookieExpires });
  const navigate = useNavigate();

  const userInfo = cookies?.get("user");

  const location = useLocation();
  const registerService = location.state;
  console.log(registerService);

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const code = searchParams.get("code");

  useEffect(() => {
    console.log("User ID:", userId);
    console.log("Code:", code);
  }, [userId, code]);

  useEffect(() => {
    if (userId != null && code != null) {
      const confirmEmailFromUrl = async () => {
        try {
          await confirmEmail(userId, code);
          toast.success("Xác thực thành công!");
        } catch (error) {
          toast.error("Xác thực thất bại!");
        }
      };

      confirmEmailFromUrl();
    }
  }, [userId, code]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username.trim() == "") {
      setErrorTrims((prevErrors) => ({ ...prevErrors, username: true }));
    } else {
      setErrorTrims((prevErrors) => ({ ...prevErrors, username: false }));
    }
    if (password.trim() == "") {
      setErrorTrims((prevErrors) => ({ ...prevErrors, password: true }));
    } else {
      setErrorTrims((prevErrors) => ({ ...prevErrors, password: false }));
    }
    if (username.trim() === "" || password.trim() === "") {
      toast.error("Bạn cần phải điền đầy đủ thông tin!");
      return;
    }
    try {
      setIsLoading(true);
      const response = await loginUser({ email: username, password });
      if (userInfo != null) {
        cookies.remove("user");
      }
      cookies.set("user", response);

      console.log(response);
      if (response.role == "Customer") {
        navigate("/");
      } else if (response.role == "Manager") {
        navigate("/admin/product");
      } else if (response.role == "Staff") {
        navigate("/admin/serviceGardenChecking");
      }
    } catch (error) {
      toast.error("Sai tài khoản hoặc mật khẩu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <MinHeight>
          <div className="top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center my-10">
            <div className="bg-[#ffffff] w-[30%] drop-shadow-lg">
              <div className="w-[90%] m-auto h-full mb-5 ">
                <h2 className="underline text-[20px] font-bold">Đăng nhập </h2>
                <div>
                  <label>
                    Tài khoản <span className="text-[red]">*</span>
                  </label>
                  <div className="flex justify-center">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`w-full border py-[10px] px-[20px] my-[15px] ${
                        errorTrims.username
                          ? "border-[red]"
                          : " border-[#999999]"
                      }`}
                    />
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
                      className={`w-full border  py-[10px] px-[20px] my-[15px] ${
                        errorTrims.password
                          ? "border-[red]"
                          : "border-[#999999]"
                      }`}
                    />
                    <button
                      type="button"
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
                  <div className="flex items-center"></div>
                  <Link to="/ForgotPassword">Quên mật khẩu?</Link>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleLogin}
                    className="uppercase bg-black rounded-[3px] text-[#ffffff] w-[140px] h-[36px]"
                  >
                    Đăng nhập
                  </button>
                  <Link
                    to="/register"
                    className="hover:text-[#3a9943] text-[15px]"
                  >
                    Chưa có tài khoản? Đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </MinHeight>
      )}
    </>
  );
}

export default Login;
