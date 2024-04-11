import MinHeight from "../../components/MinHeight";
import NavbarUser from "../Auth/NavbarUser";
import { manageServiceCustomer } from "../../redux/slice/serviceSlice";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { formatPrice } from "../../components/formatPrice/FormatPrice";

function ManageService() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const listCusService = useSelector(
    (state) => state.service.manageService?.items
  );

  useEffect(() => {
    const payload = {
      pageIndex: currentPage - 1,
      pageSize,
    };
    setLoading(true);
    dispatch(manageServiceCustomer(payload))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  }, [currentPage]);
  const { totalItemsCount } = useSelector(
    (state) => state.service?.manageService
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {/* {loading ? (
        <Loading loading={loading} />
      ) : ( */}
      <MinHeight>
        <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
          <NavbarUser />
          <div className="border w-[75%] flex flex-col items-center p-4">
            {listCusService?.map((ser) => (
              <div
                key={ser.id}
                className="border-b w-full gap-2 flex items-center"
              >
                <div className=" w-[80%]">
                  <div className="flex gap-2 text-[14px]">
                    Thời gian làm:
                    <div>{new Date(ser.startDate).toLocaleDateString()}</div>-
                    <div>{new Date(ser.endDate).toLocaleDateString()}</div>
                  </div>
                  <div className="">
                    <div className="">
                      Địa chỉ: {ser.customerGarden.address}
                    </div>
                    <div className="opacity-70 text-[14px]">
                      Phụ phí dự kiến:{" "}
                      {formatPrice(ser.temporarySurchargePrice)}
                    </div>
                  </div>
                </div>
                <div className="text-[#3a9943] w-[15%] flex-end text-[14px]">
                  {formatPrice(ser.temporaryTotalPrice)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItemsCount}
          onChange={handlePageChange}
          className="text-center mt-5"
        />
      </MinHeight>
      {/* )} */}
    </>
  );
}

export default ManageService;
