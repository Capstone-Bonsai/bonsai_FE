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
              <div className="text-center text-3xl font-semibold my-12 text-[#3e9943]">
                Dịch vụ chăm sóc
              </div>
            </div>
            {serivceList?.map((service) => (
              <div
                key={service.id}
                className=" w-[90%] m-auto drop-shadow-lg border hover:border-gray-950 flex justify-between gap-4 "
              >
                <div className=" bg-[red] w-[25%]">
                  <img src={service_img} className="h-full w-full" alt="" />
                </div>
                <div className="w-[50%]">
                  <div className="text-2xl py-6 font-normal ">
                    <Link className="hover:text-[#3e9943]" 
                    to={`/serviceDetail/${service.id}`}
                    >
                      {service.name}
                      <span className="text-[#3e9943] pl-5">
                        {service.serviceType === "OneTime"
                          ? "(1 lần)"
                          : "(hàng tháng)"}
                      </span>
                    </Link>
                  </div>
                  <div className="text-lg font-light">
                    {service.description}
                  </div>
                </div>
                <div className="col-span-2 border-l-2 border-slate-200 p-12 w-[25%]">
                  <div className="p-2">
                    <div className="text-4xl font-extrabold uppercase text-[#3e9943]">
                      {formatPrice(service.standardPrice)}{" "}
                      <span className="text-sm">vnd/ngày</span>
                    </div>
                    <div className="pt-4"></div>
                  </div>
                  <div className="text-center">
                    <Link
                      className="text-[20px] w-[100%] h-[56px] flex justify-center items-center rounded
          border-2 border-slate-950 hover:bg-[#3e9943] hover:text-[#ffffff]"
                    >
                      Đăng ký ngay
                    </Link>
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
