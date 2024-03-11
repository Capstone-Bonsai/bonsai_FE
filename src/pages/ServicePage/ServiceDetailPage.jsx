import React, { useEffect } from "react";
import MinHeight from "../../components/MinHeight";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "../../redux/slice/serviceSlice";

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
        <div className="border w-full">
          <div className="w-[30%] m-auto">
            <img src={serviceDetail?.image} alt="" />
          </div>
          <div>{serviceDetail.name}</div>
          {serviceDetail.serviceBaseTasks?.map((serviceBT) => (
          <div key={serviceBT.baseTaskId}>{serviceBT.baseTask.name}</div>
          ))}
        </div>
      </div>
    </MinHeight>
  );
}

export default ServiceDetailPage;
