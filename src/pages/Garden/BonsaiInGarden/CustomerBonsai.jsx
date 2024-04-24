import React, { useEffect, useState } from "react";
import MinHeight from "../../../components/MinHeight";
import NavbarUser from "../../Auth/NavbarUser";
import { useDispatch, useSelector } from "react-redux";
import { customerBonsai } from "../../../redux/slice/bonsaiSlice";

function CustomerBonsai() {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(customerBonsai({ pageIndex, pageSize }));
  }, []);

  const bonsais = useSelector((state) => state.bonsai?.customerBonsai?.items);
  return (
    <MinHeight>
      <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
        <NavbarUser />
        <div className=" border w-[75%] pt-5">sdfgdfgdfg</div>
      </div>
    </MinHeight>
  );
}

export default CustomerBonsai;
