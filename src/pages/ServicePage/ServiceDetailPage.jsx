import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "../../redux/slice/serviceSlice";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import Loading from "../../components/Loading";

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const serviceDetail = useSelector((state) => state.service.serviceById);
  const [isLoading, setIsLoading] = useState(false);
  const [prevServiceId, setPrevServiceId] = useState(
    useSelector((state) => state.service.serviceById.id)
  );

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
                <div className="text-3xl border-b mb-3 py-3">
                  {serviceDetail.name}
                </div>
                <div>
                  <div>Chi tiết dịch vụ:</div>
                  {serviceDetail.serviceBaseTasks?.map((serviceBT) => (
                    <div key={serviceBT.baseTaskId}>
                      {serviceBT.baseTask.name}
                    </div>
                  ))}
                </div>
                <div>{formatPrice(serviceDetail.standardPrice)}</div>
                <button className="bg-[#3e9943] text-[#ffffff] p-2 rounded-[10px]">
                  Đăng ký ngay
                </button>
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
