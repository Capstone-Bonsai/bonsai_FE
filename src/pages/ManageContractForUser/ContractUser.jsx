import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import NavbarUser from "../Auth/NavbarUser";
import { Pagination, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listAllContract } from "../../redux/slice/contractSlice";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContractUserDetail from "./ContractUserDetail";
import Loading from "../../components/Loading";
import { AuditOutlined } from "@ant-design/icons";
import {
  getStatusColor,
  getStatusText,
} from "../../components/status/contractStatus";
import Cookies from "universal-cookie";
function ContractUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cookies = new Cookies();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resultCode = searchParams.get("resultCode");
  console.log(currentPage);
  const [pageSize, setPageSize] = useState(3);
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
  const contracts = useSelector(
    (state) => state.contract?.listContractDTO?.items
  );
  console.log(contracts);
  const { totalItemsCount } = useSelector(
    (state) => state.contract.listContractDTO
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (resultCode == 0) {
      toast.success("Thanh toán thành công");
    }
    // else if (
    //   resultCode != 0 &&
    //   resultCode != undefined &&
    //   resultCode != null
    // ) {
    //   toast.error("Thanh toán thất bại");
    // }
  }, [resultCode]);
  const seenContractDetail = cookies.get("seenContractDetail", { path: "/" });
  console.log(seenContractDetail);
  const [selectedDetail, setSelectedDetail] = useState(
    seenContractDetail ? true : false
  );
  console.log(selectedDetail);
  const [contractId, setContractId] = useState("");
  console.log(contractId);

  const props = {
    contractId,
    setSelectedDetail,
  };
  const handleSeenDetail = (contractId) => {
    setSelectedDetail(true);
    setContractId(contractId);
    cookies.set("seenContractDetail", contractId);
  };
  return (
    <MinHeight>
      <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
        <NavbarUser />
        <div className="border w-[75%] flex flex-col items-center p-4">
          <>
            {loading ? (
              <Loading loading={loading} isRelative={true} />
            ) : (
              <>
                {selectedDetail ? (
                  <ContractUserDetail {...props} />
                ) : (
                  <div className="w-full">
                    {contracts ? (
                      contracts?.map((contract) => (
                        <div className="w-full relative" key={contract.id}>
                          <div className="">
                            <div className="flex justify-between">
                              <div className="flex gap-2 w-[35%] ">
                                <span className="font-bold">
                                  {" "}
                                  Thời gian làm:
                                </span>
                                <div>
                                  {new Date(
                                    contract.startDate
                                  ).toLocaleDateString()}
                                </div>
                                -
                                <div>
                                  {new Date(
                                    contract.endDate
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="text-[#3a9943] text-[20px] text-end">
                                {contract?.totalPrice == 0
                                  ? "Đang cập nhật"
                                  : formatPrice(contract?.totalPrice)}
                              </div>
                            </div>
                            <div className="w-[30%]">
                              <span className="font-bold"> Tình trạng: </span>
                              <Tag
                                color={getStatusColor(
                                  contract?.serviceOrderStatus
                                )}
                              >
                                {getStatusText(contract?.serviceOrderStatus)}
                              </Tag>
                            </div>
                          </div>
                          <div className="w-full border-b flex items-center">
                            <div className="w-[75%]">
                              <div>
                                <span className="font-bold"> Diện tích:</span>{" "}
                                {contract.gardenSquare}m<sup>2</sup>
                              </div>
                              <div className="">
                                <span className="font-bold">Địa chỉ:</span>{" "}
                                {contract.address}
                              </div>
                              <div>
                                <span className="font-bold">Quãng đường: </span>
                                {Math.floor(contract?.distance / 1000)?.toLocaleString()}km
                              </div>
                            </div>
                            <button
                              onClick={() => handleSeenDetail(contract.id)}
                              className="text-[12px] absolute bottom-0 right-0 pl-5 text-[#3a9943] hover:text-black"
                            >
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="opacity-70 text-[50px] text-center">
                        <AuditOutlined className="text-[100px]" />
                        <div>Không có đơn hàng dịch vụ</div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
      {selectedDetail || !contracts ? (
        ""
      ) : (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItemsCount}
          onChange={handlePageChange}
          className="text-center mt-5"
        />
      )}
    </MinHeight>
  );
}

export default ContractUser;
