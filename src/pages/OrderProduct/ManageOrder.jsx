import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail, fetchOrderUser } from "../../redux/slice/orderSlice";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Modal, Pagination } from "antd";
import Loading from "../../components/Loading";
import CustomModal from "./CustomModal";
import { ShoppingCartOutlined } from "@ant-design/icons";
import NavbarUser from "../Auth/NavbarUser";
import { formatPrice } from "../../components/formatPrice/FormatPrice";
import cayTung from "../../assets/cay-tung.png";
function ManageOrder() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const orderList = useSelector((state) => state.order.orderUser?.items);
  const totalItems = useSelector(
    (state) => state.order.orderUser.totalItemsCount
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(selectedOrderId);
  const pageSize = 5;
  console.log(totalItems);
  useEffect(() => {
    if (!orderList) {
      setLoading(true);
      dispatch(fetchOrderUser({ pageIndex: currentPage - 1, pageSize }))
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
          setLoading(false);
        });
    }
  }, [currentPage, orderList]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const getClassForStatus = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-500";
      case "Failed":
        return "text-[#ee4d2d]";
      case "Waiting":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  return (
    <MinHeight>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="m-auto w-[70%] mt-10 flex justify-between bg-[#ffffff] mb-5">
          <NavbarUser />
          <div className=" w-[75%] ">
            <div className="">
              {orderList?.length > 0 ? (
                orderList?.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#ffffff] border drop-shadow-lg my-2 p-5"
                  >
                    <div className="flex justify-between my-2">
                      <div>
                        <div className="italic">
                          {(() => {
                            const dateString = order.orderDate;
                            if (dateString) {
                              const dateObject = new Date(dateString);
                              const day = dateObject.getDate();
                              const month = dateObject.getMonth() + 1;
                              const year = dateObject.getFullYear();
                              return `${day < 10 ? "0" : ""}${day}/${
                                month < 10 ? "0" : ""
                              }${month}/${year}`;
                            }
                            return "";
                          })()}
                        </div>
                      </div>
                      <div className="w-[65%] text-end ">
                        Đến địa chỉ:
                        <span className="text-[#26aa99]">{order.address}</span>
                      </div>
                      <div className="w-[20%] text-end border-l border-l-black">
                        Tình trạng:
                        <span
                          className={` ${getClassForStatus(order.orderStatus)}`}
                        >
                          {(() => {
                            switch (order.orderStatus) {
                              case "Paid":
                                return "Đã thanh toán";
                              case "Failed":
                                return "Thất bại";
                              case "Waiting":
                                return "Đang chờ";
                              default:
                                return "";
                            }
                          })()}
                        </span>
                      </div>
                    </div>
                    {order.orderDetails.map((orderDetail) => (
                      <div className="border-y p-3 flex">
                        <div className="w-[10%]">
                          <img
                            className="w-[82px] h-[82px]"
                            src={cayTung}
                            alt=""
                          />
                        </div>
                        <div className="w-[70%]">
                          <div>{orderDetail.bonsai.name}</div>
                          <div className="opacity-50">Dáng xiên</div>
                        </div>
                        <div className="flex justify-center w-[20%] items-center">
                          <div className="text-[#3e9943] ">
                            {formatPrice(orderDetail.bonsai.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className=" mt-5 flex items-center justify-end">
                      <span className="text-[14px]">Đơn hàng trị giá:</span>
                      <span className="text-[24px] font-bold text-[#3e9943] pl-5">
                        {formatPrice(order.price)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center flex flex-col justify-center items-center h-[400px]">
                  <ShoppingCartOutlined className="text-[50px] mt-5 " />
                  <div className="font-bold">Bạn chưa mua hàng</div>
                </div>
              )}
            </div>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={onPageChange}
              className="text-center mt-5"
            />
          </div>
        </div>
      )}
    </MinHeight>
  );
}

export default ManageOrder;
