import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServiceById,
  postServiceGarden,
} from "../../redux/slice/serviceSlice";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import Loading from "../../components/Loading";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import SelectedGarden from "./SelectedGarden";
import Cookies from "universal-cookie";
import { getGardenNoPagination } from "../../redux/slice/userGarden";
import { toast } from "react-toastify";
import BarLoaderLoading from "../../components/BarLoaderLoading";

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const [isBarLoader, setBarLoader] = useState(false);
  const serviceDetail = useSelector((state) => state.service.serviceById);
  const [isLoading, setIsLoading] = useState(false);
  const [prevServiceId, setPrevServiceId] = useState(
    useSelector((state) => state.service.serviceById.id)
  );
  const [note, setNote] = useState("");
  const [gardenSelected, setGardenSelected] = useState("");
  console.log(gardenSelected);
  const [treeSelected, setTreeSelected] = useState("");
  const [isGardenEmpty, setIsGardenEmpty] = useState(false);
  const [isTreeEmpty, setIsTreeEmpty] = useState(false);
  const gardenNoPagin = useSelector(
    (state) => state?.garden?.gardenNoPagination?.items
  );
  const props = {
    gardenNoPagin,
    setGardenSelected,
    gardenSelected,
  };

  const handleRegisterService = async (e) => {
    e.preventDefault();
    const payload = {
      customerGardenId: gardenSelected.id,
      serviceId: serviceDetail.id,
      note: note,
    };
    if (!gardenSelected) {
      setIsGardenEmpty(true);
    }
    if (!treeSelected && serviceDetail.serviceType == "BonsaiCare") {
      setIsTreeEmpty(true);
    }
    if (serviceDetail.serviceType == "BonsaiCare") {
      payload.customerBonsaiId = treeSelected.id;
    }
    try {
      setBarLoader(true);
      await postServiceGarden(payload);
      setBarLoader(false);
      toast.success("Đky thành công");
    } catch (error) {
      setBarLoader(false);
      toast.error("Đky không thành công", error);
    }
  };

  console.log(serviceId);
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
    }
  }, [serviceId, prevServiceId]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <MinHeight>
          {isBarLoader ? <BarLoaderLoading loading={isBarLoader} /> : ""}
          <div className="text-center mt-5">
            <ul className="steps">
              <li className="step step-success">Danh sách dịch vụ</li>
              <li className="step step-success">Xem chi tiết</li>
              <li className="step">Đăng ký</li>
              <li className="step">Đợi duyệt</li>
            </ul>
          </div>
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
                <div className="flex items-center justify-between border-b mb-3 py-3">
                  <div className="text-3xl ">{serviceDetail.name}</div>
                  <div>
                    {" "}
                    <span className="text-[#3e9943]">
                      {serviceDetail.serviceType === "BonsaiCare"
                        ? "(Chăm sóc cây cảnh)"
                        : "(Chăm sóc sân vườn)"}
                    </span>
                  </div>
                </div>
                <div className="border-b">
                  <div className="text-xl">Chi tiết dịch vụ:</div>
                  {serviceDetail.serviceBaseTasks?.map((serviceBT) => (
                    <div className="text-[15px]" key={serviceBT.baseTaskId}>
                      - {serviceBT.baseTask.name}
                    </div>
                  ))}
                </div>
                <div className="py-2">
                  Giá dự tính:{" "}
                  <span className=" text-[#3a9943]">
                    {formatPrice(serviceDetail.standardPrice)}
                  </span>
                </div>
                <div className="border-y py-2">
                  <div className="flex gap-3 ">
                    {gardenSelected.id ? (
                      <div>{gardenSelected.address}</div>
                    ) : (
                      <div className={`${isGardenEmpty ? "text-[red]" : ""}`}>
                        Chọn Vườn{" "}
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
                      className="flex outline-none hover:text-[#3a9943] text-[18px]"
                    >
                      <PlusCircleOutlined />
                    </button>
                  </div>
                  <div className="text-[12px] text-black">
                    {isGardenEmpty ? (
                      <span>
                        (Vui lòng chọn vườn
                        <span className="text-[red]">*</span>)
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  {serviceDetail.serviceType == "GardenCare" ? (
                    ""
                  ) : (
                    <div className="flex gap-3">
                      <div className={`${isTreeEmpty ? "text-[red]" : ""}`}>
                        Chọn cây cảnh
                      </div>
                      <input required type="hidden" name="" id="" />
                      <button
                        className="flex hover:text-[#3a9943] text-[18px]"
                        onClick={() =>
                          document
                            .getElementById("my_modal_selectedBonsai")
                            .showModal()
                        }
                      >
                        <PlusCircleOutlined />
                      </button>
                    </div>
                  )}
                </div>
                <div className=" py-5 flex items-center justify-between">
                  <div>
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ghi chú: "
                      className="border border-black p-2 outline-none rounded-[5px]"
                      type="text"
                      name=""
                      id=""
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
                  Lưu ý: Giá này chỉ là giá dự kiến trước khi đi tham khảo sân
                  vườn
                </div>
              </div>
            </div>
          </div>
        </MinHeight>
      )}{" "}
    </>
  );
}

export default ServiceDetailPage;
