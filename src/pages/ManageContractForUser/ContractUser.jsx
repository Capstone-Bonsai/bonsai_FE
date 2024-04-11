import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import NavbarUser from "../Auth/NavbarUser";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listAllContract } from "../../redux/slice/contractSlice";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContractUserDetail from "./ContractUserDetail";

function ContractUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const contracts = useSelector(
    (state) => state.contract?.listContractDTO?.items
  );
  const [selectedDetail, setSelectedDetail] = useState(false);
  const [contractId, setContractId] = useState("");
  console.log(contractId);
  useEffect(() => {
    const payload = {
      pageIndex: currentPage - 1,
      pageSize,
    };
    setLoading(true);
    dispatch(listAllContract(payload))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  }, [currentPage]);
  const handleNavigate = () => {
    navigate("/ContractDetail");
  };
  const props = {
    contractId,
    setSelectedDetail,
  };
  return (
    <MinHeight>
      <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
        <NavbarUser />
        <div className="border w-[75%] flex flex-col items-center p-4">
          {selectedDetail ? (
            <ContractUserDetail {...props} />
          ) : (
            <>
              {contracts?.map((contract) => (
                <div className="w-full relative" key={contract.id}>
                  <div className="">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        Thời gian làm:
                        <div>
                          {new Date(contract.startDate).toLocaleDateString()}
                        </div>
                        -
                        <div>
                          {new Date(contract.endDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>{contract.address}</div>
                      <div>Tình trạng: </div>
                    </div>
                  </div>
                  <div className="w-full border-b flex items-center">
                    <div className="w-[75%]">
                      <div>
                        Diện tích: {contract.gardenSquare}m <sup>2</sup>
                      </div>
                      <div>
                        Số lượng người làm vườn: {contract.numberOfGardener}{" "}
                        người
                      </div>
                      <div>
                        Giá chuẩn: {formatPrice(contract.standardPrice)}
                      </div>
                      <div>Phụ phí: {formatPrice(contract.surchargePrice)}</div>
                    </div>
                    <div className="text-[#3a9943] w-[15%]">
                      {formatPrice(contract.totalPrice)}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedDetail(true), setContractId(contract.id);
                      }}
                      className="text-[12px] absolute bottom-0 right-0 pl-5 hover:text-[#3a9943]"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {/* <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItemsCount}
          onChange={handlePageChange}
          className="text-center mt-5"
        /> */}
    </MinHeight>
  );
}

export default ContractUser;
