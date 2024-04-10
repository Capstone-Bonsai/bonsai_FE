import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import NavbarUser from "../Auth/NavbarUser";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listAllContract } from "../../redux/slice/contractSlice";

function ContractUser() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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
  return (
    <MinHeight>
      <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
        <NavbarUser />
        <div className="border w-[75%] flex flex-col items-center p-4">
          ContractUser
        </div>{" "}
      </div>{" "}
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
