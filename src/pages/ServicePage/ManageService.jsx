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
              <div key={ser.id} className="border-b flex w-full gap-2">
                <div className="flex gap-2">
                  Thời gian làm từ
                  <div>{new Date(ser.startDate).toLocaleDateString()}</div>
                  đến ngày
                  <div>{new Date(ser.endDate).toLocaleDateString()}</div>
                </div>
                <div className="w-[40%]">Địa chỉ: {ser.customerGarden.address}</div>
                <div>
                  <div>Phụ phí: {formatPrice(ser.temporarySurchargePrice)}</div>
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
