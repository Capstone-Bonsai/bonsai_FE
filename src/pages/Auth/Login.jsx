import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { confirmEmail, loginUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const userInfo = cookies?.get("user");

  const location = useLocation();
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

  useEffect(() => {
    if (userInfo) {
      navigate("/");
      alert("bạn đã đăng nhập rồi");
    }
  }, [userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
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
      toast.success("Đăng nhập thành công");
      navigate("/");
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
        <div className="top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center my-10">
          <div className="bg-[#ffffff] w-[30%] drop-shadow-lg">
            <div className="w-[90%] m-auto h-full mb-5 ">
              <h2 className="underline text-[20px] font-bold">Đăng nhập</h2>
              <div>
                <label>Tài khoản:</label>
                <div className="flex justify-center">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-[#999999] py-[10px] px-[20px] my-[15px]"
                  />
                </div>
              </div>
              <div>
                <label>Mật khẩu:</label>
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
                <div className="flex items-center">
                  {/* <input type="checkbox" />
                  <div className="pl-2">Remember Me</div> */}
                </div>
                <Link to="/ForgotPassword">Quên mật khẩu?</Link>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handleLogin}
                  className="uppercase bg-black rounded-[3px] text-[#ffffff] w-[140px] h-[36px]"
                >
                  Login
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
      )}
    </>
  );
}

export default Login;
