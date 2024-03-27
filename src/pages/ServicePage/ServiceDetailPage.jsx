import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "../../redux/slice/serviceSlice";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import Loading from "../../components/Loading";
import { PlusCircleOutlined } from "@ant-design/icons";
import SelectedGarden from "./SelectedGarden";
import Cookies from "universal-cookie";

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const serviceDetail = useSelector((state) => state.service.serviceById);
  const [isLoading, setIsLoading] = useState(false);
  const [prevServiceId, setPrevServiceId] = useState(
    useSelector((state) => state.service.serviceById.id)
  );
  const [gardenSelected, setGardenSelected] = useState("");
  const [treeSelected, setTreeSelected] = useState("");
  const [isGardenEmpty, setIsGardenEmpty] = useState(false);
  const [isTreeEmpty, setIsTreeEmpty] = useState(false);
  // useEffect(() => {
  //   fetchCustomerGarden
  // }, [])
  const cookie = new Cookies();

  const handleRegisterService = (e) => {
    e.preventDefault();
    if (!gardenSelected) {
      setIsGardenEmpty(true);
    }
    if (!treeSelected) {
      setIsTreeEmpty(true);
    }
  };
  console.log(serviceId);
  useEffect(() => {
    if (serviceId !== prevServiceId) {
      setIsLoading(true);
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
                  <div className="flex gap-3 items-center ">
                    <div>Chọn Vườn</div>
                    <input required type="hidden" name="" id="" />
                    <SelectedGarden />
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
                  <div className="flex gap-3">
                    <div className={`${isTreeEmpty ? "text-[red]" : ""}`}>
                      Chọn cây cảnh
                    </div>
                    <input required type="hidden" name="" id="" />
                    <button className="flex hover:text-[#3a9943] text-[18px]">
                      <PlusCircleOutlined />
                    </button>
                  </div>
                </div>
                <div className=" py-5">
                  <button
                    onClick={handleRegisterService}
                    className="bg-[#3e9943] text-[#ffffff] p-2 rounded-[10px]"
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
