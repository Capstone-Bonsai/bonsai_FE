import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail, fetchOrderUser } from "../../redux/slice/orderSlice";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Modal, Pagination } from "antd";
import Loading from "../../components/Loading";
import CustomModal from "./CustomModal";

function ManageOrder() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const orderList = useSelector((state) => state.order.orderUser?.items);
  const totalItems = useSelector(
    (state) => state.order.orderUser.totalItemsCount
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  console.log(selectedOrderId);
  const pageSize = 5;
  const loading = useSelector((state) => state.order.loading);
  console.log(totalItems);
  useEffect(() => {
    dispatch(fetchOrderUser({ pageIndex: currentPage - 1, pageSize }));
  }, [currentPage]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async (orderId) => {
    setIsModalOpen(true);
    setSelectedOrderId(orderId);
    await dispatch(fetchOrderDetail(orderId));
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const handleCloseModal = () => {
    setSelectedOrderId(null);
  };
  return (
    <MinHeight>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="m-auto w-[70%]">
          {orderList?.map((order) => (
            <div key={order.id} className="bg-[#ffffff] border border-black drop-shadow-lg my-2 p-2">
              <div className="flex justify-between">
                <div>
                  <div>Đơn hàng trị giá: {order.price} ₫</div>
                  <div>20/02/2024</div>
                </div>
                <div>đã được giao đến địa chỉ: fgdfgdfgdgdg</div>
                <button className="hover:text-[#3e9943]" onClick={() => showModal(order.id)}>
                  Chi tiết đơn hàng
                </button>
              </div>
            </div>
          ))}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={onPageChange}
            className="text-center mt-5"
          />
          {selectedOrderId !== null && (
            <CustomModal  orderId={selectedOrderId} onClose={handleCloseModal} />
          )}
        </div>
      )}
    </MinHeight>
  );
}

export default ManageOrder;
