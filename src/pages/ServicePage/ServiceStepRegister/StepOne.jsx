import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCustomerGarden } from "../../../redux/slice/userGarden";
import noImage from "../../../assets/unImage.png";
import { Image } from "antd";
import { PlusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import AddCustomerGarden from "../../Garden/AddCustomerGarden";
import Loading from "../../../components/Loading";
function StepOne(propsStepOne) {
  const { setSelectedGardenId, selectedGardenId, setStepList } = propsStepOne;
  const location = useLocation();
  const typeEnum = new URLSearchParams(location.search).get("typeEnum");
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(fetchCustomerGarden({ pageIndex, pageSize }));
  }, []);
  const gardens = useSelector((state) => state.garden?.gardenDTO?.items);
  const loadingGarden = useSelector(
    (state) => state?.garden?.gardenDTO?.loading
  );
  console.log(loadingGarden);
  const cookieExpires = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  const cookies = new Cookies(null, { expires: cookieExpires });
  const userInfo = cookies?.get("user");
  const userId = userInfo?.id;
  const handleToStepTwo = () => {
    setStepList(2);
    cookies.set(`step 1_typeEnum${typeEnum}_${userId}`, selectedGardenId, {
      path: "/",
    });
  };
  return (
    <div className="">
      <div className="w-full flex justify-between my-3">
        {typeEnum == 2 ? (
          <div>
            <button
              className="bg-[#3a9943] rounded-[10px] p-2 text-[#fff]"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              + Thêm vườn
            </button>
            <AddCustomerGarden />
          </div>
        ) : (
          <div></div>
        )}
        <div
          className={`${selectedGardenId == "" ? "tooltip" : ""} `}
          data-tip="Vui lòng chọn vườn"
        >
          <button
            onClick={() => handleToStepTwo()}
            disabled={selectedGardenId == ""}
            className={`${
              selectedGardenId == ""
                ? "hover:cursor-not-allowed"
                : "hover:bg-[#3a9943]"
            } bg-gray-500 text-[#fff] p-2 rounded-[10px]`}
          >
            Bước tiếp theo
          </button>
        </div>
      </div>
      {typeEnum == 2 ? (
        <div>
          <div className="text-center">Vườn của bạn</div>
          {loadingGarden ? (
            <Loading loading={loadingGarden} />
          ) : (
            <div>
              {gardens?.map((garden) => (
                <div key={garden.id} className="flex gap-5 py-5 relative">
                  <button
                    onClick={() => setSelectedGardenId(garden.id)}
                    className="absolute right-0 outline-none text-[20px]"
                  >
                    {selectedGardenId == garden.id ? (
                      <CheckCircleOutlined className="text-[#3a9943]" />
                    ) : (
                      <PlusCircleOutlined />
                    )}
                  </button>
                  <div className="w-[30%] h-[300px] border rounded-tr-[30px]">
                    <img
                      className="w-full h-full object-cover rounded-tr-[30px]"
                      src={
                        garden?.customerGardenImages?.length > 0
                          ? garden?.customerGardenImages[0]?.image
                          : noImage
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-[70%]">
                    <div className="text-[25px]">{garden.address}</div>
                    <div>
                      Diện tích: {garden.square}m<sup>2</sup>
                    </div>
                    <div className="">
                      <div className="w-full">Bonsai đang trồng:</div>
                      {garden.customerBonsais.length > 0 ? (
                        garden.customerBonsais.map((bonsai) => (
                          <div
                            key={bonsai?.bonsaiId}
                            className="w-full flex gap-2 border-y py-2"
                          >
                            <div className=" w-[10%] h-[50px]">
                              <Image
                                width="100%"
                                height="100%"
                                className="object-cover"
                                src={
                                  bonsai?.bonsai?.bonsaiImages?.length > 0
                                    ? bonsai?.bonsai?.bonsaiImages[0]?.imageUrl
                                    : ""
                                }
                                alt=""
                              />
                            </div>
                            <div>
                              <div className="font-bold text-[20px]">
                                {bonsai.bonsai.name}
                              </div>
                              <div className="text-[12px]">
                                <div>
                                  Năm trồng: {bonsai.bonsai.yearOfPlanting}
                                </div>
                                <div>
                                  Kích thước thân: {bonsai.bonsai.trunkDimenter}
                                  cm
                                </div>
                                <div>Chiều cao: {bonsai.bonsai.height}m</div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="opacity-70">
                          Không có bonsai đang trồng
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default StepOne;
