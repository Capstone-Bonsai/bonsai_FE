import React, { useState, useEffect, useRef } from "react";
import { Tag, Modal, Form, Select, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addGardenerToOrder, getOrderStatus } from "../../../utils/orderApi";
import { fetchAllOrders } from "../../../redux/slice/orderSlice";
import { allGardener } from "../../../redux/slice/gardener";
import Loading from "../../../components/Loading";
import { getOrderStatusText } from "../../../components/status/orderStatus";

const ModalUpdateOrder = (props) => {
  const { show, setShow, order } = props;
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const [confirmLoadingUpdateStatus, setConfirmLoadingUpdateStatus] =
    useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [listOrderStatus, setListOrderStatus] = useState();
  const [selectedGardener, setSelectedGardener] = useState();
  const [validateMessege, setValidateMessege] = useState();

  const handleSelectChange = (value) => {
    setSelectedGardener(value);
  };

  const { allGardenerDTO } = useSelector((state) => state.gardener);
  
  useEffect(() => {
    if (selectedGardener !== undefined) {
      setValidateMessege(undefined);
    }
  }, [selectedGardener]);
  useEffect(() => {
    dispatch(allGardener());
  }, []);

  const updateOrder = (data) => {
    try {
      console.log(data);
      addGardenerToOrder(order.id, selectedGardener)
        .then((data) => {
          console.log(data);
          toast.success(data.data);
          dispatch(fetchAllOrders({ pageIndex: 0, pageSize: 10 }));
          handleCancelUpdateStatus();
        })
        .catch((err) => {
          console.log(err);
          setValidateMessege("Vui lòng chọn người làm vườn!");
        })
        .finally(() => {
          setConfirmLoadingUpdateStatus(false);
        });
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const onSubmit = (i) => {
    setConfirmLoadingUpdateStatus(true);
    updateOrder();
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Waiting":
        return "Đang chờ";
      case "Paid":
        return "Đã thanh toán";
      case "Preparing":
        return "Đang thực hiện";
      case "Delivering":
        return "Đang giao";
      case "Failed":
        return "Thất bại";
      case "DeliveryFailed ":
        return "Giao hàng thất bại";
      case "Delivered":
        return "Đã giao";
      default:
        return "Trạng thái không xác định";
    }
  };

  const showModalUpdateStatus = () => {
    setOpenUpdateStatus(true);
  };

  const handleCancelUpdateStatus = () => {
    console.log("Clicked cancel button");
    setSelectedGardener(undefined);
    setOpenUpdateStatus(false);
  };

  return (
    <>
      <Modal
        title="Thông tin đơn hàng"
        open={show}
        maskClosable={false}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Trở lại
          </Button>,
        ]}
      >
        <div className="">
          <Form
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
          >
            <Form.Item label="Khách hàng">
              <p>{order?.customer?.applicationUser?.email}</p>
            </Form.Item>
            <Form.Item label="Tên bonsai">
              <p>{order?.orderDetails[0]?.bonsai?.name}</p>
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <p>{order?.address}</p>
            </Form.Item>
            <Form.Item label="Ngày đặt">
              <p>{new Date(order?.orderDate).toLocaleDateString()}</p>
            </Form.Item>
            {/* <Form.Item label="Ngày giao">
              <p>
                {new Date(order?.expectedDeliveryDate).toLocaleDateString()}
              </p>
            </Form.Item> */}
            <Form.Item label="Giá hàng">
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(order?.price)}
              </p>
            </Form.Item>
            <Form.Item label="Phí giao hàng">
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(order?.deliveryPrice)}
              </p>
            </Form.Item>
            <Form.Item label="Tổng cộng">
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(order?.totalPrice)}
              </p>
            </Form.Item>
            <Form.Item label="Trạng thái đơn hàng:" name="orderStatus">
              {/* <div className="grid grid-cols-2">
                <p></p>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px- w-[100px]"
                  onClick={showModalUpdateStatus}
                >
                  Cập nhật
                </button>
              </div> */}
              <div className="flex items-center gap-2">
                <Tag>{getOrderStatusText(order?.orderStatus)}</Tag>
                {/* <div className="flex items-center">
                  <Button className="bg-none" onClick={showModalUpdateStatus}>
                    <EditOutlined /> Cập nhật
                  </Button>
                </div> */}
              </div>
            </Form.Item>
            <Form.Item label="Người làm vườn">
              <div className="flex items-center gap-2">
                {order?.gardenerId ? (
                  <Tag>Đã đủ người</Tag>
                ) : (
                  <Tag>Chưa thêm người</Tag>
                )}
                {order?.orderStatus === "Paid" ? (
                  <div className="flex items-center">
                    <Button className="bg-none" onClick={showModalUpdateStatus}>
                      <EditOutlined /> Thêm người
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="Thêm người làm vườn"
        open={openUpdateStatus}
        onOk={onSubmit}
        okText={confirmLoadingUpdateStatus ? "Đang tạo" : "Tạo mới"}
        cancelText="Hủy"
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoadingUpdateStatus}
        onCancel={handleCancelUpdateStatus}
      >
        <div>Bạn có muốn cập nhật trạng thái của đơn hàng này không?</div>
        {allGardenerDTO?.loading === true ? (
          <Loading loading={allGardenerDTO?.loading} />
        ) : (
          <>
            <Select
              value={selectedGardener}
              onChange={handleSelectChange}
              style={{ width: "100%" }}
              placeholder="Chọn người làm vườn"
            >
              {allGardenerDTO?.items?.map((gardener) => (
                <Select.Option key={gardener.id} value={gardener.id}>
                  {gardener?.fullname}
                </Select.Option>
              ))}
            </Select>
            <div className="text-red-500 pl-2">{validateMessege}</div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalUpdateOrder;
