import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import { Steps } from "antd";

function ServiceStepMain() {
  const [step, setStep] = useState(0);
  const [selectedGardenId, setSelectedGardenId] = useState("");
  useEffect(() => {
    if (selectedGardenId != "") {
      setStep(1);
    }
  }, [selectedGardenId]);
  console.log(selectedGardenId);
  const propsStepOne = {
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
      <StepOne {...propsStepOne} />
    </div>
  );
}

export default ServiceStepMain;
