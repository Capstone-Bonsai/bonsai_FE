import React, { useEffect, useState } from "react";
import { Modal, InputNumber, Button, Select, Space } from "antd";
import { addGardener, freeGardener } from "../../../redux/slice/gardener";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import { allServiceOrder } from "../../../redux/slice/serviceOrderSlice";
function ModalAddGardener(props) {
  const { show, setShow, serviceOrderDetail } = props;
  console.log(serviceOrderDetail);
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    if (serviceOrderDetail != undefined) {
      const payload = {
        pageIndex: 0,
        pageSize: 10,
        contractId: serviceOrderDetail?.id,
      };
      dispatch(freeGardener(payload));
    }
  }, [serviceOrderDetail]);
  const gardeners = useSelector(
    (state) => state?.gardener?.freeGardenerDTO?.items
  );
  const loading = useSelector((state) => state?.gardener?.loading);
  console.log(gardeners);
  console.log(loading);
  const [selectedGardener, setSelectedGardener] = useState([]);
  console.log(selectedGardener);
  const handleSelectChange = (value) => {
    setSelectedGardener(value);
  };

  const handleClose = () => {
    setSelectedGardener([])
    setShow(false);
  };

  const handleAddGardeners = async () => {
    const payload = {
      serviceOrderId: serviceOrderDetail?.id,
      gardenerIds: selectedGardener,
    };
    setConfirmLoading(true);
    try {
      await addGardener(payload)
        .then((data) => {
          toast.success("Thêm người làm vườn thành công!");
          dispatch(
            allServiceOrder({
              pageIndex: 0,
              pageSize: 10,
            })
          );
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    } catch (error) {
      toast.error("Thêm thất bại", error);
    }
  };
  return (
    <Modal
      title="Thêm người làm vườn"
      open={show}
      onOk={handleAddGardeners}
      width="40%"
      onCancel={setShow}
      // onOk={onSubmit}
      okButtonProps={{ type: "default" }}
      okText={confirmLoading ? "Đang thêm" : "Thêm mới"}
      cancelText="Hủy"
      confirmLoading={confirmLoading}
      maskClosable={false}
    >
      {loading === true ? (
        <Loading loading={loading} />
      ) : (
        <Select
          mode="multiple"
          value={selectedGardener}
          onChange={handleSelectChange}
          style={{ width: "80%" }}
          placeholder="Chọn người làm vườn"
        >
          {gardeners?.map((gardener) => (
            <Select.Option key={gardener.id} value={gardener.id}>
              {gardener?.fullname} ({gardener?.currentService}-số lượng dịch vụ)
            </Select.Option>
          ))}
        </Select>
      )}
    </Modal>
  );
}

export default ModalAddGardener;
