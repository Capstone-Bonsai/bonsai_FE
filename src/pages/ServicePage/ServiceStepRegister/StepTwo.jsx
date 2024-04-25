import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { serviceListPackage } from "../../../redux/slice/serviceSlice";
import { useLocation } from "react-router-dom";
import { Image, Pagination } from "antd";
import Cookies from "universal-cookie";
import { servicePackageById } from "../../../redux/slice/serviceOrderSlice";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
function StepTwo(propsStepTwo) {
  const {
    setSelectedGardenId,
    selectedGardenId,
    setStepList,
    servicePackageDetail,
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
  const servicePackageLoading = useSelector(
    (state) => state.service?.servicePackage?.loading
  );
  const {totalItemsCount} = useSelector((state) => state.service?.servicePackage);
  const handlePageChange = (page) => {
    setPageIndex(page);
  };
  const typeEnum = new URLSearchParams(location.search).get("typeEnum");
  useEffect(() => {
    try {
      if (typeEnum == 1) {
        dispatch(
          serviceListPackage({
            pageIndex,
            pageSize,
            serviceTypeId,
            customerBonsaiId: selectedGardenId,
          })
        );
      } else {
        dispatch(serviceListPackage({ pageIndex, pageSize, serviceTypeId }));
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  }, [typeEnum, selectedGardenId, serviceTypeId]);

  const handleBackStep = () => {
    setStepList(1);
  };
  const servicePackages = useSelector(
    (state) => state?.service?.servicePackage
  );
  const handleToStepThree = () => {
    cookies.set(`step 2_typeEnum${typeEnum}_${userId}`, serviceIdSelected, {
      path: "/",
    });
    setStepList(3);
  };
  return (
    <div>
      {servicePackageLoading ? (
        <Loading loading={servicePackageLoading} />
      ) : (
        <div>
          <div className="my-2 flex justify-between">
            <div className="flex">
              <button
                onClick={() => handleBackStep()}
                className="hover:bg-[#3a9943] hover:text-[#fff] w-[30px] h-[30px] rounded-full flex items-center justify-center"
              >
                <ArrowLeftOutlined />
              </button>
              <div className="font-bold text-[25px]">
                Bước 2:{" "}
                <span className="text-[18px] font-normal opacity-70">
                  {" "}
                  <span className="px-2">Dịch vụ</span>
                  {servicePackageDetail?.name
                    ? servicePackageDetail?.name
                    : "Vui lòng chọn loại dịch vụ"}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleToStepThree()}
              disabled={serviceIdSelected == ""}
              className={`${
                serviceIdSelected == ""
                  ? "hover:cursor-not-allowed"
                  : "hover:bg-[#3a9943] w-[30px] h-[30px] hover:text-[#fff]"
              }  p-2 rounded-full flex items-center justify-center`}
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
                <div className="font-bold text-[30px]">{packageItem?.name}</div>
                <div className="opacity-70">{packageItem?.description}</div>
                <div className="flex gap-4 mt-5">
                  <div className="opacity-70">Nhiệm vụ:</div>
                  <div className="font-bold text-[20px]">
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
          <Pagination
            current={pageIndex}
            pageSize={pageSize}
            total={totalItemsCount}
            onChange={handlePageChange}
            className="text-center mt-5"
          />
        </div>
      )}
    </div>
  );
}

export default StepTwo;
