import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MinHeight from "../../components/MinHeight";
import {
  serviceOption,
  setServiceTypeId,
} from "../../redux/slice/serviceSlice";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
function ServiceOption() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(serviceOption());
  }, []);
  // const handleServiceTypeId = (serviceTypeId) => {
  //   dispatch(setServiceTypeId(serviceTypeId));
  // };
  const services = useSelector((state) => state.service?.serviceOption?.items);
  return (
    <div className="mb-12 pb-12 w-[90%] m-auto">
      <MinHeight>
        <div>
          <div className="text-center text-3xl font-bold my-12">
            Dịch vụ chăm sóc
          </div>
          <div className="flex gap-[5%]  ">
            {services?.map((service) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                key={service.id}
                className="mt-5 border w-[50%] rounded-[10px] drop-shadow-2xl bg-[#fff] hover:border-[1px] hover:border-[#3a9943]"
              >
                <Link
                  // onClick={() => handleServiceTypeId(service?.id)}
                  to={`/ServiceRegister?typeEnum=${service.typeEnum}&serviceTypeId=${service.id}`}
                  className=""
                >
                  <div className="w-full h-[400px]">
                    <img
                      className="w-full h-full object-cover rounded-t-[10px]"
                      src={service?.image}
                      alt=""
                    />
                  </div>
                  <div className="p-5">
                    <div className="font-bold text-[#3a9943] text-[30px] my-2">
                      {service.typeName}
                    </div>
                    <div className="w-full text-[14px] whitespace-pre-line">
                      {service.description}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </MinHeight>
    </div>
  );
}

export default ServiceOption;
