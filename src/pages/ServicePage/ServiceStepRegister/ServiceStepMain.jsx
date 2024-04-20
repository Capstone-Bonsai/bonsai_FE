import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import { Steps } from "antd";
import Cookies from "universal-cookie";
import StepTwo from "./StepTwo";
import { useLocation } from "react-router-dom";
import StepThree from "./StepThree";
function ServiceStepMain() {
  const cookies = new Cookies();
  const location = useLocation();
  const typeEnum = new URLSearchParams(location.search).get("typeEnum");
  const userInfo = cookies?.get("user");
  const userId = userInfo?.id;
  const [stepList, setStepList] = useState(1);
  const step1 = cookies?.get(`step 1_typeEnum${typeEnum}_${userId}`);
  const [step, setStep] = useState(!step1 ? 0 : 1);
  const [selectedGardenId, setSelectedGardenId] = useState(
    !step1 ? "" : `${step1}`
  );
  const [serviceIdSelected, setServiceIdSelected] = useState("");

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
        <StepThree />
      ) : (
        ""
      )}
    </div>
  );
}

export default ServiceStepMain;
