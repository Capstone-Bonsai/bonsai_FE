import React, { useEffect, useState } from "react";
import MinHeight from "../../../components/MinHeight";
import NavbarUser from "../../Auth/NavbarUser";
import { useDispatch, useSelector } from "react-redux";
import { customerBonsai } from "../../../redux/slice/bonsaiSlice";
import noImage from "../../../assets/unImage.png";
import { Pagination } from "antd";
import Loading from "../../../components/Loading";
import CustomerBonsaiDetail from "./CustomerBonsaiDetail";
function CustomerBonsai() {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [bonsaiId, setBonsaiId] = useState("");
  const [bonsaiDetail, setBonsaiDetail] = useState(false);
  const [bonsaiLoading, setBonsaiLoading] = useState(false);
  useEffect(() => {
    setBonsaiLoading(true);
    dispatch(customerBonsai({ pageIndex: pageIndex - 1, pageSize }))
      .then(() => {
        setBonsaiLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setBonsaiLoading(false);
      });
  }, [pageIndex, pageSize]);

  const bonsais = useSelector((state) => state.bonsai?.customerBonsai?.items);

  const { totalItemsCount } = useSelector(
    (state) => state?.bonsai.customerBonsai
  );
  const handlePageChange = (page) => {
    setPageIndex(page);
  };
  const propsBonsaiDetail = {
    setBonsaiDetail,
    bonsaiId,
  };

  return (
    <MinHeight>
      <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
        <NavbarUser />
        <div className=" border w-[75%]">
          {!bonsaiDetail ? (
            <>
              {bonsaiLoading ? (
                <Loading loading={bonsaiLoading} isRelative={true} />
              ) : (
                <div className="flex flex-col gap-5">
                  {bonsais?.length > 0 ? (
                    bonsais?.map((bonsai) => (
                      <div
                        key={bonsai?.id}
                        className="border flex relative gap-3 p-3"
                      >
                        <div className="w-[200px] h-[200px]">
                          <img
                            className="w-full h-full object-cover"
                            src={
                              bonsai?.bonsai?.bonsaiImages?.length > 0
                                ? bonsai?.bonsai?.bonsaiImages[0]?.imageUrl
                                : noImage
                            }
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="font-bold">
                            {bonsai?.bonsai?.name}
                          </div>
                          <div className="text-[14px]">
                            Code: {bonsai?.bonsai?.code}
                          </div>
                          <div className="text-[14px]">
                            Năm trồng: {bonsai?.bonsai?.yearOfPlanting}
                          </div>
                          <div className="text-[14px]">
                            Kích thước thân: {bonsai?.bonsai?.trunkDimenter}cm
                          </div>
                          <div className="text-[14px]">
                            Chiều cao: {bonsai?.bonsai?.height}m
                          </div>
                          <div className="text-[14px]">
                            Số thân: {bonsai?.bonsai?.numberOfTrunk}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setBonsaiDetail(true), setBonsaiId(bonsai?.id);
                          }}
                          className="absolute right-5 bottom-5 hover:text-[#3a9943]"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-[30px] p-3 mt-[150px] text-center">Bạn chưa có bonsai nào</div>
                  )}
                </div>
              )}
            </>
          ) : (
            <CustomerBonsaiDetail {...propsBonsaiDetail} />
          )}
        </div>
      </div>
      {bonsais?.length > 0 ? (
        <Pagination
          current={pageIndex}
          pageSize={pageSize}
          total={totalItemsCount}
          onChange={handlePageChange}
          className="text-center mt-5"
        />
      ) : (
        ""
      )}
    </MinHeight>
  );
}

export default CustomerBonsai;
