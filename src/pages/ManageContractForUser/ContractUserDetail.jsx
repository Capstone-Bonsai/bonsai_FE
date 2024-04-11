import React, { useEffect } from "react";
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
function ContractUserDetail(props) {
  const dispatch = useDispatch();
  const contractId = props.contractId;
  const location = useLocation();
  useEffect(() => {
    dispatch(contractDetailById(contractId));
  }, [contractId]);
  const { contractDetail } = useSelector((state) => state.contract);
  const tasks = useSelector(
    (state) => state.contract?.listTaskDTO?.taskOfContracts
  );
  console.log(tasks);
  useEffect(() => {
    dispatch(listTask(contractId));
  }, [contractId]);
  const handlePaymentContract = async (contractId) => {
    try {
      const res = await paymentContract(contractId);
      window.location.href = res;
    } catch (error) {
      console.log("loi r", error);
    }
  };
  return (
    <div className="w-full relative">
      <button
        className="absolute top-[-10px] left-[-10px]"
        onClick={() => props.setSelectedDetail(false)}
      >
        <LeftCircleOutlined className="text-[20px]" />
      </button>
      <div className="mt-3 h-full">
        <div className="flex gap-2 border-b">
          Thời gian làm việc:
          <div>{new Date(contractDetail.startDate).toLocaleDateString()}</div>-
          <div>{new Date(contractDetail.endDate).toLocaleDateString()}</div>
        </div>
        <div>Khoảng cách: {contractDetail?.distance}m</div>
        <div>
          Diện tích vườn: {contractDetail.gardenSquare}m<sup>2</sup>
        </div>
        <div className="flex justify-end">
          <div className="border w-[30%] p-2  rounded-[10px]">
            <div className="border-b">
              <div>
                Chi phí dịch vụ: {formatPrice(contractDetail.standardPrice)}
              </div>
              <div>Phụ phí: {formatPrice(contractDetail.surchargePrice)}</div>
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
            <div className="font-bold">Đang thực hiện:</div>
            {tasks?.map((task) => (
              <div key={task.id}>
                <div>-{task.name}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ContractUserDetail;
