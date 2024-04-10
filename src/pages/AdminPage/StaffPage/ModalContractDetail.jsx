import React, { useEffect } from "react";
import { Tag, Input, Modal, Form, InputNumber, Select, Upload } from "antd";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { freeGardener } from "../../../redux/slice/gardener";
function ModalContractDetail(props) {
  const { show, setShow, contractDetail } = props;
  const dispatch = useDispatch();
  const contractId = contractDetail?.id;
  console.log(contractId);
  useEffect(() => {
    const payload = {
      pageIndex: 0,
      pageSize: 10,
      contractId: contractId,
    };
    dispatch(freeGardener(payload));
  }, [contractDetail]);
  console.log(contractDetail);
  return (
    <>
      <Modal
        title="Thông tin đơn hàng"
        open={show}
        onCancel={setShow}
        // onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        // confirmLoading={confirmLoading}
        // onCancel={handleClose}
        maskClosable={false}
      >
        <div className="">
          <div className="flex">
            Thời gian làm việc:
            <div>
              Từ ngày:{" "}
              {new Date(contractDetail?.startDate).toLocaleDateString()}
              &#8594;
              {new Date(contractDetail?.endDate).toLocaleDateString()}
            </div>
            <div>{contractDetail?.id}</div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalContractDetail;
