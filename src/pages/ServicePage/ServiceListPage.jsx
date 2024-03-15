import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service_img from "../../assets/test_service.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchService } from "../../redux/slice/serviceSlice";
import { Pagination } from "antd";
import Loading from "../../components/Loading";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import MinHeight from "../../components/MinHeight";
function ServiceListPage() {
  const dispatch = useDispatch();
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(fetchService({ page: currentPage - 1, size: pageSize }));
  }, [currentPage]);
  const isLoading = useSelector((state) => state.service.loading);
  console.log(isLoading);
  const totalItems = useSelector(
    (state) => state.service.serviceDTO.totalItemsCount
  );
  console.log(totalItems);
  const serivceList = useSelector((state) => state.service.serviceDTO.items);
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <div className="mb-12 pb-12 w-[80%] m-auto">
          <MinHeight>
            <div className="">
              <div className="text-center text-3xl font-bold my-12">
                Dịch vụ chăm sóc
              </div>
            </div>
            {serivceList?.map((service) => (
              <div
                key={service.id}
                className="w-[90%] my-5 h-[300px] m-auto border border-[#f0f0f0] flex justify-between gap-4 "
              >
                <div className=" w-[25%] p-4">
                  <img src={service?.image} className="h-full w-full border drop-shadow-lg" alt="" />
                </div>
                <div className="w-[50%]">
                  <div className="text-[15px] py-3">
                    <Link
                      className="hover:text-[#3e9943] text-[#333] montserrat text-[24px]"
                      to={`/serviceDetail/${service.id}`}
                    >
                      {service.name}
                    </Link>
                  </div>
                  <div className="text-[14px] py-5">{service.description}</div>
                </div>
                <div className="p-5 w-[25%]">
                  <div className="h-full border-l pl-5">
                    <div className="">
                      <div className="text-[14px] text-[#666] font-[300]">
                        Dịch vụ:
                        <span className="text-[#3e9943]">
                          {service.serviceType === "BonsaiCare"
                            ? "(Chăm sóc cây cảnh)"
                            : "(Chăm sóc sân vườn)"}
                        </span>
                      </div>
                      <div className="text-[24px] font-bold uppercase text-[#3e9943] py-4">
                        {formatPrice(service.standardPrice)}
                      </div>
                    </div>
                    <div className="text-center mt-5">
                      <Link
                        to={`/serviceDetail/${service.id}`}
                        className="text-[20px] w-[100%] h-[40px] bg-[#f0f0f0] flex justify-center items-center rounded
          hover:bg-[#3e9943] hover:text-[#ffffff]"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </MinHeight>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={onPageChange}
            className="text-center mt-5"
          />
        </div>
      )}
    </>
  );
}

export default ServiceListPage;
