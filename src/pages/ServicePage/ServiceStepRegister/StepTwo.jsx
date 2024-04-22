import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { serviceListPackage } from "../../../redux/slice/serviceSlice";
import { useLocation } from "react-router-dom";
import { Image } from "antd";
import Cookies from "universal-cookie";
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
  const cookieExpires = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  const cookies = new Cookies(null, { expires: cookieExpires });
  const userInfo = cookies?.get("user");
  const userId = userInfo?.id;
  const serviceTypeId = new URLSearchParams(location.search).get(
    "serviceTypeId"
  );
  const typeEnum = new URLSearchParams(location.search).get("typeEnum");
  useEffect(() => {
    dispatch(serviceListPackage({ pageIndex, pageSize, serviceTypeId }));
  }, []);
  const handleBackStep = () => {
    setStepList(1);
  };
  const servicePackages = useSelector(
    (state) => state?.service?.servicePackage
  );
  const handleToStepThree = () => {
    cookies.set(`step 2_typeEnum${typeEnum}_${userId}`, selectedGardenId, {
      path: "/",
    });
    setStepList(3);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <button
            onClick={() => handleBackStep()}
            className="hover:bg-[#3a9943] hover:text-[#fff] w-[30px] h-[30px] rounded-full flex items-center justify-center"
          >
            <ArrowLeftOutlined />
          </button>
          <div className="font-bold text-[20px]">Bước 2:</div>
        </div>
        <button
          onClick={() => handleToStepThree()}
          disabled={serviceIdSelected == ""}
          className={`${
            serviceIdSelected == ""
              ? "hover:cursor-not-allowed"
              : "hover:bg-[#3a9943]"
          } hover:text-[#fff] p-2 rounded-full flex items-center justify-center`}
        >
          <ArrowRightOutlined />
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
            onClick={() => {
              setServiceIdSelected(packageItem.id), handleToStepThree();
            }}
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
