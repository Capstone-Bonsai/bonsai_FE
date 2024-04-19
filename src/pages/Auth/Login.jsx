import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { confirmEmail, loginUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import MinHeight from "../../components/MinHeight";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
function Login() {
  const [form] = Form.useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorTrims, setErrorTrims] = useState({
    username: false,
    password: false,
  });
  const cookieExpires = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

  const cookies = new Cookies(null, { expires: cookieExpires });
  const navigate = useNavigate();

  const userInfo = cookies?.get("user");

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const code = searchParams.get("code");

  // useEffect(() => {
  //   console.log("User ID:", userId);
  //   console.log("Code:", code);
  // }, [userId, code]);

  useEffect(() => {
    if (userInfo) {
      cookies.remove("user");
      cookies.remove("userData");
    }
    if (userId != null && code != null) {
      const confirmEmailFromUrl = async () => {
        try {
          const res = await confirmEmail(userId, code);
          console.log(res);
          toast.success(res.data);
        } catch (error) {
          toast.error(error.response.data);
        }
      };
      confirmEmailFromUrl();
    }
  }, [userId, code]);

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const response = await loginUser({
        email: values.username,
        password: values.password,
      });
      if (userInfo != null) {
        cookies.remove("user");
      }
      cookies.set("user", response);
      if (response.role == "Customer") {
        navigate("/");
      } else if (response.role == "Manager") {
        navigate("/admin/product");
      } else if (response.role == "Staff") {
        navigate("/admin/serviceGardenChecking");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data);
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
              <Form
                form={form}
                onFinish={handleLogin}
                layout="vertical"
                className="w-[90%] m-auto h-full mb-5 "
              >
                <h2 className="underline text-[20px] font-bold">Đăng nhập</h2>
                <Form.Item
                  name="username"
                  label="Tài khoản"
                  rules={[
                    { required: true, message: "Vui lòng nhập tài khoản!" },
                  ]}
                >
                  <Input className="w-full border py-[10px] px-[20px] rounded-none" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                    className="w-full border py-[10px] px-[20px] rounded-none"
                  />
                </Form.Item>
                <Form.Item>
                  <Link to="/forgotPassword">Quên mật khẩu?</Link>
                </Form.Item>
                <Form.Item>
                  <div className="flex justify-between items-center">
                    <Button
                      htmlType="submit"
                      className="uppercase w-[140px]"
                      loading={isLoading}
                      style={{
                        backgroundColor: "#3a9943",
                        color: "#ffffff",
                        outline: "none",
                      }}
                    >
                      Đăng nhập
                    </Button>
                    <Link
                      to="/register"
                      className="hover:text-[#3a9943] text-[15px]"
                    >
                      Chưa có tài khoản? Đăng ký ngay
                    </Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </MinHeight>
      )}
    </>
  );
}

export default Login;
