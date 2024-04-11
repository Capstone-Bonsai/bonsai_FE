import React, { useEffect, useState } from "react";
import { Modal, InputNumber, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import { DatePicker, Space } from "antd";
import { parse } from "date-fns";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { createContract } from "../../../redux/slice/contractSlice";
const { RangePicker } = DatePicker;
function ModalServiceGardenChecking(props) {
  const { show, setShow, contractDetail } = props;
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
    try {
      await createContract(payload);
      toast.success("Tạo hợp đồng thành công");
    } catch (error) {
      toast.error("Lỗi tạo hợp đồng!!!", error);
    }
    setShow(false);
  };

  return (
    <>
      <Modal
        onCancel={() => {
          setShow(false), handleCancelEdit();
        }}
        okText="Tạo hợp đồng"
        onOk={handleOk}
        okButtonProps={{ type: "default" }}
        open={show}
        cancelText="Hủy"
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
