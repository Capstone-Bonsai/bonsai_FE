import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Tag, Modal, Form, Select, Button, Tooltip } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
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

  console.log(order);
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
          handleClose();
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

  const getColor = (orderStatus) => {
    switch (orderStatus) {
      case "Paid":
        return { color: "success", icon: <CheckCircleOutlined /> };
      case "Delivered":
        return { color: "success", icon: <CheckCircleOutlined /> };
      case "Waiting":
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case "Preparing":
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case "Delivering":
        return { color: "warning", icon: <ClockCircleOutlined /> };
      case "Failed":
        return { color: "error", icon: <CloseCircleOutlined /> };
      case "DeliveryFailed":
        return { color: "error", icon: <CloseCircleOutlined /> };
      default:
        return "defaultColor";
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
        width={600}
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
            <div className="font-medium pl-8 mt-3">1.Thông tin đơn hàng</div>
            <div className="pl-8">
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="flex justify-start">Khách hàng: </div>
                <div className="flex justify-start col-span-2">
                  {order?.customer?.applicationUser?.email}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="flex justify-start">Tên bonsai: </div>
                <div className="flex justify-start col-span-2">
                  {order?.orderDetails[0]?.bonsai?.name}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="flex justify-start">Địa chỉ: </div>
                <div className="flex justify-start col-span-2">
                  {order?.address}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="flex justify-start">Ngày tạo đơn: </div>
                <div className="flex justify-start col-span-2">
                  {new Date(order?.creationDate).toLocaleDateString()}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="flex justify-start">Giá hàng: </div>
                <div className="flex justify-start col-span-2">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                  }).format(order?.price)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="flex justify-start">Phí giao hàng: </div>
                <div className="flex justify-start col-span-2">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                  }).format(order?.deliveryPrice)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="flex justify-start">Tổng cộng: </div>
                <div className="flex justify-start col-span-2">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                  }).format(order?.totalPrice)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 m-4">
                <div className="flex justify-start">Trạng thái đơn hàng: </div>
                <div className="flex justify-start col-span-2">
                  <div>
                    <Tag
                      color={getColor(order?.orderStatus).color}
                      icon={getColor(order?.orderStatus).icon}
                    >
                      {getOrderStatusText(order?.orderStatus)}
                    </Tag>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-medium pl-8 my-3">
                2.Thông tin người làm vườn
              </div>
              {order?.gardenerId ? (
                <div>
                  <div className="pl-8">
                    <div className="grid grid-cols-3 gap-4 m-4">
                      <div className="flex justify-start">
                        Email người làm vườn:
                      </div>
                      <div className="flex justify-start col-span-2">
                        {order?.gardener?.applicationUser?.email}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 m-4">
                      <div className="flex justify-start">Họ và tên:</div>
                      <div className="flex justify-start col-span-2">
                        {order?.gardener?.applicationUser?.fullname}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 m-4">
                      <div className="flex justify-start">Số điện thoại:</div>
                      <div className="flex justify-start col-span-2">
                        {order?.gardener?.applicationUser?.phoneNumber}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="pl-12">
                    <div>
                      Hiện chưa có người làm vườn
                      <span>
                        {order?.orderStatus === "Paid" ? (
                          <Tooltip title="Thêm người">
                            <Button
                              type="text"
                              icon={
                                <PlusCircleOutlined
                                  style={{ color: "black" }}
                                />
                              }
                              onClick={showModalUpdateStatus}
                            />
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
            {order?.orderStatus == "Delivered" ? (
              <>
                <div>
                  <div className="font-medium pl-8 my-3">
                    3.Hình ảnh giao hàng thành công
                  </div>
                </div>
                <div className="pl-8">
                  <div className="grid grid-cols-4 gap-4 m-4">
                    {order?.deliveryImages?.map((image, index) => (
                      <div key={index} className="h-[100px] w-[100px]">
                        <img
                          src={image.image}
                          style={{ width: "100px  ", height: "100px" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </Form>
        </div>
      </Modal>
      <Modal
        title="Thêm người làm vườn"
        open={openUpdateStatus}
        onOk={onSubmit}
        okText={confirmLoadingUpdateStatus ? "Đang thêm" : "Thêm người"}
        cancelText="Hủy"
        okButtonProps={{ type: "default" }}
        confirmLoading={confirmLoadingUpdateStatus}
        onCancel={handleCancelUpdateStatus}
      >
        <div className="mb-6">
          Bạn có muốn thêm người vào đơn hàng này không?
        </div>
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
