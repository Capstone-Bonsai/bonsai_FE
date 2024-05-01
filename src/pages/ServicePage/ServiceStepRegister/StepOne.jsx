import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  customerGardenDetail,
  fetchCustomerGarden,
} from "../../../redux/slice/userGarden";
import noImage from "../../../assets/unImage.png";
import { Image, Pagination } from "antd";
import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Cookies from "universal-cookie";
import AddCustomerGarden from "../../Garden/AddCustomerGarden";
import Loading from "../../../components/Loading";
import { customerBonsai } from "../../../redux/slice/bonsaiSlice";
import ModalCreateCustomerBonsai from "./ModalCreateCustomerBonsai";
function StepOne(propsStepOne) {
  const {
    setSelectedGardenId,
    gardenDetail,
    selectedGardenId,
    setStepList,
    bonsaiDetail,
  } = propsStepOne;
  const location = useLocation();
  const typeEnum = new URLSearchParams(location.search).get("typeEnum");
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [fetchApi, setFetchApi] = useState(false);
  const [gardenLoading, setGardenLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCustomerGarden({ pageIndex: pageIndex - 1, pageSize }));
    dispatch(customerBonsai({ pageIndex: pageIndex - 1, pageSize }))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  }, [fetchApi, pageIndex, pageSize, gardenLoading]);
  const [loading, setLoading] = useState(false);
  const bonsaiProps = {
    dispatch,
    customerBonsai,
    pageIndex,
    pageSize,
    fetchApi,
    setFetchApi,
  };
  const props = {
    setGardenLoading,
    gardenLoading,
    setLoading,
  };
  const gardens = useSelector((state) => state.garden?.gardenDTO?.items);
  const bonsais = useSelector((state) => state.bonsai?.customerBonsai.items);
  const loadingGarden = useSelector(
    (state) => state?.garden?.gardenDTO?.loading
  );

  const totalItemsCountGarden = useSelector(
    (state) => state.garden?.gardenDTO?.totalItemsCount
  );
  const totalItemsCountBonsai = useSelector(
    (state) => state.bonsai?.customerBonsai?.totalItemsCount
  );
  const handlePageChange = (page) => {
    setPageIndex(page);
  };
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
        <div className="flex items-center gap-3">
          <div className="font-bold text-[25px]">
            Bước 1:
            <span className="text-[18px] font-normal opacity-70">
              {typeEnum == 2 ? (
                <>
                  {gardenDetail?.address
                    ? gardenDetail?.address
                    : "Vui lòng chọn vườn"}
                </>
              ) : (
                <>
                  {bonsaiDetail
                    ? bonsaiDetail?.bonsai?.name
                    : "Vui lòng chọn cây"}
                </>
              )}
            </span>
          </div>
        </div>
        <div
          className={`${selectedGardenId == "" ? "tooltip" : ""} `}
          data-tip="Vui lòng chọn vườn"
        >
          <button
            onClick={() => handleToStepTwo()}
            disabled={selectedGardenId == ""}
            className={`w-[30px] h-[30px] ${
              selectedGardenId == ""
                ? "hover:cursor-not-allowed"
                : "hover:bg-[#3a9943] hover:text-[#fff]"
            }  p-2 rounded-full flex items-center justify-center text-[20px]`}
          >
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
      {typeEnum == 2 ? (
        <div className="">
          <button
            className="bg-[#3a9943] rounded-[10px] p-2 text-[#fff]"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            + Thêm vườn
          </button>
          <AddCustomerGarden {...props} />
        </div>
      ) : (
        <div className="">
          <button
            onClick={() =>
              document.getElementById("modal_create_bonsai_garden").showModal()
            }
            className="bg-[#3a9943] border outline-none text-[#fff] p-3 rounded-[8px] my-3 hover:border-[green]"
          >
            + Thêm cây
          </button>
          <ModalCreateCustomerBonsai {...bonsaiProps} />
        </div>
      )}
      {typeEnum == 2 ? (
        <div>
          {loadingGarden ? (
            <Loading loading={loadingGarden} />
          ) : (
            <div className="">
              {gardens?.length > 0
                ? gardens?.map((garden) => (
                    <div
                      key={garden.id}
                      className={`flex border ${
                        selectedGardenId == garden?.id ? "border-[#3a9943]" : ""
                      } gap-5 p-5 my-5 relative rounded-[8px]`}
                    >
                      <button
                        onClick={() => {
                          setSelectedGardenId(garden.id);
                        }}
                        className="absolute right-5 outline-none text-[20px]"
                      >
                        {selectedGardenId == garden.id ? (
                          <CheckCircleOutlined className="text-[#3a9943]" />
                        ) : (
                          <PlusCircleOutlined />
                        )}
                      </button>
                      <div className="w-[300px] h-[200px] border rounded-[8px]">
                        <img
                          className="w-full h-full object-cover rounded-[8px]"
                          src={
                            garden?.customerGardenImages?.length > 0
                              ? garden?.customerGardenImages[0]?.image
                              : noImage
                          }
                          alt=""
                        />
                      </div>
                      <div className="w-[70%]">
                        <div className="text-[25px] w-[90%]">
                          {garden.address}
                        </div>
                        <div>
                          Diện tích: {garden?.square}m<sup>2</sup>
                        </div>
                        <div className="">
                          <div className="w-full">Bonsai đang trồng:</div>
                          {garden.customerBonsais.length > 0 ? (
                            garden.customerBonsais?.map((bonsai) => (
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
                                        ? bonsai?.bonsai?.bonsaiImages[0]
                                            ?.imageUrl
                                        : noImage
                                    }
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <div className="font-bold text-[20px]">
                                    {bonsai?.bonsai?.name}
                                  </div>
                                  <div className="text-[12px]">
                                    <div>
                                      Năm trồng: {bonsai.bonsai.yearOfPlanting}
                                    </div>
                                    <div>
                                      Hoành cây: {bonsai.bonsai.trunkDimenter}
                                      cm
                                    </div>
                                    <div>
                                      Chiều cao: {bonsai.bonsai.height}m
                                    </div>
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
                  ))
                : "Bạn chưa có vườn nào"}
              {gardens?.length > 0 ? (
                <Pagination
                  current={pageIndex}
                  pageSize={pageSize}
                  total={totalItemsCountGarden}
                  onChange={handlePageChange}
                  className="text-center mt-5"
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {loading ? (
            <Loading loading={loadingGarden} />
          ) : (
            <div className="">
              {bonsais?.length > 0
                ? bonsais?.map((bonsai) => (
                    <div
                      key={bonsai.id}
                      className={`border ${
                        bonsai.id == selectedGardenId ? "border-[#3a9943]" : ""
                      } flex gap-2 relative my-2 p-3 rounded-[8px]`}
                    >
                      <div className="w-[300px] h-[200px] border rounded-[8px]">
                        <img
                          className="w-full h-full object-cover rounded-[8px]"
                          src={
                            bonsai?.bonsai?.bonsaiImages?.length > 0
                              ? bonsai?.bonsai?.bonsaiImages[0]?.imageUrl
                              : noImage
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[23px]">
                          {bonsai?.bonsai?.name}
                        </div>
                        <div className="text-[16px] opacity-70">
                          <div className="">Code :{bonsai?.bonsai?.code}</div>
                          <div>Năm trồng: {bonsai?.bonsai?.yearOfPlanting}</div>
                          <div>
                            Hoành cây: {bonsai?.bonsai?.trunkDimenter}cm
                          </div>
                          <div>Chiều cao: {bonsai?.bonsai?.height}m</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedGardenId(bonsai.id);
                        }}
                        className="absolute right-5 outline-none text-[20px]"
                      >
                        {selectedGardenId == bonsai.id ? (
                          <CheckCircleOutlined className="text-[#3a9943]" />
                        ) : (
                          <PlusCircleOutlined />
                        )}
                      </button>
                    </div>
                  ))
                : "Bạn chưa có cây nào"}
              {bonsais?.length > 0 ? (
                <Pagination
                  current={pageIndex}
                  pageSize={pageSize}
                  total={totalItemsCountBonsai}
                  onChange={handlePageChange}
                  className="text-center mt-5"
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StepOne;
