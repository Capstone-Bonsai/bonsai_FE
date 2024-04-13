import React, { useEffect, useState } from "react";
import NavbarUser from "../Auth/NavbarUser";
import MinHeight from "../../components/MinHeight";
import { useDispatch, useSelector } from "react-redux";
import { LeftCircleOutlined } from "@ant-design/icons";
import {
  contractDetailById,
  listTask,
  paymentContract,
} from "../../redux/slice/contractSlice";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ModalComplain from "./ModalComplain";
import { Image } from "antd";

function ContractUserDetail(props) {
  const dispatch = useDispatch();
  const contractId = props.contractId;
  const location = useLocation();
  const [apiContractLoading, setApiContractLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  useEffect(() => {
    setLoading(true);
    dispatch(contractDetailById(contractId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching contract detail:", error);
        setLoading(false);
      });
  }, [contractId, apiContractLoading]);
  const { contractDetail } = useSelector((state) => state.contract);

  const handlePaymentContract = async (contractId) => {
    try {
      const res = await paymentContract(contractId);
      window.location.href = res;
    } catch (error) {
      console.log("loi r", error);
    }
  };
  return (
    <>
      {loading ? (
        <Loading loading={loading} isRelative={true} />
      ) : (
        <div className="w-full relative">
          <button
            className="absolute top-[-10px] left-[-10px]"
            onClick={() => props.setSelectedDetail(false)}
          >
            <LeftCircleOutlined className="text-[20px]" />
          </button>
          <div className="mt-3 h-full">
            <div className="text-center text-lg font-bold">Hợp đồng</div>
            <div className="text-center underline">{contractDetail.id}</div>
            <div className="font-bold">1. Thông tin hợp đồng: </div>
            <div className="border p-3">
              <div className="flex gap-2 border-b">
                Thời gian làm việc:
                <div>
                  {new Date(contractDetail.startDate).toLocaleDateString()}
                </div>
                -
                <div>
                  {new Date(contractDetail.endDate).toLocaleDateString()}
                </div>
              </div>
              <div className="">
                {" "}
                <span className="font-bold">Tên khách hàng:</span>{" "}
                {contractDetail?.customerName}
              </div>
              <div>
                <span className="font-bold">Số điện thoại:</span>{" "}
                {contractDetail?.customerPhoneNumber}
              </div>
              <div>
                <span className="font-bold">Địa chỉ:</span>{" "}
                {contractDetail?.address}
              </div>
              <div>
                <span className="font-bold">Loại dịch vụ: </span>{" "}
                {contractDetail?.serviceType == 1
                  ? "Chăm sóc cây cảnh"
                  : "Chăm sóc sân vườn"}
              </div>
              <div>Khoảng cách: {contractDetail?.distance}m</div>
              <div>
                Diện tích vườn: {contractDetail.gardenSquare}m<sup>2</sup>
              </div>
              <div className="flex justify-end">
                <div className="border w-[30%] p-2  rounded-[10px]">
                  <div className="border-b">
                    <div>
                      Chi phí dịch vụ:{" "}
                      {formatPrice(contractDetail.standardPrice)}
                    </div>
                    <div>
                      Phụ phí: {formatPrice(contractDetail.surchargePrice)}
                    </div>
                  </div>
                  <div>
                    Tổng:{" "}
                    <span className="text-[#3a9943]">
                      {" "}
                      {formatPrice(contractDetail.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              {contractDetail.contractStatus == 1 ||
              contractDetail.contractStatus == 4 ? (
                <button
                  onClick={() => handlePaymentContract(contractDetail.id)}
                  className="btn hover:bg-[#3a9943] hover:text-[#ffffff]"
                >
                  Tiến hành thanh toán
                </button>
              ) : (
                ""
              )}
            </div>
            {contractDetail.contractStatus == 1 ||
            contractDetail.contractStatus == 4 ||
            contractDetail.contractStatus == 5 ? (
              ""
            ) : (
              <>
                <div className="font-bold">Tiến độ công việc: </div>
                <div className="overflow-x-auto">
                  <table className="w-full table border">
                    {/* <colgroup className="border">
                      <col className="w-[20%]" />
                      <col className="w-[40%]" />
                      <col className="w-[40%]" />
                    </colgroup> */}
                    <thead>
                      <tr className="font-bold text-lg">
                        <th className="">STT</th>
                        <th>Tên công việc</th>
                        <th>Thời gian hoàn thành</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractDetail?.taskOfContracts?.map((task, index) => (
                        <tr key={task.id} className="">
                          <td>{index + 1}</td>
                          <td>{task.name}</td>
                          <td>
                            {task?.completedTime != null
                              ? new Date(
                                  task?.completedTime
                                ).toLocaleDateString()
                              : "Chưa hoàn thành"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between mt-3 items-center">
                  <div className="font-bold">Khiếu nại: </div>
                  <button
                    onClick={() =>
                      document.getElementById("modal_complain").showModal()
                    }
                    className="btn outline-none font-normal hover:text-[#fff] hover:bg-[#3a9943] mr-[100px]"
                  >
                    Thêm khiếu nại
                  </button>
                  <ModalComplain
                    contractDetailById={contractDetailById}
                    contractId={contractDetail.id}
                    setApiContractLoading={setApiContractLoading}
                  />
                </div>
                {contractDetail?.complaints?.length > 0 ? (
                  <table className="w-full table">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Chi tiết khiếu nại</th>
                        <th>Trạng Thái</th>
                        <th>Lý do bị từ chối</th>
                        <th>Hình ảnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractDetail?.complaints?.length > 0 ? (
                        contractDetail?.complaints?.map((complaint, index) => (
                          <tr key={complaint?.id}>
                            <td>{index + 1}</td>
                            <td>{complaint?.detail}</td>
                            <td>{complaint?.complaintStatus}</td>
                            <td>{complaint?.cancelReason}</td>
                            <td>
                              {/* {complaint?.complaintImages.map(
                                (image, index) => (
                                  <Image
                                    width={200}
                                    height={200}
                                    className="object-cover"
                                    key={index}
                                    src={image?.image}
                                    alt={`Image ${index}`}
                                  />
                                )
                              )} */}
                              <Image
                                width={200}
                                height={200}
                                src={
                                  complaint?.complaintImages > 0
                                    ? complaint?.complaintImages[0].image
                                    : ""
                                }
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ContractUserDetail;
