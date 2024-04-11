import React from "react";
import NavbarUser from "../Auth/NavbarUser";
import MinHeight from "../../components/MinHeight";
import { LeftCircleOutlined } from "@ant-design/icons";
function ContractUserDetail(props) {
  return (
    <div className="w-full relative">
      <button
        className="absolute top-[-10px] left-[-10px]"
        onClick={() => props.setSelectedDetail(false)}
      >
        <LeftCircleOutlined className="text-[20px]" />
      </button>
      <div className="mt-3 border h-full">{props.contractId}</div>
    </div>
  );
}

export default ContractUserDetail;
