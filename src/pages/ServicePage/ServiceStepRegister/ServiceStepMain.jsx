import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import { Steps } from "antd";
import Cookies from "universal-cookie";
import StepTwo from "./StepTwo";
import { useLocation, useNavigate } from "react-router-dom";
import StepThree from "./StepThree";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { customerGardenDetail } from "../../../redux/slice/userGarden";
import { servicePackageById } from "../../../redux/slice/serviceOrderSlice";
import { customerBonsaiDetail } from "../../../redux/slice/customerBonsaiSlice";
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
  const dispatch = useDispatch();
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
  console.log(serviceIdSelected);
  useEffect(() => {
    if (typeEnum == null || serviceTypeId == null) {
      toast.warning("Vui lòng chọn loại dịch vụ");
      navigate("/serviceOption");
    }
  }, [typeEnum, serviceTypeId]);
  const onChangeStep = (index) => {
    console.log("onChange:", index);
    setStepList(index + 1);
  };
  useEffect(() => {
    if (selectedGardenId != "") {
      setStep(1);
    }
    if (serviceIdSelected != "") {
      setStep(2);
    }
  }, [selectedGardenId, serviceIdSelected]);

  useEffect(() => {
    dispatch(customerGardenDetail(selectedGardenId));
  }, [selectedGardenId]);
  useEffect(() => {
    dispatch(customerBonsaiDetail(selectedGardenId));
  }, [selectedGardenId]);
  const gardenDetail = useSelector((state) => state.garden?.gardenById);
  const bonsaiDetail = useSelector(
    (state) => state.customerBonsai?.customerBonsaiDetail
  );
  useEffect(() => {
    dispatch(servicePackageById(serviceIdSelected));
  }, [serviceIdSelected]);
  const servicePackageDetail = useSelector(
    (state) => state.serviceOrder?.servicePackageDetail
  );
  console.log(serviceIdSelected);
  const propsStepOne = {
    setStepList,
    selectedGardenId,
    setSelectedGardenId,
    gardenDetail,
    bonsaiDetail,
  };
  const propsStepTwo = {
    setStepList,
    selectedGardenId,
    setSelectedGardenId,
    setServiceIdSelected,
    serviceIdSelected,
    servicePackageDetail,
  };
  const propsStepThree = {
    setStepList,
    selectedGardenId,
    serviceIdSelected,
    gardenDetail,
    servicePackageDetail,
    bonsaiDetail,
    setStep,
  };
  console.log(step);
  const [isStepTwoDisabled, setIsStepTwoDisabled] = useState(false);
  console.log();
  const [isStepThreeDisabled, setIsStepThreeDisabled] = useState(false);
  useEffect(() => {
    if (step < 2) {
      setIsStepTwoDisabled(true);
    }
    if (step < 3) {
      setIsStepThreeDisabled(true);
    }
  }, [step]);
  return (
    <div className="my-12 pb-12 w-[70%] m-auto border rounded-[8px] p-5">
      <div className="text-center font-bold text-[20px]">
        Mẫu đăng ký dịch vụ
      </div>
      <div className="w-[70%] m-auto my-2">
        <Steps
          size="small"
          current={step}
          onChange={onChangeStep}
          items={[
            {
              title: typeEnum == 1 ? "Chọn cây" : "Chọn vườn",
            },
            {
              title: "Chọn gói dịch vụ",
              disabled: isStepTwoDisabled,
            },
            {
              title: "Đăng ký mẫu",
              disabled: isStepThreeDisabled,
            },
          ]}
        />
      </div>
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
