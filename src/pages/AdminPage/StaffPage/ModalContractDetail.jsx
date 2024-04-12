import React, { useEffect } from "react";
import { Tag, Input, Modal, Form, InputNumber, Select, Upload } from "antd";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
function ModalContractDetail(props) {
  const { show, setShow, contractDetail } = props;
  const dispatch = useDispatch();
  const contractId = contractDetail?.id;
  console.log(contractId);

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
          <div className="flex gap-2">
            Thời gian làm việc:
            <div>
              {new Date(contractDetail?.startDate).toLocaleDateString()}
              &#8594;
              {new Date(contractDetail?.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalContractDetail;
