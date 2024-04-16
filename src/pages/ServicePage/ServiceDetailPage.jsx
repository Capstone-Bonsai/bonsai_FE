import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServiceById,
  postServiceGarden,
} from "../../redux/slice/serviceSlice";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import Loading from "../../components/Loading";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import SelectedGarden from "./SelectedGarden";
import { DatePicker, Space } from "antd";
import {
  getGardenNoPagination,
  getListBonsaiInGarden,
} from "../../redux/slice/userGarden";
import { toast } from "react-toastify";
import BarLoaderLoading from "../../components/BarLoaderLoading";
import SelectedBonsai from "./SelectedBonsai";
import Cookies from "universal-cookie";
import {
  acceptServiceGarden,
  cancelServiceGarden,
} from "../../redux/slice/serviceSlice";
import ConfirmTempPrice from "./ConfirmTempPrice";
import { allCategory, careStep } from "../../redux/slice/categorySlice";
const { RangePicker } = DatePicker;

function ServiceDetailPage() {
  const cookies = new Cookies();
  const userData = cookies.get("user");
  const [dateRange, setDateRange] = useState([]);
  console.log(dateRange);
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBarLoader, setBarLoader] = useState(false);
  const serviceDetail = useSelector((state) => state.service.serviceById);
  const [isLoading, setIsLoading] = useState(false);
  const [prevServiceId, setPrevServiceId] = useState(
    useSelector((state) => state.service.serviceById.id)
  );
  const [note, setNote] = useState("");
  const [gardenSelected, setGardenSelected] = useState("");
  const [treeSelected, setTreeSelected] = useState("");
  console.log(treeSelected);
  const [isGardenEmpty, setIsGardenEmpty] = useState(false);
  const [isTreeEmpty, setIsTreeEmpty] = useState(false);
  const gardenNoPagin = useSelector(
    (state) => state?.garden?.gardenNoPagination?.items
  );
  const { serviceTempPrice } = useSelector((state) => state.service);
  const loadingTempPrice = useSelector((state) => state.service.loading);
  console.log(loadingTempPrice);

  useEffect(() => {
    dispatch(allCategory());
  }, []);
  const handleRegisterService = async (e) => {
    e.preventDefault();
    if (!userData) {
      navigate("/login");
      toast.error("Đăng nhập để có thể đăng ký dịch vụ");
    }
    const payload = {
      customerGardenId: gardenSelected.id,
      serviceId: serviceDetail.id,
      startDate: dateRange[0],
      endDate: dateRange[1],
      note: note,
    };
    if (!gardenSelected && userData) {
      setIsGardenEmpty(true);
      toast.error("Vui lòng chọn vườn");
    }
    if (!treeSelected && serviceDetail.serviceType == "BonsaiCare") {
      setIsTreeEmpty(true);
    }
    if (serviceDetail.serviceType == "BonsaiCare") {
      payload.customerBonsaiId = treeSelected.id;
    }
    if (userData && dateRange.length <= 1) {
      toast.error("Vui lòng chọn ngày");
    }
    try {
      if (userData && gardenSelected && dateRange.length > 1) {
        setBarLoader(true);
        const response = await dispatch(postServiceGarden(payload));
        console.log(response);
        setBarLoader(false);
        if (response?.error) {
          toast.error(response.error.message);
        } else {
          toast.success("Vui lòng xác nhận");
          document.getElementById("confirm_temp_price").showModal();
        }
      }
    } catch (error) {
      setBarLoader(false);
      toast.error("Đăng ký không thành công", error);
    }
  };
  const cancelService = async (serviceGardenId) => {
    try {
      await cancelServiceGarden(serviceGardenId);
      toast.error("Đã hủy bỏ dịch vụ");
    } catch (error) {
      toast.error("Lỗi", error);
    }
  };
  const acceptService = async (serviceGardenId) => {
    try {
      await acceptServiceGarden(serviceGardenId);
      navigate("/ManageService");
      toast.success("Đã chấp nhận dịch vụ");
    } catch (error) {
      toast.error("Lỗi", error);
    }
  };
  useEffect(() => {
    if (serviceId !== prevServiceId) {
      setIsLoading(true);
      dispatch(getGardenNoPagination());
      dispatch(fetchServiceById(serviceId))
        .then(() => setIsLoading(false))
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching service detail:", error);
        });
      setPrevServiceId(serviceId);
    } else if (userData) {
      dispatch(getGardenNoPagination());
    }
  }, [serviceId, prevServiceId]);

  useEffect(() => {
    const gardenId = gardenSelected.id;
    dispatch(getListBonsaiInGarden({ gardenId }));
  }, [gardenSelected]);
  const bonsaiInGardenData = useSelector(
    (state) => state.garden.listBonsaiInGarden
  );
  const props = {
    gardenNoPagin,
    setGardenSelected,
    setTreeSelected,
    treeSelected,
    gardenSelected,
    bonsaiInGardenData,
    userData,
    serviceTempPrice,
    loadingTempPrice,
    cancelService,
    acceptService,
  };
  const handleDateChange = (dates, dateStrings) => {
    console.log("Formatted Selected Range: ", dateStrings);
    setDateRange(dateStrings);
  };
  const disabledStartDate = (current) => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return current && current < nextWeek.setHours(0, 0, 0, 0);
  };
  const categories = useSelector(
    (state) => state.category.allCategoryDTO.items
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  console.log(selectedCategoryId);
  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };
  const [careSteps, setCareSteps] = useState("");
  console.log(careSteps);
  useEffect(() => {
    const getCareStep = async () => {
      try {
        const response = await careStep(selectedCategoryId);
        setCareSteps(response);
      } catch (error) {
        const errorRes = error;
        setCareSteps(errorRes);
      }
    };
    getCareStep();
  }, [selectedCategoryId]);
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <MinHeight>
          {isBarLoader ? <BarLoaderLoading loading={isBarLoader} /> : ""}
          {/* <div className="text-center mt-5">
            <ul className="steps">
              <li className="step step-success">Danh sách dịch vụ</li>
              <li className="step step-success">Xem chi tiết</li>
              <li className="step">Đăng ký</li>
              <li className="step">Đợi duyệt</li>
            </ul>
          </div> */}
          <div className="m-auto w-[70%] mt-10 flex mb-5">
            <div className="w-full py-5 flex">
              <div className="w-[50%] flex justify-center">
                <img
                  src={serviceDetail?.image}
                  className="w-[450px] h-[450px] border"
                  alt=""
                />
              </div>
              <div className="border p-5">
                <div className="border-b mb-3 py-3">
                  <div className="text-3xl">{serviceDetail.name}</div>
                  <div>
                    <span className="text-[#3e9943]">
                      {serviceDetail.serviceType === "BonsaiCare"
                        ? "Chăm sóc cây cảnh"
                        : "Chăm sóc sân vườn"}
                    </span>
                  </div>
                </div>
                <div className="border-b">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xl">Chi tiết dịch vụ:</div>
                    {serviceDetail.serviceType == "BonsaiCare" ? (
                      <div className="">
                        <select
                          name="category"
                          onChange={handleCategoryChange}
                          value={selectedCategoryId}
                          className="border outline-none py-2 rounded-[10px]"
                        >
                          <option value="" disabled={selectedCategoryId !== ""}>
                            Chọn loại cây
                          </option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {!careSteps?.items ? (
                    <div>{careSteps}</div>
                  ) : (
                    <div>
                      {careSteps?.items?.map((careStep) => (
                        <div key={careStep.id}>
                          <div>
                            Bước {careStep.orderStep}: {careStep.step}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {serviceDetail.serviceBaseTasks?.map((serviceBT) => (
                    <div className="text-[15px]" key={serviceBT.baseTaskId}>
                      - {serviceBT.baseTask.name}
                    </div>
                  ))}
                </div>
                <div className="py-2">
                  Giá dự tính:
                  <span className=" text-[#3a9943]">
                    {serviceDetail.serviceType == "GardenCare" ? (
                      <>
                        {formatPrice(serviceDetail.standardPrice)}/m<sup>2</sup>
                      </>
                    ) : (
                      <>Tùy thuộc vào cây</>
                    )}
                  </span>
                </div>
                <div className="border-y py-2">
                  <div className="flex gap-3 ">
                    {gardenSelected.id ? (
                      <div>{gardenSelected.address}</div>
                    ) : (
                      <div className={`${isGardenEmpty ? "text-[red]" : ""}`}>
                        Chọn Vườn
                      </div>
                    )}
                    <input required type="hidden" name="" id="" />
                    <SelectedGarden {...props} />
                    <button
                      onClick={() =>
                        document
                          .getElementById("my_modal_selectedGarden")
                          .showModal()
                      }
                      className="flex outline-none text-[#3a9943] text-[18px]"
                    >
                      {!gardenSelected ? (
                        <PlusCircleOutlined />
                      ) : (
                        <EditOutlined />
                      )}
                    </button>
                  </div>
                  <div className="text-[12px] text-black">
                    {isGardenEmpty && !gardenSelected ? (
                      <span>
                        (Vui lòng chọn vườn
                        <span className="text-[red]">*</span>)
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  {serviceDetail.serviceType == "GardenCare" ||
                  !gardenSelected ? (
                    ""
                  ) : (
                    <div className="flex gap-3">
                      {treeSelected?.id ? (
                        <div>{treeSelected.bonsai.name}</div>
                      ) : (
                        <div>
                          <div className={`${isTreeEmpty ? "text-[red]" : ""}`}>
                            Chọn cây cảnh
                          </div>
                          <input required type="hidden" name="" id="" />
                        </div>
                      )}
                      <button
                        className="flex text-[#3a9943] text-[18px] outline-none"
                        onClick={() =>
                          document
                            .getElementById("my_modal_selectedBonsai")
                            .showModal()
                        }
                      >
                        {!treeSelected ? (
                          <PlusCircleOutlined />
                        ) : (
                          <EditOutlined />
                        )}
                      </button>
                      <SelectedBonsai {...props} />
                    </div>
                  )}
                </div>
                <ConfirmTempPrice {...props} />
                <div className=" py-5 flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ghi chú: "
                      className="border border-black p-2 outline-none rounded-[5px]"
                      type="text"
                      name=""
                      id=""
                    />
                    <RangePicker
                      className="border border-black"
                      onChange={handleDateChange}
                      allowClear={false}
                      placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                      disabledDate={disabledStartDate}
                    />
                  </div>

                  <button
                    onClick={handleRegisterService}
                    className="bg-[#3e9943] text-[#ffffff] p-2 rounded-[10px] "
                  >
                    Đăng ký ngay
                  </button>
                </div>

                <div>
                  Lưu ý<span className="text-[red]">*</span>: Giá này chỉ là giá
                  dự kiến trước khi đi tham khảo sân vườn
                </div>
              </div>
            </div>
          </div>
        </MinHeight>
      )}
    </>
  );
}

export default ServiceDetailPage;
