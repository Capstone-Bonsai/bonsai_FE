import React, { useEffect } from "react";
import NavbarUser from "../Auth/NavbarUser";
import MinHeight from "../../components/MinHeight";
import { useDispatch, useSelector } from "react-redux";
import { LeftCircleOutlined } from "@ant-design/icons";
import { contractDetailById } from "../../redux/slice/contractSlice";
function ContractUserDetail(props) {
  const dispatch = useDispatch();
  const contractId = props.contractId;

  useEffect(() => {
    dispatch(contractDetailById(contractId));
  }, [contractId]);
  const { contractDetail } = useSelector((state) => state.contract);
  console.log(contractDetail);
  return (
    <div className="w-full relative">
      <button
        className="absolute top-[-10px] left-[-10px]"
        onClick={() => props.setSelectedDetail(false)}
      >
        <LeftCircleOutlined className="text-[20px]" />
      </button>
      <div className="mt-3 border h-full">
        <div>{new Date(contractDetail.startDate).toLocaleDateString()}</div>
        <div>{props.contractId}</div>
      </div>
    </div>
  );
}

export default ContractUserDetail;
