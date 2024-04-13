import React, { useEffect, useState } from "react";
import { Modal, InputNumber, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import { DatePicker, Space } from "antd";
import { parse } from "date-fns";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import {
  allServiceGarden,
  createContract,
} from "../../../redux/slice/contractSlice";
import { useDispatch } from "react-redux";
const { RangePicker } = DatePicker;
function ModalServiceGardenChecking(props) {
  const { show, setShow, contractDetail } = props;
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [contractDetailne, setContractDetailne] = useState();
  const tempPriceService = contractDetail?.temporaryPrice;
  const surchargePriceService = contractDetail?.temporarySurchargePrice;
  const numberOfGardener = contractDetail?.temporaryGardener;
  const startDate = dayjs(contractDetail?.startDate).format("YYYY-MM-DD");
  const endDate = dayjs(contractDetail?.endDate).format("YYYY-MM-DD");
  console.log(startDate);
  const [dateRange, setDateRange] = useState([]);
  const [editSurcharge, setEditSurcharge] = useState(
    contractDetailne?.temporarySurchargePrice
  );
  const [editNumberOfGardener, setEditNumberOfGardener] = useState();
  const [editedPrice, setEditedPrice] = useState(
    contractDetailne?.temporaryPrice
  );

  const handleDateChange = (dates, dateStrings) => {
    console.log("Formatted Selected Range: ", dateStrings);
    setDateRange(dateStrings);
  };
  const disabledStartDate = (current) => {
    const today = dayjs().startOf("day");
    return current && current < today;
  };
  const [editDate, setEditDate] = useState();
  console.log(editDate);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    setContractDetailne(contractDetail);
    setEditedPrice(contractDetail.temporaryPrice);
    setEditSurcharge(contractDetail.temporarySurchargePrice);
    setEditNumberOfGardener(contractDetail.temporaryGardener);
    setDateRange([
      dayjs(contractDetail?.startDate).format("YYYY-MM-DD"),
      dayjs(contractDetail?.endDate).format("YYYY-MM-DD"),
    ]);
  }, [contractDetail]);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPrice(contractDetail.temporaryPrice);
    setEditSurcharge(contractDetail.temporarySurchargePrice);
    setEditNumberOfGardener(contractDetail.temporaryGardener);
    setDateRange([
      dayjs(contractDetail?.startDate).format("YYYY-MM-DD"),
      dayjs(contractDetail?.endDate).format("YYYY-MM-DD"),
    ]);
  };
  const handleSaveEdit = () => {
    setIsEditing(false);
    setEditedPrice(editedPrice);
  };

  const handleOk = async () => {
    const payload = {
      serviceGardenId: contractDetail.id,
    };
    if (tempPriceService != editedPrice) {
      payload.standardPrice = editedPrice;
    }
    if (startDate != dateRange[0]) {
      payload.startDate = dateRange[0];
    }
    if (endDate != dateRange[1]) {
      payload.endDate = dateRange[1];
    }
    if (tempPriceService !== contractDetail?.temporaryPrice) {
      console.log("Temp price updated:", tempPriceService);
    }
    setConfirmLoading(true);
    await createContract(payload)
      .then((data) => {
        toast.success("Tạo hợp đồng thành công");
        dispatch(
          allServiceGarden({
            pageIndex: 0,
            pageSize: 10,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Lỗi tạo hợp đồng!!!", err);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
    setShow(false);
  };

  return (
    <>
      <Modal
        onCancel={() => {
          setShow(false), handleCancelEdit();
        }}
        onOk={handleOk}
        okButtonProps={{ type: "default" }}
        open={show}
        okText={confirmLoading ? "Đang tạo" : "Tạo hợp đồng"}
        cancelText="Hủy"
        confirmLoading={confirmLoading}
        maskClosable={false}
      >
        <div className="flex items-center gap-2">
          <div>Thông tin đơn hàng</div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button onClick={handleSaveEdit}>Lưu</Button>
              <Button onClick={handleCancelEdit}>Hủy</Button>
            </div>
          ) : (
            <div className="flex items-center">
              <Button
                className="bg-none border-none"
                onClick={handleEditClick}
                icon={<EditOutlined />}
              />
            </div>
          )}
        </div>
        <div className="">
          <div className="flex items-center">
            {isEditing ? (
              <div className="my-2">
                <div className="my-2">
                  Tên khách hàng:{" "}
                  {
                    contractDetail?.customerGarden?.customer?.applicationUser
                      ?.fullname
                  }
                </div>
                <div className="my-2">
                  Email:{" "}
                  {
                    contractDetail?.customerGarden?.customer?.applicationUser
                      ?.email
                  }
                </div>
                <div className="my-2">
                  Số điện thoại:{" "}
                  {
                    contractDetail?.customerGarden?.customer?.applicationUser
                      ?.phoneNumber
                  }
                </div>
                <div className="my-2">
                  Địa chỉ vườn: {contractDetail?.customerGarden?.address}
                </div>
                <div className="my-2">
                  Diện tích vườn:
                  {contractDetail?.customerGarden?.square.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                  m<sup>2</sup>
                </div>
                <div className="my-2">
                  Tên dịch vụ: {contractDetail?.service?.name}
                </div>
                <div className="my-2">
                  Mô tả: {contractDetail?.service?.description}
                </div>
                <div className="my-2">
                  Loại dịch vụ:{" "}
                  {contractDetail?.service?.serviceType == 1
                    ? "Chắm sóc Bonsai"
                    : "Chăm sóc sân vườn"}
                </div>
                <div className="my-2 h-[200px] w-[200px]">
                  Hình ảnh:
                  <img
                    src={contractDetail?.service?.image}
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  Thời gian làm việc:
                  <RangePicker
                    defaultValue={[
                      dayjs(contractDetail?.startDate),
                      dayjs(contractDetail?.endDate),
                    ]}
                    className="border border-black"
                    onChange={handleDateChange}
                    allowClear={false}
                    placeholder="Chọn ngày"
                    disabledDate={disabledStartDate}
                  />
                </div>
                <div className="my-2">
                  Giá:
                  <InputNumber
                    className="w-[30%] ml-2"
                    value={editedPrice}
                    onChange={(value) => setEditedPrice(value)}
                  />
                </div>
                <div className="my-2">
                  Phụ phí:
                  <InputNumber
                    className="w-[30%] ml-2"
                    value={editSurcharge}
                    onChange={(value) => setEditSurcharge(value)}
                  />
                </div>
                <div className="my-2">
                  Số lượng người chăm vườn:
                  <InputNumber
                    className="w-[30%] ml-2"
                    value={editNumberOfGardener}
                    onChange={(value) => setEditNumberOfGardener(value)}
                  />
                </div>
              </div>
            ) : (
              <div className="">
                <div className="flex">
                  Thời gian làm việc:
                  <div className="pl-2">
                    {dateRange[0]}
                    &#8594;
                    {dateRange[1]}
                  </div>
                </div>
                <div>Giá: {formatPrice(editedPrice)}</div>
                <div>Phụ phí: {formatPrice(editSurcharge)}</div>
                <div>
                  Số lượng người chăm vườn: {editNumberOfGardener} người
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalServiceGardenChecking;
