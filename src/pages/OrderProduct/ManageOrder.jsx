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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderById = useSelector((state) => state.order?.orderDetailUser);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const getClassForStatus = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-500";
      case "Failed":
        return "text-red-500";
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
            <div className=" h-[500px] overflow-y-auto">
              {orderList?.length > 0 ? (
                orderList?.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#ffffff] border drop-shadow-lg my-2 p-5"
                  >
                    <div className="flex justify-between">
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
                        <div className="">
                          <span className="font-bold">Đơn hàng trị giá:</span>
                          {order.price} ₫
                        </div>
                      </div>
                      <div>Đến địa chỉ: {order.address}</div>
                      <div>
                        <span className={getClassForStatus(order.orderStatus)}>
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>
                    {order.orderDetails.map((orderDetail) => (
                      <div className="border-y p-3">
                        <div>{orderDetail.bonsai.name}</div>
                        <div>{formatPrice(orderDetail.bonsai.price)}</div>
                      </div>
                    ))}
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
