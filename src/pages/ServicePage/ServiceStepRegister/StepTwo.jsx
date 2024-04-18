import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
function StepTwo(propsStepTwo) {
  const { setSelectedGardenId, selectedGardenId, setStepList } = propsStepTwo;
  const handleBackStep = () => {
    setStepList(1);
  };
  return (
    <div>
      <button
        onClick={() => handleBackStep()}
        className="hover:bg-[#3a9943] hover:text-[#fff] w-[30px] h-[30px] rounded-full"
      >
        <ArrowLeftOutlined />
      </button>
    </div>
  );
}

export default StepTwo;
