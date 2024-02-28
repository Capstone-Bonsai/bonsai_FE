import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmEmail } from "../../redux/slice/authSlice";
function ConfirmEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");
    if (userId && code) {
      confirmEmail(userId, code)
        .then((response) => {
          toast.success("Xác thực thành công!");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("Xác thực thất bại!");
          navigate.error("Error:", error);
          navigate("/login");
        });
    } else {
      toast.error("Thiếu thông tin xác thực!");
      navigate("/login");
    }
  }, [navigate, location.search]);
  return <div>ConfirmEmail</div>;
}

export default ConfirmEmail;
