import React, { useEffect, useState } from "react";
import { Modal, InputNumber, Button, Select, Space } from "antd";
import { addGardener, freeGardener } from "../../../redux/slice/gardener";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listAllContract } from "../../../redux/slice/contractSlice";
import Loading from "../../../components/Loading";
function ModalAddGardener(props) {
  const { show, setShow, contractDetail } = props;
  console.log(contractDetail);
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
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
  const handleAddGardeners = async () => {
    const payload = {
      contractId: contractId,
      gardenerIds: selectedGardener,
    };
    setConfirmLoading(true);
    try {
      await addGardener(payload)
        .then((data) => {
          toast.success("Cập nhật thành công!");
          dispatch(
            listAllContract({
              pageIndex: 0,
              pageSize: 10,
            })
          );
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
      width="60%"
      onCancel={setShow}
      // onOk={onSubmit}
      okButtonProps={{ type: "default" }}
      okText={confirmLoading ? "Đang tạo" : "Tạo mới"}
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
          style={{ width: "100%" }}
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
