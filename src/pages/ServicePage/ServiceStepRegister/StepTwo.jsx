import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { serviceListPackage } from "../../../redux/slice/serviceSlice";
import { useLocation } from "react-router-dom";
import { Image } from "antd";
function StepTwo(propsStepTwo) {
  const {
    setSelectedGardenId,
    selectedGardenId,
    setStepList,
    setServiceIdSelected,
    serviceIdSelected,
  } = propsStepTwo;
  console.log(serviceIdSelected);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const location = useLocation();
  const serviceTypeId = new URLSearchParams(location.search).get(
    "serviceTypeId"
  );
  useEffect(() => {
    dispatch(serviceListPackage({ pageIndex, pageSize, serviceTypeId }));
  }, []);
  const handleBackStep = () => {
    setStepList(2);
  };
  const servicePackages = useSelector(
    (state) => state?.service?.servicePackage
  );
  const handleToStepThree = () => {
    setStepList(3);
  };
  return (
    <div>
      <div className="flex justify-between">
        <button
          onClick={() => handleBackStep()}
          className="hover:bg-[#3a9943] hover:text-[#fff] w-[30px] h-[30px] rounded-full"
        >
          <ArrowLeftOutlined />
        </button>
        <button
          onClick={() => handleToStepThree()}
          disabled={serviceIdSelected == ""}
          className={`${
            serviceIdSelected == ""
              ? "hover:cursor-not-allowed"
              : "hover:bg-[#3a9943]"
          } bg-gray-500 text-[#fff] p-2 rounded-[10px]`}
        >
          Bước tiếp theo
        </button>
      </div>
      {servicePackages?.items?.map((packageItem) => (
        <div
          key={packageItem.id}
          className="border flex my-3 bg-[#fff] drop-shadow-md relative"
        >
          <div className="w-[300px] h-[300px]">
            <Image
              src={packageItem?.image}
              width="100%"
              height="100%"
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <div className="font-bold text-[20px]">{packageItem?.name}</div>
            <div className="opacity-70">{packageItem?.description}</div>
            <div className="flex gap-4">
              <div className="opacity-70">Nhiệm vụ:</div>
              <div>
                {packageItem?.tasks?.map((task, index) => (
                  <div key={index}>_ {task}</div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setServiceIdSelected(packageItem.id)}
            className="absolute right-5 bottom-5 p-2 bg-[#3a9943] text-[#fff] rounded-[10px] drop-shadow-lg hover:bg-gray-500"
          >
            Thêm
          </button>
        </div>
      ))}
    </div>
  );
}

export default StepTwo;
