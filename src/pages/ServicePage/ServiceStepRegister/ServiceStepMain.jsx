import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import { Steps } from "antd";
import Cookies from "universal-cookie";
import StepTwo from "./StepTwo";
import { useLocation, useNavigate } from "react-router-dom";
import StepThree from "./StepThree";
import { toast } from "react-toastify";
function ServiceStepMain() {
  const cookies = new Cookies();
  const location = useLocation();
  const navigate = useNavigate();
  const typeEnum = new URLSearchParams(location.search).get("typeEnum");
  const serviceTypeId = new URLSearchParams(location.search).get(
    "serviceTypeId"
  );
  const userInfo = cookies?.get("user");
  const userId = userInfo?.id;
  const [stepList, setStepList] = useState(1);
  const step1 = cookies?.get(`step 1_typeEnum${typeEnum}_${userId}`);
  const step2 = cookies?.get(`step 2_typeEnum${typeEnum}_${userId}`);
  const [step, setStep] = useState(!step1 ? 0 : 1);
  const [selectedGardenId, setSelectedGardenId] = useState(
    !step1 ? "" : `${step1}`
  );
  const [serviceIdSelected, setServiceIdSelected] = useState(
    !step2 ? "" : `${step2}`
  );
  useEffect(() => {
    if (typeEnum == null || serviceTypeId == null) {
      toast.warning("Vui lòng chọn loại dịch vụ");
      navigate("/serviceOption");
    }
  }, [typeEnum, serviceTypeId]);
  useEffect(() => {
    if (selectedGardenId != "") {
      setStep(1);
    }
    if (serviceIdSelected != "") {
      setStep(2);
    }
  }, [selectedGardenId, serviceIdSelected]);
  console.log(selectedGardenId);
  const propsStepOne = {
    setStepList,
    selectedGardenId,
    setSelectedGardenId,
  };
  const propsStepTwo = {
    setStepList,
    selectedGardenId,
    setSelectedGardenId,
    setServiceIdSelected,
    serviceIdSelected,
  };
  const propsStepThree = {
    setStepList,
    selectedGardenId,
    serviceIdSelected,
  };
  return (
    <div className="my-12 pb-12 w-[70%] m-auto">
      <Steps
        size="larget"
        current={step}
        items={[
          {
            title: "Chọn vườn",
          },
          {
            title: "Chọn gói dịch vụ",
          },
          {
            title: "Đăng ký mẫu",
          },
        ]}
      />
      {stepList == 1 ? (
        <StepOne {...propsStepOne} />
      ) : stepList == 2 ? (
        <StepTwo {...propsStepTwo} />
      ) : stepList == 3 ? (
        <StepThree {...propsStepThree} />
      ) : (
        ""
      )}
    </div>
  );
}

export default ServiceStepMain;
