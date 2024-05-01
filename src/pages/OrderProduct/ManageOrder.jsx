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
import noImage from "../../assets/unImage.png";
import { getOrderStatusText } from "../../components/status/orderStatus";
function ManageOrder() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const orderList = useSelector((state) => state.order.orderUser?.items);
  const totalItems = useSelector(
    (state) => state.order.orderUser.totalItemsCount
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;
  console.log(totalItems);
  useEffect(() => {
    setLoading(true);
    dispatch(fetchOrderUser({ pageIndex: currentPage - 1, pageSize }))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const getClassForStatus = (status) => {
    switch (status) {
      case "Paid":
      case "Preparing":
      case "Delivering":
      case "Delivered":
        return "text-green-500";
      case "Failed":
      case "Canceled":
        return "text-[#ee4d2d]";
      case "Waiting":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  return (
    <MinHeight>
      <div className="m-auto w-[70%] mt-10 flex justify-between bg-[#ffffff] mb-5">
        <NavbarUser />
        <div className=" w-[75%] ">
          {loading ? (
            <Loading loading={loading} isRelative={true} />
          ) : (
            <>
              <div className="">
                {orderList?.length > 0 ? (
                  orderList?.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#ffffff] border drop-shadow-lg my-2 p-5 relative"
                    >
                      <div>
                        <div className="italic">
                          {new Date(order?.creationDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex justify-between my-2">
                        <div className="w-[70%]">
                          <span className="font-bold pr-2">Địa chỉ:</span>
                          <span className="text-[#26aa99]">
                            {order.address}
                          </span>
                        </div>
                        <div className="w-[30%] text-start pl-5 border-l border-l-black">
                          <span className="font-bold pr-2">Tình trạng:</span>
                          <span
                            className={` ${getClassForStatus(
                              order.orderStatus
                            )}`}
                          >
                            {getOrderStatusText(order.orderStatus)}
                          </span>
                        </div>
                      </div>
                      {order?.orderDetails?.map((orderDetail) => (
                        <div key={orderDetail.id} className="border-y p-3 flex">
                          <div className="w-[10%]">
                            <img
                              className="w-[82px] h-[82px] object-cover"
                              src={
                                orderDetail.bonsai?.bonsaiImages?.length > 0
                                  ? orderDetail.bonsai?.bonsaiImages[0]
                                      ?.imageUrl
                                  : noImage
                              }
                              alt=""
                            />
                          </div>
                          <div className="w-[70%]">
                            <div className="text-[18px] font-bold">
                              {orderDetail.bonsai.name}
                            </div>
                            {/* <div className="opacity-50">Dáng xiên</div> */}
                            <div className="opacity-70">
                              Code:{" "}
                              {orderDetail.bonsai.code != ""
                                ? orderDetail.bonsai.code
                                : "Đang cập nhật"}
                            </div>
                          </div>
                          <div className="flex justify-center w-[20%] items-center">
                            <div className="text-[#3e9943] ">
                              {formatPrice(orderDetail.bonsai.price)}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-end my-2">
                        Phí giao hàng:{" "}
                        <span className="text-[#3a9943]">
                          {formatPrice(order.deliveryPrice)}
                        </span>
                      </div>
                      <div className=" flex items-center justify-end">
                        {/* <span className="text-[14px]">Đơn hàng trị giá:</span> */}
                        <span className="text-[24px] font-bold text-[#3e9943] pl-5">
                          {formatPrice(order.totalPrice)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="opacity-70 text-[50px] text-center border flex flex-col justify-center items-center h-[400px]">
                    <ShoppingCartOutlined className="text-[100px] mt-5 " />
                    <div className="font-bold">Bạn chưa mua hàng</div>
                  </div>
                )}
              </div>
              {totalItems > 0 ? (
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalItems}
                  onChange={onPageChange}
                  className="text-center mt-5"
                />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </MinHeight>
  );
}

export default ManageOrder;
