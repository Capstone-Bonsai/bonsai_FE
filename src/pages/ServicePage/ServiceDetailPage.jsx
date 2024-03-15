import React, { useEffect } from "react";
import MinHeight from "../../components/MinHeight";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "../../redux/slice/serviceSlice";
import { formatPrice } from "../../components/formatPrice/FormatPrice";

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  console.log(serviceId);
  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
  }, [serviceId]);

  const serviceDetail = useSelector((state) => state.service.serviceById);

  return (
    <MinHeight>
      <div className="m-auto w-[70%] mt-10 flex justify-between bg-[#ffffff] mb-5">
        <div className="border w-full  py-5">
          <div className="w-[30%] h-[200px] m-auto flex justify-center">
            <img src={serviceDetail?.image} className="rounded-[20px] h-full" alt="" />
          </div>
          <div className="text-center">
            <div>{serviceDetail.name}</div>
            {serviceDetail.serviceBaseTasks?.map((serviceBT) => (
              <div key={serviceBT.baseTaskId}>{serviceBT.baseTask.name}</div>
            ))}
            <div>{formatPrice(serviceDetail.standardPrice)}</div>
            <button className="bg-[#3e9943] text-[#ffffff] p-2 rounded-[10px]">
              Đăng ký ngay
            </button>
          </div>
          <div>Lưu ý: Giá này chỉ là giá dự kiến trước khi đi tham khảo sân vườn</div>
        </div>
      </div>
    </MinHeight>
  );
}

export default ServiceDetailPage;
