import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import { Steps } from "antd";
import Cookies from "universal-cookie";
import StepTwo from "./StepTwo";
function ServiceStepMain() {
  const cookies = new Cookies();
  const userInfo = cookies?.get("user");
  const userId = userInfo?.id;
  const [stepList, setStepList] = useState(1);
  const step1 = cookies?.get(`step 1 + ${userId}`);
  const [step, setStep] = useState(!step1 ? 0 : 1);
  const [selectedGardenId, setSelectedGardenId] = useState(
    !step1 ? "" : `${step1}`
  );
  useEffect(() => {
    if (selectedGardenId != "") {
      setStep(1);
    }
  }, [selectedGardenId]);
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
      ) : (
        ""
      )}
    </div>
  );
}

export default ServiceStepMain;
