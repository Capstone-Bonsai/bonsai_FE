import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setUser(null);
    cookies.remove("jwt_authorization");
  };

  const handleLogin = async () => {
    try {
      const response = await dispatch(loginUser({ email: username, password }));
      const { token } = response.payload;
      cookies.set("user", token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center">
      <div className="bg-[#ffffff] w-[30%] drop-shadow-lg">
        <div className="w-[90%] m-auto h-full mb-5 ">
          <h2 className="underline text-[20px] font-bold">Login</h2>
          <div>
            <label>Username:</label>
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
            <label>Password:</label>
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
              <input type="checkbox" />
              <div className="pl-2">Remember Me</div>
            </div>
            <div>Forgotten password?</div>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleLogin}
              className="uppercase bg-black rounded-[3px] text-[#ffffff] w-[140px] h-[36px]"
            >
              Login
            </button>
            <Link to="/register" className="hover:text-[#3a9943]">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
