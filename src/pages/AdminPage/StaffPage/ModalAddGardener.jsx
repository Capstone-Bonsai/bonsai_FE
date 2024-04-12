import React, { useEffect, useState } from "react";
import { Modal, InputNumber, Button, Select, Space } from "antd";
import { addGardener, freeGardener } from "../../../redux/slice/gardener";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
function ModalAddGardener(props) {
  const { show, setShow, contractDetail } = props;
  console.log(contractDetail);
  const dispatch = useDispatch();
  const contractId = contractDetail?.id;
  useEffect(() => {
    const payload = {
      pageIndex: 0,
      pageSize: 10,
      contractId: contractId,
    };
    dispatch(freeGardener(payload));
  }, [contractDetail]);
  const gardeners = useSelector(
    (state) => state?.gardener?.freeGardenerDTO.items
  );
  console.log(gardeners);
  const [selectedGardener, setSelectedGardener] = useState([]);
  console.log(selectedGardener);
  const handleSelectChange = (value) => {
    setSelectedGardener(value);
  };
  const handleAddGardeners = async () => {
    const payload = {
      contractId: contractId,
      gardenerIds: selectedGardener,
    };
    try {
      await addGardener(payload);
      toast.success("Thêm người làm vườn thành công");
    } catch (error) {
      toast.error("Thêm thất bại", error);
    }
  };
  return (
    <Modal
      title="Thêm người làm vườn"
      open={show}
      onOk={handleAddGardeners}
      width="60%"
      onCancel={setShow}
      // onOk={onSubmit}
      okButtonProps={{ type: "default" }}
      // confirmLoading={confirmLoading}
      // onCancel={handleClose}
      okText="Thêm người"
      cancelText="Hủy"
      maskClosable={false}
    >
      <Select
        mode="multiple"
        value={selectedGardener}
        onChange={handleSelectChange}
        style={{ width: "100%" }}
        placeholder="Chọn người làm vườn"
      >
        {gardeners?.map((gardener) => (
          <Select.Option key={gardener.id} value={gardener.id}>
            {gardener.fullname}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
}

export default ModalAddGardener;
