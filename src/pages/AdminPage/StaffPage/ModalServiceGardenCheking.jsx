import React from "react";
import { Tag, Input, Modal, Form, InputNumber, Select, Upload } from "antd";
import { format } from "date-fns";
function ModalServiceGardenChecking(props) {
  const { show, setShow, contractDetail } = props;
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
              Từ ngày:
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

export default ModalServiceGardenChecking;
